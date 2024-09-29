import Order from "../models/orderModel.js";

// controllers/orderController.js

export const createOrder = async (req, res) => {
  const { userId, items, totalAmount, paymentMethod, accountNumber } = req.body;

  if (!userId || !items || !totalAmount || !paymentMethod || !accountNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }
  console.log("Request body:", req.body); // Log request body
  console.log("Authenticated user:", req.user); // Log the authenticated user

  try {
    // Create order logic
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
// controllers/orderController.js

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the userId is passed via params
    console.log("Fetching orders for user:", userId);

    // Find orders where the userId matches the authenticated user
    const orders = await Order.find({ userId }); // Fetch orders only for this user

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
