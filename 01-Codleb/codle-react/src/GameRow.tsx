
import React, { useEffect, useRef, useState } from 'react'
import WordInput from './WordInput';

interface GameRowProps {
  status: string,
  correctWord: string,
  seeIfWordIsValidOnDataSet: (word: string) => boolean
}

const GameRow: React.FC<GameRowProps>= ({ status, correctWord, seeIfWordIsValidOnDataSet}) => {
  const [letters, setLetters] = useState<string[]>(["", "", "", "", ""]);

  //Each index can receive one of the three values: wrong-position, right-position, wrong-letter.
  const [lettersStatus, setLettersStatus] = useState<string[]>(["", "", "", "", ""])


  const [lastEditedIndex, setLastEditedIndex] = useState<number | null>(null);
  const [startCorrection, setStartCorrection] = useState<boolean>(false);

  const inputRefs = useRef<HTMLFormElement>(null);
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

// When there is no other empty letter to focus, it will also focus automatically to the invisible button 
  function jumptToNextEmptyLetter(index: number) {
    const listNodes = inputRefs.current;
    // Deals with null case
    if (!listNodes) {
      return;
    }

    const inputNodes = listNodes.querySelectorAll<HTMLInputElement>('input');
    const buttonNode = listNodes.querySelector<HTMLButtonElement>('button');
    
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
      buttonNode?.focus();
    }
 
  }


  function seeIfAWordIsCorrect() {
    for(let i=0; i<WORDSIZE; i++){

    }
  }


  
  if(startCorrection){
  //Verify if the word exists
    const word = letters.join("");
    if(seeIfWordIsValidOnDataSet(word)){
      console.log('Entrei no seeIfWordISValidOnDataSet');
      //Start Correction Function
      //Which must return an array that tells me if the letter on index i is
      // correct
      // wrong
      // out of position
      // This array then will set a Flag up that will render WordCorrectness and close WordInput
    }
    else {
      //Lift modal up, HEYYY THIS IS NOT A VALID WORD!
      alert("NOT VALID BRO >:|")
    }
    setStartCorrection(false);
  }
 
  


  return (

    <>
      <WordInput
        letters={letters}
        handleLetterChangeOnWord={handleLetterChangeOnWord}
        inputRefs = {inputRefs}
        status={status}
        handleStartCorrection={setStartCorrection}
        />
    </>
  )
}

export default GameRow