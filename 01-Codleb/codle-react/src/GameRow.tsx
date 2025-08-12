
import React, { useEffect, useRef, useState } from 'react'
import WordInput from './WordInput';
import WordCorrectness from './WordCorrectness';

interface GameRowProps {
  rowStatus: string,
  correctWord: string,
  seeIfWordIsValidOnDataSet: (word: string) => boolean
  setRowStatus: React.Dispatch<React.SetStateAction<string[]>>;

}

const GameRow: React.FC<GameRowProps> = ({ rowStatus, correctWord, seeIfWordIsValidOnDataSet, setRowStatus }) => {
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
            newStatus[i + 1] = "activated";
            break;
          }
          if( i == statusLength-1){
            newStatus[i] = "completed";
          }
        }
        return newStatus;
      })
    }
    else {
      //Seta modal de palavra invalidas
      // setIsModalOpen(true);
      alert("NOT VALID BRO !>:|");
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