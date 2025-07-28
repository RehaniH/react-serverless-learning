import React from "react";
import { Link } from "react-router-dom";
import { Accent } from "../styled/Random";
import {
  StyledNavbar,
  StyledNavBrand,
  StyledLink,
  StyledNavItems,
  ButtonStyledLink,
} from "../styled/Navbar";
import { ButtonStyled } from "../styled/Button";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar({ toggleTheme }) {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <StyledNavbar>
      <StyledNavBrand>
        <Link to="/">
          Learn.Build.<Accent>Type.</Accent>
        </Link>
      </StyledNavBrand>
      <StyledNavItems>
        <li>
          <StyledLink to="/">Home</StyledLink>
        </li>
        <li>
          <StyledLink to="/highScores">highScores</StyledLink>
        </li>
        {!isAuthenticated && (
          <ButtonStyledLink onClick={() => loginWithRedirect()}>
            Login
          </ButtonStyledLink>
        )}
        {isAuthenticated && (
          <ButtonStyledLink onClick={() => logout()}>Logout</ButtonStyledLink>
        )}

        <ButtonStyled onClick={toggleTheme}>Toggle Theme</ButtonStyled>
      </StyledNavItems>
    </StyledNavbar>
  );
}
