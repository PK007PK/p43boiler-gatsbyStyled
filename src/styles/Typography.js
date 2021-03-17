import { createGlobalStyle } from 'styled-components';

const Typography = createGlobalStyle`


  p, li {
    letter-spacing: 0.5px;
  }
  h1,h2,h3,h4,h5,h6 {
    font-weight: normal;
    margin: 0;
  }
  a {
    color: var(--black);
    text-decoration-color: var(--red);
    text-decoration-skip-ink: none;
  }

  ul {
    padding: 0;
  }



`;

export default Typography;
