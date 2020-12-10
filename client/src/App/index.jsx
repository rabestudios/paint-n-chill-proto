import Router from "components/common/Router";
import useSocket from "hooks/useSocket";
import config from "config";

const App = ({
  user,
  updateUserList,
  updateRoomList,
  removeUser,
  removePlayerFromRoom,
  removeRoom,
}) => {
  const socket = useSocket(config.server.baseUrl, user);

  if (socket) {
    socket.on("update-user-list", ({ users }) => {
      updateUserList(users);
    });

    socket.on("update-room-list", ({ rooms }) => {
      updateRoomList(rooms);
    });

    socket.on("disconnect-user", ({ socketId }) => {
      removeUser(socketId);
      removePlayerFromRoom(socketId);
    });

    socket.on("remove-room", ({ roomCode }) => {
      removeRoom(roomCode);
    });
  }

  return <Router />;
};

export default App;
