import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const FROM = "The gadget zone <onboarding@resend.dev>";

function getIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown"
  );
}

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character],
  );
}

function json(res, status, body) {
  res.status(status).json(body);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  const ip = getIp(req);
  try {
    const limiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(3, "10 m"),
      analytics: true,
    });
    const { success } = await limiter.limit(`checkout:${ip}`);
    if (!success)
      return json(res, 429, { error: "Too many checkout attempts. Please try again later." });

    const {
      items,
      customerName,
      customerEmail,
      phone,
      address,
      city,
      paymentMethod,
      total,
      userId,
      turnstileToken,
    } = req.body || {};
    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      items.length > 50 ||
      typeof customerName !== "string" ||
      customerName.trim().length < 2 ||
      customerName.length > 100 ||
      typeof customerEmail !== "string" ||
      !/^\S+@\S+\.\S+$/.test(customerEmail) ||
      customerEmail.length > 254 ||
      typeof phone !== "string" ||
      phone.trim().length < 7 ||
      phone.length > 30 ||
      typeof address !== "string" ||
      address.trim().length < 5 ||
      address.length > 300 ||
      typeof city !== "string" ||
      city.length > 80 ||
      !["cod", "bank", "easypaisa"].includes(paymentMethod) ||
      typeof turnstileToken !== "string" ||
      !turnstileToken
    ) {
      return json(res, 400, { error: "Please provide valid checkout details." });
    }

    const validItems = items.every(
      (item) =>
        item &&
        typeof item.name === "string" &&
        item.name.length <= 200 &&
        Number.isInteger(item.qty) &&
        item.qty > 0 &&
        item.qty <= 99 &&
        Number.isFinite(item.price) &&
        item.price >= 0,
    );
    if (!validItems) return json(res, 400, { error: "One or more order items are invalid." });

    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
        remoteip: ip,
      }),
    });
    const verificationResult = await verification.json();
    if (!verification.ok || !verificationResult.success)
      return json(res, 400, { error: "Captcha verification failed." });

    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = subtotal > 5000 ? 0 : 299;
    const serverTotal = subtotal + shipping;
    if (!Number.isFinite(total) || Math.abs(serverTotal - total) > 0.01)
      return json(res, 400, { error: "Order total could not be verified." });

    const orderNumber = `GZ-${Date.now().toString(36).toUpperCase()}`;
    const orderLines = items
      .map((item) => `${item.name} x${item.qty} - Rs. ${item.price * item.qty}`)
      .join("\n");
    const whatsappText = `New order ${orderNumber}\nCustomer: ${customerName}\nPhone: ${phone}\nEmail: ${customerEmail}\nAddress: ${address}, ${city}\nPayment: ${paymentMethod}\n${orderLines}\nTotal: Rs. ${serverTotal}`;
    const whatsappUrl = `https://wa.me/${process.env.OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;
    const safeLines = escapeHtml(orderLines).replace(/\n/g, "<br />");
    const safeName = escapeHtml(customerName.trim());
    const emailHtml = `<h2>Order ${orderNumber}</h2><p><strong>Customer:</strong> ${safeName}<br /><strong>Phone:</strong> ${escapeHtml(phone)}<br /><strong>Address:</strong> ${escapeHtml(address)}, ${escapeHtml(city)}<br /><strong>Payment:</strong> ${escapeHtml(paymentMethod)}</p><p>${safeLines}</p><p><strong>Total: Rs. ${serverTotal}</strong></p><p><a href="${whatsappUrl}">Open WhatsApp order</a></p>`;

    console.log("Checkout order", {
      ip,
      orderNumber,
      userId: userId || null,
      customerEmail,
      total: serverTotal,
    });
    const resend = new Resend(process.env.RESEND_API_KEY);
    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: process.env.OWNER_EMAIL,
        subject: `New Order: Rs ${serverTotal}`,
        html: emailHtml,
      }),
      resend.emails.send({
        from: FROM,
        to: customerEmail.trim(),
        subject: "Order Received - The Gadget Zone",
        html: `<p>Hi ${safeName},</p><p>Thanks for your order. We are processing it now.</p>${emailHtml}`,
      }),
    ]);
    return json(res, 200, {
      success: true,
      message: "Order placed successfully.",
      orderNumber,
      waLink: whatsappUrl,
    });
  } catch (error) {
    console.error("Checkout API error", { ip, error });
    return json(res, 500, { error: "We could not place your order. Please try again." });
  }
}
