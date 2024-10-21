import Order from "../models/orderModel.js";

// controllers/orderController.js

export const createOrder = async (req, res) => {
  const { userId, items, totalAmount, paymentMethod, accountNumber } = req.body;

  if (!userId || !items || !totalAmount || !paymentMethod || !accountNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const order = new Order({
      userId, // The authenticated user ID
      items,
      totalAmount,
      paymentMethod,
      accountNumber,
      status: "pending",
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.log("Error creating order:", error.message); // Log error
    res.status(500).json({ message: "Error creating order", error });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.log("Error fetching user orders:", error.message);
    res.status(500).json({ message: "Error fetching user orders", error });
  }
};
