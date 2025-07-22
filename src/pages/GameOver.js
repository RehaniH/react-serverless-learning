import React, { useState, useEffect } from "react";
import { useScore } from "../context/ScoreContext";
import { StyledLink } from "../styled/Navbar";
import { StyledCharacter } from "../styled/Game";

export default function GameOver({ history }) {
  const [score] = useScore();
  const [scoreMessage, setScoreMessage] = useState("");

  if (score === -1) {
    history.push("/");
  }

    useEffect(() => {
        const saveHighScore = async () => {
            try {
                const options = {
                    method: 'POST',
                    body: JSON.stringify({ name: 'Sasha', score }),
                };
                const res = await fetch(
                    '/.netlify/functions/saveHighScores',
                    options
                );

                const data = await res.json();
                if (data.id) {
                    setScoreMessage('Congrats! You got a high score!!');
                } else {
                    setScoreMessage('Sorry, not a high score. Keep trying!');
                }
            } catch (err) {
                console.error(err);
            }
        };
        saveHighScore();
    }, [score]);

  return (
    <div>
      <h1>GameOver</h1>
      <StyledCharacter>{score}</StyledCharacter>
      <p>{scoreMessage}</p>
      <StyledLink to="/">Go Home</StyledLink>
      <StyledLink to="/game">Play Again</StyledLink>
    </div>
  );
}
