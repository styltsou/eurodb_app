import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: none;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;

    @media ${(props) => props.theme.mediaQueries.largest} {
      font-size: 60%;
    }
  
    @media ${(props) => props.theme.mediaQueries.large} {
      font-size: 57.5%;
    }
  
    @media ${(props) => props.theme.mediaQueries.small} {
      font-size: 55%;
    }
  }

  body {
    font-family: 'Roboto', sans-serif;
    box-sizing: inherit;
    font-weight: 400;
    line-height: 1.6rem;
    z-index: 0;
    scrollbar-width: thin;
    
    --color-primary: ${(props) => props.theme.colors.primary};
    --color-black: ${(props) => props.theme.colors.black};
    --color-white: ${(props) => props.theme.colors.white};

    --color-text: ${(props) => props.theme.colors.text};
  }

  body::webkit-scrollbar {
    width: .7rem;
  }

  a,
  input,
  button {
    cursor: pointer;
    outline: none;
    text-decoration: none;
    font-family: inherit;
  }
`;
