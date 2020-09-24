import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const marketSlice = createSlice({
  name: "market",
  initialState: {
    status: "idle",
    error: null,
    data: [],
  },
  reducers: {},
});
