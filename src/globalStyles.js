import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    background: rgb(250, 187, 46);
    background: linear-gradient(
    0deg,
    rgba(250, 187, 46, 1) 0%,
    rgba(241, 126, 40, 1) 100%
  );
  background-repeat: no-repeat;
    background-attachment: fixed;
  }
`;

export default GlobalStyle;
