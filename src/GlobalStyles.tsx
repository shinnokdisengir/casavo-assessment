import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  body {
    overflow: hidden;
    margin: 0;
    font-family: 'Nunito', sans-serif;
  }  
  #root {
    background-color: #303030;
    height: 100vh;
  }
  .main-button {
    position: absolute;
    right: 8px;
    top: 8px;
  }

  .error {
    color: red;
    font-size: smaller;
  }

  .row {
    padding: 2px 4px;
    & > *:not(:last-child) {
      margin-right: 8px;
    }
  }
`;

export default GlobalStyles;
