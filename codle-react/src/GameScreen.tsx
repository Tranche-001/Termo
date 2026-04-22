import { useEffect, useState } from "react";
import GameRow from "./GameRow";

import data from "../assets/data/words.json";
type EndGame = [boolean, string];

interface GameScreenProps {
  setIsInvalidWordModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEndGameModalOpen: EndGame;
  setIsEndGameModalOpen: React.Dispatch<React.SetStateAction<EndGame>>;

}
export const GameScreen: React.FC<GameScreenProps> = ({ setIsInvalidWordModalOpen, isEndGameModalOpen, setIsEndGameModalOpen }) => {
  const NUM_OF_ROWS = 6;
  const numOfRows = Array.from({ length: NUM_OF_ROWS }, (_, index) => index)

  const [gameWord, setGameWord] = useState<string>("");

  const [rowStatus, setRowStatus] = useState<string[]>(["activated", "deactivated", "deactivated", "deactivated", "deactivated", "deactivated"]);

  //If everyRowIscompleted and the modal is not already open -> the player lost the game
  useEffect(() => {
    let everyRowIsCompleted = true;
    rowStatus.map(row => {
      if (row != "completed") {
        everyRowIsCompleted = false;
      }
    })
    if (everyRowIsCompleted) {
      if (!isEndGameModalOpen[0]) setIsEndGameModalOpen([true, "lost"]);
    }
  }, [rowStatus])

  //Words Logic
  const [words, setWords] = useState([]);

  // 1. Unificamos o Fetch e a escolha da palavra
  useEffect(() => {
    fetch('https://wordle-backend-sc1m.onrender.com/api/words')
      .then(response => response.json())
      .then(data => {
        const wordList = data.map((item: { word: string; }) => item.word.toLowerCase());
        setWords(wordList);

        // Escolhemos a palavra IMEDIATAMENTE após receber a lista
        if (wordList.length > 0) {
          const randomWord = getRandomWord(wordList);
          console.log(randomWord)
          setGameWord(randomWord);
        }
      })
      .catch(error => console.error('Error fetching words:', error));
  }, []);
  //if the endGame Modal is Open -> set all Rows as completed
  useEffect(() => {
    if (isEndGameModalOpen[0]) {
      setRowStatus(prevStatus => {
        const newStatus = [...prevStatus];

        for (let i = 0; i < NUM_OF_ROWS; i++) {
          if (newStatus[i] == "activated") newStatus[i] = "deactivated";
        }
        return newStatus;
      })
    }
  }, [isEndGameModalOpen[0]]);


  // gets a random int number between [min, max] (inclusive)
  const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random()
      * (max - min + 1)) + min;
  };
  function getRandomWord(wordList: []) {
    const randomIndex = randomNumberInRange(0, wordList.length - 1)
    console.log(wordList[randomIndex]);
    return wordList[randomIndex];
  }




  function seeIfWordIsValidOnDataSet(word: string) {
    let isWordValid = false;
    for (let i = 0; i < words.length - 1; i++) {
      if (word === words[i]) {
        isWordValid = true;
      }
    }
    return isWordValid;
  }
  
  if (!gameWord) {
    return <div style={{color:'white'}}>Carregando dicionário...</div>; // Evita que o GameRow receba uma string vazia
  }
  else {
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
}