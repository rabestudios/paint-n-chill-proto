import { connect } from "react-redux";
import {
  updateUserList,
  updateRoomList,
  removeUser,
  removePlayerFromRoom,
  removeRoom,
  setIsConnected,
  setRoom,
} from "redux/slices/multiplayer.slice";
import { setPlayerInfo } from "redux/slices/user.slice";
import App from "../index";

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatch = {
  updateUserList,
  updateRoomList,
  removeUser,
  removePlayerFromRoom,
  removeRoom,
  setIsConnected,
  setRoom,
  setPlayerInfo,
};

export default connect(mapStateToProps, mapDispatch)(App);
