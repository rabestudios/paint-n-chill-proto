import styled from "styled-components";
import InterfaceIcon from "components/ui/InterfaceIcon";
import { ExitToApp, Group } from "@material-ui/icons";

const OverlayContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const InterfaceOverlay = () => (
  <OverlayContainer>
    <InterfaceIcon label="Leave Room">
      <ExitToApp fontSize="large" />
    </InterfaceIcon>
    <InterfaceIcon label="View Players">
      <Group fontSize="large" />
    </InterfaceIcon>
  </OverlayContainer>
);

export default InterfaceOverlay;
