import { connect } from "react-redux";
import {
  addPlayerToRoom,
  removePlayerFromRoom,
  setRoomHost,
  setIsHost,
  setRoomDrawStack,
} from "redux/slices/multiplayer.slice";
import Draw from "../index";

const mapStateToProps = (state) => ({
  room: state.multiplayer.room,
  isConnected: state.multiplayer.isConnected,
});

const mapDispatch = {
  addPlayerToRoom,
  removePlayerFromRoom,
  setRoomHost,
  setIsHost,
  setRoomDrawStack,
};

export default connect(mapStateToProps, mapDispatch)(Draw);
