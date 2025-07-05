import React from "react";
import { useScore } from "../context/ScoreContext";
import { StyledLink } from "../styled/Navbar";

export default function GameOver({ history }) {
  const [score, setScore] = useScore();

  if (score === -1) {
    history.push("/");
  }

  return (
    <div>
      <h1>GameOver</h1>
      <p>{score}</p>
      <StyledLink to="/">Go Home</StyledLink>
      <StyledLink to="/game">Play Again</StyledLink>
    </div>
  );
}
