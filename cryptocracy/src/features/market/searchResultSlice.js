import { createSlice } from "@reduxjs/toolkit";

export const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    status: "idle",
    error: null,
    filterDetails: [],
    data: [],
  },
  reducers: {
    fetchSearchResult: (state, { payload }) => {
      if (payload.status) state.status = payload.status;
      if (payload.error) {
        state.error = payload.error;
        console.log(payload.error);
      }
      if (payload.data) state.data = payload.data;
    },
    updateFilterDetails: (state, { payload }) => {
      state.filterDetails = payload.targetFilterDetails;
    },
  },
});

export const {
  fetchSearchResult,
  updateFilterDetails,
} = searchResultSlice.actions;
export default searchResultSlice.reducer;
