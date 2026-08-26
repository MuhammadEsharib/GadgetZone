import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  CreditCard,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  ShoppingBag,
  Info,
  MapPin,
  Phone,
  User,
  Mail,
} from "lucide-react";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { products, formatPrice, type Product } from "@/data/products";
import { useCart } from "@/lib/cartStore";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Turnstile } from "@marsidev/react-turnstile";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — The Gadget Zone" },
      {
        name: "description",
        content: "Secure checkout. Finalize your gadget order at The Gadget Zone.",
      },
    ],
  }),
  component: CheckoutPage,
});

type CheckoutStep = "shipping" | "payment" | "success";

function CheckoutPage() {
  const { items, removeFromCart } = useCart();
  const [toast, setToast] = useState<string | null>(null);
  const [step, setStep] = useState<CheckoutStep>("shipping");

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Karachi");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank" | "easypaisa">("cod");
  const [orderNumber, setOrderNumber] = useState("");
  const [waLink, setWaLink] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [selectedCheckoutIds, setSelectedCheckoutIds] = useState<number[] | null>(null);

  const [formError, setFormError] = useState("");

  // Map CartItemData to full products
  const checkoutItems = items
    .filter((item) => !selectedCheckoutIds || selectedCheckoutIds.includes(item.id))
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { product, qty: item.qty } : null;
    })
    .filter(Boolean) as { product: Product; qty: number }[];

  const subtotal = checkoutItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 299;
  const total = subtotal + shipping;

  useEffect(() => {
    // Populate user profile info if logged in
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        if (u.name) setName(u.name);
        if (u.email) setEmail(u.email);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    const selectedRaw = localStorage.getItem("gz_checkout_items");
    if (selectedRaw) {
      try {
        const selectedIds = JSON.parse(selectedRaw);
        if (Array.isArray(selectedIds) && selectedIds.every((id) => Number.isInteger(id))) {
          setSelectedCheckoutIds(selectedIds);
        }
      } catch {
        console.error("Error reading checkout selection");
      }
      localStorage.removeItem("gz_checkout_items");
    }
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  const notify = useCallback((message: string) => setToast(message), []);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (step === "shipping") {
      if (!name || !email || !phone || !address) {
        setFormError("Please fill out all shipping fields.");
        return;
      }
      if (!email.includes("@")) {
        setFormError("Please enter a valid email address.");
        return;
      }
      if (phone.length < 10) {
        setFormError("Please enter a valid phone number.");
        return;
      }
      setStep("payment");
    }
  };

  const handleOrderSuccess = (confirmedOrderNumber: string, confirmedWaLink: string) => {
    setOrderNumber(confirmedOrderNumber);
    setWaLink(confirmedWaLink);
    // Save order in localStorage order history
    try {
      const existingRaw = localStorage.getItem("gz_orders");
      const orderHistory = existingRaw ? JSON.parse(existingRaw) : [];

      const newOrder = {
        id: confirmedOrderNumber,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        product: checkoutItems.map((i) => `${i.product.name} (x${i.qty})`).join(", "),
        price: formatPrice(total),
        status: "Pending Processing",
        items: checkoutItems.map((i) => ({
          name: i.product.name,
          price: i.product.price,
          qty: i.qty,
        })),
        shippingAddress: { name, address, city, phone },
        paymentMethod:
          paymentMethod === "cod"
            ? "Cash on Delivery"
            : paymentMethod === "bank"
              ? "Bank Transfer"
              : "EasyPaisa",
      };

      orderHistory.unshift(newOrder);
      localStorage.setItem("gz_orders", JSON.stringify(orderHistory));
    } catch (e) {
      console.error("Error saving order history", e);
    }

    setStep("success");
    checkoutItems.forEach(({ product }) => removeFromCart(product.id));
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar cartCount={0} onNotify={notify} />
        <div className="pt-24 sm:pt-32" />

        <main className="mx-auto max-w-2xl px-4 pb-24 text-center">
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-sm space-y-6 animate-fade-in">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="h-12 w-12" />
            </div>

            <div className="space-y-2">
              <span className="inline-block rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-500">
                Order Placed Successfully
              </span>
              <h1 className="font-display text-3xl font-extrabold text-foreground">
                Thank You for Your Purchase!
              </h1>
              <p className="text-sm text-muted-foreground">
                Your order <span className="font-bold text-royal">{orderNumber}</span> has been
                logged and is being processed.
              </p>
            </div>

            <div className="border-y border-border/50 py-5 text-left space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Ship To:</span>
                <span className="font-bold text-foreground">{name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Delivery Address:</span>
                <span className="font-bold text-foreground text-right max-w-xs">
                  {address}, {city}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-bold text-foreground">
                  {paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : paymentMethod === "bank"
                      ? "Bank Transfer"
                      : "EasyPaisa / Mobile Wallet"}
                </span>
              </div>
              <div className="flex justify-between text-xs border-t border-border/30 pt-3">
                <span className="text-muted-foreground font-bold">Total Charged:</span>
                <span className="font-extrabold text-royal">{formatPrice(total)}</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              We have sent a confirmation email to{" "}
              <span className="font-bold text-foreground">{email}</span>. Our courier partner will
              contact you at <span className="font-bold text-foreground">{phone}</span> upon
              dispatch.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/account"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-royal px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-royal-deep"
              >
                <ShoppingBag className="h-4 w-4" /> Track Order Status
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold text-foreground hover:bg-sky-soft/40 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-emerald-500/30 px-6 py-3 text-sm font-bold text-emerald-600 transition-colors hover:bg-emerald-500/10"
              >
                Confirm order on WhatsApp
              </a>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={items.reduce((s, i) => s + i.qty, 0)} onNotify={notify} />

      <div className="pt-24 sm:pt-28 md:pt-32" />

      <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/cart" className="hover:text-royal transition-colors">
            Cart
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-semibold">Checkout</span>
        </div>

        {checkoutItems.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border/80 rounded-3xl p-8 max-w-md mx-auto space-y-5">
            <h2 className="font-display text-xl font-bold">No active items for checkout</h2>
            <p className="text-sm text-muted-foreground">
              Please add items to your cart first before proceeding to checkout.
            </p>
            <Link
              to="/shop"
              className="inline-block rounded-full bg-royal px-6 py-3 text-sm font-bold text-white hover:bg-royal-deep transition-colors"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
            {/* Left: Input Details Form */}
            <div className="lg:col-span-7 bg-card border border-border/80 rounded-3xl p-6 sm:p-8 space-y-8">
              {/* Progress Steps Indicators */}
              <div className="flex items-center justify-between border-b border-border/50 pb-5">
                <span
                  className={`text-sm font-bold flex items-center gap-2 ${
                    step === "shipping" ? "text-royal" : "text-muted-foreground"
                  }`}
                >
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${
                      step === "shipping"
                        ? "bg-royal text-white"
                        : "bg-sky-soft text-muted-foreground"
                    }`}
                  >
                    1
                  </span>
                  Shipping
                </span>
                <div className="h-[1px] flex-1 bg-border mx-4" />
                <span
                  className={`text-sm font-bold flex items-center gap-2 ${
                    step === "payment" ? "text-royal" : "text-muted-foreground"
                  }`}
                >
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${
                      step === "payment"
                        ? "bg-royal text-white"
                        : "bg-sky-soft text-muted-foreground"
                    }`}
                  >
                    2
                  </span>
                  Payment
                </span>
              </div>

              {formError && (
                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-xs font-bold text-destructive">
                  {formError}
                </div>
              )}

              {step === "shipping" && (
                <form onSubmit={handleNextStep} className="space-y-6">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Shipping Information
                  </h3>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                        <User className="h-3.5 w-3.5" /> Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Usama Bin Abid"
                        className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm focus:border-royal focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" /> Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0342 0024369"
                        className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm focus:border-royal focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" /> Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="support@thegadgetzone.pk"
                      className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm focus:border-royal focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> Delivery Address
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Shop #B-172, Alhaseeb Residency, Scheme 33"
                        className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm focus:border-royal focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground">City</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm focus:border-royal focus:outline-none appearance-none"
                      >
                        <option value="Karachi">Karachi</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 flex items-center justify-center gap-2 rounded-full bg-royal py-3.5 text-sm font-bold text-white transition-colors hover:bg-royal-deep"
                  >
                    Continue to Payment <ChevronRight className="h-4 w-4" />
                  </button>
                </form>
              )}

              {step === "payment" && (
                <div className="space-y-6">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Select Payment Option
                  </h3>

                  <div className="space-y-4">
                    {/* Cash on Delivery */}
                    <button
                      onClick={() => setPaymentMethod("cod")}
                      className={`w-full text-left p-4 border rounded-2xl flex items-start gap-4 transition-all ${
                        paymentMethod === "cod" ? "border-royal bg-sky-soft/10" : "border-border"
                      }`}
                    >
                      <span
                        className={`mt-1 grid h-5 w-5 place-items-center rounded-full border-2 transition-colors ${
                          paymentMethod === "cod" ? "border-royal bg-royal" : "border-border"
                        }`}
                      >
                        {paymentMethod === "cod" && (
                          <span className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                          <Truck className="h-4 w-4 text-royal" /> Cash on Delivery (COD)
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Pay cash upon receiving shipment. Available nationwide in Pakistan.
                        </p>
                      </div>
                    </button>

                    {/* Bank Transfer */}
                    <button
                      onClick={() => setPaymentMethod("bank")}
                      className={`w-full text-left p-4 border rounded-2xl flex items-start gap-4 transition-all ${
                        paymentMethod === "bank" ? "border-royal bg-sky-soft/10" : "border-border"
                      }`}
                    >
                      <span
                        className={`mt-1 grid h-5 w-5 place-items-center rounded-full border-2 transition-colors ${
                          paymentMethod === "bank" ? "border-royal bg-royal" : "border-border"
                        }`}
                      >
                        {paymentMethod === "bank" && (
                          <span className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </span>
                      <div className="w-full">
                        <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                          <CreditCard className="h-4 w-4 text-royal" /> Direct Bank Transfer
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Transfer directly to our corporate bank account. Share screenshot on
                          WhatsApp.
                        </p>

                        {paymentMethod === "bank" && (
                          <div className="mt-4 p-4 rounded-xl bg-background border border-border/80 text-xs space-y-2 animate-fade-in">
                            <p className="font-semibold text-royal">Mock Bank Details:</p>
                            <p>
                              Bank: <span className="font-bold">Meezan Bank Ltd</span>
                            </p>
                            <p>
                              Account Title: <span className="font-bold">The Gadget Zone pk</span>
                            </p>
                            <p>
                              Account Number: <span className="font-bold">0342-010582910</span>
                            </p>
                            <p>
                              IBAN: <span className="font-bold">PK88MEZN000342010582910</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </button>

                    {/* EasyPaisa */}
                    <button
                      onClick={() => setPaymentMethod("easypaisa")}
                      className={`w-full text-left p-4 border rounded-2xl flex items-start gap-4 transition-all ${
                        paymentMethod === "easypaisa"
                          ? "border-royal bg-sky-soft/10"
                          : "border-border"
                      }`}
                    >
                      <span
                        className={`mt-1 grid h-5 w-5 place-items-center rounded-full border-2 transition-colors ${
                          paymentMethod === "easypaisa" ? "border-royal bg-royal" : "border-border"
                        }`}
                      >
                        {paymentMethod === "easypaisa" && (
                          <span className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </span>
                      <div className="w-full">
                        <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                          <CreditCard className="h-4 w-4 text-royal" /> EasyPaisa / JazzCash
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Send instantly via EasyPaisa or JazzCash wallet.
                        </p>

                        {paymentMethod === "easypaisa" && (
                          <div className="mt-4 p-4 rounded-xl bg-background border border-border/80 text-xs space-y-2 animate-fade-in">
                            <p className="font-semibold text-royal">Mobile Wallet Info:</p>
                            <p>
                              EasyPaisa Number: <span className="font-bold">0342-0024369</span>
                            </p>
                            <p>
                              JazzCash Number: <span className="font-bold">0332-2205842</span>
                            </p>
                            <p>
                              Title: <span className="font-bold">Usama Bin Abid / Usama Ali</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>

                  <Turnstile
                    siteKey={import.meta.env["VITE_TURNSTILE_SITE_KEY"]}
                    onSuccess={setTurnstileToken}
                    onError={() =>
                      setFormError("Captcha failed to load. Please refresh and try again.")
                    }
                  />

                  <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                    <button
                      onClick={() => setStep("shipping")}
                      className="w-full flex-1 rounded-full border border-border px-5 py-3.5 text-sm font-bold text-foreground hover:bg-sky-soft/40 transition-colors flex items-center justify-center gap-1.5 sm:w-auto"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back to Shipping
                    </button>
                    <CheckoutButton
                      items={checkoutItems.map(({ product, qty }) => ({
                        name: product.name,
                        qty,
                        price: product.price,
                      }))}
                      customerName={name}
                      customerEmail={email}
                      phone={phone}
                      address={address}
                      city={city}
                      paymentMethod={paymentMethod}
                      total={total}
                      turnstileToken={turnstileToken}
                      onSuccess={handleOrderSuccess}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right: Order Summary Side Panel */}
            <div className="lg:col-span-5 bg-card border border-border/80 rounded-3xl p-6 shadow-sm space-y-6">
              <h3 className="font-display text-base font-bold text-foreground border-b border-border/50 pb-3">
                Items In Order
              </h3>

              <div className="max-h-[320px] overflow-y-auto pr-1 space-y-4">
                {checkoutItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <div className="h-12 w-12 rounded-xl bg-sky-soft/40 overflow-hidden shrink-0 border border-border/60">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-foreground truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Qty: {item.qty} · {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <span className="text-xs font-extrabold text-foreground shrink-0">
                      {formatPrice(item.product.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/50 pt-4 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-bold text-foreground">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span
                    className={
                      shipping === 0
                        ? "font-semibold text-emerald-500"
                        : "font-bold text-foreground"
                    }
                  >
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t border-border/30 pt-3">
                  <span className="text-muted-foreground font-bold">Total:</span>
                  <span className="font-extrabold text-royal text-base">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-border bg-sky-soft/20 p-4 text-[11px] leading-relaxed text-muted-foreground flex gap-3">
                <Info className="h-4 w-4 text-royal shrink-0" />
                <span>
                  By placing this order, you agree to our 7-day checking warranty terms. No
                  pre-payment is required for Cash on Delivery.
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
