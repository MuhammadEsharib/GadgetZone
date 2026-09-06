import { Router } from "express";
import { submitContact, subscribeNewsletter } from "../controllers/contactController.js";

const router = Router();

router.post("/", submitContact);
router.post("/subscribe", subscribeNewsletter);

export default router;
