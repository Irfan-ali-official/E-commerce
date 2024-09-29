import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    //required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the user who placed the order
      required: true,
    },
    items: [itemSchema], // Array of cart items
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["JazzCash", "Easypaisa", "Bank"], // Only allow these values
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending", // Default order status
    },
  },
  { timestamps: true } // Automatically create createdAt and updatedAt fields
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
