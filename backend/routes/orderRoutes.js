import express from "express";
import { createOrder, getMyOrders } from "../controllers/orderController.js"; // Import your controller
import { auth } from "../middleware/authMiddleware.js"; // Assuming you have a middleware for authentication

const router = express.Router();

// POST request to create an order
router.post("/orders/create", auth, createOrder);
router.get("/my-orders/:userId", auth, getMyOrders);

export default router;
