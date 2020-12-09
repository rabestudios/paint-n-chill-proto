import { combineReducers } from "@reduxjs/toolkit";
import canvasReducer from "redux/slices/canvas.slice";
import multiplayerReducer from "redux/slices/multiplayer.slice";

export default combineReducers({
  canvas: canvasReducer,
  multiplayer: multiplayerReducer,
});
