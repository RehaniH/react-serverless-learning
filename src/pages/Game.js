import React, { useCallback, useEffect, useState } from "react";
import {
  StyledCharacter,
  StyledGame,
  StyledScore,
  StyledTimer,
} from "../styled/Game";

import { Strong } from "../styled/Random";
import { useScore } from "../context/ScoreContext";

export default function Game({ history }) {
  const MAX_SECONDS = 5;
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const [currentCharacter, setCurrentCharacter] = useState("");

  const [score, setScore] = useScore();
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(MAX_SECONDS); // count down timer

  useEffect(() => {
    setScore(0); // reset score
    setRandomCharacter();
    const currentTime = new Date();
    const interval = setInterval(() => updateTime(currentTime), 1);

    return () => {
      clearInterval(interval);
    };
  }, []); //array used to make sure it is run just once

  const updateTime = (startTime) => {
    const endTime = new Date();
    const msPassed = (endTime.getTime() - startTime.getTime()).toString();

    const formattedMsString = ("0000" + msPassed).slice(-5);
    // 00000 - first two are the seconds, last three are ms

    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMsString.substring(0, 2)) - 1;

    const updatedMs =
      1000 -
      parseInt(formattedMsString.substring(formattedMsString.length - 3));

    setSeconds(addLeadingZeros(updatedSeconds, 2));
    setMs(addLeadingZeros(updatedMs, 3));

    // console.log(formattedMsString.substring(formattedMsString.length - 3));
  };

  const addLeadingZeros = (num, length) => {
    let zeros = "";

    for (let i = 0; i <= length; i++) {
      zeros += "0";
    }

    return (zeros + num).slice(-length);
  };

  useEffect(() => {
    if (seconds <= -1) {
      //Todo: save the score
      history.push("/gameOver");
    }
  }, [seconds, ms, history]);

  const keyUpHandler = useCallback(
    (e) => {
      console.log(e.key, currentCharacter);
      if (e.key === currentCharacter) {
        setScore((prevScore) => prevScore + 1);
      } else {
        if (score > 0) {
          setScore((prevScore) => prevScore - 1);
        }
      }
      setRandomCharacter();
    },
    [currentCharacter]
  );

  useEffect(() => {
    document.addEventListener("keyup", keyUpHandler);

    return () => {
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [keyUpHandler]);

  const setRandomCharacter = () => {
    const randomInt = Math.floor(Math.random() * 36);
    setCurrentCharacter(characters[randomInt]);
  };

  return (
    <StyledGame>
      <StyledScore>
        Score:<Strong>{score}</Strong>
      </StyledScore>
      <StyledCharacter>{currentCharacter}</StyledCharacter>
      <StyledTimer>
        Time:
        <Strong>
          {seconds}: {ms}
        </Strong>
      </StyledTimer>
    </StyledGame>
  );
}
