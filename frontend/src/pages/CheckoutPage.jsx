import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../store/cartSlice";
import PaymentModal from "./PaymentModal";
import axios from "axios";

const CartPage = () => {
  const { user } = useAuth(); // Fetch user from AuthContext
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const userToken = localStorage.getItem("token");

  console.log("User Token:", userToken); // Log the token to ensure it's correctly retrieved
  console.log("User Data:", user); // Log the user data for verification

  const handlePurchase = () => {
    setModalOpen(true); // Open the modal
  };

  const handlePaymentConfirm = async (paymentMethod, accountNumber) => {
    try {
      if (!userToken) {
        throw new Error("User is not authenticated or token is missing");
      }

      // Create the order data
      const orderData = {
        userId: user?.userId, // Fetch the userId from context
        items: cartItems,
        totalAmount: totalPrice,
        paymentMethod,
        accountNumber,
      };

      console.log("Sending order data:", orderData); // Log the order data being sent

      // Send the order data to the backend
      const response = await axios.post("/api/orders/create", orderData, {
        headers: {
          Authorization: `Bearer ${userToken}`, // Attach the token in the header
        },
      });

      console.log("Order created successfully:", response.data);
      setModalOpen(false);
      alert("Payment successful and order placed!");
    } catch (error) {
      console.error(
        "Error during payment:",
        error.response?.data || error.message
      );
      alert("Error during payment, please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add items to the cart first.</p>
      ) : (
        <div>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="mb-4 flex justify-between items-center border-b pb-2"
              >
                <div>
                  {item.name} - ${item.price} (x{item.quantity})
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item._id))}
                    className="bg-gray-300 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item._id))}
                    className="bg-gray-300 px-2 py-1 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="bg-red-500 text-white px-3 py-1 ml-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <p className="text-xl font-bold mb-4">Total: ${totalPrice}</p>

          <button
            className="text-white bg-green-500 px-4 py-2 rounded"
            onClick={handlePurchase}
          >
            Confirm Purchase
          </button>

          {/* Render the PaymentModal */}
          <PaymentModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onConfirmPayment={handlePaymentConfirm}
          />
        </div>
      )}
    </div>
  );
};

export default CartPage;
