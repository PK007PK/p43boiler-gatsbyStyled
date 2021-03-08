import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  color: var(--red);
  ${({ theme }) => theme.media.lgAbove} {
    color: red;
  }
`;

const Button = () => {
  // const { toogleIsActive, isActive } = useContext(AppContext);
  // const { piotrek } = useContext(AppContext);
  return (
    <StyledButton>
      {/* <StyledButton className="zx" onClick={toogleIsActive}>
        {isActive ? "Active" : "Inactive"}
      </StyledButton> */}
      {/* {piotrek} */}zz
    </StyledButton>
  );
};

export default Button;
