import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProductDocument extends Document {
  id: number;
  name: string;
  category: string;
  rating: number;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  gallery: string[];
  description: string;
  inStock: boolean;
  stockCount: number;
  badge?: string;
  featured?: boolean;
  isDeal?: boolean;
  isDealOfTheDay?: boolean;
  dealTag?: string;
  dealExpiry?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProductDocument>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    oldPrice: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    gallery: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stockCount: {
      type: Number,
      default: 50,
    },
    badge: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isDeal: {
      type: Boolean,
      default: false,
      index: true,
    },
    isDealOfTheDay: {
      type: Boolean,
      default: false,
      index: true,
    },
    dealTag: {
      type: String,
    },
    dealExpiry: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "products",
  }
);

export const ProductModel: Model<IProductDocument> =
  (mongoose.models["Product"] as Model<IProductDocument>) ||
  mongoose.model<IProductDocument>("Product", ProductSchema);
