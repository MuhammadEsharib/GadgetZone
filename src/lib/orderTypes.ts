export type OrderItem = {
  id?: number | undefined;
  name: string;
  price: number;
  qty: number;
  image?: string | undefined;
};

export type TrackingStep = {
  title: string;
  description: string;
  time?: string | undefined;
  completed: boolean;
  current: boolean;
};

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  customerEmail?: string | undefined;
  address: string;
  city: string;
  notes?: string | undefined;
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "Pending Processing" | "Confirmed" | "Dispatched" | "Out for Delivery" | "Delivered" | "Cancelled" | string;
  trackingSteps?: TrackingStep[] | undefined;
  createdAt: string;
  ip?: string | undefined;
};
