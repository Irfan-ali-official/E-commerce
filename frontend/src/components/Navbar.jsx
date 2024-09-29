import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Use the fixed AuthContext

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Access user and logout from AuthContext

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          {/* Check if the user is admin and redirect accordingly */}
          {user && user.role === "admin" ? (
            <Link to="/admin-dashboard">E-Commerce</Link>
          ) : (
            <Link to="/">E-Commerce</Link>
          )}
        </div>

        <ul className="flex space-x-4">
          {/* Show Home and common links only for non-admin users */}
          {user && user.role !== "admin" && (
            <li>
              <Link to="/" className="hover:text-blue-300">
                Home
              </Link>
            </li>
          )}

          {user ? (
            // If user is logged in
            user.role === "admin" ? (
              // Admin-specific links
              <>
                <li>
                  <Link to="/admin-dashboard" className="hover:text-blue-300">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="hover:text-blue-300">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-blue-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              // Non-admin user links
              <>
                <li>
                  <Link to="/profile" className="hover:text-blue-300">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/checkout" className="hover:text-blue-300">
                    Checkout
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-blue-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            )
          ) : (
            // If user is NOT logged in, show login and signup links
            <>
              <li>
                <Link to="/login" className="hover:text-blue-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-blue-300">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
