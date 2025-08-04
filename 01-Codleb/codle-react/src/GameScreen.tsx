import { useEffect, useState } from "react";
import GameRow from "./GameRow";

import data from "./codle-react/assets/data/words.json";
export function GameScreen() {
  //I need a function that every game pulls a random word to be the Game Word so that I can compare with the input


  // gets a random int number between [min, max] (inclusive)
  const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random()
      * (max - min + 1)) + min;
  };

  function getRandomWord() {
    const randomNum = randomNumberInRange(0, data.length - 1)
    data.words[10];
  }

  return (
    <>
      <div className="game-screen-container">
        <GameRow status={"activated"} />
      </div>
    </>
  )
}