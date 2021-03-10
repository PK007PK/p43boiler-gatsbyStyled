import React, { useContext } from "react";
import styled from "styled-components";
import AppContext from "../AppProvider";

const StyledButton = styled.button`
  color: var(--red);
  ${({ theme }) => theme.media.lgAbove} {
    color: red;
  }
`;

const Button = () => {
  const { toogleIsActive, isActive } = useContext(AppContext);

  return (

      <StyledButton className="zx" onClick={toogleIsActive}>
        {isActive ? "Active" : "Inactive"}
      </StyledButton>
  );
};

export default Button;
