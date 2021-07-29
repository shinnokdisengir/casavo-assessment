import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    overflow: hidden;
    margin: 0;
  }  
  #root {
    background-color: gainsboro;
    height: 100vh;
  }
  .main-button {
    position: absolute;
    right: 8px;
    top: 8px;
  }
`;

export default GlobalStyles;
