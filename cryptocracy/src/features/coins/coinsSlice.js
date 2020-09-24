import { createSlice } from "@reduxjs/toolkit";

export const coinsSlice = createSlice({
  name: "coins",
  initialState: {
    status: "idle",
    error: null,
    data: [],
  },
});
