import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Adding All Orders related APIs
import {
  getAllOrders,updateOrder
} from "../api/orders.js";

const initialState = {
  orders: [],
  mostOrderedProducts: [],
  status: "idle",
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
  async(orderData,thunkAPI)=>{
    try {
      const data = await updateOrder(orderData.id, orderData.order);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers : {
      updateOrderState: (state, action) => {
        const { id, order } = action.payload;
        const index = state.orders.findIndex((order) => order._id === id);
        if (index !== -1) {
          // Update the product at the specified index
          state.orders[index] = { ...state.orders[index], ...order };
        }
      },
    },
    extraReducers : (builder)=>{
        builder.addCase(getAllOrdersAsync.pending,(state)=>{
            state.status = "loading";
        }).addCase(getAllOrdersAsync.fulfilled,(state,action)=>{
            state.status = "idle";
            state.orders = action.payload.orders;
        }).addCase(getAllOrdersAsync.rejected,(state)=>{
            state.status = "idle";
        }).addCase(updateOrderAsync.pending, (state) => {
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
        });
    }
})
export const {updateOrderState} = ordersSlice.actions;
export default ordersSlice.reducer;
