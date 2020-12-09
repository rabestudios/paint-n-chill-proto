import { combineReducers } from "@reduxjs/toolkit";
import canvasReducer from "redux/slices/canvas.slice";

export default combineReducers({
  canvas: canvasReducer,
});
