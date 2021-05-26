import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { BootsContainer } from 'src/components/BootsElements/BootsElements';

const NavStyle = styled.nav`
  ul {
    display: flex;
  }

  li {
    list-style: none;
    margin-right: 20px;
  }
`;

export default function Navbar() {
  return (
    <NavStyle>
      <BootsContainer>
        <ul>
          <li>
            <Link to="/">Index</Link>
          </li>
          <li>
            <Link to="/test">Test</Link>
          </li>
          <li>
            <Link to="/blog/1">Blog</Link>{' '}
          </li>
        </ul>
      </BootsContainer>
    </NavStyle>
  );
}
