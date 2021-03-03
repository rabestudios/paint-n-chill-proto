import { connect } from "react-redux";
import { clearDrawStack } from "redux/slices/canvas.slice";
import { disconnectFromRoom } from "redux/slices/multiplayer.slice";
import Toolbar from "../index";

const mapStateToProps = (state) => ({ room: state.multiplayer.room });

const mapDispatch = { clearDrawStack, disconnectFromRoom };

export default connect(mapStateToProps, mapDispatch)(Toolbar);
