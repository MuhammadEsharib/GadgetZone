import { products as fallbackProducts, type Product } from "@/data/products";
import { type Order, type OrderItem } from "./orderTypes";

function getApiBase(): string {
  if (typeof window === "undefined") {
    return process.env.BACKEND_URL || "http://localhost:5000/api";
  }
  // When running locally in browser (on localhost:3000, 5173, etc.)
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return "http://localhost:5000/api";
  }
  return "/api";
}

const API_BASE = getApiBase();

async function safeFetchJson<T = any>(
  url: string,
  options?: RequestInit
): Promise<{ ok: boolean; status: number; data?: T; error?: string }> {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const json = await res.json();
      return { ok: res.ok, status: res.status, data: json };
    }

    const text = await res.text();
    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: text || `Server error (${res.status})`,
      };
    }

    // Try parsing if possible
    try {
      const parsed = JSON.parse(text);
      return { ok: true, status: res.status, data: parsed };
    } catch {
      return {
        ok: false,
        status: res.status,
        error: "Server returned non-JSON response. Ensure backend is running.",
      };
    }
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: (err as Error).message || "Network request failed",
    };
  }
}

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
 */
export const api = {
  /**
   * Health Check
   */
  async getHealth(): Promise<ApiHealthResponse | null> {
    try {
      const result = await safeFetchJson<ApiHealthResponse>(`${API_BASE}/health`, {
        signal: AbortSignal.timeout(4000),
      });
      if (result.ok && result.data) return result.data;
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
      const result = await safeFetchJson<{ products: Product[] }>(`${API_BASE}/products`, {
        signal: AbortSignal.timeout(6000),
      });
      if (result.ok && result.data?.products && result.data.products.length > 0) {
        return { products: result.data.products, source: "mongodb" };
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
    const result = await safeFetchJson<{ success: boolean; product?: Product; error?: string; message?: string }>(
      `${API_BASE}/products`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!result.ok || !result.data) {
      return { success: false, error: result.error || "Failed to create product" };
    }
    return result.data;
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
    const result = await safeFetchJson<{ success: boolean; product?: Product; error?: string; message?: string }>(
      `${API_BASE}/products/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!result.ok || !result.data) {
      return { success: false, error: result.error || "Failed to update product" };
    }
    return result.data;
  },

  /**
   * Delete Product (Admin)
   */
  async deleteProduct(
    id: number | string
  ): Promise<{ success: boolean; error?: string; message?: string }> {
    const result = await safeFetchJson<{ success: boolean; error?: string; message?: string }>(
      `${API_BASE}/products/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!result.ok || !result.data) {
      return { success: false, error: result.error || "Failed to delete product" };
    }
    return result.data;
  },

  /**
   * Trigger Seed in MongoDB
   */
  async seedCatalog(): Promise<{ success: boolean; seeded: boolean; count: number }> {
    const result = await safeFetchJson<{ success: boolean; seeded: boolean; count: number }>(
      `${API_BASE}/products/seed`,
      { method: "POST" }
    );
    if (!result.ok || !result.data) {
      return { success: false, seeded: false, count: 0 };
    }
    return result.data;
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
    const result = await safeFetchJson<{
      success: boolean;
      orderNumber?: string;
      order?: Order;
      waLink?: string;
      error?: string;
      message?: string;
    }>(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!result.ok || !result.data) {
      return {
        success: false,
        error: result.error || result.data?.error || "Order placement failed. Please ensure the backend is running.",
      };
    }
    return result.data;
  },

  /**
   * List all orders (Admin)
   */
  async listOrders(limit = 100): Promise<Order[]> {
    const result = await safeFetchJson<{ orders: Order[] }>(`${API_BASE}/orders?limit=${limit}`, {
      signal: AbortSignal.timeout(6000),
    });
    if (result.ok && result.data?.orders) {
      return result.data.orders;
    }
    return [];
  },

  /**
   * Track order by Order Number or Phone Number
   */
  async trackOrder(query: string): Promise<Order[]> {
    const result = await safeFetchJson<{ orders: Order[] }>(
      `${API_BASE}/orders/track?query=${encodeURIComponent(query)}`,
      {
        signal: AbortSignal.timeout(6000),
      }
    );
    if (result.ok && result.data?.orders) {
      return result.data.orders;
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
    const result = await safeFetchJson<{ success: boolean; order?: Order; error?: string }>(
      `${API_BASE}/orders/${encodeURIComponent(orderNumber)}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );
    if (!result.ok || !result.data) {
      return { success: false, error: result.error || "Failed to update order status" };
    }
    return result.data;
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
    const result = await safeFetchJson<{ success: boolean; message?: string; error?: string }>(
      `${API_BASE}/contact`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!result.ok || !result.data) {
      return { success: false, error: result.error || "Failed to submit contact message" };
    }
    return result.data;
  },

  /**
   * Newsletter Subscription
   */
  async subscribeNewsletter(payload: {
    email?: string;
    phone?: string;
    source?: string;
  }): Promise<{ success: boolean; message?: string; error?: string }> {
    const result = await safeFetchJson<{ success: boolean; message?: string; error?: string }>(
      `${API_BASE}/contact/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!result.ok || !result.data) {
      return { success: false, error: result.error || "Failed to subscribe" };
    }
    return result.data;
  },
};
