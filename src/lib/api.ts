import { products as fallbackProducts, type Product } from "@/data/products";
import { type Order, type OrderItem } from "./orderTypes";

const API_BASE = typeof window !== "undefined" ? "/api" : "http://localhost:5000/api";

export interface ApiHealthResponse {
  status: string;
  service: string;
  database: {
    connected: boolean;
    readyState: number;
    statusText: string;
    database: string;
  };
  timestamp: string;
}

/**
 * Robust REST API Client for The Gadget Zone Frontend
 * Zero Vite SSR dynamic import / Seroval reload errors.
 */
export const api = {
  /**
   * Health Check
   */
  async getHealth(): Promise<ApiHealthResponse | null> {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(4000) });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("API Health Check Offline (falling back):", e);
    }
    return null;
  },

  /**
   * Fetch all products from MongoDB Atlas (with fallback)
   */
  async getProducts(): Promise<{ products: Product[]; source: "mongodb" | "fallback" }> {
    try {
      const res = await fetch(`${API_BASE}/products`, { signal: AbortSignal.timeout(6000) });
      if (res.ok) {
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          return { products: data.products, source: "mongodb" };
        }
      }
    } catch (e) {
      console.warn("Product API offline, using cached catalog:", e);
    }
    return { products: fallbackProducts, source: "fallback" };
  },

  /**
   * Create New Product (Admin)
   */
  async createProduct(payload: {
    name: string;
    category: string;
    price: number;
    oldPrice?: number | undefined;
    description: string;
    image: string;
    gallery?: string[];
    stockCount?: number;
    inStock?: boolean;
    featured?: boolean;
    isDeal?: boolean;
    isDealOfTheDay?: boolean;
    dealTag?: string;
    dealExpiry?: string;
    adminPasscode?: string;
  }): Promise<{ success: boolean; product?: Product; error?: string; message?: string }> {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: (e as Error).message || "Network request failed" };
    }
  },

  /**
   * Update Existing Product (Admin)
   */
  async updateProduct(
    id: number | string,
    payload: {
      name?: string;
      category?: string;
      price?: number;
      oldPrice?: number | undefined;
      description?: string;
      image?: string;
      gallery?: string[];
      stockCount?: number;
      inStock?: boolean;
      featured?: boolean;
      rating?: number;
      isDeal?: boolean;
      isDealOfTheDay?: boolean;
      dealTag?: string;
      dealExpiry?: string;
      adminPasscode?: string;
    }
  ): Promise<{ success: boolean; product?: Product; error?: string; message?: string }> {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: (e as Error).message || "Network request failed" };
    }
  },

  /**
   * Delete Product (Admin)
   */
  async deleteProduct(
    id: number | string
  ): Promise<{ success: boolean; error?: string; message?: string }> {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "DELETE",
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: (e as Error).message || "Network request failed" };
    }
  },

  /**
   * Trigger Seed in MongoDB
   */
  async seedCatalog(): Promise<{ success: boolean; seeded: boolean; count: number }> {
    try {
      const res = await fetch(`${API_BASE}/products/seed`, { method: "POST" });
      return await res.json();
    } catch (e) {
      return { success: false, seeded: false, count: 0 };
    }
  },

  /**
   * Place a new order
   */
  async createOrder(payload: {
    customerName: string;
    phone: string;
    customerEmail?: string;
    address: string;
    city: string;
    notes?: string;
    paymentMethod: string;
    items: OrderItem[];
  }): Promise<{
    success: boolean;
    orderNumber?: string;
    order?: Order;
    waLink?: string;
    error?: string;
    message?: string;
  }> {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Order placement failed." };
      }
      return data;
    } catch (e) {
      return { success: false, error: (e as Error).message || "Failed to reach order server." };
    }
  },

  /**
   * List all orders (Admin)
   */
  async listOrders(limit = 100): Promise<Order[]> {
    try {
      const res = await fetch(`${API_BASE}/orders?limit=${limit}`, {
        signal: AbortSignal.timeout(6000),
      });
      if (res.ok) {
        const data = await res.json();
        return data.orders || [];
      }
    } catch (e) {
      console.warn("Could not fetch orders from API:", e);
    }
    return [];
  },

  /**
   * Track order by Order Number or Phone Number
   */
  async trackOrder(query: string): Promise<Order[]> {
    try {
      const res = await fetch(`${API_BASE}/orders/track?query=${encodeURIComponent(query)}`, {
        signal: AbortSignal.timeout(6000),
      });
      if (res.ok) {
        const data = await res.json();
        return data.orders || [];
      }
    } catch (e) {
      console.warn("Tracking request failed:", e);
    }
    return [];
  },

  /**
   * Update Order Status (Admin)
   */
  async updateOrderStatus(
    orderNumber: string,
    status: string
  ): Promise<{ success: boolean; order?: Order; error?: string }> {
    try {
      const res = await fetch(`${API_BASE}/orders/${encodeURIComponent(orderNumber)}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: (e as Error).message };
    }
  },

  /**
   * Submit Contact Form
   */
  async submitContact(payload: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: (e as Error).message };
    }
  },

  /**
   * Newsletter Subscription
   */
  async subscribeNewsletter(payload: {
    email?: string;
    phone?: string;
    source?: string;
  }): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const res = await fetch(`${API_BASE}/contact/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: (e as Error).message };
    }
  },
};
