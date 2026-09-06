import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { type Order } from "@/lib/orderTypes";

type CheckoutButtonProps = {
  items: { name: string; qty: number; price: number; id?: number; image?: string }[];
  customerName: string;
  customerEmail?: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
  total: number;
  notes?: string;
  onSuccess: (orderNumber: string, waLink: string, order?: Order) => void;
};

export function CheckoutButton({
  items,
  customerName,
  customerEmail = "",
  phone,
  address,
  city,
  paymentMethod,
  total,
  notes = "",
  onSuccess,
}: CheckoutButtonProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const calculatedTotal = subtotal + (subtotal > 5000 || subtotal === 0 ? 0 : 299);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [waLink, setWaLink] = useState("");

  const placeOrder = async () => {
    if (loading) return;

    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setError("Please fill out your Name, Phone Number, and Delivery Address.");
      return;
    }

    setLoading(true);
    setError("");
    const toastId = toast.loading("Placing your order...");

    try {
      // Clean payload - only serializable primitives and plain objects
      const payload = {
        customerName: customerName.trim(),
        phone: phone.trim(),
        customerEmail: customerEmail.trim(),
        address: address.trim(),
        city: city.trim(),
        notes: notes.trim(),
        paymentMethod,
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          price: Number(i.price),
          qty: Number(i.qty) || 1,
          image: i.image,
        })),
        total: calculatedTotal,
      };

      const result = await api.createOrder(payload);

      if (!result || !result.success || result.error) {
        throw new Error(result?.error || "Unable to place order.");
      }

      const orderNumber = result.orderNumber || `GZ-${Math.floor(1000 + Math.random() * 9000)}`;
      const waUrl = result.waLink || "";

      toast.success("Order placed successfully!", { id: toastId });
      setWaLink(waUrl);
      onSuccess(orderNumber, waUrl, result.order);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Unable to place your order.";
      toast.error(message, { id: toastId });
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-2">
      <button
        type="button"
        onClick={placeOrder}
        disabled={loading}
        className="w-full rounded-full bg-royal px-6 py-4 text-sm font-bold text-white transition-all hover:bg-royal-deep shadow-lg hover:shadow-royal/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            Placing your order...
          </>
        ) : (
          `Confirm & Place Order (Rs. ${calculatedTotal.toLocaleString()})`
        )}
      </button>
      {error && (
        <p role="alert" className="text-xs font-bold text-destructive text-center">
          {error}
        </p>
      )}
      {waLink && (
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="block text-center text-xs font-bold text-emerald-500 underline-offset-2 hover:underline pt-1"
        >
          📱 Open WhatsApp Order Confirmation
        </a>
      )}
    </div>
  );
}
