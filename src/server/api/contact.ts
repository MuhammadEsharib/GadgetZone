import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getRequest } from "@tanstack/react-start/server";

const FROM = "The gadget zone <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return String(value).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[c]!,
  );
}

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

    if (process.env["UPSTASH_REDIS_REST_URL"] && process.env["UPSTASH_REDIS_REST_TOKEN"]) {
      try {
        const redis = Redis.fromEnv();
        const ratelimit = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "15 m") });
        const { success } = await ratelimit.limit(`contact:${ip}`);
        if (!success) {
          return { error: "Too many messages. Please try again later." };
        }
      } catch (e) {
        console.warn("Rate limit check bypassed:", e);
      }
    }

    const { name, email, message, turnstileToken, website } = data;

    if (website) {
      return { error: "Bot detected" };
    }
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return { error: "Please provide valid contact details and a message." };
    }

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
        console.warn("Turnstile verification check skipped:", e);
      }
    }

    if (process.env["RESEND_API_KEY"]) {
      try {
        const resend = new Resend(process.env["RESEND_API_KEY"]);
        const safeName = escapeHtml(name.trim());
        const safeEmail = escapeHtml(email.trim());
        const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br />");
        const ownerEmail = process.env["OWNER_EMAIL"] || "support@thegadgetzone.pk";

        await Promise.all([
          resend.emails.send({
            from: FROM,
            to: ownerEmail,
            replyTo: email,
            subject: `New Query from ${safeName}`,
            html: `<h2>New contact query</h2><p><b>Name:</b> ${safeName}</p><p><b>Email:</b> ${safeEmail}</p><p>${safeMessage}</p>`,
          }),
          resend.emails.send({
            from: FROM,
            to: email,
            subject: "We got your message - The Gadget Zone",
            html: `<p>Hi ${safeName},</p><p>Thanks for reaching out to The Gadget Zone. We received your message and will reply shortly.</p>`,
          }),
        ]);
      } catch (err) {
        console.error("Failed to send email via Resend:", err);
      }
    }

    return { message: "Your message was sent successfully." };
  });

