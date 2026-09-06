import { type TrackingStep } from "../models/Order.js";

export function buildTrackingTimeline(status: string, createdAt?: Date | string): TrackingStep[] {
  const currentStatus = status || "Pending Processing";
  const dateStr = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Recent";

  return [
    {
      title: "Order Placed & Registered",
      description: `Order successfully logged into database. (${dateStr})`,
      time: dateStr,
      completed: true,
      current: currentStatus === "Pending Processing",
    },
    {
      title: "Quality Check & Packing",
      description: "Inspected at Karachi fulfillment hub and packed with 7-day warranty seal.",
      completed:
        currentStatus === "Confirmed" ||
        currentStatus === "Dispatched" ||
        currentStatus === "Out for Delivery" ||
        currentStatus === "Delivered",
      current: currentStatus === "Confirmed",
    },
    {
      title: "Dispatched / In Transit",
      description: "Handed over to courier express logistics partner for doorstep dispatch.",
      completed:
        currentStatus === "Dispatched" ||
        currentStatus === "Out for Delivery" ||
        currentStatus === "Delivered",
      current: currentStatus === "Dispatched",
    },
    {
      title: "Out for Delivery",
      description: "Rider is en route to your specified address in your city.",
      completed: currentStatus === "Out for Delivery" || currentStatus === "Delivered",
      current: currentStatus === "Out for Delivery",
    },
    {
      title: "Delivered",
      description: "Package received by customer. Payment recorded.",
      completed: currentStatus === "Delivered",
      current: currentStatus === "Delivered",
    },
  ];
}
