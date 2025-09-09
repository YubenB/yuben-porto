---
slug: understanding-the-semaphore-mechanism-in-concurrency-control
title: Understanding the Semaphore Mechanism in Concurrency Control
date: 2025-09-09
readingTime: 5 min read
thumbnail: https://media.geeksforgeeks.org/wp-content/uploads/20241015130721027935/Semaphore.png
excerpt: Concurrency is one of the most challenging aspects of system design. When multiple processes or threads attempt to access shared resources simultaneously, conflicts, deadlocks, or inconsistent states can occur.
---

Concurrency is one of the most challenging aspects of system design. When multiple processes or threads attempt to access shared resources simultaneously, conflicts, deadlocks, or inconsistent states can occur. To manage this, operating systems and applications rely on **synchronization primitives**. One of the most fundamental and widely used primitives is the **semaphore**.

## What is a Semaphore?

A **semaphore** is a synchronization mechanism used to control access to a shared resource by multiple processes or threads. Think of it as a signaling system that uses counters to regulate how many units of a resource are available.

Semaphores come in two main flavors:

1. **Binary Semaphore** (also known as a mutex):

   - Counter values: **0** or **1**.
   - Used to provide **mutual exclusion** (only one thread can access the resource at a time).

2. **Counting Semaphore**:

   - Counter can range from **0** to any positive integer.
   - Used when multiple units of a resource exist (e.g., a pool of database connections, limited browser instances, or rebuild slots).

At its core, a semaphore provides two atomic operations:

- **wait (P operation / acquire)** → Decrement the semaphore count. If the count is already **0**, the process must wait.
- **signal (V operation / release)** → Increment the semaphore count, signaling that a resource has been released.

## Why Use a Semaphore?

In practice, semaphores are essential for:

- Preventing race conditions.
- Avoiding resource starvation.
- Coordinating producer-consumer workflows.
- Throttling concurrent workloads to prevent overload.

## Case Example: Using Semaphore in one of my project that requires a Website Rebuild Queue

Let’s take an example from one of my projects, where clients can rebuild their websites (deploying Hugo templates, updating DNS/CDN, and pushing to servers).

### The Problem

- Rebuilding is **resource-intensive**: it involves SSH into a server, generating static files, and syncing with CDN.
- If **multiple rebuilds are triggered at once** (e.g., several clients request updates simultaneously), the server could get overloaded, causing failures.
- You want to ensure that **only a limited number of rebuilds run in parallel**, while the rest wait in a queue.

### The Semaphore Solution

Here, a **counting semaphore** can be applied to limit concurrent rebuild operations.

- Suppose your server can safely handle **2 rebuilds at a time**.
- You initialize a semaphore with count = _2_.
- Each rebuild request must **acquire** a permit before execution.
- If the semaphore count is _0_, the request waits in queue.
- Once a rebuild finishes, it **releases** its permit, allowing the next request in line to proceed.

### Pseudocode Example

```ts
import { Semaphore } from "async-mutex";

// Initialize semaphore with capacity 2
const rebuildSemaphore = new Semaphore(2);

async function queueRebuild(clientId: string) {
  // Acquire a slot (wait if none available)
  const [value, release] = await rebuildSemaphore.acquire();

  try {
    console.log(`Rebuilding website for client ${clientId}...`);

    // Your rebuild logic (SSH deploy, Hugo build, CDN sync, etc.)
    await runRebuildProcess(clientId);

    console.log(`✅ Rebuild completed for client ${clientId}`);
  } catch (err) {
    console.error(`❌ Rebuild failed for client ${clientId}`, err);
  } finally {
    // Release slot so another rebuild can proceed
    release();
  }
}
```

## How It Plays Out in Practice

Imagine three clients (A, B, and C) request a rebuild almost simultaneously:

1. **Semaphore count = 2** (initially).
2. Client A acquires → count = 1.
3. Client B acquires → count = 0.
4. Client C requests but **must wait** since no slot is available.
5. When Client A finishes and releases → count = 1 → Client C proceeds.
6. This ensures at most **2 rebuilds** run concurrently, preventing overload.

## Benefits That I Got

- **Resource Protection**: Prevents the server from crashing under too many parallel rebuilds.
- **Fairness**: Requests are served in the order they arrive (FIFO).
- **Scalability**: Semaphore count can be tuned based on server capacity (e.g., increase to **3** when you upgrade hardware).
- **Predictability**: Clients experience a stable rebuild process without random failures.

## Conclusion

A **semaphore mechanism** is a simple yet powerful tool for concurrency control. By limiting access to resources, it ensures stability, fairness, and efficiency in high-load systems.

In the context of Jaxnote, applying a **counting semaphore** to the rebuild request queue ensures that your platform can scale gracefully while protecting the underlying infrastructure from overload.

It’s a classic example of using a decades-old operating systems concept to solve modern-day web infrastructure challenges.
