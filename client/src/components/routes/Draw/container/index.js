import { connect } from "react-redux";
import {
  addPlayerToRoom,
  removePlayerFromRoom,
  setRoomHost,
  setIsHost,
} from "redux/slices/multiplayer.slice";
import Draw from "../index";

const mapStateToProps = (state) => ({ room: state.multiplayer.room });

const mapDispatch = {
  addPlayerToRoom,
  removePlayerFromRoom,
  setRoomHost,
  setIsHost,
};

export default connect(mapStateToProps, mapDispatch)(Draw);
