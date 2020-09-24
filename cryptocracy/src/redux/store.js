import { configureStore } from "@reduxjs/toolkit";
import marketReducer from "../features/market/marketSlice";
import followingReducer from "../features/market/marketSlice";
import postsReducer from "../features/market/postsSlice";
import groupReducer from "../features/filter_group/groupSlice";

export default configureStore({
  reducer: {
    market: marketReducer,
    following: followingReducer,
    posts: postsReducer,
    group: groupReducer,
  },
});
