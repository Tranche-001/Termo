import React, { useState } from 'react'

const GameRow = () => {
  const [letters, setLetters] = useState([""])

  function handleLetterChangeOnWord(e: any, index: any) {
    const newLetter = e.target.value;
    setLetters(prevLetters => {
      let newLetters = prevLetters;
      newLetters[index] = newLetter;
      return newLetters;
    })
  }



  return (
    <>{
      [1, 2, 3, 4, 5].map(index => (
        <input
          type="text"
          key={index}
          className="letter-square activated"
          maxLength={1}
          value={letters[index]}
          onChange={e => handleLetterChangeOnWord(e, index)}
        />
      ))
    }
    </>
  )
}

export default GameRow