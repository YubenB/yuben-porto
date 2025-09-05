---
slug: building-a-bulletproof-ecommerce-transaction-flow-with-nestjs-and-typeorm
title: Building a Bulletproof E-commerce Transaction Flow with NestJS and TypeORM
date: 2025-08-05
readingTime: 15 min read
thumbnail: https://media2.dev.to/dynamic/image/width=1280,height=720,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fztuzxxv00drrj019la1h.jpg
excerpt: Handling transactions is the most critical part of any e-commerce application. A single bug can lead to lost revenue, incorrect inventory, and frustrated customers. A robust system must guarantee data integrity, especially when dealing with concurrent user actions and interactions with third-party payment gateways.
---

Handling transactions is the most critical part of any e-commerce application. A single bug can lead to lost revenue, incorrect inventory, and frustrated customers. A robust system must guarantee data integrity, especially when dealing with concurrent user actions and interactions with third-party payment gateways.

This article breaks down a production-grade approach to handling the entire order lifecycle using NestJS and TypeORM. We'll explore how to manage database transactions, prevent race conditions with stock management, and reliably process payments.

## Core Principles for Reliability

Before diving into the code, let's establish the foundational concepts that ensure our system is reliable and scalable.

### 1\. Atomic Operations with Database Transactions

An order creation process involves multiple steps: validating items, reserving stock, creating an order record, and clearing the user's cart. If any of these steps fail, the entire operation should be rolled back to prevent inconsistent data (e.g., stock is reduced, but no order is created).

This is achieved using database transactions. The entire **createOrder** logic is wrapped in: `this.dataSource.transaction(async (manager) => { ... })` This ensures all database operations within the block are treated as a single, atomic unit. They either all succeed, or they all fail.

### 2\. Preventing Race Conditions with Pessimistic Locking

Imagine two customers trying to buy the last available unit of a product at the exact same time. Without proper locking, both might read that the stock is "1", and both orders might proceed, resulting in an oversold item.

To prevent this, we use **pessimistic locking**. When we check a product variant's stock, we lock that specific database row.

```typescript
const variant = await productVariantRepo.findOne({
  where: {id: item.productVariantId},
  lock: {mode: "pessimistic_write"},
});
```

This lock (**pessimistic_write**) prevents any other transaction from reading or modifying that row until the current transaction is completed (either committed or rolled back). This effectively forces concurrent requests for the same item to be handled sequentially, guaranteeing an accurate stock check.

### 3\. A Two-Phase Approach to Stock Management

Instead of immediately decrementing stock when an order is created, we use a more flexible "reserve-then-confirm" strategy. This handles cases where a user creates an order but fails to complete the payment.

- **stock**: The actual number of physical units available for sale.
- **reservedStock**: The number of units held for orders that are pending payment.

**The flow is as follows:**

1.  **Order Creation**: stock is decreased, and reservedStock is increased. The item is now "reserved."
2.  **Payment Success**: reservedStock is decreased. The sale is final, and the stock is now officially gone.
3.  **Payment Failure/Expiry**: stock is increased, and reservedStock is decreased. The item is returned to the available inventory.

---

## Part 1: The Order Creation Lifecycle

The createOrder method orchestrates the entire process of turning a cart into a pending order.

### Step 1: Initiate a Database Transaction

Everything starts by opening a transaction to ensure atomicity.

```typescript
return await this.dataSource.transaction(async (manager) => {
  // All subsequent operations use the 'manager' object
});
```

### Step 2: Validate Items and Reserve Stock

This is the most critical section. We loop through each item the user wants to purchase.

```typescript
for (const item of createOrderDto.items) {
  // 1. Lock the product variant row to prevent race conditions
  const variant = await productVariantRepo.findOne({
    where: {id: item.productVariantId},
    lock: {mode: "pessimistic_write"},
  });

  // 2. Perform validation checks
  if (!variant || variant.stock < item.quantity) {
    throw new BadRequestException(`Insufficient stock for ${product.name}.`);
  }

  // 3. Atomically update stock and reserved stock in a single query
  const updateResult = await productVariantRepo
    .createQueryBuilder()
    .update(ProductVariant)
    .set({
      stock: () => "stock - :quantity",
      reservedStock: () => "reservedStock + :quantity",
    })
    .where("id = :id AND stock >= :quantity") // Final check
    .setParameters({id: item.productVariantId, quantity: item.quantity})
    .execute();

  // If the update fails (e.g., stock changed between the read and write), throw an error
  if (!updateResult.affected || updateResult.affected === 0) {
    throw new BadRequestException(
      "Insufficient stock. Concurrent modification detected."
    );
  }

  // ... prepare order item data
}
```

Using **stock: () => 'stock - :quantity'** allows the database to perform the calculation directly, which is more robust and performant than reading the value, modifying it in the application, and writing it back.

### Step 3: Create Order Records and Finalize

Once all items have been validated and their stock reserved, we create the **Order** and **OrderItem** records and clear the user's cart. If any of these fail, the entire transaction rolls back, including the stock reservations.

