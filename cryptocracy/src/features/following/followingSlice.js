import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_FOLLOWING_COINS } from "../../queries/member";

const initialState = {
  status: "idle",
  error: null,
  data: [],
};

const followingSlice = createSlice({
  name: "following",
  initialState,
  reducers: {
    fetchFollowingData: (state, { payload }) => {
      // if (payload.data) state.data = payload.data;
      // if (payload.status) state.status = payload.status;
      // if (payload.error) state.error = payload.error;
    },
  },
});

// export const fetchRemoteData = createAsyncThunk(
//   "following/fetchRemoteData",
//   async (getFollowing) => {
//     const res = client.query(GET_FOLLOWING_COINS).then((res) => {
//       console.log(res);
//     });
//   }
// );

export const { fetchFollowingData } = followingSlice.actions;
export default followingSlice.reducer;
