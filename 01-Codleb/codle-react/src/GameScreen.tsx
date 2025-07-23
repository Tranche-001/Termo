import { useEffect, useState } from "react";

export function GameScreen() {
  const [letters, setLetters] = useState([""])
  /*  */
  function handleLetterChangeOnWord(e: any, index: any) {
    const newLetter = e.target.value;
    setLetters(prevLetters => {
      let newLetters = prevLetters;
      newLetters[index] = newLetter;
      return newLetters;
    })
  }


  return (
    <>
      <div className="game-screen-container">
        {
          [0,1,2,3,4].map(index => (
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
      
      </div>
    </>
  )
}