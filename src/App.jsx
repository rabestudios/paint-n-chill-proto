import Canvas from "components/Canvas/container";
import InterfaceOverlay from "components/ui/InterfaceOverlay";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
`;

function App() {
  return (
    <MainContainer>
      <Canvas />
      <InterfaceOverlay />
    </MainContainer>
  );
}

export default App;
