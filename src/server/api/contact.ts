import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const FROM = "The gadget zone <onboarding@resend.dev>";
const redis = Redis.fromEnv();
const ratelimit = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "15 m") });

function escapeHtml(value: string) {
  return String(value).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]!));
}

export async function POST({ request }: { request: Request }) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const { success } = await ratelimit.limit(`contact:${ip}`);
  if (!success) return Response.json({ error: "Too many messages. Please try again later." }, { status: 429 });

  const body = await request.json();
  const { name, email, message, turnstileToken, website } = body || {};

  if (website) return Response.json({ error: "Bot detected" }, { status: 400 });
  if (!name?.trim() ||!email?.trim() ||!message?.trim() ||!turnstileToken) {
    return Response.json({ error: "Please provide valid contact details and a message." }, { status: 400 });
  }

  const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: turnstileToken, remoteip: ip }),
  }).then(r => r.json());

  if (!verification.success) return Response.json({ error: "Captcha verification failed." }, { status: 400 });

  const resend = new Resend(process.env.RESEND_API_KEY);
  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br />");

  await Promise.all([
    resend.emails.send({ from: FROM, to: process.env.OWNER_EMAIL!, replyTo: email, subject: `New Query from ${name}`, html: `<h2>New contact query</h2><p><b>Name:</b> ${safeName}</p><p><b>Email:</b> ${safeEmail}</p><p>${safeMessage}</p>` }),
    resend.emails.send({ from: FROM, to: email, subject: "We got your message - The Gadget Zone", html: `<p>Hi ${safeName},</p><p>Thanks for reaching out to The Gadget Zone. We received your message and will reply shortly.</p>` }),
  ]);

  return Response.json({ message: "Your message was sent successfully." });
}