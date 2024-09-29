import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode"; // Fix import of jwtDecode

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Handle user state

  // Check if the user is logged in based on the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("called");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token
        console.log("Token", decodedToken);
        if (decodedToken.exp * 1000 > Date.now()) {
          // Token is valid
          setUser({ ...decodedToken, token });
        } else {
          localStorage.removeItem("token"); // Token expired
          setUser(null);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token"); // Token invalid, remove it
        setUser(null);
      }
    }
  }, []);

  // Function to log the user in and save the token
  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    console.log("Decoded", decodedToken);
    setUser({ ...decodedToken, token });
  };

  // Function to log the user out
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
