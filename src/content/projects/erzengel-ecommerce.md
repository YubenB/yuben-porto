---
slug: erzengel-ecommerce
title: Erzengel E-commerce Platform
category: Next.js & NestJS
liveUrl: https://erzengel.id
excerpt: A full-stack e-commerce platform with a modern Next.js storefront and a NestJS API.
stack:
  - Next.js
  - NestJS
  - PostgreSQL
  - TypeORM
  - Midtrans
  - DNS
images:
  - /images/projects/erzengel/home.png
  - /images/projects/erzengel/home-2.png
  - /images/projects/erzengel/products.png
  - /images/projects/erzengel/product-detail.png
  - /images/projects/erzengel/orders.png
  - /images/projects/erzengel/order-detail.png
  - /images/projects/erzengel/cart.png
  - /images/projects/erzengel/admin-products.png
  - /images/projects/erzengel/admin-orders.png
  - /images/projects/erzengel/admin-users.png
---

Erzengel Commerce is the engine behind an online store. Think of it as the organized back room that keeps your catalog tidy, your carts and orders flowing, and your payments tracked—so customers can shop with confidence and you can run your business smoothly.

## The big picture

Erzengel splits the world into two:

- Front Office (FO): what shoppers use—browse products, manage their cart, place orders, pay, and view order history.
- Back Office (BO): what your team uses—secure admin tools to manage products, users, and orders, with roles and permissions.

This separation keeps customer actions simple and admin work safe.

## What shoppers can do (FO)

- Explore products and categories with search, filters, and smart lists like “featured,” “popular,” and “latest.”
- See detailed product pages with variants (like size and color), images, and reviews.
- Add items to a cart, adjust quantities, and check totals.
- Checkout by creating an order with a shipping address and notes.
- Pay online via Midtrans; get redirected to a secure payment page.
- Return to the store and track the order status—from pending to confirmed.

## What admins can do (BO)

- Sign in to a separate, secure admin area.
- Manage products: create, update status, and organize the catalog.
- Manage customers: view details, review activity, and (if needed) suspend accounts.
- Oversee orders: search, filter, update statuses, and add internal notes.
- View insights: best-selling products, revenue, and status breakdowns.
- Control access with roles (Super Admin, Admin, Moderator).

## Payments that just work

- Built-in Midtrans integration (ideal for Indonesia)
- Clean payment flow: create order → get payment link → pay → auto-update via webhook
- Automatic handling of success, pending, failure, cancellations, and expirations
- Future-friendly design to add more gateways later

## Order journey at a glance

1. Customer adds products to cart
2. Customer creates an order (stock is reserved)
3. Customer initiates payment and is redirected to Midtrans
4. Midtrans notifies the server when payment completes
5. The order updates automatically; stock is confirmed or released

This keeps inventory honest and customers informed.

## Designed for growth

- Clear FO/BO separation for safety and scale
- Organized modules (users, products, cart, orders) that can expand over time
- Analytics and reporting for smarter decisions
- Scheduler jobs to tidy up pending payments and keep data fresh
- Ready to plug shipping providers (e.g., RajaOngkir) and email notifications

## Why teams like it

- Simple for shoppers, powerful for admins
- Secure by design (separate logins, roles, and permissions)
- Consistent responses and validation for predictable apps
- Built with industry-standard tools so it’s easy to maintain

## Real-world examples

- Launch a storefront with fast product browsing and checkout
- Operate an admin dashboard to manage orders daily
- Offer secure card/bank payments via Midtrans out of the box
- Track performance: top products, revenue trends, and customer orders

## Wrap-up

Erzengel Commerce helps you run an online store with confidence: smooth shopping for customers, clear controls for your team, and a dependable foundation you can grow on.

Want help integrating it with your site? Get in touch and let’s make it live.
