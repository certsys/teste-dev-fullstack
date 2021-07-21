import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Work Sans', sans-serif;
  }

  button {
    cursor: pointer;
  }

  main {
    padding: 4vh 8vh;
    background-color: #eeeeee;

    @media only screen and (max-width: 600px) {
      padding: 4vh 3%;
    }
  }

  section {
    min-height: calc(100vh - 40px - 60px - 8vh);
  }

  .MuiButtonBase-root {
    padding: 0!important;
    min-width: 10px!important;
  }
`;
