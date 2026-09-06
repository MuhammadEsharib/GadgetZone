import { Router } from "express";
import {
  createOrder,
  listOrders,
  trackOrder,
  updateOrderStatus,
} from "../controllers/ordersController.js";

const router = Router();

router.post("/", createOrder);
router.get("/", listOrders);
router.get("/track", trackOrder);
router.patch("/:orderNumber/status", updateOrderStatus);

export default router;
