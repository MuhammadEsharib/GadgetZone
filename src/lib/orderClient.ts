import { type Order, type TrackingStep, type OrderItem } from "./orderTypes";
import { api } from "./api";
import { cleanPhone } from "@/lib/auth";

/**
 * Safely parse any price representation into a positive integer
 */
export function parseNumericPrice(val: unknown): number {
  if (typeof val === "number" && !isNaN(val)) return Math.round(val);
  if (typeof val === "string") {
    const cleaned = val.replace(/[^0-9]/g, "");
    const parsed = parseInt(cleaned, 10);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

/**
 * Generate standardized 5-step live tracking timeline
 */
export function generateClientTracking(order: Partial<Order>): TrackingStep[] {
  const status = order.status || "Pending Processing";
  const createdDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Recent";

  return [
    {
      title: "Order Placed & Logged",
      description: `Order received and logged in system. (${createdDate})`,
      time: createdDate,
      completed: true,
      current: status === "Pending Processing",
    },
    {
      title: "Quality Check & Packing",
      description: "Inspected at Karachi fulfillment warehouse & packaged with 7-day warranty tag.",
      completed:
        status === "Confirmed" ||
        status === "Dispatched" ||
        status === "Out for Delivery" ||
        status === "Delivered",
      current: status === "Confirmed",
    },
    {
      title: "Dispatched / In Transit",
      description: "Handed over to courier express logistics partner for doorstep delivery.",
      completed: status === "Dispatched" || status === "Out for Delivery" || status === "Delivered",
      current: status === "Dispatched",
    },
    {
      title: "Out for Delivery",
      description: "Rider is en route to your specified delivery address.",
      completed: status === "Out for Delivery" || status === "Delivered",
      current: status === "Out for Delivery",
    },
    {
      title: "Delivered",
      description: "Package handed over to customer. Payment collected via chosen method.",
      completed: status === "Delivered",
      current: status === "Delivered",
    },
  ];
}

/**
 * Normalize an order from any schema into a clean, complete Order object
 */
export function normalizeOrder(raw: any): Order {
  const subtotal = parseNumericPrice(raw.subtotal || raw.price);
  const shipping = raw.shipping !== undefined ? parseNumericPrice(raw.shipping) : (subtotal > 5000 || subtotal === 0 ? 0 : 299);
  const total = raw.total !== undefined ? parseNumericPrice(raw.total) : (subtotal + shipping);

  let items: OrderItem[] = [];
  if (Array.isArray(raw.items) && raw.items.length > 0) {
    items = raw.items.map((i: any) => ({
      id: i.id ? Number(i.id) : undefined,
      name: String(i.name || "Gadget Item"),
      price: parseNumericPrice(i.price),
      qty: Number(i.qty) || 1,
      image: i.image,
    }));
  } else if (raw.product) {
    items = [
      {
        name: String(raw.product),
        price: subtotal,
        qty: 1,
      },
    ];
  }

  const orderNumber = String(raw.orderNumber || raw.id || `GZ-${Math.floor(1000 + Math.random() * 9000)}`);
  const status = String(raw.status || "Pending Processing");

  return {
    id: orderNumber,
    orderNumber,
    customerName: String(raw.customerName || raw.shippingAddress?.name || "Customer"),
    phone: cleanPhone(String(raw.phone || raw.shippingAddress?.phone || "")),
    customerEmail: raw.customerEmail || "",
    address: String(raw.address || raw.shippingAddress?.address || ""),
    city: String(raw.city || raw.shippingAddress?.city || "Karachi"),
    notes: raw.notes || "",
    paymentMethod: String(raw.paymentMethod || "Cash on Delivery"),
    items,
    subtotal: subtotal || total,
    shipping,
    total: total || subtotal,
    status,
    trackingSteps: raw.trackingSteps || generateClientTracking({ status, createdAt: raw.createdAt || raw.date }),
    createdAt: String(raw.createdAt || raw.date || new Date().toISOString()),
  };
}

/**
 * Fetch local orders stored in browser localStorage
 */
export function getLocalOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("gz_orders");
    if (!raw) return [];
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return [];
    return list.map(normalizeOrder);
  } catch (e) {
    console.error("Error reading local orders", e);
    return [];
  }
}

/**
 * Save order to browser localStorage history
 */
