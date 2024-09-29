import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const navigate = useNavigate();

  const handlePayment = async () => {
    // Simulate payment processing and order submission
    const paymentData = {
      method: paymentMethod,
      details: paymentDetails,
    };

    // Call backend API to process payment
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "your-user-id", // You should get the user's ID from auth context or state
        amount: 2397, // This is the total price of cart items
        paymentData,
      }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Payment successful! Order placed.");
      navigate("/profile"); // Redirect to order history
    } else {
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Payment</h1>

      <div className="mb-4">
        <label className="block mb-2">Select Payment Method:</label>
        <select
          className="border p-2 rounded"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">-- Choose Payment Method --</option>
          <option value="easypaisa">Easypaisa</option>
          <option value="jazzcash">JazzCash</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Payment Details:</label>
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Enter account number or payment details"
          value={paymentDetails}
          onChange={(e) => setPaymentDetails(e.target.value)}
        />
      </div>

      <button
        className="text-white bg-green-500 px-4 py-2 rounded"
        onClick={handlePayment}
      >
        Submit Payment
      </button>
    </div>
  );
};

export default PaymentPage;
