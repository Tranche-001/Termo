import { useEffect, useState } from "react";
import GameRow from "./GameRow";

import data from "../assets/data/words.json";
export function GameScreen() {

  const [gameWord, setGameWord] = useState<string>("");

  const [rowStatus, setRowStatus] = useState<string[]>(["activated", "deactivated", "deactivated", "deactivated", "deactivated"]);


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


  function seeIfWordIsValidOnDataSet(word: string) {
    let isWordValid = false;
    for (let i = 0; i < data.words.length - 1; i++) {
      if (word === data.words[i]) {
        isWordValid = true;
      }
    }
    return isWordValid;
  }



  return (
    <>
      <div className="game-screen-container">
        <GameRow rowStatus={rowStatus[1]} correctWord={gameWord} seeIfWordIsValidOnDataSet={seeIfWordIsValidOnDataSet} setRowStatus={setRowStatus} />
        <GameRow rowStatus={rowStatus[1]} correctWord={gameWord} seeIfWordIsValidOnDataSet={seeIfWordIsValidOnDataSet} setRowStatus={setRowStatus} />
      </div>
    </>
  )
}