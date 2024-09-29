import React from "react";
import { Navigate } from "react-router-dom";
import { checkTokenExpiry } from "../utils/auth"; // Import the utility function

const UserRoute = ({ children }) => {
  const isAuthenticated = checkTokenExpiry();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default UserRoute;
