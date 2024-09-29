import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";

const Header = () => {
  const { cart } = useContext(CartContext); // Get the cart from CartContext

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0); // Calculate total quantity of items in the cart

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">E-Commerce</Link>
        </h1>
        <nav>
          <Link to="/cart" className="bg-blue-500 px-4 py-2 rounded text-white">
            Cart ({cartItemCount})
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
