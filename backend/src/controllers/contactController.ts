import { Request, Response } from "express";
import { ContactMessageModel } from "../models/ContactMessage.js";
import { SubscriberModel } from "../models/Subscriber.js";

/**
 * POST /api/contact - Submit contact message
 */
export async function submitContact(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, phone = "", subject = "Customer Query", message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ error: "Please provide your name, email, and message." });
      return;
    }

    const doc = await ContactMessageModel.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
      status: "New",
    });

    res.status(201).json({
      success: true,
      message: "Your message was sent successfully.",
      ticketId: doc._id,
    });
  } catch (error) {
    console.error("❌ [Contact Submit Error]:", error);
    res.status(500).json({ error: "Failed to send message. Please try again." });
  }
}

/**
 * POST /api/contact/subscribe - Newsletter subscription
 */
export async function subscribeNewsletter(req: Request, res: Response): Promise<void> {
  try {
    const { email, phone, source = "footer_newsletter" } = req.body;

    if (!email && !phone) {
      res.status(400).json({ error: "Please provide an email or phone number." });
      return;
    }

    const filter = email ? { email: email.trim().toLowerCase() } : { phone: phone.trim() };

    await SubscriberModel.findOneAndUpdate(
      filter,
      {
        ...(email ? { email: email.trim().toLowerCase() } : {}),
        ...(phone ? { phone: phone.trim() } : {}),
        source,
        active: true,
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: "Thank you for subscribing to The Gadget Zone VIP deals!",
    });
  } catch (error) {
    console.error("❌ [Subscribe Error]:", error);
    res.status(500).json({ error: "Failed to subscribe." });
  }
}
