import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Adding All Orders related APIs
import {
  getAllOrders,
  updateOrder,
  mostCommonLocation,
  mostUsedPaymentMode,
  mostCommonCategory,
  bonusMonth,
  deliveryCounts,
  getTotalEarnings,
  getTotalOrders,
} from "../api/orders.js";

import { getTotalCartItems } from "../api/cart.js";

const initialState = {
  orders: [],
  mostCommonLocations: [],
  modes: [],
  commonCategory: [],
  bonusMonths: [],
  deliveryCount: [],
  status: "idle",
  totalCartItems : null,
  totalEarnings : null,
  totalOrders: null,
};

// ading order related AsyncThunks
export const getAllOrdersAsync = createAsyncThunk(
  "orders/get",
  async (_, thunkAPI) => {
    try {
      const data = await getAllOrders();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOrderAsync = createAsyncThunk(
  "orders/patch",
  async (orderData, thunkAPI) => {
    try {
      const data = await updateOrder(orderData.id, orderData.order);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const mostCommonLocationAsync = createAsyncThunk(
  "orders/mostCommonLocation",
  async (_, thunkAPI) => {
    try {
      const data = await mostCommonLocation();
      return data;
    } catch (error) {
      console.error("Error fetching most common locations:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const mostUsedPaymentModeAsync = createAsyncThunk(
  "orders/mostusedpaymentmode",
  async (_, thunkAPI) => {
    try {
      const data = await mostUsedPaymentMode();
      return data;
    } catch (error) {
      console.error("Error fetching most common locations:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const mostCommonCategoryAsync = createAsyncThunk(
  "orders/mostcommoncategory",
  async (_, thunkAPI) => {
    try {
      const data = await mostCommonCategory();
      return data;
    } catch (error) {
      console.error("Error fetching most common locations:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const bonusMonthAsync = createAsyncThunk(
  "orders/bonusMonth",
  async (_, thunkAPI) => {
    try {
      const data = await bonusMonth();
      return data;
    } catch (error) {
      console.error("Error fetching most common locations:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deliveryCountsAsync = createAsyncThunk(
  "orders/deleiveryCount",
  async (_, thunkAPI) => {
    try {
      const data = await deliveryCounts();
      return data;
    } catch (error) {
      console.error("Error fetching most common locations:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getTotalEarningsAsync = createAsyncThunk(
  "orders/totalEarnings",
  async (_, thunkAPI) => {
    try {
      const data = await getTotalEarnings();
      return data;
    } catch (error) {
      console.error("Error fetching most common locations:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getTotalOrdersAsync = createAsyncThunk(
  "orders/totalOrders",
  async (_, thunkAPI) => {
    try {
      const data = await getTotalOrders();
      return data;
    } catch (error) {
      console.error("Error fetching most common locations:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getTotalCartItemsAsync = createAsyncThunk(
  "orders/getTotalCartItems",
  async (_, thunkAPI) => {
    try {
      const data = await getTotalCartItems();
      return data;
    } catch (error) {
      console.error("Error fetching most common locations:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    updateOrderState: (state, action) => {
      const { id, order } = action.payload;
      const index = state.orders.findIndex((order) => order._id === id);
      if (index !== -1) {
        // Update the product at the specified index
        state.orders[index] = { ...state.orders[index], ...order };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
      })
      .addCase(getAllOrdersAsync.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
      })
      .addCase(updateOrderAsync.rejected, (state, action) => {
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
      .addCase(mostCommonLocationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(mostCommonLocationAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mostCommonLocations = action.payload.locationCounts;
      })
      .addCase(mostCommonLocationAsync.rejected, (state, action) => {
        state.status = "idle";
        console.error("Error fetching most common locations:", action.error);
        if (action.payload.response && action.payload.code !== "ERR_NETWORK") {
          console.log(
            "error",
            action.payload.response.data.message || "Error Occurred"
          );
        } else {
          console.log("error", "Network Error");
        }
      })
      .addCase(mostUsedPaymentModeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(mostUsedPaymentModeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.modes = action.payload.modes;
      })
      .addCase(mostUsedPaymentModeAsync.rejected, (state, action) => {
        state.status = "idle";
        console.error("Error fetching most common locations:", action.error);
        if (action.payload.response && action.payload.code !== "ERR_NETWORK") {
          console.log(
            "error",
            action.payload.response.data.message || "Error Occurred"
          );
        } else {
          console.log("error", "Network Error");
        }
      })
      .addCase(mostCommonCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(mostCommonCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.commonCategory = action.payload.categories;
      })
      .addCase(mostCommonCategoryAsync.rejected, (state, action) => {
        state.status = "idle";
        console.error("Error fetching most common locations:", action.error);
        if (action.payload.response && action.payload.code !== "ERR_NETWORK") {
          console.log(
            "error",
            action.payload.response.data.message || "Error Occurred"
          );
        } else {
          console.log("error", "Network Error");
        }
      })
      .addCase(bonusMonthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(bonusMonthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.bonusMonths = action.payload.months;
      })
      .addCase(bonusMonthAsync.rejected, (state, action) => {
        state.status = "idle";
        console.error("Error fetching most common locations:", action.error);
        if (action.payload.response && action.payload.code !== "ERR_NETWORK") {
          console.log(
            "error",
            action.payload.response.data.message || "Error Occurred"
          );
        } else {
          console.log("error", "Network Error");
        }
      })
      .addCase(deliveryCountsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deliveryCountsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.deliveryCount = action.payload.deliveryCount;
      })
      .addCase(deliveryCountsAsync.rejected, (state, action) => {
        state.status = "idle";
        console.error("Error fetching most common locations:", action.error);
        if (action.payload.response && action.payload.code !== "ERR_NETWORK") {
          console.log(
            "error",
            action.payload.response.data.message || "Error Occurred"
          );
        } else {
          console.log("error", "Network Error");
        }
      })
      .addCase(getTotalEarningsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTotalEarningsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.totalEarnings = action.payload.totalAmountEarned;
      })
      .addCase(getTotalEarningsAsync.rejected, (state, action) => {
        state.status = "idle";
        console.error("Error fetching most common locations:", action.error);
        if (action.payload.response && action.payload.code !== "ERR_NETWORK") {
          console.log(
            "error",
            action.payload.response.data.message || "Error Occurred"
          );
        } else {
          console.log("error", "Network Error");
        }
      })
      .addCase(getTotalCartItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTotalCartItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.totalCartItems = action.payload.count;
      })
      .addCase(getTotalCartItemsAsync.rejected, (state, action) => {
        state.status = "idle";
        console.error("Error fetching most common locations:", action.error);
        if (action.payload.response && action.payload.code !== "ERR_NETWORK") {
          console.log(
            "error",
            action.payload.response.data.message || "Error Occurred"
          );
        } else {
          console.log("error", "Network Error");
        }
      })
      .addCase(getTotalOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTotalOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.totalOrders = action.payload.count;
      })
      .addCase(getTotalOrdersAsync.rejected, (state, action) => {
        state.status = "idle";
        console.error("Error fetching most common locations:", action.error);
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
export const { updateOrderState } = ordersSlice.actions;
export default ordersSlice.reducer;
