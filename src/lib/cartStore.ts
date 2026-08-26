import { useState, useEffect, useCallback } from "react";

export type CartItemData = {
  id: number;
  qty: number;
};

// Event name for cross-component sync
const CART_UPDATE_EVENT = "tg_cart_update";

// Helper to read from local storage
const readCart = (): CartItemData[] => {
  try {
    const raw = localStorage.getItem("cartItems");
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading cart", e);
  }
  return [];
};

// Helper to write to local storage and dispatch event
const writeCart = (items: CartItemData[]) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
  // Keep the simple 'cart' item count for legacy code compatibility
  const count = items.reduce((s, i) => s + i.qty, 0);
  localStorage.setItem("cart", String(count));
  window.dispatchEvent(new Event(CART_UPDATE_EVENT));
};

export function useCart() {
  const [items, setItems] = useState<CartItemData[]>([]);

  // Sync state from storage
  const sync = useCallback(() => {
    setItems(readCart());
  }, []);

  useEffect(() => {
    sync(); // initial load

    // Listen for updates from same window
    window.addEventListener(CART_UPDATE_EVENT, sync);
    // Listen for updates from other tabs
    window.addEventListener("storage", (e) => {
      if (e.key === "cartItems") {
        sync();
      }
    });

    return () => {
      window.removeEventListener(CART_UPDATE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  const addToCart = useCallback((id: number, qty: number = 1) => {
    const current = readCart();
    const existing = current.find((i) => i.id === id);
    if (existing) {
      existing.qty += qty;
    } else {
      current.push({ id, qty });
    }
    writeCart(current);
  }, []);

  const updateQty = useCallback((id: number, qty: number) => {
    const current = readCart();
    const updated = current.map((i) => (i.id === id ? { ...i, qty } : i));
    writeCart(updated);
  }, []);

  const removeFromCart = useCallback((id: number) => {
    const current = readCart();
    const updated = current.filter((i) => i.id !== id);
    writeCart(updated);
  }, []);

  const clearCart = useCallback(() => {
    writeCart([]);
  }, []);

  const cartCount = items.reduce((acc, item) => acc + item.qty, 0);

  return {
    items,
    cartCount,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
  };
}
