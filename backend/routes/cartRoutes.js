import express from "express";
import {
  addToCart,
  updateCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/cart", addToCart); // Add to cart
router.put("/cart/:cartId", updateCart); // Update cart item quantity
router.delete("/cart/:cartId", removeFromCart); // Remove item from cart
router.get("/cart/:userId", getCart); // Get user's cart

export default router;
