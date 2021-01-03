import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Open-Sans", Helvetica, Sans-Serif;
    background: hsla(30, 100%, 50%, 1);
    background: linear-gradient(180deg, hsla(30, 100%, 50%, 1) 0%, hsla(44, 100%, 50%, 1) 100%);

  background-repeat: no-repeat;
    background-attachment: fixed;
  }
`;

export default GlobalStyle;
