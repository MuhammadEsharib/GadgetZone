import { useAuth } from "@clerk/tanstack-react-start";
import { useState } from "react";
import toast from "react-hot-toast";
import { ApiError, postData } from "@/lib/api";

type CheckoutButtonProps = {
  items: { name: string; qty: number; price: number }[];
  customerName: string;
  customerEmail: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
  total: number;
  turnstileToken: string;
  onSuccess: (orderNumber: string, waLink: string) => void;
};

export function CheckoutButton(props: CheckoutButtonProps) {
  const { userId } = useAuth();
  const subtotal = props.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const calculatedTotal = subtotal + (subtotal > 5000 ? 0 : 299);
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false);
  const [error, setError] = useState("");
  const [waLink, setWaLink] = useState("");

  const placeOrder = async () => {
    if (loading || locked) return;
    if (!props.turnstileToken) return setError("Please complete the captcha.");
    setLoading(true);
    setLocked(true);
    setError("");
    const toastId = toast.loading("Placing your order...");
    window.setTimeout(() => setLocked(false), 10000);
    try {
      const result = await postData<{ orderNumber: string; waLink: string }>("/api/checkout", {
        ...props,
        total: calculatedTotal,
        userId,
      });
      toast.success("Order placed successfully.", { id: toastId });
      setWaLink(result.waLink);
      props.onSuccess(result.orderNumber, result.waLink);
    } catch (caught) {
      const message =
        caught instanceof ApiError && caught.status === 429
          ? "Slow down. Try again in 10 minutes."
          : caught instanceof Error
            ? caught.message
            : "Unable to place your order.";
      toast.error(message, { id: toastId });
      setError(message);
      setLocked(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-2">
      <button
        type="button"
        onClick={placeOrder}
        disabled={loading || locked}
        className="w-full rounded-full bg-royal px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-royal-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Placing order..." : `Place Order (Rs. ${calculatedTotal.toLocaleString()})`}
      </button>
      {error && (
        <p role="alert" className="text-xs font-bold text-destructive">
          {error}
        </p>
      )}
      {waLink && (
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="block text-center text-xs font-bold text-emerald-600 underline-offset-2 hover:underline"
        >
          Open WhatsApp order
        </a>
      )}
    </div>
  );
}
