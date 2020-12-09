import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@material-ui/core";

const InterfaceIcon = (props) => {
  const { children, label, onClick } = props;

  return (
    <Tooltip title={label} placement="right">
      <IconButton onClick={onClick}>{children}</IconButton>
    </Tooltip>
  );
};

InterfaceIcon.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default InterfaceIcon;
