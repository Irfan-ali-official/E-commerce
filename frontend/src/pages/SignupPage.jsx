import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Import useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        // If signup is successful, redirect to login
        navigate("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Signup failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6">Signup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="block mb-2">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
