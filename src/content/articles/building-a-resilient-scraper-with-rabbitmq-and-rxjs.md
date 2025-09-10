---
slug: building-a-resilient-scraper-with-rabbitmq-and-rxjs
title: Building a Resilient Scraper with RabbitMQ and RxJS
date: 2025-09-10
excerpt: In this article, I’ll share how I built a resilient scraper system powered by RabbitMQ for message-driven orchestration and RxJS for concurrency control and backpressure handling.
readingTime: 10 min read
thumbnail: /images/articles/building-a-resilient-scraper-with-rabbitmq-and-rxjs.png
---

Web scraping at scale is a tricky business. A single scraper script running on one machine might work fine for small tasks, but once you’re handling dozens or even hundreds of concurrent jobs, you’ll quickly face challenges:

- Browser instances crashing.
- Target websites throttling or blocking requests.
- Floods of error logs spamming your monitoring channel.
- Queued messages looping endlessly when workers can’t process them.

In this article, I’ll share how I built a **resilient scraper system** powered by **RabbitMQ** for message-driven orchestration and **RxJS** for concurrency control and backpressure handling.

## The Architecture

Here’s the high-level workflow:

![Scraper Architecture Diagram](/images/articles/scraper-architecture.png)

1. **Server / Producer**

   - Produces scraping jobs to RabbitMQ.
   - Each job contains metadata: target URL, scraping config, client ID, etc.

2. **Scraper Service / Consumer**

   - Consumes messages from RabbitMQ.
   - Spawns multiple **Chromium browser instances** to run the scraping tasks.
   - Before starting, it checks VM/browser availability via an API.
   - If the system is busy or an error occurs, it requeues the message.

3. **Result Handling**

   - Once scraping finishes, results are pushed back to RabbitMQ.
   - Server consumes them and persists to the database.

This separation ensures **loose coupling** and **scalability**. The scraper service can run on multiple machines, consuming from the same queue.

## The Challenge

Initially, this setup worked fine. But as the system scaled, problems emerged:

- **UnavailableBrowser Flood**
  When browser instances were maxed out, RabbitMQ kept sending more jobs, which instantly failed and requeued. Logs exploded with error spam.

- **Requeue Loops**
  If a job failed due to a transient error, it could get stuck in an infinite requeue cycle.

- **Concurrency Pressure**
  Running too many browser instances at once caused memory spikes and system crashes.

Clearly, raw consumers weren’t enough, we needed **smarter concurrency control**.

## The RxJS Solution

RxJS (Reactive Extensions for JavaScript) is a library for handling asynchronous data streams. In this scraper system, I used RxJS to:

- Control **concurrency limits** (number of jobs running at the same time).
- Implement **backoff strategies** when errors repeat.
- Throttle logs to avoid spamming.
- Pause consumption temporarily when resources are exhausted.

## Implementation Walkthrough

### 1. Consuming Messages as a Stream

Instead of handling RabbitMQ messages in a simple callback, I converted them into an RxJS observable stream:

```ts
import { fromEvent } from "rxjs";
import { mergeMap, catchError } from "rxjs/operators";

// Assume channel is RabbitMQ channel
const message$ = fromEvent(channel, "message");

message$
  .pipe(
    mergeMap(async (msg: any) => {
      const job = JSON.parse(msg.content.toString());
      await processScrapeJob(job);
      channel.ack(msg);
    })
  )
  .subscribe();
```

Here, **mergeMap** controls **concurrent execution**.

### 2. Limiting Concurrency

If I only want **5 scraping jobs running at a time**, I set the concurrency parameter:

```ts
mergeMap((job) => processScrapeJob(job), 5);
```

This prevents overload by ensuring at most **5 browser instances** are active simultaneously.

### 3. Handling Repeated Errors with Backoff

If I hit repeated **"UnavailableBrowser"** errors, I don’t want to instantly retry and flood logs. Instead, I pause consumption for 5 minutes:

```ts
import { timer } from "rxjs";

let errorCount = 0;

function handleError(err: Error) {
  if (err.message === "UnavailableBrowser") {
    errorCount++;
    if (errorCount >= 3) {
      console.log("Pausing queue for 5 minutes...");
      channel.pause(); // pseudo-code
      timer(300000).subscribe(() => channel.resume());
      errorCount = 0;
    }
  }
}
```

This introduces a **circuit-breaker pattern** using RxJS timers.

### 4. Throttling Error Logs

To avoid flooding Mattermost with the same error:

```ts
import { throttleTime } from "rxjs/operators";

message$
  .pipe(
    catchError((err) => {
      errorStream.next(err); // push error into a separate stream
      throw err;
    })
  )
  .subscribe();

errorStream.pipe(throttleTime(60000)).subscribe((err) => {
  sendToMattermost(err); // log at most once per minute
});
```

This keeps monitoring useful without drowning in noise.

## Results

After applying RxJS to manage the flow:

- **Stability improved**: No more crashes from overload.
- **Logs became meaningful**: Error spam was eliminated.
- **Jobs were processed fairly**: Each client’s tasks got their turn, with backpressure ensuring fairness.
- **Easier scaling**: Adding more scraper nodes was straightforward since RabbitMQ handled distribution.

## Lessons Learned

1. **Message queues alone aren’t enough**, without concurrency control, they can flood your system.
2. **RxJS is a perfect fit** for managing async concurrency and backpressure in Node.js services.
3. **Backoff strategies matter**, sometimes the right move is to pause, not retry endlessly.
4. **Error monitoring needs throttling**, meaningful alerts beat noisy spam every time.

## Conclusion

Building a resilient scraper isn’t just about parsing HTML, it’s about managing concurrency, resource limits, and error handling at scale.

By combining **RabbitMQ** for orchestration and **RxJS** for concurrency/backpressure, I was able to build a scraper system that’s not only functional, but robust under real-world load.

If you’re building any **high-volume async service** (not just scraping), this approach can save you from the classic pitfalls of message storms, overload, and endless retries.
