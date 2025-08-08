import React, { useEffect, useState } from 'react'

interface WordCorrectnessProps {
  letters: string[];
  correctWord: string;
  setRowStatus: React.Dispatch<React.SetStateAction<string[]>>;

}


const WordCorrectness: React.FC<WordCorrectnessProps> = ({ letters, correctWord, setRowStatus }) => {
  const WORDSIZE = 5;

  //Each index can receive one of the three values: wrong-position, right-position, absent-letter.
  const lettersStatus = seeIfAWordIsCorrect();

  function seeIfAWordIsCorrect() {

    let newStatus = ["", "", "", "", ""]

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

  useEffect(() => {
    setRowStatus(prevStatus => {
      let newStatus = [...prevStatus];
      let statusLength = prevStatus.length;
      for (let i = 0; i < statusLength - 1; i++) {
        if (newStatus[i] == "activated") {
          newStatus[i] = "completed";
          newStatus[i + 1] = "activated";
        }
      }
      return prevStatus
    })
  }, [lettersStatus])


  return (
    <>
      <form className='game-screen-row' action="">
        {
          [0, 1, 2, 3, 4].map(index => {
            if (lettersStatus[index] == "right-position") {
              return (
                <div
                  key={index}
                  className="letter-square right-position"
                >{letters[index]}</div>
              )
            }
            else if (lettersStatus[index] == "wrong-position") {
              return (
                <div
                  key={index}
                  className="letter-square wrong-position"
                >{letters[index]}</div>
              )

            }
            else if (lettersStatus[index] == "absent-letter") {
              return (
                <div
                  key={index}
                  className="letter-square absent-letter"
                >{letters[index]}</div>
              )

            }

          }

          )
        }
      </form>
    </>
  )
}

export default WordCorrectness