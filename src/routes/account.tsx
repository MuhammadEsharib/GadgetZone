import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useUser, useAuth, useClerk, SignIn } from "@clerk/tanstack-react-start";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { LiveVisitors } from "@/components/store/LiveVisitors";
import { useCart } from "@/lib/cartStore";
import {
  User,
  LogIn,
  Key,
  Mail,
  CheckCircle2,
  ShoppingBag,
  Landmark,
  ArrowRight,
  ShieldCheck,
  Heart,
  LogOut,
  Package,
} from "lucide-react";

export const Route = createFileRoute("/account")({
  component: Account,
});

function Account() {
  const [cart, setCart] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const { signOut } = useClerk();

  const user = clerkUser
    ? {
        name: clerkUser.fullName || clerkUser.username || "Customer",
        email: clerkUser.primaryEmailAddress?.emailAddress || "",
      }
    : null;

  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const notify = useCallback((message: string) => setToast(message), []);

  // Sync cart from localStorage
  useEffect(() => {
    const storedCart = Number(localStorage.getItem("cart"));
    if (Number.isFinite(storedCart) && storedCart >= 0) {
      setCart(Math.floor(storedCart));
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  const handleSignOut = async () => {
    await signOut();
    notify("Signed out successfully.");
  };

  // Dynamic Orders loaded from localStorage (populated by checkout flow)
  const [orders, setOrders] = useState<
    { id: string; date: string; product: string; price: string; status: string }[]
  >([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("gz_orders");
      if (raw) {
        setOrders(JSON.parse(raw));
      } else {
        // Placeholder sample orders until a real purchase is made
        setOrders([
          {
            id: "GZ-9283",
            date: "Aug 15, 2026",
            product: "Wireless Pro Earbuds",
            price: "Rs. 7,999",
            status: "Delivered",
          },
          {
            id: "GZ-8712",
            date: "Aug 02, 2026",
            product: "Smart Watch Series 9",
            price: "Rs. 12,499",
            status: "Delivered",
          },
        ]);
      }
    } catch {
      setOrders([]);
    }
  }, [clerkUser]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={cart} onNotify={notify} />

      {/* Header Spacer */}
      <div className="pt-24 sm:pt-28 md:pt-32" />

      <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {user ? (
          /* User Dashboard View (Logged In) */
          <div className="animate-fade-in space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border/60 pb-6">
              <div>
                <h1 className="font-display text-3xl font-extrabold text-royal-deep">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="mt-4 self-start rounded-full border border-royal/30 px-5 py-2.5 text-xs font-bold text-royal transition-colors hover:bg-royal/10 md:mt-0 inline-flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>

            {/* Dashboard Panels */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Profile Card */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm space-y-6">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Membership Profile
                </h3>
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-sky-soft text-royal">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{user.name}</h4>
                    <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-royal/15 bg-royal/10 px-2.5 py-0.5 text-[10px] font-bold text-royal">
                      <ShieldCheck className="h-3 w-3" /> Pro Member
                    </span>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-4 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Account Type:</span>
                    <span className="font-bold text-foreground">Customer</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Member Since:</span>
                    <span className="font-bold text-foreground">August 2026</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Tech Drops Access:</span>
                    <span className="font-bold text-emerald-500">Enabled</span>
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm lg:col-span-2 space-y-6">
                <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-royal" /> Order History
                </h3>

                {orders.length === 0 ? (
                  <div className="flex flex-col items-center gap-3 py-10 text-center">
                    <Package className="h-10 w-10 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground">
                      No orders yet. Place your first order!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between border border-border/60 rounded-xl p-4 hover:border-royal/20 transition-all bg-sky-hero/10"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-royal">{order.id}</span>
                            <span className="text-xs text-muted-foreground">• {order.date}</span>
                          </div>
                          <h4 className="text-sm font-bold text-foreground line-clamp-1">
                            {order.product}
                          </h4>
                        </div>
                        <div className="mt-3 sm:mt-0 flex items-center justify-between sm:justify-end gap-6">
                          <span className="text-sm font-extrabold text-foreground">
                            {order.price}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold border ${
                              order.status === "Delivered"
                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/10"
                                : order.status === "Pending Processing"
                                  ? "bg-amber-500/10 text-amber-500 border-amber-500/10"
                                  : "bg-blue-500/10 text-blue-500 border-blue-500/10"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Authentication Screen (Logged Out) */
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-border/80 bg-card rounded-3xl overflow-hidden shadow-md max-w-5xl mx-auto">
            {/* Left side: branding capsule */}
            <div className="lg:col-span-5 bg-sky-hero text-primary-foreground p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl bg-opacity-70 rounded-2xl border border-white/10">
              {/* Background Tech orbits */}
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border border-dashed border-white/10 pointer-events-none" />
              <div className="absolute left-[10%] bottom-[10%] w-24 h-24 rounded-full border border-dotted border-white/5 pointer-events-none animate-pulse" />

              <div className="z-10">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  <ShieldCheck className="h-3 w-3" /> Secure Gate
                </div>
              </div>

              <div className="mt-12 lg:mt-0 z-10 space-y-4">
                <h2 className="font-display text-3xl font-extrabold leading-tight">
                  Enhance Your <br />
                  Lifestyle
                </h2>
                <p className="text-sm text-primary-foreground/75 leading-relaxed font-medium">
                  Create a profile to unlock faster checkouts, track delivery orders, save favorite
                  gadgets, and claim limited member-only deals.
                </p>
              </div>

              <div className="mt-12 lg:mt-0 border-t border-white/10 pt-6 z-10">
                <p className="text-[11px] text-primary-foreground/50">
                  © 2026 The Gadget Zone Security Portal. All connections are encrypted.
                </p>
              </div>
            </div>

            {/* Right side: Clerk Sign In */}
            <div className="lg:col-span-7 p-4 sm:p-8 flex items-center justify-center bg-card min-h-[500px]">
              <SignIn routing="path" path="/account" signUpUrl="/sign-up" />
            </div>
          </div>
        )}
      </main>

      <Footer />
      <LiveVisitors />

      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[70] flex items-center gap-2.5 rounded-full bg-sky-hero px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-float)]">
          <CheckCircle2 className="h-4 w-4 text-gold" />
          {toast}
        </div>
      )}
    </div>
  );
}
