import styled from "styled-components";

const OverlayContainer = styled.div`
  position: absolute;
  z-index: 2;
`;

const InterfaceOverlay = () => (
  <OverlayContainer>Inteface Overlay</OverlayContainer>
);

export default InterfaceOverlay;
