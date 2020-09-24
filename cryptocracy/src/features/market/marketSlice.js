import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const marketSlice = createSlice({
  name: "market",
  initialState: {
    status: "idle",
    error: null,
    page: null,
    data: [],
  },
  reducers: {
    fetchMarketData: (state, { payload }) => {
      if (payload.status) state.status = payload.status;
      if (payload.error) state.error = payload.error;
      if (payload.data) state.data = payload.data;
      if (payload.page) state.page = payload.page;
    },
  },
});

export const { fetchMarketData } = marketSlice.actions;
export default marketSlice.reducer;
