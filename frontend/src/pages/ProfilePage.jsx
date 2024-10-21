import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Assuming you have AuthContext
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuth(); // Make sure user is available
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true); // Add loading state for orders
  useEffect(() => {
    if (user && user.userId && user.role !== "admin") {
      const token = localStorage.getItem("token");
      fetch(`/api/my-orders/${user.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) // Fetch orders specific to this user
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch orders");
          }
          return res.json();
        })
        .then((data) => {
          setOrders(data); // Update the orders state
          setLoadingOrders(false); // Set loading to false after orders are fetched
        })
        .catch((error) => {
          console.error("Error fetching order history:", error);
          setLoadingOrders(false); // Set loading to false even if there is an error
        });
    }
  }, [user]);

  console.log("Orders:", orders); // Check if orders are successfully fetched

  // Check if user exists before rendering the page
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Profile
      </h1>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Account Details
        </h2>

        <p className="text-lg text-gray-600 mb-2">
          <strong>Name:</strong> {user?.name || "No name available"}
        </p>
        <p className="text-lg text-gray-600 mb-2">
          <strong>Email:</strong> {user?.email || "No email available"}
        </p>
        <p className="text-lg text-gray-600 mb-2">
          <strong>Role:</strong> {user?.role || "Not applicable"}
        </p>
      </div>

      {user.role !== "admin" && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Order History
          </h2>
          {loadingOrders ? (
            <p className="text-ge-600 text-lg">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-600 text-lg">You have no orders.</p>
          ) : (
            <ul className="list-disc list-inside space-y-4 text-gray-600">
              {orders.map((order) => (
                <li
                  key={order._id}
                  className="bg-green-50 p-4 rounded-lg shadow-md border border-blue-200"
                >
                  <span className="block font-semibold text-gray-700">
                    OrderId #{order._id}
                  </span>
                  <span className="block text-gray-600">
                    Status: {order.status}
                  </span>
                  <span className="block text-gray-600">
                    Total: ${order.totalAmount}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/checkout"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md transition duration-300"
          >
            Go to Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
