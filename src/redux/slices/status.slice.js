import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: {
    isDrawing: false,
    strokeStyle: "black",
    lineWidth: 5,
    scale: 2,
  },
  reducers: {
    setIsDrawing(state, action) {
      state.isDrawing = action.payload;
    },
    setStrokeStyle(state, action) {
      state.strokeStyle = action.payload;
    },
    setLineWidth(state, action) {
      state.lineWidth = action.payload;
    },
    setScale(state, action) {
      state.scale = action.payload;
    },
  },
});

export const {
  setIsDrawing,
  setStrokeStyle,
  setLineWidth,
  setScale,
} = statusSlice.actions;

export default statusSlice.reducer;
