import { createGlobalStyle } from "styled-components";

var isDarkThemeEnabled = true;
export default createGlobalStyle`

    :root{
        --main-bg-color: ${isDarkThemeEnabled ? "#333" : "#f9f9f9"} ;
        --main-text-color: ${isDarkThemeEnabled ? "#f9f9f9" : "#333"};
        --accent-color: #e16365;
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
