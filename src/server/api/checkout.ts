import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const FROM = "The gadget zone <onboarding@resend.dev>";

export const POST = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    let ip = "unknown";
    try {
      const request = getRequest();
      if (request) {
        ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
      }
    } catch (e) {
      console.warn("Could not retrieve request object", e);
    }

    // Rate limiting if Upstash Redis is configured
    if (process.env["UPSTASH_REDIS_REST_URL"] && process.env["UPSTASH_REDIS_REST_TOKEN"]) {
      try {
        const redis = Redis.fromEnv();
        const ratelimit = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, "15 m") });
        const { success } = await ratelimit.limit(`checkout:${ip}`);
        if (!success) {
          return { error: "Too many order requests. Please try again later." };
        }
      } catch (e) {
        console.warn("Rate limit check bypassed:", e);
      }
    }

    const { customerName, customerEmail, phone, address, city, paymentMethod, items, total, turnstileToken } = data;

    if (!customerName?.trim() || !customerEmail?.trim() || !phone?.trim() || !address?.trim() || !items?.length) {
      return { error: "Please complete all required shipping fields and select items." };
    }

    // Turnstile Captcha verification if secret key is present
    if (process.env["TURNSTILE_SECRET_KEY"] && turnstileToken) {
      try {
        const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: process.env["TURNSTILE_SECRET_KEY"],
            response: turnstileToken,
            remoteip: ip,
          }),
        }).then((r) => r.json());

        if (!verification.success) {
          return { error: "Captcha verification failed." };
        }
      } catch (e) {
        console.warn("Turnstile check skipped:", e);
      }
    }

    // Generate random order number
    const orderNum = `GZ-${Math.floor(1000 + Math.random() * 9000)}`;

    // Build WhatsApp order confirmation link
    const itemDetails = items.map((i: any) => `• ${i.name} (x${i.qty}) - Rs. ${i.price * i.qty}`).join("%0A");
    const waText = `Hi! I placed an order on The Gadget Zone.%0A%0A*Order #:* ${orderNum}%0A*Name:* ${encodeURIComponent(customerName)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Address:* ${encodeURIComponent(address)}, ${encodeURIComponent(city)}%0A*Payment:* ${encodeURIComponent(paymentMethod)}%0A*Total:* Rs. ${total}%0A%0A*Items:*%0A${itemDetails}`;
    const waLink = `https://wa.me/923420024369?text=${waText}`;

    // Send confirmation email via Resend if key exists
    if (process.env["RESEND_API_KEY"]) {
      try {
        const resend = new Resend(process.env["RESEND_API_KEY"]);
        const ownerEmail = process.env["OWNER_EMAIL"] || "support@thegadgetzone.pk";
        const emailHtml = `
          <h2>New Order Received (${orderNum})</h2>
          <p><b>Customer:</b> ${customerName}</p>
          <p><b>Email:</b> ${customerEmail}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Address:</b> ${address}, ${city}</p>
          <p><b>Payment Method:</b> ${paymentMethod}</p>
          <p><b>Total Amount:</b> Rs. ${total}</p>
          <h3>Items:</h3>
          <ul>${items.map((i: any) => `<li>${i.name} x ${i.qty} — Rs. ${i.price * i.qty}</li>`).join("")}</ul>
        `;

        await resend.emails.send({
          from: FROM,
          to: ownerEmail,
          subject: `New Order #${orderNum} from ${customerName}`,
          html: emailHtml,
        });
      } catch (err) {
        console.error("Failed to send order notification email:", err);
      }
    }

    return {
      orderNumber: orderNum,
      waLink,
      message: "Order placed successfully.",
    };
  });
