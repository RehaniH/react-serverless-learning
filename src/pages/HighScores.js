import React, { useEffect, useState } from "react";
import { ScoreLI, ScoreOL } from "../styled/HighScores";

export default function HighScores() {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    console.log("Getting high scores");
    const loadHighScores = async () => {
      try {
        const res = await fetch("/.netlify/functions/getHighScores");
        const scores = await res.json();
        console.log(scores);
        setHighScores(scores);
      } catch (err) {
        console.error("failed to fetch highscores: ", err);
      }
    };

    loadHighScores();
  }, []);

  return (
    <div>
      <h1>HighScores</h1>
      <ScoreOL>
        {highScores.map((score) => (
          <ScoreLI key={score.id}>
            {score.fields.name} - {score.fields.score}
          </ScoreLI>
        ))}
      </ScoreOL>
    </div>
  );
}
