import { useEffect, useState } from "react";
import GameRow from "./GameRow";

import data from "../assets/data/words.json";
export function GameScreen() {

  const [gameWord, setGameWord] = useState<string>("");

  // gets a random int number between [min, max] (inclusive)
  const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random()
      * (max - min + 1)) + min;
  };


  function getRandomWord() {
    const randomIndex = randomNumberInRange(0, data.words.length - 1)
    return data.words[randomIndex];
  }

  useEffect(() => {
    const newGameWord = getRandomWord();
    setGameWord(newGameWord);
  }, [])


  return (
    <>
      <div className="game-screen-container">
        <h2>Word is {gameWord}</h2>
        <GameRow status={"activated"} />
      </div>
    </>
  )
}