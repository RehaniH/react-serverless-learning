import React from "react";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CTA from "../styled/CTA";
import { Accent, StyledTitle } from "../styled/Random";

export default function Home() {
  return (
    <div>
      <StyledTitle>Ready to type?</StyledTitle>
      <CTA to="/game">
        Click or type <Accent>'s'</Accent> to start playing!
      </CTA>
    </div>
  );
}
