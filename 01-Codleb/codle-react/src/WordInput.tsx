import React, { useEffect, useRef, useState } from 'react'
interface WordInputProps {
  letters: string[];
  status: string
  handleStartCorrection: React.Dispatch<React.SetStateAction<boolean>>;
  setLetters:  React.Dispatch<React.SetStateAction<string[]>>;
}


const WordInput: React.FC<WordInputProps> = ({ letters, status, handleStartCorrection, setLetters }) => {
  const [lastEditedIndex, setLastEditedIndex] = useState<number | null>(null);
  
  
  // when submiting we begin the process of correction on GameRow
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleStartCorrection(true);
  }

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


  // Goes to the end of the input when focusing
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      e.target.setSelectionRange(
        e.target.value.length,
        e.target.value.length
      );
    }, 0);
  };


  
  const inputRefs = useRef<HTMLFormElement>(null);
  const WORDSIZE = 5;

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
    for (let i = index + 1; i < index + 5; i++) {
      if (inputNodes[i % WORDSIZE].value === "") {
        flagLetterIsEmpty = true;
        inputNode = inputNodes[i % WORDSIZE];
        inputNode.focus();
        break;
      }
    }
    if (!flagLetterIsEmpty) {
      inputNode = inputNodes[index];
      buttonNode?.focus();
    }
  }




  if (status === "activated") {
    return (
      <>
        <form action="" className='game-screen-row' ref={inputRefs} onSubmit={(e) => handleSubmit(e)}>
          {
            [0, 1, 2, 3, 4].map(index => (
              <input
                type="text"
                key={index}
                className="letter-square activated"
                maxLength={1}
                value={letters[index]}
                onChange={e => handleLetterChangeOnWord(e, index)}
                onFocus={handleFocus}
              />
            ))
          }
          <button type="submit" ></button>
        </form>

      </>)
  }

  else if (status == "deactivated") {
    return (<form className='game-screen-row' ref={inputRefs}>{
      [0, 1, 2, 3, 4].map(index => (
        <input
          type="text"
          key={index}
          className="letter-square"
        />
      ))
    }
    </form>)

  }



}

export default WordInput