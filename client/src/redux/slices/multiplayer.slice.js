import { createSlice } from "@reduxjs/toolkit";

const multiplayerSlice = createSlice({
  name: "multiplayer",
  initialState: {
    onlineUsers: [],
    onlineRooms: [],
    isConnected: false,
    isHost: false,
    room: {
      code: "Unknown",
      players: [],
      hostId: undefined,
      drawStack: [],
    },
  },
  reducers: {
    setIsHost(state, action) {
      state.isHost = action.payload;
    },
    setIsConnected(state, action) {
      state.isConnected = action.payload;
    },
    setRoom(state, action) {
      state.room = action.payload;
    },
    setRoomHost(state, action) {
      state.room.hostId = action.payload;
    },
    addPlayerToRoom(state, action) {
      const player = action.payload;
      if (state.room) {
        const playerIdx = state.room.players.findIndex(
          (p) => p.id === player.id,
        );
        if (playerIdx === -1) {
          state.room.players.push(player);
        } else {
          state.room.players[playerIdx] = player;
        }
      }
    },
    removePlayerFromRoom(state, action) {
      const playerId = action.payload;
      const playerIdx = state.room.players.findIndex(
        (player) => player.id === playerId,
      );
      if (playerIdx !== -1) {
        state.room.players.splice(playerIdx, 1);
      }
    },

    updateUserList(state, action) {
      const { onlineUsers } = state;
      const serverUsers = action.payload;
      // add new users
      for (const sUser of serverUsers) {
        const uIdx = onlineUsers.findIndex((oUser) => oUser.id === sUser.id);
        if (uIdx === -1) {
          state.onlineUsers.push(sUser);
        } else {
          state.onlineUsers[uIdx] = sUser;
        }
      }
    },
    removeUser(state, action) {
      const userID = action.payload;
      const uIdx = state.onlineUsers.findIndex((user) => user.id === userID);
      if (uIdx >= 0) {
        state.onlineUsers.splice(uIdx, 1);
      }
    },
    disconnectFromRoom(state) {
      state.room = {
        code: "",
        players: [],
        hostId: undefined,
        drawStack: [],
      };
      state.isConnected = false;
    },
    updateRoomList(state, action) {
      const { onlineRooms } = state;
      const serverRooms = action.payload;
      if (serverRooms.length === 0) {
        state.onlineRooms = [];
      }
      // add new rooms
      for (const sRoom of serverRooms) {
        const roomIdx = onlineRooms.findIndex(
          (oRoom) => oRoom.code === sRoom.code,
        );
        if (roomIdx === -1) {
          state.onlineRooms.push(sRoom);
        } else {
          state.onlineRooms[roomIdx] = sRoom;
        }
      }
    },
    removeRoom(state, action) {
      const roomCode = action.payload;
      const rIdx = state.onlineRooms.findIndex(
        (room) => room.code === roomCode,
      );
      state.onlineRooms.splice(rIdx, 1);
    },
    updateRoomPlayerInfo(state, action) {
      const { playerId, playerInfo } = action.payload;
      const playerIdx = state.room.players.findIndex((p) => p.id === playerId);
      if (playerIdx !== -1) {
        state.room.players[playerIdx].playerInfo = playerInfo;
      }
    },
    setRoomDrawStack(state, action) {
      state.room.drawStack = action.payload;
    },
  },
});

export const {
  setRoom,
  updateUserList,
  removeUser,
  updateRoomList,
  removeRoom,
  setIsConnected,
  addPlayerToRoom,
  setRoomHost,
  disconnectFromRoom,
  removePlayerFromRoom,
  setIsHost,
  updateRoomPlayerInfo,
  setRoomDrawStack,
} = multiplayerSlice.actions;

export default multiplayerSlice.reducer;
