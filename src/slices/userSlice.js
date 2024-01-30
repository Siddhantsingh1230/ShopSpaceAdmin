import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toasts from "../app/Toasts";
import { getAllUsers } from "../api/users";

const initialState = {
  users: [],
  status: "idle",
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
        })
    }
});

export default userSlice.reducer;