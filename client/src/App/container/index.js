import { connect } from "react-redux";
import {
  updateUserList,
  updateRoomList,
  removeUser,
  removePlayerFromRoom,
  removeRoom,
} from "redux/slices/multiplayer.slice";
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
};

export default connect(mapStateToProps, mapDispatch)(App);
