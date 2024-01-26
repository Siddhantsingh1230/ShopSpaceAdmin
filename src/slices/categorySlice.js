import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "../api/categories.js";

const initialState = {
  categories: [],
  mostOrderedProducts: [],
  status: "idle",
};

export const getAllCategoriesAsync = createAsyncThunk(
  "categories/get",
  async (_, thunkAPI) => {
    try {
      const data = await getAllCategories();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const categorySlice = createSlice({
    name : "categories",
    initialState,
    reducers : {
    },
    extraReducers : (builder)=>{
        builder.addCase(getAllCategoriesAsync.pending,(state)=>{
            state.status = "loading";
        }).addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.categories = action.payload.categories;
          })
          .addCase(getAllCategoriesAsync.rejected, (state, action) => {
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
    }
})

export default categorySlice.reducer;