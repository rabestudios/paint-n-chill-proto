import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    displayName: "Player",
  },
  reducers: {
    setPlayerName(state, action) {
      state.displayName = action.payload;
    },
  },
});

export const { setPlayerName } = userSlice.actions;

export default userSlice.reducer;
