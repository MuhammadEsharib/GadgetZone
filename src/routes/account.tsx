import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import {
  User,
  ShoppingBag,
  ShieldCheck,
  Search,
  Package,
  Phone,
  Truck,
  Clock,
  MessageCircle,
  Sparkles,
  LogOut,
  Edit2,
  Save,
  ArrowRight,
  Smartphone,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import {
  getCustomerProfile,
  saveCustomerProfile,
  getActivePhone,
  loginCustomer,
  logoutCustomer,
  type CustomerProfile,
} from "@/lib/auth";
import { type Order } from "@/lib/orderTypes";
import { clientFetchOrders, clientTrackSingleOrder } from "@/lib/orderClient";
import { formatPrice } from "@/data/products";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Customer Portal & Live Order Tracking — The Gadget Zone" },
      {
        name: "description",
        content: "Log in with your phone number to track live gadget orders and view purchase history.",
      },
    ],
  }),
  component: AccountPortal,
});

function AccountPortal() {
  const [cart, setCart] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  // Auth & Session state
  const [loggedInPhone, setLoggedInPhone] = useState<string | null>(null);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Login Form
  const [inputPhone, setInputPhone] = useState("");
  const [inputName, setInputName] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Edit Profile
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editCity, setEditCity] = useState("Karachi");

  // Single Order ID Search
  const [searchOrderId, setSearchOrderId] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [singleOrderResult, setSingleOrderResult] = useState<Order | null>(null);
  const [searchError, setSearchError] = useState("");

  const notify = useCallback((message: string) => setToast(message), []);

  // Fetch orders from client helper
  const loadOrdersForPhone = async (phone: string, name?: string) => {
    setLoadingOrders(true);
    try {
      const res = await clientFetchOrders(phone, name);
      if (res.orders) {
        setOrders(res.orders);
      }
      if (res.profile) {
        setProfile(res.profile);
        setEditName(res.profile.name || "");
        setEditEmail(res.profile.email || "");
        setEditAddress(res.profile.address || "");
        setEditCity(res.profile.city || "Karachi");
      }
    } catch (e) {
      console.error("Failed to load orders for phone", e);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Sync session on mount
  useEffect(() => {
    const storedCart = Number(localStorage.getItem("cart"));
    if (Number.isFinite(storedCart) && storedCart >= 0) {
      setCart(Math.floor(storedCart));
    }

    const currentPhone = getActivePhone();
    if (currentPhone) {
      setLoggedInPhone(currentPhone);
      const savedProfile = getCustomerProfile();
      if (savedProfile) {
        setProfile(savedProfile);
        setEditName(savedProfile.name || "");
        setEditEmail(savedProfile.email || "");
        setEditAddress(savedProfile.address || "");
        setEditCity(savedProfile.city || "Karachi");
      }
      loadOrdersForPhone(currentPhone, savedProfile?.name);
    } else {
      try {
        const raw = localStorage.getItem("gz_orders");
        if (raw) {
          const localList = JSON.parse(raw);
          if (localList.length > 0 && localList[0]?.phone) {
            setInputPhone(localList[0].phone);
            if (localList[0].customerName) {
              setInputName(localList[0].customerName);
            }
          }
        }
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(id);
  }, [toast]);

  // Handle Login via Phone
  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputPhone.trim();
    if (!clean || clean.length < 8) {
      setLoginError("Please enter a valid phone number (e.g. 0342 0024369).");
      return;
    }

    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await clientFetchOrders(clean, inputName.trim());
      loginCustomer(clean, inputName.trim() || res.profile?.name);
      setLoggedInPhone(clean);
      setProfile(res.profile || { name: inputName.trim() || "Customer", phone: clean });
      setOrders(res.orders || []);
      setEditName(res.profile?.name || inputName.trim() || "");
      setEditEmail(res.profile?.email || "");
      setEditAddress(res.profile?.address || "");
      setEditCity(res.profile?.city || "Karachi");

      notify(`Welcome back, ${res.profile?.name || "Customer"}!`);
    } catch {
      setLoginError("Unable to connect to order server. Please check your internet connection.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    logoutCustomer();
    setLoggedInPhone(null);
    setProfile(null);
    setOrders([]);
    notify("Signed out from session.");
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    const updated: CustomerProfile = {
      ...profile,
      name: editName.trim() || profile.name,
      email: editEmail.trim(),
      address: editAddress.trim(),
      city: editCity.trim(),
    };

    saveCustomerProfile(updated);
    setProfile(updated);
    setIsEditingProfile(false);
    notify("Delivery information updated successfully.");
  };

  const handleSingleOrderSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = searchOrderId.trim().toUpperCase();
    if (!id) {
      setSearchError("Please enter an Order ID (e.g. GZ-7492).");
      return;
    }

    setSearchLoading(true);
    setSearchError("");
    setSingleOrderResult(null);

    try {
      const res = await clientTrackSingleOrder(id);
      if (res.error) {
        setSearchError(res.error);
      } else if (res.order) {
        setSingleOrderResult(res.order);
      } else {
        setSearchError("No order found with ID #" + id);
      }
    } catch {
      setSearchError("Failed to track order. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={cart} onNotify={notify} />

      <div className="pt-24 sm:pt-28 md:pt-32" />

      <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border/60 pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-royal/10 border border-royal/20 px-3 py-0.5 text-xs font-bold text-royal mb-2">
              <Package className="h-3.5 w-3.5" /> Customer Account & Tracking
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              {loggedInPhone ? `Welcome, ${profile?.name || "Customer"}` : "Customer Portal"}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {loggedInPhone
                ? `Logged in with active phone: ${loggedInPhone}`
                : "Enter your phone number to view live order tracking, status updates, and history."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {loggedInPhone && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-sky-soft/30 transition-colors cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </button>
            )}
            <a
              href="https://wa.me/923420024369?text=Hi%2C%20I%20need%20assistance%20with%20my%20order."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-md"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Support
            </a>
          </div>
        </div>

        {!loggedInPhone ? (
          /* ========================================================================= */
          /* LOGGED OUT: Fast 1-Step Phone Login Card                                  */
          /* ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            {/* Phone Login Box */}
            <div className="lg:col-span-7 bg-card border border-border/80 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
              <div className="space-y-2">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-royal/10 text-royal">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                  Sign In with Phone Number
                </h2>
                <p className="text-xs text-muted-foreground">
                  No password required. Enter your active WhatsApp or Phone number to access your orders instantly.
                </p>
              </div>

              {loginError && (
                <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-xs font-bold text-destructive animate-fade-in">
                  {loginError}
                </div>
              )}

              <form onSubmit={handlePhoneLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-royal" /> Phone Number{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={inputPhone}
                    onChange={(e) => setInputPhone(e.target.value)}
                    placeholder="e.g. 0342 0024369"
                    className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground focus:border-royal focus:ring-1 focus:ring-royal focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                    <User className="h-3.5 w-3.5" /> Full Name{" "}
                    <span className="text-[10px] font-normal text-muted-foreground/80">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="e.g. Usama Bin Abid"
                    className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground focus:border-royal focus:ring-1 focus:ring-royal focus:outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full mt-2 rounded-full bg-royal py-3.5 text-sm font-bold text-white hover:bg-royal-deep transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {loginLoading ? (
                    "Loading Account..."
                  ) : (
                    <>
                      Sign In & Track Orders <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="border-t border-border/40 pt-4 flex items-center gap-3 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Your information is kept secure. We only access orders linked to your phone.</span>
              </div>
            </div>

            {/* Right: Direct Single Order Search */}
            <div className="lg:col-span-5 bg-card border border-border/80 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                  <Search className="h-4 w-4 text-royal" /> Quick Single Order Lookup
                </h3>
                <p className="text-xs text-muted-foreground">
                  Have an Order ID? Enter it below to check status immediately.
                </p>
              </div>

              <form onSubmit={handleSingleOrderSearch} className="space-y-3">
                <input
                  type="text"
                  value={searchOrderId}
                  onChange={(e) => setSearchOrderId(e.target.value)}
                  placeholder="Order ID (e.g. GZ-7492)"
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs text-foreground focus:border-royal focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={searchLoading}
                  className="w-full rounded-xl border border-royal/30 bg-royal/10 py-2.5 text-xs font-bold text-royal hover:bg-royal/20 transition-colors cursor-pointer"
                >
                  {searchLoading ? "Checking..." : "Track this Order"}
                </button>
              </form>

              {searchError && (
                <p className="text-xs font-semibold text-amber-500">{searchError}</p>
              )}

              {singleOrderResult && (
                <div className="rounded-2xl border border-royal/30 bg-sky-soft/20 p-5 space-y-4 text-xs animate-fade-in">
                  <div className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="font-bold text-royal text-sm">#{singleOrderResult.orderNumber}</span>
                    <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 font-bold text-amber-500 text-[10px]">
                      {singleOrderResult.status}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-muted-foreground">Recipient: <span className="font-bold text-foreground">{singleOrderResult.customerName}</span></p>
                    <p className="text-muted-foreground">Phone: <span className="font-bold text-foreground">{singleOrderResult.phone}</span></p>
                    <p className="text-muted-foreground">Total: <span className="font-black text-royal text-sm">{formatPrice(singleOrderResult.total)}</span></p>
                    <p className="text-muted-foreground">Destination: <span className="font-semibold text-foreground">{singleOrderResult.address}, {singleOrderResult.city}</span></p>
                  </div>

                  {singleOrderResult.trackingSteps && (
                    <div className="pt-2 border-t border-border/40 space-y-2">
                      <span className="font-bold text-foreground text-[11px] block">Live Status Timeline:</span>
                      <div className="space-y-2 pl-3 border-l-2 border-royal/40">
                        {singleOrderResult.trackingSteps.map((s, idx) => (
                          <div key={idx} className="relative">
                            <span className={`text-[11px] font-bold block ${s.completed || s.current ? "text-foreground" : "text-muted-foreground"}`}>
                              {s.completed ? "✓ " : `${idx + 1}. `}{s.title}
                            </span>
                            <span className="text-[10px] text-muted-foreground block">{s.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* LOGGED IN: Full Dashboard, Live Order Tracker, History & Profile          */
          /* ========================================================================= */
          <div className="space-y-8 animate-fade-in">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-border bg-card p-5 space-y-1 shadow-sm">
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block">
                  Total Orders Placed
                </span>
                <span className="font-display text-2xl font-black text-foreground">
                  {orders.length}
                </span>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 space-y-1 shadow-sm">
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block">
                  Active in Processing
                </span>
                <span className="font-display text-2xl font-black text-amber-500">
                  {orders.filter((o) => o.status !== "Delivered" && o.status !== "Cancelled").length}
                </span>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 space-y-1 shadow-sm">
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block">
                  Total Order Value
                </span>
                <span className="font-display text-2xl font-black text-royal">
                  {formatPrice(orders.reduce((sum, o) => sum + (o.total || 0), 0))}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Live Orders List & Visual Tracking */}
              <div className="lg:col-span-8 space-y-6">
                <h2 className="font-display text-lg font-bold text-foreground flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-royal" /> Live Orders & Tracking ({orders.length})
                  </span>
                  <Link to="/shop" className="text-xs font-bold text-royal hover:underline">
                    + Place New Order
                  </Link>
                </h2>

                {loadingOrders ? (
                  <div className="p-12 text-center text-sm text-muted-foreground bg-card border border-border rounded-3xl">
                    Loading your orders...
                  </div>
                ) : orders.length === 0 ? (
                  <div className="rounded-3xl border border-border bg-card p-12 text-center space-y-4">
                    <Package className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                    <h3 className="font-bold text-foreground text-base">No orders placed under this phone yet</h3>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                      Any orders placed with <span className="font-bold text-foreground">{loggedInPhone}</span> will appear here in real time.
                    </p>
                    <Link
                      to="/shop"
                      className="inline-block rounded-full bg-royal px-6 py-2.5 text-xs font-bold text-white hover:bg-royal-deep transition-colors"
                    >
                      Browse Tech Catalog
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => {
                      const waText = encodeURIComponent(
                        `Hi! I'm inquiring about my order #${order.orderNumber}. Name: ${order.customerName}`,
                      );
                      const waChat = `https://wa.me/923420024369?text=${waText}`;

                      return (
                        <div
                          key={order.id || order.orderNumber}
                          className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-6"
                        >
                          {/* Order Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/50 pb-4 gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-display text-lg font-black text-royal">
                                  #{order.orderNumber || order.id}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  •{" "}
                                  {order.createdAt
                                    ? new Date(order.createdAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })
                                    : "Recent"}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Recipient: <span className="font-bold text-foreground">{order.customerName}</span> ({order.phone})
                              </p>
                            </div>

                            <div className="flex items-center gap-3">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${
                                  order.status === "Delivered"
                                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                    : order.status === "Dispatched" || order.status === "Out for Delivery"
                                      ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                      : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                }`}
                              >
                                <Clock className="h-3.5 w-3.5" /> {order.status || "Pending Processing"}
                              </span>
                              <a
                                href={waChat}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                              >
                                <MessageCircle className="h-3.5 w-3.5" /> Chat
                              </a>
                            </div>
                          </div>

                          {/* Visual Step-by-Step Tracking Timeline */}
                          <div className="space-y-3 bg-sky-soft/20 rounded-2xl p-5 border border-border/60">
                            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                              <Sparkles className="h-3.5 w-3.5 text-royal" /> Live Shipment Status Tracker
                            </h4>

                            <div className="relative pl-6 space-y-4 border-l-2 border-royal/30 ml-2 mt-2">
                              {order.trackingSteps && order.trackingSteps.length > 0 ? (
                                order.trackingSteps.map((step, idx) => (
                                  <div key={idx} className="relative">
                                    <span
                                      className={`absolute -left-[31px] top-0.5 grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold ${
                                        step.completed
                                          ? "bg-emerald-500 text-white"
                                          : step.current
                                            ? "bg-royal text-white animate-pulse"
                                            : "bg-background border border-border text-muted-foreground"
                                      }`}
                                    >
                                      {step.completed ? "✓" : idx + 1}
                                    </span>
                                    <div>
                                      <h5
                                        className={`text-xs font-bold ${
                                          step.completed || step.current
                                            ? "text-foreground"
                                            : "text-muted-foreground"
                                        }`}
                                      >
                                        {step.title}
                                      </h5>
                                      <p className="text-[11px] text-muted-foreground mt-0.5">
                                        {step.description}
                                      </p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-xs text-muted-foreground">
                                  Order logged and queued for courier dispatch.
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Items & Payment Info */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div className="space-y-2">
                              <span className="text-muted-foreground font-bold block">Items Ordered:</span>
                              <div className="space-y-1.5">
                                {order.items?.map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center bg-background/50 border border-border/50 rounded-xl px-3 py-2">
                                    <span className="font-semibold text-foreground truncate max-w-[180px]">
                                      {item.name}
                                    </span>
                                    <span className="font-bold text-foreground shrink-0">
                                      {item.qty} × {formatPrice(item.price)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2 sm:border-l sm:border-border/50 sm:pl-4">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Delivery Destination:</span>
                                <span className="font-bold text-foreground text-right max-w-[170px]">
                                  {order.address}, {order.city}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Payment Option:</span>
                                <span className="font-bold text-foreground">
                                  {order.paymentMethod === "easypaisa"
                                    ? "EasyPaisa / JazzCash"
                                    : "Cash on Delivery"}
                                </span>
                              </div>
                              <div className="flex justify-between border-t border-border/30 pt-2 text-xs">
                                <span className="text-muted-foreground">Subtotal:</span>
                                <span className="font-bold text-foreground">{formatPrice(order.subtotal || order.total)}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Delivery Fee:</span>
                                <span className={order.shipping === 0 ? "font-bold text-emerald-500" : "font-bold text-foreground"}>
                                  {order.shipping === 0 ? "FREE" : formatPrice(order.shipping)}
                                </span>
                              </div>
                              <div className="flex justify-between border-t border-border/40 pt-2 text-sm">
                                <span className="font-bold text-foreground">Total Charged:</span>
                                <span className="font-black text-royal text-base">
                                  {formatPrice(order.total)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: Customer Profile & Delivery Details */}
              <div className="lg:col-span-4 space-y-6 sticky top-28">
                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                      <User className="h-4 w-4 text-royal" /> Saved Profile Info
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile((v) => !v)}
                      className="text-xs font-bold text-royal hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {isEditingProfile ? "Cancel" : <><Edit2 className="h-3 w-3" /> Edit</>}
                    </button>
                  </div>

                  {isEditingProfile ? (
                    <form onSubmit={handleSaveProfile} className="space-y-3 text-xs animate-fade-in">
                      <div className="space-y-1">
                        <label className="font-bold text-muted-foreground">Full Name</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground focus:border-royal focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-muted-foreground">Email</label>
                        <input
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground focus:border-royal focus:outline-none"
                          placeholder="Optional"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-muted-foreground">Address</label>
                        <input
                          type="text"
                          value={editAddress}
                          onChange={(e) => setEditAddress(e.target.value)}
                          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground focus:border-royal focus:outline-none"
                          placeholder="House/Shop #"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-muted-foreground">City</label>
                        <input
                          type="text"
                          value={editCity}
                          onChange={(e) => setEditCity(e.target.value)}
                          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground focus:border-royal focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full mt-3 rounded-xl bg-royal py-2.5 text-xs font-bold text-white hover:bg-royal-deep transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Save className="h-3.5 w-3.5" /> Save Delivery Details
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-sky-soft text-royal font-bold text-sm">
                          {profile?.name ? profile.name[0]?.toUpperCase() : "U"}
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground text-sm">{profile?.name || "Customer"}</h4>
                          <span className="text-muted-foreground">{loggedInPhone}</span>
                        </div>
                      </div>

                      <div className="border-t border-border/50 pt-3 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Default City:</span>
                          <span className="font-bold text-foreground">{profile?.city || "Karachi"}</span>
                        </div>
                        {profile?.address && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Address:</span>
                            <span className="font-bold text-foreground truncate max-w-[160px]">
                              {profile.address}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fast Checkout:</span>
                          <span className="font-bold text-emerald-500">Auto-filled</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-border/50 pt-4">
                    <button
                      onClick={handleLogout}
                      className="w-full rounded-xl border border-destructive/20 bg-destructive/5 py-2.5 text-xs font-bold text-destructive hover:bg-destructive/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" /> Switch Phone / Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[70] flex items-center gap-2.5 rounded-full bg-sky-hero px-5 py-3 text-sm font-semibold text-primary-foreground shadow-xl animate-fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
}
