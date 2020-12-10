import { connect } from "react-redux";
import RoomDialog from "../index";

const mapStateToProps = (state) => ({
  rooms: state.multiplayer.onlineRooms,
});

export default connect(mapStateToProps)(RoomDialog);
