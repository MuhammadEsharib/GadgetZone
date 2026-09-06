import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResendClient(): Resend | null {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) return null;
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  phone: string;
  customerEmail?: string;
  address: string;
  city: string;
  notes?: string;
  paymentMethod: string;
  items: Array<{
    name: string;
    price: number;
    qty: number;
    image?: string;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt?: Date;
}

/**
 * Send ultra-professional email notification to store owner when a new order is placed
 */
export async function sendNewOrderEmail(order: OrderEmailData): Promise<boolean> {
  try {
    const resend = getResendClient();
    if (!resend) {
      console.warn("⚠️ [Resend] Skipping order email: RESEND_API_KEY is not set.");
      return false;
    }

    const ownerEmail = process.env["OWNER_EMAIL"] || "thegadgetzone70@gmail.com";
    const fromAddress = process.env["RESEND_FROM_EMAIL"] || "The Gadget Zone <onboarding@resend.dev>";
    const clientUrl = process.env["CLIENT_URL"] || "https://the-gadget-zone-pi.vercel.app";

    // Clean phone number for WhatsApp Link
    const cleanPhone = order.phone.replace(/[\s\-\(\)\+]/g, "");
    const waPhone = cleanPhone.startsWith("0") ? `92${cleanPhone.slice(1)}` : cleanPhone;
    const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(
      `Hello ${order.customerName}, this is regarding your order #${order.orderNumber} at The Gadget Zone.`
    )}`;

    const itemsHtml = order.items
      .map(
        (item) => `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 14px 12px; font-weight: 600; color: #0f172a; font-size: 14px;">
            ${item.name}
          </td>
          <td style="padding: 14px 12px; text-align: center; color: #475569; font-size: 14px; font-weight: 600;">
            ${item.qty}
          </td>
          <td style="padding: 14px 12px; text-align: right; color: #0f172a; font-size: 14px; font-weight: 700;">
            Rs. ${(item.price * item.qty).toLocaleString("en-US")}
          </td>
        </tr>
      `
      )
      .join("");

    const orderTime = (order.createdAt ? new Date(order.createdAt) : new Date()).toLocaleString(
      "en-PK",
      {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Karachi",
      }
    );

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order Alert - ${order.orderNumber}</title>
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f1f5f9; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" max-width="600" style="max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05); border:1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%); padding: 32px 24px; text-align: center;">
              <div style="display: inline-block; padding: 6px 14px; background: rgba(255,255,255,0.15); border-radius: 9999px; font-size: 12px; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                🚨 New Order Received
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">
                THE GADGET ZONE
              </h1>
              <p style="margin: 6px 0 0 0; color: #bfdbfe; font-size: 14px;">
                Order <strong style="color: #ffffff; background: rgba(0,0,0,0.2); padding: 2px 8px; border-radius: 4px;">#${order.orderNumber}</strong> • ${orderTime} PKT
              </p>
            </td>
          </tr>

          <!-- Quick Actions Bar -->
          <tr>
            <td style="background: #f8fafc; padding: 16px 24px; border-bottom: 1px solid #e2e8f0; text-align: center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding: 4px;">
                    <a href="${waLink}" target="_blank" style="display: inline-block; background: #22c55e; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; box-shadow: 0 2px 4px rgba(34,197,94,0.3);">
                      💬 Chat with Customer on WhatsApp
                    </a>
                    &nbsp;&nbsp;
                    <a href="${clientUrl}/admin" target="_blank" style="display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px;">
                      ⚙️ Open Admin Dashboard
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 24px;">

              <!-- Customer Details Card -->
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 12px 0; color: #1e3a8a; font-size: 15px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
                  👤 Customer & Delivery Info
                </h3>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="4" style="font-size: 14px;">
                  <tr>
                    <td style="color: #64748b; width: 130px; font-weight: 600;">Customer Name:</td>
                    <td style="color: #0f172a; font-weight: 700;">${order.customerName}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: 600;">Phone Number:</td>
                    <td style="color: #0f172a; font-weight: 700;">
                      <a href="tel:${order.phone}" style="color: #2563eb; text-decoration: none;">${order.phone}</a>
                    </td>
                  </tr>
                  ${
                    order.customerEmail
                      ? `
                  <tr>
                    <td style="color: #64748b; font-weight: 600;">Email:</td>
                    <td style="color: #0f172a;">${order.customerEmail}</td>
                  </tr>`
                      : ""
                  }
                  <tr>
                    <td style="color: #64748b; font-weight: 600;">Delivery Address:</td>
                    <td style="color: #0f172a; font-weight: 600;">${order.address}, ${order.city}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-weight: 600;">Payment Method:</td>
                    <td>
                      <span style="display: inline-block; background: #dbeafe; color: #1e40af; font-weight: 700; padding: 3px 10px; border-radius: 6px; font-size: 12px;">
                        ${order.paymentMethod}
                      </span>
                    </td>
                  </tr>
                  ${
                    order.notes
                      ? `
                  <tr>
                    <td style="color: #64748b; font-weight: 600;">Order Note:</td>
                    <td style="color: #d97706; font-style: italic; font-weight: 600;">"${order.notes}"</td>
                  </tr>`
                      : ""
                  }
                </table>
              </div>

              <!-- Ordered Items Table -->
              <h3 style="margin: 0 0 12px 0; color: #1e3a8a; font-size: 15px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
                📦 Ordered Items (${order.items.reduce((s, i) => s + i.qty, 0)})
              </h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; margin-bottom: 20px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background: #f1f5f9; color: #475569; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                    <th style="padding: 10px 12px; text-align: left; font-weight: 700;">Product</th>
                    <th style="padding: 10px 12px; text-align: center; font-weight: 700; width: 60px;">Qty</th>
                    <th style="padding: 10px 12px; text-align: right; font-weight: 700; width: 110px;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <!-- Financial Summary Box -->
              <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px 20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="4" style="font-size: 14px;">
                  <tr>
                    <td style="color: #64748b;">Subtotal:</td>
                    <td style="text-align: right; color: #0f172a; font-weight: 600;">Rs. ${order.subtotal.toLocaleString("en-US")}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b;">Shipping Fee:</td>
                    <td style="text-align: right; color: ${order.shipping === 0 ? "#16a34a" : "#0f172a"}; font-weight: 600;">
                      ${order.shipping === 0 ? "FREE" : `Rs. ${order.shipping.toLocaleString("en-US")}`}
                    </td>
                  </tr>
                  <tr style="border-top: 2px solid #e2e8f0;">
                    <td style="padding-top: 10px; color: #0f172a; font-size: 17px; font-weight: 800;">Total Payable:</td>
                    <td style="padding-top: 10px; text-align: right; color: #1e40af; font-size: 20px; font-weight: 900;">
                      Rs. ${order.total.toLocaleString("en-US")}
                    </td>
                  </tr>
                </table>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #0f172a; padding: 20px 24px; text-align: center; color: #94a3b8; font-size: 12px;">
              <p style="margin: 0 0 6px 0; color: #f8fafc; font-weight: 700; font-size: 13px;">
                The Gadget Zone Executive Automation System
              </p>
              <p style="margin: 0;">
                Karachi, Pakistan • WhatsApp: 0342 0024369 • info@thegadgetzone.pk
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const { error, data } = await resend.emails.send({
      from: fromAddress,
      to: [ownerEmail],
      subject: `🛒 New Order #${order.orderNumber} - Rs. ${order.total.toLocaleString("en-US")} from ${order.customerName}`,
      html,
    });

    if (error) {
      console.error("❌ [Resend Order Email Error]:", error);
      return false;
    }

    console.log(`✅ [Resend] Order notification email successfully dispatched to ${ownerEmail} (ID: ${data?.id})`);
    return true;
  } catch (err) {
    console.error("❌ [Resend Exception]:", err);
    return false;
  }
}

