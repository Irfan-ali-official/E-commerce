// controllers/paymentController.js
import Payment from "../models/paymentModel.js";
// controllers/paymentController.js

export const processPayment = async (req, res) => {
  const { userId, orderId, amount, paymentMethod, accountNumber } = req.body;

  try {
    const payment = new Payment({
      userId,
      orderId,
      amount,
      paymentMethod, // Save payment method
      accountNumber, // Save account number
      paymentStatus: "successful",
    });
    await payment.save();

    // Update the order status
    await Order.findByIdAndUpdate(orderId, { status: "completed" });

    res.status(200).json({ message: "Payment successful", payment });
  } catch (error) {
    res.status(500).json({ message: "Error processing payment", error });
  }
};
