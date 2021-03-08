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
  // const { toogleIsActive, isActive } = useContext(AppContext);
  // const { piotrek } = useContext(AppContext);
  return (
    <button>
      {/* <StyledButton className="zx" onClick={toogleIsActive}>
        {isActive ? "Active" : "Inactive"}
      </StyledButton> */}
      {/* {piotrek} */}zz
    </button>
  );
};

export default Button;
