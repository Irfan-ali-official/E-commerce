import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice"; // Import the action

const ProductCard = ({ product }) => {
  const dispatch = useDispatch(); // Initialize dispatch

  const handleAddToCart = () => {
    console.log("Adding product to cart:", product); // Log the product details
    dispatch(addToCart(product)); // Dispatch the action
  };

  return (
    <div className="border p-4">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button
        onClick={handleAddToCart} // Trigger the dispatch
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
