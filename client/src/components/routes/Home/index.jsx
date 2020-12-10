import styled from "styled-components";
import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import useSocket from "hooks/useSocket";
import RoomDialog from "./RoomDialog/container";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const StyledButton = styled(Button)`
  width: 250px;
  margin: 10px;
  padding: 10px;
  font-weight: bold;
  color: white;
`;

const Home = ({ isConnected, setIsHost }) => {
  const history = useHistory();
  const socket = useSocket();
  const [open, setIsOpen] = useState(false);

  useEffect(() => {
    if (isConnected) {
      history.push("/draw");
    }
  }, [isConnected, history]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleHost = useCallback(() => {
    if (!isConnected) {
      setIsHost(true);
      if (socket) {
        socket.emit("host-room", { hostId: socket.id });
      }
    }
  }, [setIsHost, socket, isConnected]);

  const handleJoin = useCallback(() => {
    setIsHost(false);
    handleOpen();
  }, [handleOpen, setIsHost]);

  return (
    <MainContainer>
      <Typography variant="h1" style={{ textAlign: "center" }}>
        Paint n Chill
      </Typography>
      <ButtonContainer>
        <StyledButton variant="contained" color="primary" onClick={handleHost}>
          Host
        </StyledButton>
        <StyledButton
          variant="contained"
          color="secondary"
          onClick={handleJoin}
        >
          Join
        </StyledButton>
      </ButtonContainer>
      <RoomDialog onOpen={open} onClose={handleClose} isOpen={open} />
    </MainContainer>
  );
};

export default Home;
