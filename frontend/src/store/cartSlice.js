// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      console.log("item", item);
      const existItem = state.cartItems.find((x) => x._id === item._id); // Correctly checking with _id

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? { ...x, quantity: x.quantity + 1 } : x
        );
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item._id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
