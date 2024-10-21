import express from "express";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/user/checkout", auth, (req, res) => {
  res.json({ message: "Proceed to checkout" });
});

export default router;
