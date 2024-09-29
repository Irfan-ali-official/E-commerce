import React, { createContext, useReducer, useContext } from "react";

// Create Cart Context
const CartContext = createContext();

// Cart reducer function to handle different actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        console.log("Existing item found:", existingItem); // Log existing item
        return state.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        console.log("New item added:", action.payload); // Log new item
        return [...state, { ...action.payload, quantity: 1 }];
      }

    case "REMOVE_FROM_CART":
      return state.filter((item) => item._id !== action.payload._id);

    case "INCREASE_QUANTITY":
      return state.map((item) =>
        item._id === action.payload._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE_QUANTITY":
      return state.map((item) =>
        item._id === action.payload._id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    default:
      return state;
  }
};

// Cart Provider component to wrap around the app
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  };

  const increaseQuantity = (product) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: product });
  };

  const decreaseQuantity = (product) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
