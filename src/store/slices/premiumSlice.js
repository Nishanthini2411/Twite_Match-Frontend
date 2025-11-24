import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPremium: false,
  tier: null,
  expiresAt: null,
};

const premiumSlice = createSlice({
  name: "premium",
  initialState,
  reducers: {
    setPremium: (state, action) => {
      state.isPremium = action.payload.isPremium;
      state.tier = action.payload.tier;
      state.expiresAt = action.payload.expiresAt;
    },
  },
});

export const { setPremium } = premiumSlice.actions;
export default premiumSlice.reducer;