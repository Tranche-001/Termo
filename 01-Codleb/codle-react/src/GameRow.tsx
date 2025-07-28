
import React, { useRef, useState } from 'react'

const GameRow = () => {
  const [letters, setLetters] = useState([""]);

  const inputRefs = useRef<HTMLDivElement>(null);


  function handleLetterChangeOnWord(e: any, index: number) {
    const newLetter = e.target.value;
    console.log(newLetter)
    setLetters(prevLetters => {
      let newLetters = [...prevLetters];
      newLetters[index] = newLetter;
      return newLetters;
    })

    if(newLetter!=''){
      jumptToNextLetter(index);
    }

    
  }

  function jumptToNextLetter(index: number) {
    // no caso de nodes precisamos de uma lista de 0 a 4
    const newIndex = index - 1;
    const listNodes = inputRefs.current;
    // lida com o caso null
    if (!listNodes) {
      return;
    }

    const inputNodes = listNodes.querySelectorAll<HTMLInputElement>('input');
    let inputNode = inputNodes[newIndex+1];
    if(newIndex<4){
      inputNode.focus();
    }
    else{ 
      inputNode = inputNodes[newIndex];
      inputNode.blur();
    }
   
  }



  return (

    <>
      <div className='game-screen-row' ref={inputRefs}>{
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
      </div>
    </>
  )
}

export default GameRow