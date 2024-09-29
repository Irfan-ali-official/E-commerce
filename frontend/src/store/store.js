// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // Import your cart slice

// Configure the Redux store
const store = configureStore({
  reducer: {
    cart: cartReducer, // Add other reducers here if needed
  },
});

export default store;
