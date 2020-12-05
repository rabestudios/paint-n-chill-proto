import { connect } from "react-redux";
import { setIsDrawing } from "redux/slices/status.slice";
import Canvas from "../index";

const mapStateToProps = (state) => ({ ...state.appStatus });

const mapDispatch = { setIsDrawing };

export default connect(mapStateToProps, mapDispatch)(Canvas);
