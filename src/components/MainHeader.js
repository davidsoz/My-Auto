import styled from "styled-components";
import Logo from "../icons/Logo";

const Header = styled.header`
  max-width: 1050px;
  margin: 0 auto;
  padding: 17px 0;
`;

function MainHeader() {
  return (
    <Header>
      <Logo />
    </Header>
  );
}

export default MainHeader;
