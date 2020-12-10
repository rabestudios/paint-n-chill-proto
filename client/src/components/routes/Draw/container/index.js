import { connect } from "react-redux";
import {
  addPlayerToRoom,
  removePlayerFromRoom,
  setRoomHost,
  setIsHost,
} from "redux/slices/multiplayer.slice";
import Draw from "../index";

const mapStateToProps = () => ({});

const mapDispatch = {
  addPlayerToRoom,
  removePlayerFromRoom,
  setRoomHost,
  setIsHost,
};

export default connect(mapStateToProps, mapDispatch)(Draw);
