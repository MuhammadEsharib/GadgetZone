# Gadget Zone Showcase

Create a premium frontend demo homepage for an e-commerce gadget store called The Gadget Zone.

IMPORTANT: This is ONLY a client demo/prototype. Do NOT build a complete ecommerce system, backend, database, authentication, payment system, admin panel, real checkout, or advanced functionality.

The goal is simply to create a beautiful, high-quality ecommerce homepage that I can show to the client.

Use the uploaded The Gadget Zone logo as the brand/logo reference.

BRAND

The Gadget Zone

Tagline:

Enhancing your life style

Phone:
0342 0024369
0332 2205842

Location:
Shop #B-172, Alhaseeb Residency, Quetta Town, Sector 18-A, Gulzar-e-Hijri, Scheme 33, Karachi

Contact:
Usama Bin Abid

Website:
Thegadgetzone.pk

DESIGN DIRECTION

Make the website look like a premium international technology/e-commerce brand, not a basic local shop website.

The design should be:

Modern

Clean

Premium

Minimal

Professional

High-converting

Responsive

Visually impressive

Use high-quality gadget/product stock images.

Do not overcomplicate the website.

COLOR PALETTE

Follow the uploaded logo.

Main colors:

Royal/Dark Blue

Sky Blue

White

Small Yellow accents

The hero section should have a beautiful sky-blue background inspired by the logo.

The rest of the website should primarily use white/light backgrounds.

Use royal blue for buttons, navigation elements and important accents.

Use yellow only as a small highlight.

NAVBAR

Create a clean premium navbar.

Left:

The Gadget Zone logo

Center/right navigation:

Home

Shop

Categories

About

Contact

Right side:

Search icon

Wishlist icon

Cart icon

Keep the navbar sticky.

On mobile, use a hamburger menu.

HERO SECTION

Create a large premium hero section immediately below the navbar.

Background:

Sky blue, inspired by the uploaded logo.

Left side:

Large heading:

Upgrade Your World With Smarter Gadgets

Supporting text:

Discover the latest gadgets and smart technology designed to make your everyday life easier.

Buttons:

Shop Now

Explore Gadgets

Right side:

Create an attractive composition using high-quality stock images of:

Wireless earbuds

Smartwatch

Headphones

Smartphone

Bluetooth speaker

Make the images look like premium commercial product photography.

Add subtle shadows and small blue/yellow decorative elements.

Keep the hero clean and spacious.

## Production Contact and Checkout API

The secure serverless handlers live in `api/contact.js` and `api/checkout.js`. The browser only calls `/api/contact` and `/api/checkout`; secret keys remain server-side. The reusable UI integrations are `src/components/ContactForm.tsx` and `src/components/CheckoutButton.tsx`.

### Environment variables

Copy `.env.example` to `.env.local` for local development, then add the same values in Vercel under **Project Settings > Environment Variables**. Never commit `.env.local` or secret values.

Required variables:

```text
RESEND_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
TURNSTILE_SECRET_KEY=
VITE_TURNSTILE_SITE_KEY=
OWNER_WHATSAPP_NUMBER=92XXXXXXXXXX
OWNER_EMAIL=thegadgetzone70@gmail.com
```

### Provider setup

