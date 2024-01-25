import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Adding All Products related APIs
import {
  deleteproduct,
  getAllProducts,
  getMostOrderedProducts,
  updateProduct,
} from "../api/products.js";
import Toasts from "../app/Toasts.js";

const initialState = {
  products: [],
  mostOrderedProducts: [],
  status: "idle",
};

// ading product related AsyncThunks
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
export const getMostOrderedProductsAsync = createAsyncThunk(
  "products/getMostOrderedProducts",
  async (_, thunkAPI) => {
    try {
      const data = await getMostOrderedProducts();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteProductAsync = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      const data = await deleteproduct(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateProductAsync = createAsyncThunk(
  "product/update",
  async (dataP, thunkAPI) => {
    try {
      const data = await updateProduct(dataP.id, dataP.product);
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
    updateProductState: (state, action) => {
      const { id, product } = action.payload;
      const index = state.products.findIndex((product) => product._id === id);
      if (index !== -1) {
        // Update the product at the specified index
        state.products[index] = { ...state.products[index], ...product };
      }
    },
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
      })
      .addCase(getMostOrderedProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMostOrderedProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mostOrderedProducts = action.payload.products;
      })
      .addCase(getMostOrderedProductsAsync.rejected, (state, action) => {
        state.status = "idle";
        if (action.payload.response && action.payload.code !== "ERR_NETWORK") {
          console.log(
            "error",
            action.payload.response.data.message || "Error Occurred"
          );
        } else {
          console.log("error", "Network Error");
        }
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        Toasts("success", "Deleted Product Successfully");
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.status = "idle";
        if (action.payload.response && action.payload.code !== "ERR_NETWORK") {
          Toasts(
            "error",
            action.payload.response.data.message || "Error Occurred"
          );
        } else {
          Toasts("error", "Network Error");
        }
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        console.log("success", "Updated Product Successfully");
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
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

export const { updateProductState } = productsSlice.actions;

export default productsSlice.reducer;
