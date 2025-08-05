import React from 'react'

interface WordCorrectnessProps {
  word: string[];
  correctedSequence: string[];
}


const WordCorrectness: React.FC<WordCorrectnessProps> = ({ word, correctedSequence }) => {
  return (
    <>{
      [0, 1, 2, 3, 4].map(index => {
        if (correctedSequence[index] == "right-position") {
          return (
            <input
              type="text"
              key={index}
              className="letter-square"
              maxLength={1}
            />
          )
        }
        else if (correctedSequence[])

      }

      )
    }
    </>
  )
}

export default WordCorrectness