import styled from "styled-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import InterfaceIcon from "components/ui/InterfaceIcon";
import { ExitToApp, Group } from "@material-ui/icons";
import { useCallback } from "react";

const OverlayContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const InterfaceOverlay = (props) => {
  const { clearDrawStack } = props;
  const history = useHistory();

  const handleLeaveRoom = useCallback(() => {
    clearDrawStack();
    history.push("/");
  }, [history]);

  return (
    <OverlayContainer>
      <InterfaceIcon label="Leave Room" onClick={handleLeaveRoom}>
        <ExitToApp fontSize="large" />
      </InterfaceIcon>
      <InterfaceIcon label="View Players">
        <Group fontSize="large" />
      </InterfaceIcon>
    </OverlayContainer>
  );
};

InterfaceOverlay.propTypes = {
  clearDrawStack: PropTypes.func.isRequired,
};

export default InterfaceOverlay;
