import Canvas from "components/routes/Draw/Canvas/container";
import InterfaceOverlay from "components/ui/InterfaceOverlay/container";
import { MainContainer } from "components/routes/Draw/styles";

const Draw = () => (
  <MainContainer>
    <Canvas />
    <InterfaceOverlay />
  </MainContainer>
);

export default Draw;
