import { connect } from "react-redux";
import { setIsHost } from "redux/slices/multiplayer.slice";
import Home from "../index";

const mapStateToProps = (state) => ({
  isConnected: state.multiplayer.isConnected,
});

const mapDispatch = {
  setIsHost,
};

export default connect(mapStateToProps, mapDispatch)(Home);
