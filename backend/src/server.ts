import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, getDbHealth } from "./config/db.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { seedProducts } from "./utils/seeder.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Auto-connect DB middleware for serverless invocations
let isSeeded = false;
app.use(async (_req, _res, next) => {
  await connectDB();
  if (!isSeeded) {
    isSeeded = true;
    seedProducts().catch(() => {});
  }
  next();
});

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Health check endpoint
app.get("/api/health", (_req, res) => {
  const dbHealth = getDbHealth();
  res.json({
    status: "ok",
    service: "GadgetZone Serverless API Server",
    database: dbHealth,
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/orders", ordersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/contact", contactRoutes);

// Global 404 Handler
app.use((_req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// Start Server locally if not running on Vercel Serverless
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 [GadgetZone Backend] Server running on http://localhost:${PORT}`);
    console.log(`📡 [GadgetZone Backend] Health check available at http://localhost:${PORT}/api/health`);
  });
}

export default app;
