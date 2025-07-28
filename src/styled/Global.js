import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

    :root{
        --main-bg-color: ${(props) => props.theme.mainBgColor} ;
        --main-text-color: ${(props) => props.theme.mainTextColor} ;
        --accent-color: ${(props) => props.theme.accent} ;
    }

    *{
        margin:0;
        font-family: sans-serif;
        color: var(--main-text-color);
        font-weight: 300;
        box-sizing: border-box;
    }

    h1, h2{
        margin-bottom: 2rem;
    }
    

`;
