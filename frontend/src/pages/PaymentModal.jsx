import React, { useState } from "react";

const PaymentModal = ({ isOpen, onClose, onConfirmPayment }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleConfirm = () => {
    if (!paymentMethod || !accountNumber) {
      alert("Please fill in all fields");
      return;
    }

    // Call the parent function with payment details
    onConfirmPayment(paymentMethod, accountNumber);
  };

  if (!isOpen) return null; // If the modal is not open, don't render anything

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Payment Information</h2>

        <div className="mb-4">
          <label className="block mb-2">Select Payment Method:</label>
          <select
            className="border p-2 w-full"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select a method</option>
            <option value="JazzCash">JazzCash</option>
            <option value="Easypaisa">Easypaisa</option>
            <option value="Bank">Pay with Bank</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Account Number:</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleConfirm}
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
