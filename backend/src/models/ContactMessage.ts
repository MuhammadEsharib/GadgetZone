import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactMessageDocument extends Document {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: "New" | "In Review" | "Replied" | "Archived";
  createdAt: Date;
  updatedAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessageDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "New",
      enum: ["New", "In Review", "Replied", "Archived"],
    },
  },
  {
    timestamps: true,
    collection: "contact_messages",
  }
);

export const ContactMessageModel: Model<IContactMessageDocument> =
  (mongoose.models["ContactMessage"] as Model<IContactMessageDocument>) ||
  mongoose.model<IContactMessageDocument>("ContactMessage", ContactMessageSchema);
