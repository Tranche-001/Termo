import React from 'react'

interface WordCorrectnessProps {
  word: string[];
  correctedSequence: string[];
}


const WordCorrectness: React.FC<WordCorrectnessProps> = ({ word, correctedSequence }) => {
  console.log(correctedSequence);
  return (
    <>
    <form className='game-screen-row' action="">
    {
      [0, 1, 2, 3, 4].map(index => {
        if (correctedSequence[index] == "right-position") {
          return (
            <input
              type="text"
              key={index}
              className="letter-square right-position"
              maxLength={1}
              defaultValue={word[index]}
            />
          )
        }
        else if (correctedSequence[index] == "wrong-position") {
          return (
            <input
              type="text"
              key={index}
              className="letter-square wrong-position"
              maxLength={1}
              defaultValue={word[index]}
            />
          )
          
        }
         else if (correctedSequence[index] == "absent-letter") {
          return (
            <input
              type="text"
              key={index}
              className="letter-square absent-letter"
              maxLength={1}
              defaultValue={word[index]}
            />
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