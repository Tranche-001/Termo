
import React, { useEffect, useRef, useState } from 'react'
import WordInput from './WordInput';

interface GameRowProps {
  status: string
}

const GameRow: React.FC<GameRowProps>= ({ status }) => {
  const [letters, setLetters] = useState<string[]>(["", "", "", "", ""]);
  const [lastEditedIndex, setLastEditedIndex] = useState<number | null>(null);

  const inputRefs = useRef<HTMLDivElement>(null);
  const WORDSIZE = 5;

  function handleLetterChangeOnWord(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const newLetter = e.target.value;

    setLetters(prevLetters => {
      let newLetters = [...prevLetters];
      newLetters[index] = newLetter;
      return newLetters;
    })
    // this will be important to know from where to where we are going to jump when focusing
    // if the last edited was the 3th one, then jump to the next letter will go to the 4th
    setLastEditedIndex(index)
  }

  useEffect(() => {
    if (lastEditedIndex !== null && letters[lastEditedIndex] !== "") {
      jumptToNextEmptyLetter(lastEditedIndex);
    }
  }, [letters, lastEditedIndex]);


  function jumptToNextEmptyLetter(index: number) {
    const listNodes = inputRefs.current;
    // lida com o caso null
    if (!listNodes) {
      return;
    }

    const inputNodes = listNodes.querySelectorAll<HTMLInputElement>('input');
    
    let inputNode = null;
    // search for the next empty letter
    // Why i%WORDSIZE?, because I want to cycle through the Array, starting from the index next to the last filled
    // and then going until it stops right before the last filled
    let flagLetterIsEmpty = false;
    for(let i=index+1; i<index+5; i++){
      if(inputNodes[i%WORDSIZE].value===""){
        flagLetterIsEmpty = true;
        inputNode = inputNodes[i%WORDSIZE];
        inputNode.focus();
        break;
      }
    }
    if(!flagLetterIsEmpty){
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
      <WordInput
        letters={letters}
        handleLetterChangeOnWord={handleLetterChangeOnWord}
        handleFocus={handleFocus}
        inputRefs = {inputRefs}
        status={status}
        />
    </>
  )
}

export default GameRow