import { createSlice } from "@reduxjs/toolkit";

const canvasSlice = createSlice({
  name: "canvas",
  initialState: {
    isDrawing: false,
    strokeStyle: "black",
    lineWidth: 5,
    scale: 2,
    drawStack: [],
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
    pushToDrawStack(state, action) {
      state.drawStack.push(action.payload);
    },
  },
});

export const {
  setIsDrawing,
  setStrokeStyle,
  setLineWidth,
  setScale,
  pushToDrawStack,
} = canvasSlice.actions;

export default canvasSlice.reducer;
