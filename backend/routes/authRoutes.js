import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Signup Route
router.post("/signup", async (req, res) => {
  console.log("called");
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ name, email, password, role: role || "user" });
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email, name: user.name },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

export default router;
