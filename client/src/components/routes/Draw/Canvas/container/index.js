import { connect } from "react-redux";
import { setIsDrawing, pushToDrawStack } from "redux/slices/canvas.slice";
import Canvas from "components/routes/Draw/Canvas/index";

const mapStateToProps = (state) => ({
  ...state.canvas,
  room: state.multiplayer.room,
});

const mapDispatch = { setIsDrawing, pushToDrawStack };

export default connect(mapStateToProps, mapDispatch)(Canvas);
