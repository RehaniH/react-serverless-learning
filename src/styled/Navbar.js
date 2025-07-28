import { Link } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";

export const StyledNavbar = styled.nav`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 20px;
`;

export const StyledNavBrand = styled.div`
  font-size: 24px;
  text-align: left;

  & > a {
    text-decoration: none;
  }
`;

export const StyledNavItems = styled.ul`
  display: grid;
  list-style: none;
  padding-left: 0;
  grid-gap: 20px;
  align-items: center;
  grid-auto-flow: column;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  transition: 200ms;

  &:hover {
    color: var(--accent-color);
  }
`;
