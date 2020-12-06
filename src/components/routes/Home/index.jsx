import styled from "styled-components";
import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";

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
`;

const Home = () => {
  const history = useHistory();

  const handleHost = useCallback(() => {
    history.push("/draw");
  }, [history]);

  const handleJoin = useCallback(() => {
    history.push("/draw");
  }, [history]);

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
    </MainContainer>
  );
};

export default Home;
