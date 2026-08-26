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
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      analytics: true,
    });
    const { success } = await limiter.limit(`contact:${ip}`);
    if (!success) return json(res, 429, { error: "Too many messages. Please try again later." });

    const { name, email, message, turnstileToken, website } = req.body || {};
    if (typeof website === "string" && website.trim()) {
      console.log("Bot detected on contact submission", { ip });
      return json(res, 400, { error: "Bot detected" });
    }
    if (
      typeof name !== "string" ||
      name.trim().length < 2 ||
      name.length > 100 ||
      typeof email !== "string" ||
      !/^\S+@\S+\.\S+$/.test(email) ||
      email.length > 254 ||
      typeof message !== "string" ||
      message.trim().length < 10 ||
      message.length > 5000 ||
      typeof turnstileToken !== "string" ||
      !turnstileToken
    ) {
      return json(res, 400, { error: "Please provide valid contact details and a message." });
    }

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

    console.log("Contact submission", { ip, email, name });
    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br />");
    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: process.env.OWNER_EMAIL,
        replyTo: email.trim(),
        subject: `New Query from ${name.trim()}`,
        html: `<h2>New contact query</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p>${safeMessage}</p>`,
      }),
      resend.emails.send({
        from: FROM,
        to: email.trim(),
        subject: "We got your message - The Gadget Zone",
        html: `<p>Hi ${safeName},</p><p>Thanks for reaching out to The Gadget Zone. We received your message and will reply shortly.</p>`,
      }),
    ]);
    return json(res, 200, { message: "Your message was sent successfully." });
  } catch (error) {
    console.error("Contact API error", { ip, error });
    return json(res, 500, { error: "We could not send your message. Please try again." });
  }
}
