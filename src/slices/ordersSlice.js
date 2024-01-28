import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Adding All Orders related APIs
import {
  getAllOrders,
} from "../api/orders.js";

const initialState = {
  orders: [],
  mostOrderedProducts: [],
  status: "idle",
};

// ading product related AsyncThunks
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

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(getAllOrdersAsync.pending,(state)=>{
            state.status = "loading";
        }).addCase(getAllOrdersAsync.fulfilled,(state,action)=>{
            state.status = "idle";
            console.log(action.payload)
            state.orders = action.payload.orders;
        }).addCase(getAllOrdersAsync.rejected,(state)=>{
            state.status = "idle";
        })
    }
})

export default ordersSlice.reducer;
