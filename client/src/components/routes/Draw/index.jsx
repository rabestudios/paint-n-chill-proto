import Canvas from "components/routes/Draw/Canvas/container";
import Toolbar from "components/ui/Toolbar/container";
import { MainContainer } from "components/routes/Draw/styles";
import useSocket from "hooks/useSocket";
import { useEffect } from "react";
import DrawHeader from "components/ui/DrawHeader";
import { useHistory } from "react-router-dom";

const Draw = ({
  room,
  addPlayerToRoom,
  removePlayerFromRoom,
  setRoomHost,
  setIsHost,
  isConnected,
}) => {
  const history = useHistory();
  const socket = useSocket();

  useEffect(() => {
    if (!isConnected) {
      // go to home if not connected
      history.push("/");
      return () => {};
    }

    const handleRoomConnect = ({ player }) => {
      if (player.id !== socket.id) {
        addPlayerToRoom(player);
      }
    };
    const handleRoomDisconnect = ({ playerId, host }) => {
      removePlayerFromRoom(playerId);
      setRoomHost(host);
      if (host === socket.id) {
        setIsHost(true);
      }
    };

    if (socket) {
      socket.on("room-connect", handleRoomConnect);
      socket.on("room-disconnect", handleRoomDisconnect);
    }

    return () => {
      if (socket) {
        socket.off("room-connect", handleRoomConnect);
        socket.off("room-disconnect", handleRoomDisconnect);
      }
    };
  }, [socket, history, isConnected]);

  return (
    <MainContainer>
      <DrawHeader roomCode={room.code} />
      <Canvas />
      <Toolbar />
    </MainContainer>
  );
};

export default Draw;
