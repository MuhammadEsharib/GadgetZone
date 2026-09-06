import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  ChevronRight,
  ShoppingBag,
  MapPin,
  Phone,
  User,
  Mail,
  FileText,
  Copy,
  Check,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/lib/cartStore";
import { useProducts } from "@/lib/productsStore";
import { CheckoutButton } from "@/components/CheckoutButton";
import { getCustomerProfile, saveCustomerProfile, loginCustomer } from "@/lib/auth";
import { saveLocalOrder } from "@/lib/orderClient";
import { type Order } from "@/lib/orderTypes";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Easy Checkout — The Gadget Zone" },
      {
        name: "description",
        content: "Quick checkout with Cash on Delivery or EasyPaisa/JazzCash nationwide.",
      },
    ],
  }),
  component: CheckoutPage,
});

const PAKISTAN_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Abbottabad",
  "Bahawalpur",
  "Sargodha",
  "Other City",
];

function CheckoutPage() {
  const { items, removeFromCart } = useCart();
  const { products } = useProducts();
  const [toast, setToast] = useState<string | null>(null);
  const [step, setStep] = useState<"form" | "success">("form");

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Karachi");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "easypaisa">("cod");

  // Success states
  const [orderNumber, setOrderNumber] = useState("");
  const [waLink, setWaLink] = useState("");
  const [copiedOrder, setCopiedOrder] = useState(false);
  const [selectedCheckoutIds, setSelectedCheckoutIds] = useState<number[] | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Auto-fill from saved profile
  useEffect(() => {
    const profile = getCustomerProfile();
    if (profile) {
      if (profile.name) setName(profile.name);
      if (profile.phone) setPhone(profile.phone);
      if (profile.email) setEmail(profile.email);
      if (profile.address) setAddress(profile.address);
      if (profile.city) setCity(profile.city);
    }
  }, []);

  // Filter items in cart
  const rawFiltered = items.filter(
    (item) =>
      !selectedCheckoutIds ||
      selectedCheckoutIds.length === 0 ||
      selectedCheckoutIds.some((id) => String(id) === String(item.id))
  );
  const effectiveItems = rawFiltered.length > 0 ? rawFiltered : items;

  const checkoutItems = effectiveItems
    .map((item) => {
      const product = products.find((p) => String(p.id) === String(item.id));
      return product ? { product, qty: item.qty } : null;
    })
    .filter(Boolean) as { product: Product; qty: number }[];

  const subtotal = checkoutItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 299;
  const total = subtotal + shipping;

  useEffect(() => {
    const selectedRaw = localStorage.getItem("gz_checkout_items");
    if (selectedRaw) {
      try {
        const selectedIds = JSON.parse(selectedRaw);
        if (Array.isArray(selectedIds)) {
          setSelectedCheckoutIds(selectedIds);
        }
      } catch {
        console.error("Error reading checkout selection");
      }
      localStorage.removeItem("gz_checkout_items");
    }
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(id);
  }, [toast]);

  const notify = useCallback((message: string) => setToast(message), []);

  const handleCopyOrderId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(orderNumber);
      setCopiedOrder(true);
      setTimeout(() => setCopiedOrder(false), 2000);
    }
  };

  const handleOrderSuccess = (confirmedOrderNumber: string, confirmedWaLink: string, serverOrder?: Order) => {
    setOrderNumber(confirmedOrderNumber);
    setWaLink(confirmedWaLink);

    // Save login profile for seamless customer portal access
    loginCustomer(phone, name);
    saveCustomerProfile({
      name,
      phone,
      email,
      address,
      city,
    });

    // Create complete typed Order object with snapshots of current values before emptying cart
    const finalSubtotal = subtotal;
    const finalShipping = shipping;
    const finalTotal = total;
    const finalItems = checkoutItems.map((i) => ({
      id: i.product.id,
      name: i.product.name,
      price: Number(i.product.price),
      qty: Number(i.qty),
      image: i.product.image,
    }));

    const orderToSave: Order = serverOrder || {
      id: confirmedOrderNumber,
      orderNumber: confirmedOrderNumber,
      customerName: name.trim(),
      phone: phone.trim(),
      customerEmail: email.trim(),
      address: address.trim(),
      city: city.trim(),
      notes: notes.trim(),
      paymentMethod: paymentMethod === "easypaisa" ? "EasyPaisa / JazzCash" : "Cash on Delivery",
      items: finalItems,
      subtotal: finalSubtotal,
      shipping: finalShipping,
      total: finalTotal,
      status: "Pending Processing",
      createdAt: new Date().toISOString(),
    };

    setConfirmedOrder(orderToSave);
    saveLocalOrder(orderToSave);

    setStep("success");
    checkoutItems.forEach(({ product }) => removeFromCart(product.id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (step === "success") {
    const displaySubtotal = confirmedOrder?.subtotal ?? subtotal;
    const displayShipping = confirmedOrder?.shipping ?? shipping;
    const displayTotal = confirmedOrder?.total ?? total;
    const displayName = confirmedOrder?.customerName || name;
    const displayPhone = confirmedOrder?.phone || phone;
    const displayAddress = confirmedOrder?.address || address;
    const displayCity = confirmedOrder?.city || city;
    const displayPayment = confirmedOrder?.paymentMethod || (paymentMethod === "easypaisa" ? "EasyPaisa / JazzCash" : "Cash on Delivery (COD)");

    return (
      <div className="min-h-screen bg-background">
        <Navbar cartCount={0} onNotify={notify} />
        <div className="pt-24 sm:pt-32" />

        <main className="mx-auto max-w-2xl px-4 pb-24 text-center">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xl space-y-6 animate-fade-in text-left">
            <div className="text-center space-y-3">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-500 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <span className="inline-block rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-500">
                ✓ Order Confirmed
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                Thank You, {displayName}!
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                Your order is confirmed and currently being prepared for dispatch.
              </p>
            </div>

            {/* Order Badge & Copy */}
            <div className="flex items-center justify-between rounded-2xl bg-sky-soft/30 border border-border p-4">
              <div>
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                  Order Tracking ID
                </span>
                <span className="font-display text-lg sm:text-xl font-black text-royal">
                  {orderNumber}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyOrderId}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground hover:bg-sky-soft/50 transition-colors cursor-pointer"
              >
                {copiedOrder ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy ID
                  </>
                )}
              </button>
            </div>

            {/* Order Details Breakdown */}
            <div className="rounded-2xl border border-border/80 bg-background/60 p-4 sm:p-5 space-y-3 text-xs">
              <h3 className="font-bold text-foreground text-sm border-b border-border/50 pb-2">
                Order Summary & Bill
              </h3>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Recipient:</span>
                <span className="font-bold text-foreground">{displayName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone Number:</span>
                <span className="font-bold text-foreground">{displayPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Destination:</span>
                <span className="font-bold text-foreground text-right max-w-xs">
                  {displayAddress}, {displayCity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-bold text-foreground">
                  {displayPayment}
                </span>
              </div>
              <div className="flex justify-between border-t border-border/40 pt-2.5 text-xs">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-bold text-foreground">{formatPrice(displaySubtotal)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Delivery Fee:</span>
                <span className={displayShipping === 0 ? "font-bold text-emerald-500" : "font-bold text-foreground"}>
                  {displayShipping === 0 ? "FREE" : formatPrice(displayShipping)}
                </span>
              </div>
              <div className="flex justify-between border-t border-border/40 pt-2.5 text-sm">
                <span className="font-bold text-muted-foreground">Total Amount:</span>
                <span className="font-black text-royal text-base">{formatPrice(displayTotal)}</span>
              </div>
            </div>

            {/* WhatsApp Quick Action Button */}
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 transition-all active:scale-[0.99]"
              >
                <Phone className="h-4 w-4" /> Confirm & Chat on WhatsApp
              </a>
            )}

            {/* Nav links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Link
                to="/account"
                className="flex items-center justify-center gap-2 rounded-xl bg-royal/10 border border-royal/20 py-3 text-xs font-bold text-royal hover:bg-royal/20 transition-colors"
              >
                <ShoppingBag className="h-4 w-4" /> Live Tracking & Account
              </Link>
              <Link
                to="/shop"
                className="flex items-center justify-center gap-2 rounded-xl border border-border py-3 text-xs font-bold text-foreground hover:bg-sky-soft/40 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
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
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/cart" className="hover:text-royal transition-colors">
            Cart
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-semibold">Easy Checkout</span>
        </div>

        {checkoutItems.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border/80 rounded-3xl p-8 max-w-md mx-auto space-y-5">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/40 mx-auto" />
            <h2 className="font-display text-xl font-bold">No active items in checkout</h2>
            <p className="text-sm text-muted-foreground">
              Your cart is currently empty. Pick gadgets from our shop to order!
            </p>
            <Link
              to="/shop"
              className="inline-block rounded-full bg-royal px-6 py-3 text-sm font-bold text-white hover:bg-royal-deep transition-colors shadow-md"
            >
              Explore Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            {/* Left: Direct Order Form */}
            <div className="lg:col-span-7 bg-card border border-border/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-border/50 pb-4">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-royal/10 border border-royal/20 px-3 py-0.5 text-xs font-bold text-royal mb-2">
                  <Sparkles className="h-3.5 w-3.5" /> Fast 1-Step Ordering
                </div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  Delivery & Contact Information
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                  Enter your details below. Fast nationwide delivery across Pakistan.
                </p>
              </div>

              <div className="space-y-5">
                {/* Full Name & Phone Number */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-royal" /> Full Name{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Usama Bin Abid"
                      className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground focus:border-royal focus:ring-1 focus:ring-royal focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-royal" /> Phone Number (WhatsApp){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0342 0024369"
                      className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground focus:border-royal focus:ring-1 focus:ring-royal focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Delivery Address & City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-royal" /> Complete Street Delivery Address{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House/Shop #, Street, Sector / Area, Landmark"
                    className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground focus:border-royal focus:ring-1 focus:ring-royal focus:outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">
                      City <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground focus:border-royal focus:outline-none"
                    >
                      {PAKISTAN_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" /> Email Address{" "}
                      <span className="text-[10px] font-normal text-muted-foreground/80">
                        (Optional, for invoice)
                      </span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground focus:border-royal focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Special Instructions Note */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5" /> Order Notes / Instructions{" "}
                    <span className="text-[10px] font-normal text-muted-foreground/80">
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Call before arrival, deliver after 2 PM"
                    className="w-full rounded-xl border border-border/80 bg-background px-4 py-2.5 text-xs text-foreground focus:border-royal focus:outline-none"
                  />
                </div>

                {/* Payment Option Selection */}
                <div className="pt-4 border-t border-border/50 space-y-3">
                  <label className="text-sm font-bold text-foreground block">
                    Choose Payment Option
                  </label>

                  <div className="space-y-3">
                    {/* Cash on Delivery */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`w-full text-left p-4 border rounded-2xl flex items-start gap-4 transition-all cursor-pointer ${
                        paymentMethod === "cod"
                          ? "border-royal bg-royal/10 shadow-sm"
                          : "border-border hover:border-border/80 bg-background/50"
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
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                            <Truck className="h-4 w-4 text-royal" /> Cash on Delivery (COD)
                          </h4>
                          <span className="rounded-full bg-emerald-500/15 border border-emerald-500/25 px-2.5 py-0.5 text-[10px] font-bold text-emerald-500">
                            Recommended
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Pay cash to rider upon receiving your package at your doorstep anywhere in Pakistan.
                        </p>
                      </div>
                    </button>

                    {/* EasyPaisa / JazzCash */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("easypaisa")}
                      className={`w-full text-left p-4 border rounded-2xl flex items-start gap-4 transition-all cursor-pointer ${
                        paymentMethod === "easypaisa"
                          ? "border-royal bg-royal/10 shadow-sm"
                          : "border-border hover:border-border/80 bg-background/50"
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
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                            <Smartphone className="h-4 w-4 text-royal" /> EasyPaisa / JazzCash
                          </h4>
                          <span className="rounded-full bg-royal/15 border border-royal/25 px-2.5 py-0.5 text-[10px] font-bold text-royal">
                            Instant Wallet
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Transfer directly using your EasyPaisa or JazzCash mobile wallet.
                        </p>

                        {paymentMethod === "easypaisa" && (
                          <div className="mt-3 p-3.5 rounded-xl bg-background border border-border/80 text-xs space-y-1.5 animate-fade-in">
                            <p className="font-bold text-royal">Account Details:</p>
                            <p>
                              EasyPaisa: <span className="font-bold text-foreground">0342-0024369</span> (Usama Bin Abid)
                            </p>
                            <p>
                              JazzCash: <span className="font-bold text-foreground">0332-2205842</span> (Usama Ali)
                            </p>
                            <p className="text-[10px] text-muted-foreground pt-1">
                              * After sending payment, share screenshot on WhatsApp with your Order ID.
                            </p>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Checkout Submit Button */}
                <div className="pt-3">
                  <CheckoutButton
                    items={checkoutItems.map(({ product, qty }) => ({
                      id: product.id,
                      name: product.name,
                      qty,
                      price: product.price,
                      image: product.image,
                    }))}
                    customerName={name}
                    customerEmail={email}
                    phone={phone}
                    address={address}
                    city={city}
                    notes={notes}
                    paymentMethod={paymentMethod}
                    total={total}
                    onSuccess={handleOrderSuccess}
                  />
                </div>
              </div>
            </div>

            {/* Right: Order Summary Side Panel */}
            <div className="lg:col-span-5 bg-card border border-border/80 rounded-3xl p-6 shadow-sm space-y-6 sticky top-28">
              <h3 className="font-display text-base font-bold text-foreground border-b border-border/50 pb-3 flex items-center justify-between">
                <span>Items in Order</span>
                <span className="text-xs font-semibold text-muted-foreground">
                  {checkoutItems.reduce((s, i) => s + i.qty, 0)} items
                </span>
              </h3>

              <div className="max-h-[300px] overflow-y-auto pr-1 space-y-3">
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
                        Qty: {item.qty} × {formatPrice(item.product.price)}
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
                  <span className="text-muted-foreground">Delivery Shipping:</span>
                  <span
                    className={
                      shipping === 0
                        ? "font-bold text-emerald-500"
                        : "font-bold text-foreground"
                    }
                  >
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                {subtotal < 5000 && (
                  <p className="text-[10px] text-muted-foreground">
                    💡 Free delivery applies on orders above{" "}
                    <span className="font-bold text-royal">Rs. 5,000</span>
                  </p>
                )}
                <div className="flex justify-between text-sm border-t border-border/30 pt-3">
                  <span className="text-muted-foreground font-bold">Total to Pay:</span>
                  <span className="font-black text-royal text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Guarantees Capsule */}
              <div className="rounded-2xl border border-dashed border-border bg-sky-soft/20 p-3.5 text-[11px] leading-relaxed text-muted-foreground space-y-2">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>7-Day Checking Warranty Included</span>
                </div>
                <p className="text-[10px]">
                  All gadgets are tested for quality before dispatch. Cash on Delivery is 100% risk-free.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
