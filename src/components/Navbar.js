import React from "react";
import { Link } from "react-router-dom";
import { Accent } from "../styled/Random";
import {
  StyledNavbar,
  StyledNavBrand,
  StyledLink,
  StyledNavItems,
} from "../styled/Navbar";
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
          <button onClick={() => loginWithRedirect()}>Login</button>
        )}
        {isAuthenticated && <button onClick={() => logout()}>Logout</button>}

        <button onClick={toggleTheme}>Toggle Theme</button>
      </StyledNavItems>
    </StyledNavbar>
  );
}
