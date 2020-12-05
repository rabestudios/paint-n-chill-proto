import { connect } from "react-redux";
import { setIsDrawing, pushToDrawStack } from "redux/slices/canvas.slice";
import Canvas from "../index";

const mapStateToProps = (state) => ({ ...state.canvas });

const mapDispatch = { setIsDrawing, pushToDrawStack };

export default connect(mapStateToProps, mapDispatch)(Canvas);
