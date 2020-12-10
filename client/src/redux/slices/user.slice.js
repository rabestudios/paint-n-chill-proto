import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    displayName: "Player",
  },
  reducers: {
    setPlayerName(state, action) {
      state.name = action.payload;
    },
    setPlayerInfo(state, action) {
      const newInfo = action.payload;
      state.displayName = newInfo.displayName;
    },
  },
});

export const { setPlayerName, setPlayerInfo } = userSlice.actions;

export default userSlice.reducer;
