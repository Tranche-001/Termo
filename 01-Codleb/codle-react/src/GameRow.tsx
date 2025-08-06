
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

  //Each index can receive one of the three values: wrong-position, right-position, absent-letter.
  const [lettersStatus, setLettersStatus] = useState<string[]>(["", "", "", "", ""])

  const [startCorrection, setStartCorrection] = useState<boolean>(false);

  //this serves to determine if we are going to print the input or the word already corrected on the row.
  const [print, setPrint] = useState<string>("input");
  
  const WORDSIZE = 5;

  function seeIfAWordIsCorrect() {
    setLettersStatus(prevStatus => {
      let newStatus = [...prevStatus]

      // If the letter at index i doesn't match any letters in the correct word:
      // - Status is "wrong"
      // If the letter exists in the correct word but at a different index:
      // - Status is "wrong-position"
      // If the letter matches both in value and position:
      // - Status is "right-position"
      // By prioritizing the last condition (breaking early when a match is found), we ensure that:
      // - "right-position" takes precedence over "wrong-position"
      // - "wrong-position" will never incorrectly override "right-position"

      for (let i = 0; i < WORDSIZE; i++) {
        for (let j = 0; j < WORDSIZE; j++) {
          if (letters[i] === correctWord[j]) {
            if (i == j) {
              newStatus[i] = "right-position";
              break;
            }
            else {
              newStatus[i] = "wrong-position";
            }
          }
          else {
            newStatus[i] = "absent-letter";
          }
        }
      }
      return newStatus;
    }
    )
    setPrint("correctness")
  }



  //Correction logic(Starts when enter is pressed after inputing all letters)
  if (startCorrection) {
    //Verify if the word exists
    const word = letters.join("");
    if (seeIfWordIsValidOnDataSet(word)) {
      seeIfAWordIsCorrect();
    }
    else {
      //Lift modal up, HEYYY THIS IS NOT A VALID WORD!
      alert("NOT VALID BRO >:|")
    }
    setStartCorrection(false);
  }




  if (print == "input") {
    return (
      <>
        <WordInput
          letters={letters}
          status={rowStatus}
          handleStartCorrection={setStartCorrection}
          setLetters = {setLetters}
        />
      </>
    )
  }

  else if (print == "correctness") {
   return <WordCorrectness word={letters} correctedSequence = {lettersStatus} />
  }

}

export default GameRow