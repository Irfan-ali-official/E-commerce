import express from "express";
import User from "../models/userModel.js"; // Assuming you have a user model

const router = express.Router();

// Fetch all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching users" });
  }
});

// Delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error deleting user" });
  }
});

// Update a user
router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error updating user" });
  }
});

// Search users by name
router.get("/users/search/:name", async (req, res) => {
  try {
    const users = await User.find({ name: new RegExp(req.params.name, "i") });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error searching users" });
  }
});

export default router;
