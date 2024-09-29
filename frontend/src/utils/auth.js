import { jwtDecode } from "jwt-decode"; // Static import

export const checkTokenExpiry = () => {
  const token = localStorage.getItem("token");

  // Check if the token exists and is valid
  if (!token || token.split(".").length !== 3) {
    // console.error("Invalid or missing token");
    localStorage.removeItem("token"); // Remove invalid token
    return false;
  }

  try {
    const decoded = jwtDecode(token); // Decode the token using jwtDecode
    const currentTime = Date.now() / 1000; // Current time in seconds

    // Check if token is expired
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return false;
    }

    return true; // Token is valid
  } catch (error) {
    console.error("Error decoding token:", error);
    localStorage.removeItem("token"); // Remove invalid token
    return false;
  }
};
