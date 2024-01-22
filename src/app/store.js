import { configureStore } from "@reduxjs/toolkit";

// adding all reducers from their slices
import authReducer from "../slices/authSlice";
import productsReducer from "../slices/productsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productsReducer,
  },
});
