import PropTypes from "prop-types";
import styled from "styled-components";

const HeaderContainer = styled.div`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
  position: absolute;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.5rem;
`;

const DrawHeader = ({ roomCode }) => (
  <HeaderContainer>{roomCode}</HeaderContainer>
);

DrawHeader.propTypes = {
  roomCode: PropTypes.string.isRequired,
};

export default DrawHeader;
