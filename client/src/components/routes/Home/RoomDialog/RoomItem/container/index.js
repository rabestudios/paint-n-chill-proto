import { connect } from "react-redux";
import RoomItem from "components/routes/Home/RoomDialog/RoomItem/index";

const mapStateToProps = ({ user, multiplayer }) => ({
  user,
  isConnected: multiplayer.isConnected,
});

export default connect(mapStateToProps)(RoomItem);
