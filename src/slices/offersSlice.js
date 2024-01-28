import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Adding All Offers related APIs
import { getOffers } from "../api/offers.js";
import Toasts from "../app/Toasts.js";

const initialState = {
  offers: [],
  status: "idle",
};

// ading product related AsyncThunks
export const getOffersAsync = createAsyncThunk(
  "offers/get",
  async (_, thunkAPI) => {
    try {
      const data = await getOffers();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const offersSlice = createSlice({
  name: "offers",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOffersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOffersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.offers = action.payload.offers;
      })
      .addCase(getOffersAsync.rejected, (state, action) => {
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

export const {} = offersSlice.actions;

export default offersSlice.reducer;
