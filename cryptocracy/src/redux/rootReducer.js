import marketReducer from "../features/market/marketSlice";
import followingReducer from "../features/market/marketSlice";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  market: marketReducer,
  following: followingReducer,
});
