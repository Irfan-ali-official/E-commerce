import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Middleware to verify any user
export const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Auth Header:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Split the Bearer token and get the actual token part
  const token = authHeader.split(" ")[1];

  console.log("Extracted Token:", token);
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded user to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

// Middleware for admin-only access
export const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
  });
};

