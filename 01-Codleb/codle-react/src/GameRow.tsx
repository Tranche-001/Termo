
import React, { useEffect, useRef, useState } from 'react'
import WordInput from './WordInput';
import WordCorrectness from './WordCorrectness';

interface GameRowProps {
  rowStatus: string,
  correctWord: string,
  seeIfWordIsValidOnDataSet: (word: string) => boolean
}

const GameRow: React.FC<GameRowProps> = ({ rowStatus, correctWord, seeIfWordIsValidOnDataSet }) => {
  //inputed letters
  const [letters, setLetters] = useState<string[]>(["", "", "", "", ""]);

  //this serves to determine if we are going to print the input or the word already corrected on the row.
  const [print, setPrint] = useState<string>("input");

  //Correction logic(Starts when enter is pressed after inputing all letters)
  const word = letters.join("");

  function startCorrection(){
    if(seeIfWordIsValidOnDataSet(word)){
      setPrint("correctness");
    }
    else{
      alert("NOT VALID BRO !>:|");
    }
  }

  if (print == "input") {
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

  else if (print == "correctness") {
    return <WordCorrectness letters={letters} correctWord={correctWord} />
  }

}

export default GameRow