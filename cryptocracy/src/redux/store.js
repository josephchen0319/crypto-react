import { configureStore } from "@reduxjs/toolkit";
import marketReducer from "../features/market/marketSlice";
import followingReducer from "../features/following/followingSlice";
import groupReducer from "../features/filter_group/groupSlice";
import SearchResultReducer from "../features/market/searchResultSlice";

export default configureStore({
  reducer: {
    market: marketReducer,
    following: followingReducer,
    searchResult: SearchResultReducer,
    group: groupReducer,
  },
});
