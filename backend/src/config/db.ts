import mongoose from "mongoose";

export async function connectDB(): Promise<typeof mongoose | null> {
  const uri =
    process.env["MONGODB_URI"] ||
    "mongodb+srv://admin:admin123@cluster0.4ouxhp3.mongodb.net/gadgetzone?retryWrites=true&w=majority&appName=Cluster0";

  if (!uri) {
    console.warn("⚠️ [MongoDB] MONGODB_URI is not set.");
    return null;
  }

  try {
    const conn = await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
    });
    console.log(`✅ [MongoDB Atlas] Connected to database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error("❌ [MongoDB Atlas] Connection failed:", (error as Error).message);
    return null;
  }
}

export function getDbHealth() {
  const state = mongoose.connection?.readyState ?? 0;
  const states = ["Disconnected", "Connected", "Connecting", "Disconnecting"];
  return {
    connected: state === 1,
    readyState: state,
    statusText: states[state] || "Unknown",
    database: mongoose.connection?.name || "gadgetzone",
  };
}
