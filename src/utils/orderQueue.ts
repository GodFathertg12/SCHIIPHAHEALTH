// src/utils/orderQueue.ts

const STORAGE_KEY = "orderQueue";

/**
 * Save a failed order to localStorage for later retry.
 */
export function saveOrderToQueue(orderData: any) {
  if (typeof window === "undefined") return;

  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  // prevent duplicates by checking reference
  if (existing.some((o: any) => o.reference === orderData.reference)) {
    console.log(`⚠️ Order [${orderData.reference}] already in queue`);
    return;
  }

  existing.push(orderData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  console.log(`🧩 Saved order [${orderData.reference}] to queue`);
}

/**
 * Try resending any orders stored in localStorage to your API.
 */
export async function resendQueuedOrders() {
  if (typeof window === "undefined") return;

  const queue = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  if (queue.length === 0) return;

  console.log(`🔁 Retrying ${queue.length} queued order(s)...`);

  const stillPending: any[] = [];

  for (const order of queue) {
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to save order");

      console.log(`✅ Successfully resent [${order.reference}]`);
    } catch (err: any) {
      console.warn(`⚠️ Retry failed for [${order.reference}] → ${err.message}`);
      stillPending.push(order);
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stillPending));
}

/**
 * Start a background worker that retries automatically.
 */
export function startOrderQueueWorker() {
  if (typeof window === "undefined") return;

  // Try immediately on startup
  resendQueuedOrders();

  // Retry every 30 seconds
  setInterval(resendQueuedOrders, 30000);

  // Also retry when the user comes back online
  window.addEventListener("online", resendQueuedOrders);

  console.log("🚀 Order queue worker started");
}
