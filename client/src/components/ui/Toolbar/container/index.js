import { connect } from "react-redux";
import { clearDrawStack } from "redux/slices/canvas.slice";
import Toolbar from "../index";

const mapStateToProps = () => ({});

const mapDispatch = { clearDrawStack };

export default connect(mapStateToProps, mapDispatch)(Toolbar);
