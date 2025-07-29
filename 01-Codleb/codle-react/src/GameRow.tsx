
import React, { useEffect, useRef, useState } from 'react'

const GameRow = () => {
  const [letters, setLetters] = useState<string[]>(["", "", "", "", ""]);

  const inputRefs = useRef<HTMLDivElement>(null);


  function handleLetterChangeOnWord(e: any, index: number) {
    const newLetter = e.target.value;
    console.log(newLetter)
    console.log(letters)
    setLetters(prevLetters => {
      let newLetters = [...prevLetters];
      newLetters[index] = newLetter;
      return newLetters;
    })

    if (newLetter != '') {
      console.log("entrei")
      jumptToNextLetter(index);
    }


  }

  function jumptToNextLetter(index: number) {
    // no caso de nodes precisamos de uma lista de 0 a 4
    const listNodes = inputRefs.current;
    // lida com o caso null
    if (!listNodes) {
      return;
    }

    const inputNodes = listNodes.querySelectorAll<HTMLInputElement>('input');
    let inputNode = inputNodes[index + 1];
    if (index < 4) {
      inputNode.focus();
    }
    else {
      inputNode = inputNodes[index];
      inputNode.blur();
    }

  }

// Goes to the end of the input when focusing
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      e.target.setSelectionRange(
        e.target.value.length,
        e.target.value.length
      );
    }, 0);
  };

  return (

    <>
      <div className='game-screen-row' ref={inputRefs}>{
        [0, 1, 2, 3, 4].map(index => (
          <input
            type="text"
            key={index}
            className="letter-square activated"
            maxLength={1}
            value={letters[index]}
            onChange={e => handleLetterChangeOnWord(e, index)}
            onFocus={handleFocus }
          />
        ))
      }
      </div>
    </>
  )
}

export default GameRow