import { useState, useEffect, useCallback } from "react";
import { products as initialProducts, type Product } from "@/data/products";
import { api } from "./api";

const CATALOG_STORAGE_KEY = "gz_dynamic_catalog";
const EVENT_PRODUCTS_UPDATED = "gz_products_updated";

/**
 * Helper to compress and convert any file from Desktop / Mobile into an optimized Data URL.
 * Automatically limits dimension to maxDim and applies quality compression for fast loading.
 */
export function optimizeImageFile(
  file: File,
  maxDim = 1000,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If SVG or tiny file, read directly
    if (file.type === "image/svg+xml" || file.size < 20 * 1024) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first, fallback to JPEG
        let dataUrl = canvas.toDataURL("image/webp", quality);
        if (!dataUrl.startsWith("data:image/webp")) {
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }
        resolve(dataUrl);
      };
      img.onerror = () => {
        resolve(reader.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Get initial cached products synchronously
 */
export function getStoredProducts(): Product[] {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(CATALOG_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
  }
  return initialProducts;
}

/**
 * React Hook for store-wide product catalog
 */
export function useProducts() {
  const [productsList, setProductsList] = useState<Product[]>(getStoredProducts);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<"mongodb" | "fallback">("mongodb");

  const syncProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getProducts();
      if (res.products && res.products.length > 0) {
        setProductsList(res.products);
        setSource(res.source);
        if (typeof window !== "undefined") {
          localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(res.products));
        }
      }
    } catch (e) {
      console.warn("Product sync error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    syncProducts();

    const handleUpdate = (event: CustomEvent<Product[]>) => {
      if (event.detail && Array.isArray(event.detail)) {
        setProductsList(event.detail);
      } else {
        syncProducts();
      }
    };

    window.addEventListener(EVENT_PRODUCTS_UPDATED as any, handleUpdate);
    return () => {
      window.removeEventListener(EVENT_PRODUCTS_UPDATED as any, handleUpdate);
    };
  }, [syncProducts]);

  const notifyUpdate = (updatedList: Product[]) => {
    setProductsList(updatedList);
    if (typeof window !== "undefined") {
      localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(updatedList));
      window.dispatchEvent(
        new CustomEvent(EVENT_PRODUCTS_UPDATED, { detail: updatedList })
      );
    }
  };

  return {
    products: productsList,
    loading,
    source,
    refreshProducts: syncProducts,
    notifyUpdate,
  };
}
