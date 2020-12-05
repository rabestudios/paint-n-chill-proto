import { combineReducers } from "@reduxjs/toolkit";
import statusReducer from "../slices/status.slice";

export default combineReducers({
  appStatus: statusReducer,
});
