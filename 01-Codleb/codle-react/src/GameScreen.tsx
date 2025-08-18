import { useEffect, useState } from "react";
import GameRow from "./GameRow";

import data from "../assets/data/words.json";
interface GameScreenProps {
  setIsInvalidWordModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEndGameModalOpen: boolean;
}
export const GameScreen: React.FC<GameScreenProps> = ({ setIsInvalidWordModalOpen, isEndGameModalOpen}) => {
  const NUM_OF_ROWS = 6;
  const numOfRows = Array.from({ length: NUM_OF_ROWS }, (_, index) => index)

  const [gameWord, setGameWord] = useState<string>("");

  const [rowStatus, setRowStatus] = useState<string[]>(["activated", "deactivated", "deactivated", "deactivated", "deactivated", "deactivated"]);

  const [endGame, setEndGame] = useState<boolean>(false);
  
  useEffect(() => {
    let everyRowIsCompleted = true;
    rowStatus.map(row => {
      if (row != "completed") everyRowIsCompleted = false;
    })
    if (everyRowIsCompleted) setEndGame(true);
  }, [rowStatus])
  // gets a random int number between [min, max] (inclusive)
  const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random()
      * (max - min + 1)) + min;
  };

  //if the endGame Modal is Open -> set all Rows as completed
  useEffect(() => {
    if(isEndGameModalOpen){
      setRowStatus(prevStatus => {
        let newStatus = [...prevStatus];

        for(let i=0; i<NUM_OF_ROWS; i++){
          if(newStatus[i] == "activated")newStatus[i] ="deactivated";
        }
        return newStatus;
      })
    }
  }, [isEndGameModalOpen]);


  function getRandomWord() {
    const randomIndex = randomNumberInRange(0, data.words.length - 1)
    console.log(data.words[randomIndex]);
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
        {
          numOfRows.map(index => {
            return <GameRow rowStatus={rowStatus[index]}
              correctWord={gameWord}
              seeIfWordIsValidOnDataSet={seeIfWordIsValidOnDataSet}
              setRowStatus={setRowStatus}
              key={index}
              setIsInvalidWordModalOpen={setIsInvalidWordModalOpen}

            />
          })
        }

      </div>
    </>
  )
}