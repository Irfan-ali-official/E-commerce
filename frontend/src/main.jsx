import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
