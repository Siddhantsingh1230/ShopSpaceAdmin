import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Adding All Products related APIs
import { getAllProducts } from "../api/products.js";

const initialState = {
  products: [],
  status: "idle",
};

// ading Auth AsyncThunks
export const getProductsAsync = createAsyncThunk(
  "products/get",
  async (_, thunkAPI) => {
    try {
      const data = await getAllProducts();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    //   increment: (state) => {
    //     state.value += 1;
    //   },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
      })
      .addCase(getProductsAsync.rejected, (state, action) => {
        state.status = "idle";
        if (action.payload.response && action.payload.code !== "ERR_NETWORK") {
          console.log(
            "error",
            action.payload.response.data.message || "Error Occurred"
          );
        } else {
          console.log("error", "Network Error"); 
        }
      });
  },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
