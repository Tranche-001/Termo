
import React, { useEffect, useRef, useState } from 'react'
import WordInput from './WordInput';
import WordCorrectness from './WordCorrectness';

interface GameRowProps {
  rowStatus: string,
  correctWord: string,
  seeIfWordIsValidOnDataSet: (word: string) => boolean
  setRowStatus: React.Dispatch<React.SetStateAction<string[]>>;
  setIsInvalidWordModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

const GameRow: React.FC<GameRowProps> = ({ rowStatus, correctWord, seeIfWordIsValidOnDataSet, setRowStatus, setIsInvalidWordModalOpen }) => {
  //inputed letters
  const [letters, setLetters] = useState<string[]>(["", "", "", "", ""]);

  //Correction logic(Starts when enter is pressed after inputing all letters)
  const word = letters.join("");


  function startCorrection() {
    if (seeIfWordIsValidOnDataSet(word)) {

      setRowStatus(prevStatus => {
        let newStatus = [...prevStatus];
        let statusLength = prevStatus.length;
        for (let i = 0; i < statusLength; i++) {
          if (newStatus[i] == "activated") {
            newStatus[i] = "completed";
            if(i<statusLength-1)newStatus[i + 1] = "activated";
            break;
          }
          if (i == statusLength - 1) {
            newStatus[i] = "completed";
          }
        }
        return newStatus;
      })
    }
    else {
      //if the word is invalid, open the modal
      setIsInvalidWordModalOpen(true);
    }
  }

  if (rowStatus == "activated") {
    return (
      <>
        <WordInput
          letters={letters}
          status={rowStatus}
          handleStartCorrection={startCorrection}
          setLetters={setLetters}
        />
      </>
    )
  }

  else if (rowStatus == "completed") {
    return <WordCorrectness letters={letters} correctWord={correctWord} setRowStatus={setRowStatus} />
  }
  else if (rowStatus == "deactivated") {
    return (<div className='game-screen-row'>{
      [0, 1, 2, 3, 4].map(index => (
        <div
          key={index}
          className="letter-square"
        />
      ))
    }
    </div>)

  }

}

export default GameRow