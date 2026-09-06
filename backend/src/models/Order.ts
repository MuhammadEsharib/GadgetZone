import mongoose, { Schema, Document, Model } from "mongoose";

export interface OrderItem {
  id?: number;
  name: string;
  price: number;
  qty: number;
  image?: string;
}

export interface TrackingStep {
  title: string;
  description: string;
  time?: string;
  completed: boolean;
  current: boolean;
}

export interface IOrderDocument extends Document {
  orderNumber: string;
  customerName: string;
  phone: string;
  customerEmail?: string;
  address: string;
  city: string;
  notes?: string;
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  trackingSteps: TrackingStep[];
  ip?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<OrderItem>(
  {
    id: { type: Number },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, default: 1 },
    image: { type: String },
  },
  { _id: false }
);

const TrackingStepSchema = new Schema<TrackingStep>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    time: { type: String },
    completed: { type: Boolean, default: false },
    current: { type: Boolean, default: false },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrderDocument>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    customerEmail: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "Cash on Delivery (COD)",
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      default: [],
    },
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    shipping: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      default: "Pending Processing",
      index: true,
    },
    trackingSteps: {
      type: [TrackingStepSchema],
      default: [],
    },
    ip: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

export const OrderModel: Model<IOrderDocument> =
  (mongoose.models["Order"] as Model<IOrderDocument>) ||
  mongoose.model<IOrderDocument>("Order", OrderSchema);
