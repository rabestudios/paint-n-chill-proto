import React, { useCallback } from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import useSocket from "hooks/useSocket";

const MAX_PLAYERS = 10;
const ROOM_COLOURS = {
  lime: "#8ce724",
  green: "#22792e",
  orange: "#ff8500",
  black: "#565656",
};

const RoomItem = ({ user, isConnected, room }) => {
  const socket = useSocket();

  const avatarStyle = {
    fontSize: 15,
    color: "#000",
    background: ROOM_COLOURS.lime,
  };

  const quarter = MAX_PLAYERS / 4;
  const half = MAX_PLAYERS / 2;

  if (room.players.length >= quarter) {
    avatarStyle.background = ROOM_COLOURS.green;
  }

  if (room.players.length >= half) {
    avatarStyle.background = ROOM_COLOURS.orange;
  }
  if (room.players.length >= half + quarter) {
    avatarStyle.background = ROOM_COLOURS.red;
  }

  if (room.players === MAX_PLAYERS) {
    avatarStyle.background = ROOM_COLOURS.black;
  }

  const handleJoinClick = useCallback(() => {
    socket.emit("join-room", {
      playerId: socket.id,
      roomCode: room.code,
      playerInfo: user,
    });
  }, [socket, user, room]);

  return (
    <ListItem style={{ width: 300 }}>
      <ListItemAvatar>
        <Avatar style={avatarStyle}>
          {room.players.length}/{MAX_PLAYERS}
        </Avatar>
      </ListItemAvatar>
      <ListItemText>{room.code}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton disabled={isConnected} onClick={handleJoinClick}>
          <PlayArrow />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default RoomItem;