export function saveLocalOrder(order: Order): void {
  if (typeof window === "undefined") return;
  try {
    const current = getLocalOrders();
    const filtered = current.filter((o) => o.orderNumber !== order.orderNumber);
    filtered.unshift(normalizeOrder(order));
    localStorage.setItem("gz_orders", JSON.stringify(filtered));
  } catch (e) {
    console.error("Error saving local order", e);
  }
}

/**
 * Safe client caller for customer orders lookup
 */
export async function clientFetchOrders(phone: string, name?: string): Promise<{ orders: Order[]; profile?: any }> {
  const normalizedInputPhone = cleanPhone(phone);
  const localOrders = getLocalOrders().filter(
    (o) => cleanPhone(o.phone) === normalizedInputPhone || o.phone.includes(normalizedInputPhone),
  );

  try {
    const serverOrders = await api.trackOrder(normalizedInputPhone);

    if (serverOrders && Array.isArray(serverOrders)) {
      const mapped: Order[] = serverOrders.map(normalizeOrder);
      const mergedMap = new Map<string, Order>();

      mapped.forEach((o) => mergedMap.set(o.orderNumber, o));
      localOrders.forEach((o) => {
        if (!mergedMap.has(o.orderNumber)) {
          mergedMap.set(o.orderNumber, o);
        }
      });

      const last = mapped[0] || localOrders[0];
      return {
        orders: Array.from(mergedMap.values()),
        profile: {
          name: name || last?.customerName || "Customer",
          phone: normalizedInputPhone,
          email: last?.customerEmail || "",
          address: last?.address || "",
          city: last?.city || "Karachi",
        },
      };
    }
  } catch (e) {
    console.warn("Server orders fetch failed:", e);
  }

  return {
    orders: localOrders,
    profile: {
      name: name || localOrders[0]?.customerName || "Customer",
      phone: normalizedInputPhone,
      email: localOrders[0]?.customerEmail || "",
      address: localOrders[0]?.address || "",
      city: localOrders[0]?.city || "Karachi",
    },
  };
}

/**
 * Safe client caller for single order tracking
 */
export async function clientTrackSingleOrder(query: string): Promise<{ order?: Order; error?: string }> {
  const cleanId = query.trim().toUpperCase();
  const localMatch = getLocalOrders().find(
    (o) => o.orderNumber.toUpperCase() === cleanId || o.id.toUpperCase() === cleanId,
  );

  try {
    const orders = await api.trackOrder(cleanId);
    if (orders && orders.length > 0) {
      return { order: normalizeOrder(orders[0]) };
    }
  } catch (e) {
    console.warn("Server tracking query failed:", e);
  }

  if (localMatch) {
    return { order: localMatch };
  }

  return { error: `No order found with ID #${cleanId}` };
}

/**
 * Fetch all orders for Admin Dashboard (Server + Local Merge)
 */
export async function clientListAllOrders(): Promise<Order[]> {
  const localList = getLocalOrders();
  const map = new Map<string, Order>();
  localList.forEach((o) => map.set(o.orderNumber, o));

  try {
    const serverOrders = await api.listOrders(200);
    if (serverOrders && Array.isArray(serverOrders)) {
      serverOrders.forEach((o) => {
        const normalized = normalizeOrder(o);
        map.set(normalized.orderNumber, normalized);
      });
    }
  } catch (e) {
    console.warn("Server listOrders fetch failed, displaying local cache:", e);
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

/**
 * Admin: Update Order Status
 */
export async function clientUpdateOrderStatus(
  orderNumber: string,
  newStatus: string,
): Promise<{ success: boolean; order?: Order; error?: string }> {
  try {
    const res = await api.updateOrderStatus(orderNumber, newStatus);
    if (res && res.success && res.order) {
      const normalized = normalizeOrder(res.order);
      saveLocalOrder(normalized);
      return { success: true, order: normalized };
    }
  } catch (e) {
    console.warn("Server status update failed, updating local state:", e);
  }

  // Update local storage fallback
  const all = getLocalOrders();
  const target = all.find((o) => o.orderNumber === orderNumber);
  if (target) {
    target.status = newStatus;
    target.trackingSteps = generateClientTracking({ ...target, status: newStatus });
    saveLocalOrder(target);
    return { success: true, order: target };
  }

  return { success: false, error: `Order #${orderNumber} not found.` };
}