1. **Upstash Redis:** Create a free Redis database at [console.upstash.com](https://console.upstash.com), choose the region closest to the app, and copy its REST URL and REST token into Vercel.
2. **Cloudflare Turnstile:** In the Cloudflare dashboard, open **Turnstile > Add site**, enter the deployed domain, and choose Managed mode. Add the site key as `VITE_TURNSTILE_SITE_KEY` and the secret key as `TURNSTILE_SECRET_KEY`. For local development, include `localhost` in the allowed hostnames.
3. **Resend:** Create an account at [resend.com](https://resend.com), create an API key, and add it as `RESEND_API_KEY`. The current sender is Resend's onboarding sender; verify a domain in Resend before using a custom production sender.
4. **WhatsApp:** Set `OWNER_WHATSAPP_NUMBER` to the international digits-only number, including the country code and excluding `+`, spaces, or dashes.

### Deploy on Vercel

1. Push the project to the Git provider connected to Vercel and import it as a Vite project.
2. Add all variables above in **Project Settings > Environment Variables** for Production, Preview, and Development as needed.
3. Redeploy after changing variables. Vercel automatically exposes files in `/api` as serverless endpoints.
4. Test a contact submission and a checkout with the deployed URL. Check Vercel function logs if an email provider or rate limiter rejects a request.

### CheckoutButton example

The checkout route already supplies the complete customer and cart payload. A standalone cart can use the component like this:

```tsx
<CheckoutButton
  items={cartItems.map((item) => ({
    name: item.product.name,
    qty: item.qty,
    price: item.product.price,
  }))}
  customerName={name}
  customerEmail={email}
  phone={phone}
  address={address}
  city={city}
  paymentMethod="cod"
  total={total}
  turnstileToken={turnstileToken}
  onSuccess={(orderNumber) => console.log(orderNumber)}
/>
```

LIVE VISITOR DEMO

Add a small floating notification somewhere around the hero/product area:

● 87 people are viewing this store right now

This number should randomly change between approximately 50 and 150 every few seconds.

This is only a visual demo. No backend or real analytics.

Make it subtle and professional.

TRENDING PRODUCTS

Below the hero create:

Trending Gadgets

Subtitle:

Explore our most popular gadgets

Show 8 product cards only.

Use realistic gadget products such as:

Wireless Pro Earbuds

Smart Watch Series 9

Premium Bluetooth Speaker

Wireless Gaming Headset

Fast USB-C Charger

Magnetic Power Bank

Smart Fitness Watch

Portable Mini Speaker

Use attractive stock/product images.

Each card should contain:

Product image

Product name

Star rating

Price

Old price where appropriate

Small discount badge

Add to Cart button

Buy Now button

Example:

Wireless Pro Earbuds

★★★★★ 4.8

Rs. 9,999

Rs. 7,999

20% OFF

PRODUCT CARD INTERACTION

Keep this simple.

When the user clicks a product image/card, open a simple product detail modal or section showing:

Larger product image

2–3 additional images

Product name

Rating

Price

Short description

Quantity

Add to Cart

Buy Now

No backend required.

When Add to Cart is clicked:

Show a small notification:

Added to cart

and update the cart number in the navbar.

When Buy Now is clicked:

Just show a simple demo message/modal:

Ready to Checkout

with a button:

Continue

No real checkout is required.

SEE ALL PRODUCTS

After the 8 products, add a clean section/button:

See All Products →

It does NOT need to lead to a fully built products system.

For the demo, clicking it can show a simple message:

Full product catalog coming soon.

SHOP BY CATEGORY

Create a visually attractive section:

Shop By Category

Use 6 categories:

Earbuds

Smart Watches

Headphones

Speakers

Power Banks

Mobile Accessories

Use large premium stock images.

Make the cards visually impressive with hover effects.

PROMOTIONAL BANNER

Add one large premium banner after categories.

Text:

Technology That Fits Your Lifestyle

Supporting text:

Discover smart gadgets made for everyday life.

Button:

Shop Now

Use blue/sky-blue styling with gadget imagery.

WHY THE GADGET ZONE

Add a simple 4-column section:

Why Choose The Gadget Zone?

Quality Gadgets
Carefully selected technology products.

Great Prices
Competitive prices on everyday gadgets.

Fast Delivery
Convenient delivery across Pakistan.

Customer Support
We're here when you need us.

Use simple modern icons.

SOCIAL / CONTACT CTA

Near the bottom create a premium CTA:

Stay Connected With The Gadget Zone

Follow us for the latest gadgets, deals and updates.

Buttons:

Instagram

TikTok

WhatsApp

Use the actual provided social links where appropriate.

WhatsApp contact:

0342 0024369

FOOTER

Create a simple premium footer.

Include:

The Gadget Zone

Enhancing your life style

Quick links:

Home | Shop | Categories | About | Contact

Contact:

0342 0024369
0332 2205842

Address:

Shop #B-172, Alhaseeb Residency, Quetta Town, Sector 18-A, Gulzar-e-Hijri, Scheme 33, Karachi

Social icons:

Instagram
TikTok
YouTube

Copyright:

© 2026 The Gadget Zone. All Rights Reserved.

IMPORTANT DESIGN REQUIREMENTS

Do NOT create a huge complicated website.

This is a client demo, so focus heavily on:

Excellent homepage design

Premium visual appearance

Beautiful product cards

High-quality images

Good spacing

Professional typography

Responsive design

Smooth hover effects

Working Add to Cart demo

Working Buy Now demo

Product detail popup/modal

Fake live visitor counter

Do NOT build:

Backend

Database

Authentication

Payment gateway

Admin dashboard

Real orders

Real inventory

Real checkout

Complex product filtering

Complex search system

Customer accounts

Use only mock/demo data.

Keep the implementation lightweight so it can be generated comfortably using Lovable's free plan.

The final result should look like a real premium ecommerce website homepage, while keeping the actual functionality limited to a simple frontend demo.

Most importantly:

Make the design exceptional. Keep the functionality simple.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://gadget-zone-demo-shine.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8245605e-145b-4e89-8f26-20441f26a32b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