/**
 * Send notification email when someone submits the Contact Form
 */
export async function sendContactNotificationEmail(contact: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  try {
    const resend = getResendClient();
    if (!resend) return false;

    const ownerEmail = process.env["OWNER_EMAIL"] || "thegadgetzone70@gmail.com";
    const fromAddress = process.env["RESEND_FROM_EMAIL"] || "The Gadget Zone <onboarding@resend.dev>";

    const html = `
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; background: #f8fafc; padding: 20px; color: #0f172a;">
  <div style="max-width: 550px; margin: auto; background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 24px;">
    <h2 style="color: #1e40af; margin-top: 0;">📩 New Contact Message Received</h2>
    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
    <p><strong>Name:</strong> ${contact.name}</p>
    <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
    ${contact.phone ? `<p><strong>Phone:</strong> <a href="tel:${contact.phone}">${contact.phone}</a></p>` : ""}
    <p><strong>Subject:</strong> ${contact.subject}</p>
    <div style="background: #f1f5f9; padding: 14px; border-radius: 8px; margin-top: 12px;">
      <p style="margin: 0; font-style: italic;">"${contact.message}"</p>
    </div>
    <div style="margin-top: 20px; text-align: center;">
      <a href="mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.subject)}" style="display: inline-block; background: #1e40af; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold;">
        Reply to Customer
      </a>
    </div>
  </div>
</body>
</html>
    `;

    const { error, data } = await resend.emails.send({
      from: fromAddress,
      to: [ownerEmail],
      subject: `📩 New Contact Inquiry from ${contact.name} - ${contact.subject}`,
      html,
    });

    if (error) {
      console.error("❌ [Resend Contact Email Error]:", error);
      return false;
    }

    console.log(`✅ [Resend] Contact email dispatched to ${ownerEmail} (ID: ${data?.id})`);
    return true;
  } catch (err) {
    console.error("❌ [Resend Contact Exception]:", err);
    return false;
  }
}
