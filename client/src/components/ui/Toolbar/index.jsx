import styled from "styled-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import InterfaceIcon from "components/ui/InterfaceIcon";
import { ExitToApp, Group } from "@material-ui/icons";
import { useCallback } from "react";
import useSocket from "hooks/useSocket";

const OverlayContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const Toolbar = (props) => {
  const { clearDrawStack, room, disconnectFromRoom } = props;
  const socket = useSocket();

  const handleLeaveRoom = useCallback(() => {
    clearDrawStack();
    if (socket) {
      socket.emit("leave-room", {
        roomCode: room.code,
        playerId: socket.id,
      });
    }
    disconnectFromRoom();
  }, [socket, room, clearDrawStack, disconnectFromRoom]);

  return (
    <OverlayContainer>
      <InterfaceIcon label="Leave Room" onClick={handleLeaveRoom}>
        <ExitToApp fontSize="large" />
      </InterfaceIcon>
      <InterfaceIcon label="View Players" disabled>
        <Group fontSize="large" />
      </InterfaceIcon>
    </OverlayContainer>
  );
};

Toolbar.propTypes = {
  clearDrawStack: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired,
  disconnectFromRoom: PropTypes.func.isRequired,
};

export default Toolbar;
