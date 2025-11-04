// src/components/OrderQueueWorker.tsx
"use client";
import { useEffect } from "react";
import { startOrderQueueWorker } from "@/utils/orderQueue";

export default function OrderQueueWorker() {
  useEffect(() => {
    startOrderQueueWorker();
  }, []);
  return null;
}
