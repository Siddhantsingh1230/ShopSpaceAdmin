import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toasts from "../app/Toasts";
import { getAllUsers,getTotalUsers } from "../api/users";

const initialState = {
  users: [],
  status: "idle",
  totalUsers :null,
};

export const getAllUsersAsync = createAsyncThunk(
    "users/get",
    async (thunkAPI)=>{
        try {
            const data = await getAllUsers();
            return data;
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
);

export const getTotalUsersAsync = createAsyncThunk(
  "users/total",
  async () => {
    const data = await getTotalUsers();
    return data;
  }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllUsersAsync.pending,(state)=>{
            state.status = "loading";
        })
        .addCase(getAllUsersAsync.fulfilled,(state,action)=>{
            state.status = "idle";
            state.users = action.payload.users;
        })
        .addCase(getAllUsersAsync.rejected,(state,action)=>{
            state.status = "idle";
            if (action.payload.response && action.payload.code!=="ERR_NETWORK") {
                Toasts("error", action.payload.response.data.message || "Error Occurred");
              } else {
                Toasts("error","Network Error");
              }
        }).addCase(getTotalUsersAsync.pending, (state) => {
          state.status = "loading";
        })
        .addCase(getTotalUsersAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.totalUsers = action.payload.count;
        })
        .addCase(getTotalUsersAsync.rejected, (state, action) => {
          state.status = "idle";
          if (action.payload.response) {
            Toasts("error", action.payload.response.data.message);
            // console.log(action.payload.response.data.message);
          } else {
            Toasts("error", "Network Error"); // no need to show toast here
          }
        });
    }
});

export default userSlice.reducer;