```typescript
// ... inside the transaction

// Create the main order record
const savedOrder = await orderRepo.save(order);

// Create the associated order item records
await orderItemRepo.save(itemsToCreate);

// Clear the items from the user's cart
await cartItemRepo.delete({id: item.itemId});

// Update the product's overall status (e.g., to OUT_OF_STOCK)
await this.syncProductStockStatusInTransaction(productId, manager);
```

---

## Part 2: Integrating with Payment Gateways

After an order is created, the user must pay for it. This involves redirecting them to a payment gateway and handling the result via webhooks.

### Step 1: Initiate Payment

The **initiatePayment** method prepares a payload for the payment gateway, creates a **PaymentTransaction** record in our database to track the attempt, and returns a payment URL to the client.

```typescript
async initiatePayment(orderId: string, userId: string) {
  // Fetch the order and its details
  const order = await this.orderRepository.findOne(/* ... */);

  // Construct the payload for the payment service
  const paymentRequest = {
    orderId: order.id,
    amount: order.totalAmount,
    customerDetails: { /* ... */ },
    itemDetails: [ /* ... */ ],
  };

  // Call the external payment service
  const paymentResponse = await this.paymentService.createPayment(paymentRequest);

  // Create a tracking record in our database
  const paymentTransaction = this.paymentTransactionRepository.create({
    orderId: order.id,
    status: DbPaymentStatus.PENDING,
    gateway: 'midtrans',
    gatewayTransactionId: paymentResponse.paymentId,
    paymentUrl: paymentResponse.paymentUrl,
  });
  await this.paymentTransactionRepository.save(paymentTransaction);

  return { paymentUrl: paymentResponse.paymentUrl };
}
```

### Step 2: Handle Payment Webhooks

Payment gateways notify our application of status changes (e.g., success, failure) by sending a request to a predefined webhook URL. The **handlePaymentWebhook** method is responsible for processing these notifications.

A key challenge here is **idempotency**: ensuring that processing the same notification multiple times doesn't cause unintended side effects (like releasing stock for an already-paid order).

```typescript
async handlePaymentWebhook(transactionId: string, status: GatewayPaymentStatus, data: any) {
  // Find the transaction record using the gateway's transaction ID
  const paymentTransaction = await this.paymentTransactionRepository.findOne(/* ... */);

  // Idempotency Check: Ignore if this is a duplicate or regressive event
  const prevStatus = paymentTransaction.status;
  if (isDuplicateOrRegressive(status, prevStatus)) {
    this.logger.debug('Duplicate or regressive webhook, skipping');
    return;
  }

  // Map gateway status to our internal order and payment statuses
  switch (status) {
    case GatewayPaymentStatus.SUCCESS:
      paymentStatus = DbPaymentStatus.SUCCESS;
      orderStatus = OrderStatus.PROCESSING;
      // Trigger business logic for success
      await this.confirmStock(order.id);
      break;
    case GatewayPaymentStatus.FAILED:
    case GatewayPaymentStatus.EXPIRED:
      paymentStatus = status as any;
      orderStatus = OrderStatus.EXPIRED;
      // Trigger business logic for failure
      await this.releaseStock(order.id);
      break;
    // ... other cases
  }

  // Update our database records
  await this.paymentTransactionRepository.update(paymentTransaction.id, { status: paymentStatus });
  await this.orderRepository.update(order.id, { status: orderStatus });
}
```

---

## Part 3: The Stock Confirmation Lifecycle

The final piece of the puzzle is managing the **reservedStock**.

### **confirmStock**

Called when a payment webhook signals success. This method finalizes the inventory deduction by converting the **reservedStock** into a permanent deduction.

```typescript
private async confirmStock(orderId: string) {
  return await this.dataSource.transaction(async (manager) => {
    // ... find order items
    for (const item of order.items) {
      // Atomically reduce the reserved stock count
      await productVariantRepo
        .createQueryBuilder()
        .update(ProductVariant)
        .set({
          reservedStock: () => 'GREATEST(reservedStock - :quantity, 0)',
        })
        .where('id = :id')
        .setParameters({ id: item.productVariantId, quantity: item.quantity })
        .execute();
    }
  });
}
```

### **releaseStock**

Called when a payment fails, is cancelled, or expires. This method rolls back the reservation, making the items available for other customers to purchase.

```typescript
private async releaseStock(orderId: string) {
  return await this.dataSource.transaction(async (manager) => {
    // ... find order items
    for (const item of order.items) {
      // Atomically return reserved stock back to available stock
      await productVariantRepo
        .createQueryBuilder()
        .update(ProductVariant)
        .set({
          stock: () => 'stock + :quantity',
          reservedStock: () => 'GREATEST(reservedStock - :quantity, 0)',
        })
        .where('id = :id')
        .setParameters({ id: item.productVariantId, quantity: item.quantity })
        .execute();
    }
  });
}
```

## Conclusion

By combining atomic database transactions, pessimistic locking, and a "reserve-then-confirm" inventory strategy, you can build an e-commerce transaction system that is safe, reliable, and resilient against concurrency issues. This architecture ensures that your data remains consistent from order creation to payment confirmation, providing a stable foundation for your application to grow.
