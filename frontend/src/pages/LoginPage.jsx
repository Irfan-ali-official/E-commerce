import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth to trigger login
import { jwtDecode } from "jwt-decode"; // Fix import of jwtDecode

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token); // Save token

        // Decode the JWT token to get the user role
        const decodedToken = jwtDecode(data.token);

        // Trigger the user state update immediately after login
        login(data.token); // Update the user state in AuthContext

        // Check the role and redirect accordingly
        if (decodedToken.role === "admin") {
          navigate("/admin-dashboard"); // Redirect to admin dashboard
        } else {
          navigate("/"); // Redirect to products page for normal users
        }
      } else {
        setError("Login failed");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
