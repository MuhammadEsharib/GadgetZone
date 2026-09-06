import { Request, Response } from "express";
import { OrderModel } from "../models/Order.js";
import { buildTrackingTimeline } from "../utils/timeline.js";

// Helper: clean phone number
function cleanPhone(phone: string): string {
  return phone.replace(/[\s\-\(\)\+]/g, "").trim();
}

/**
 * POST /api/orders - Create a new order
 */
export async function createOrder(req: Request, res: Response): Promise<void> {
  try {
    const {
      customerName,
      phone,
      customerEmail = "",
      address,
      city = "Karachi",
      notes = "",
      paymentMethod = "cod",
      items = [],
    } = req.body;

    if (!customerName || customerName.trim().length < 2) {
      res.status(400).json({ error: "Please provide a valid customer name." });
      return;
    }
    if (!phone || phone.trim().length < 8) {
      res.status(400).json({ error: "Please provide a valid active phone number." });
      return;
    }
    if (!address || address.trim().length < 5) {
      res.status(400).json({ error: "Please provide your complete delivery street address." });
      return;
    }
    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "Cart is empty. Add items before placing an order." });
      return;
    }

    const parsedItems = items.map((i: any) => ({
      id: i.id ? Number(i.id) : undefined,
      name: String(i.name || "Gadget Item"),
      price: Math.round(Number(i.price) || 0),
      qty: Math.max(1, Number(i.qty) || 1),
      image: i.image,
    }));

    const subtotal = parsedItems.reduce((sum: number, item: any) => sum + item.price * item.qty, 0);
    const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 299;
    const total = subtotal + shipping;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `GZ-${randomSuffix}`;

    const paymentLabel =
      paymentMethod === "easypaisa"
        ? "EasyPaisa / JazzCash"
        : paymentMethod === "bank"
          ? "Direct Bank Transfer"
          : "Cash on Delivery (COD)";

    const trackingSteps = buildTrackingTimeline("Pending Processing", new Date());

    const orderDoc = await OrderModel.create({
      orderNumber,
      customerName: customerName.trim(),
      phone: phone.trim(),
      customerEmail: customerEmail.trim(),
      address: address.trim(),
      city: city.trim(),
      notes: notes.trim(),
      paymentMethod: paymentLabel,
      items: parsedItems,
      subtotal,
      shipping,
      total,
      status: "Pending Processing",
      trackingSteps,
      ip: req.ip || "unknown",
    });

    // Build WhatsApp checkout link
    const ownerWa = process.env["OWNER_WHATSAPP_NUMBER"] || "923420024369";
    const itemDetails = parsedItems
      .map((i: any) => `• ${i.name} (x${i.qty}) - Rs. ${(i.price * i.qty).toLocaleString("en-US")}`)
      .join("%0A");

    const waText = `*🛒 NEW ORDER: ${orderNumber}*%0A%0A*👤 Customer:* ${encodeURIComponent(orderDoc.customerName)}%0A*📞 Phone:* ${encodeURIComponent(orderDoc.phone)}%0A*📍 Address:* ${encodeURIComponent(orderDoc.address)}, ${encodeURIComponent(orderDoc.city)}%0A*💳 Payment Method:* ${encodeURIComponent(paymentLabel)}%0A*💰 Total Amount:* Rs. ${orderDoc.total.toLocaleString("en-US")}%0A%0A*📦 Ordered Items:*%0A${itemDetails}${orderDoc.notes ? `%0A%0A*📝 Special Note:* ${encodeURIComponent(orderDoc.notes)}` : ""}`;
    const waLink = `https://wa.me/${ownerWa}?text=${waText}`;

    res.status(201).json({
      success: true,
      orderNumber,
      order: orderDoc,
      waLink,
      message: "Order created successfully in MongoDB Atlas.",
    });
  } catch (error) {
    console.error("❌ [Create Order Error]:", error);
    res.status(500).json({ error: "Failed to create order. Please try again." });
  }
}

/**
 * GET /api/orders - List all orders (Admin)
 */
export async function listOrders(req: Request, res: Response): Promise<void> {
  try {
    const limit = Number(req.query["limit"]) || 100;
    const orders = await OrderModel.find().sort({ createdAt: -1 }).limit(limit).lean();
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error("❌ [List Orders Error]:", error);
    res.status(500).json({ error: "Failed to retrieve orders." });
  }
}

/**
 * GET /api/orders/track - Track order by query (ID or Phone)
 */
export async function trackOrder(req: Request, res: Response): Promise<void> {
  try {
    const query = String(req.query["query"] || "").trim();
    if (!query) {
      res.status(400).json({ error: "Please provide an order number or phone number." });
      return;
    }

    const cleanId = query.toUpperCase();
    const normalizedPhone = cleanPhone(query);

    const orders = await OrderModel.find({
      $or: [
        { orderNumber: cleanId },
        { phone: { $regex: normalizedPhone, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error("❌ [Track Order Error]:", error);
    res.status(500).json({ error: "Error tracking order." });
  }
}

/**
 * PATCH /api/orders/:orderNumber/status - Update order status
 */
export async function updateOrderStatus(req: Request, res: Response): Promise<void> {
  try {
    const { orderNumber } = req.params;
    const { status } = req.body;

    if (!orderNumber || !status) {
      res.status(400).json({ error: "Order number and status are required." });
      return;
    }

    const existing = await OrderModel.findOne({ orderNumber });
    if (!existing) {
      res.status(404).json({ error: `Order #${orderNumber} not found.` });
      return;
    }

    const trackingSteps = buildTrackingTimeline(status, existing.createdAt);

    const updated = await OrderModel.findOneAndUpdate(
      { orderNumber },
      { status, trackingSteps },
      { new: true }
    );

    res.json({ success: true, order: updated, message: `Status updated to ${status}.` });
  } catch (error) {
    console.error("❌ [Update Status Error]:", error);
    res.status(500).json({ error: "Failed to update status." });
  }
}
