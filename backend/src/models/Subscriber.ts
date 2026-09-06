import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISubscriberDocument extends Document {
  email?: string;
  phone?: string;
  source: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriberSchema = new Schema<ISubscriberDocument>(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
      sparse: true,
    },
    phone: {
      type: String,
      trim: true,
      index: true,
      sparse: true,
    },
    source: {
      type: String,
      default: "footer_newsletter",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "subscribers",
  }
);

export const SubscriberModel: Model<ISubscriberDocument> =
  (mongoose.models["Subscriber"] as Model<ISubscriberDocument>) ||
  mongoose.model<ISubscriberDocument>("Subscriber", SubscriberSchema);
