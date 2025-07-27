import React, { useState, useEffect } from "react";
import { useScore } from "../context/ScoreContext";
import { StyledLink } from "../styled/Navbar";
import { StyledCharacter } from "../styled/Game";
import { StyledTitle } from "../styled/Random";
import { useAuth0 } from "@auth0/auth0-react";

export default function GameOver({ history }) {
  const [score] = useScore();
  const [scoreMessage, setScoreMessage] = useState("");
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  if (score === -1) {
    history.push("/");
  }

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log(token);
        const options = {
          method: "POST",
          body: JSON.stringify({ name: "Sasha", score }),
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
        const res = await fetch("/.netlify/functions/saveHighScores", options);

        let data;
        if (parseInt(res.headers.get("content-length"), 10) > 0) {
          data = await res.json();
        }

        if (data?.id) {
          setScoreMessage("Congrats! You got a high score!!");
        } else {
          setScoreMessage("Sorry, not a high score. Keep trying!");
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (isAuthenticated) {
      saveHighScore();
    }
  }, [score]);

  return (
    <div>
      <StyledTitle>GameOver</StyledTitle>

      {isAuthenticated && <h2>{scoreMessage}</h2>}

      {!isAuthenticated && (
        <h2>You need to sign in to compete with high scores!</h2>
      )}

      <StyledCharacter>{score}</StyledCharacter>
      <div>
        <StyledLink to="/">Go Home</StyledLink>
      </div>

      <div>
        <StyledLink to="/game">Play Again</StyledLink>
      </div>
    </div>
  );
}
