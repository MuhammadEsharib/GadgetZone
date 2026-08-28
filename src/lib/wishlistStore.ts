import { useState, useEffect, useCallback } from "react";

const WISHLIST_UPDATE_EVENT = "tg_wishlist_update";

const readWishlist = (): number[] => {
  try {
    const raw = localStorage.getItem("wishlistItems");
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading wishlist", e);
  }
  return [];
};

const writeWishlist = (items: number[]) => {
  localStorage.setItem("wishlistItems", JSON.stringify(items));
  window.dispatchEvent(new Event(WISHLIST_UPDATE_EVENT));
};

export function useWishlist() {
  const [items, setItems] = useState<number[]>([]);

  const sync = useCallback(() => {
    setItems(readWishlist());
  }, []);

  useEffect(() => {
    sync(); // initial load

    window.addEventListener(WISHLIST_UPDATE_EVENT, sync);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "wishlistItems") {
        sync();
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(WISHLIST_UPDATE_EVENT, sync);
      window.removeEventListener("storage", handleStorage);
    };
  }, [sync]);

  const addToWishlist = useCallback((id: number) => {
    const current = readWishlist();
    if (!current.includes(id)) {
      current.push(id);
      writeWishlist(current);
    }
  }, []);

  const removeFromWishlist = useCallback((id: number) => {
    const current = readWishlist();
    const updated = current.filter((item) => item !== id);
    writeWishlist(updated);
  }, []);

  const toggleWishlist = useCallback((id: number) => {
    const current = readWishlist();
    if (current.includes(id)) {
      const updated = current.filter((item) => item !== id);
      writeWishlist(updated);
    } else {
      current.push(id);
      writeWishlist(current);
    }
  }, []);

  const isInWishlist = useCallback(
    (id: number) => {
      return items.includes(id);
    },
    [items],
  );

  const clearWishlist = useCallback(() => {
    writeWishlist([]);
  }, []);

  const wishlistCount = items.length;

  return {
    items,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };
}
