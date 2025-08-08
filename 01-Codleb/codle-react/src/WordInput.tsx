import React, { useEffect, useRef, useState } from 'react'
interface WordInputProps {
  letters: string[];
  status: string
  handleStartCorrection: React.Dispatch<React.SetStateAction<void>>;
  setLetters: React.Dispatch<React.SetStateAction<string[]>>;
}


const WordInput: React.FC<WordInputProps> = ({ letters, status, handleStartCorrection, setLetters }) => {
  const [lastEditedIndex, setLastEditedIndex] = useState<number | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const WORDSIZE = 5;

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, WORDSIZE);
  }, []);

  // when submiting we begin the process of correction on GameRow
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleStartCorrection();
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
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>, index: number) => {
    setTimeout(() => {
      e.target.setSelectionRange(
        e.target.value.length,
        e.target.value.length
      );
      inputRefs.current[index]?.select();
    }, 0);
  };



  // Jump To Next Empty Letter Logic
  useEffect(() => {
    if (lastEditedIndex !== null && letters[lastEditedIndex] !== "") {
      jumptToNextEmptyLetter(lastEditedIndex);
    }
  }, [letters, lastEditedIndex]);

  //Focus on the first Letter when Game Start
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [])

  // When there is no other empty letter to focus, it will also focus automatically to the invisible button 
  function jumptToNextEmptyLetter(index: number) {
    let inputNode = null;
    // search for the next empty letter
    // Why i%WORDSIZE?, because I want to cycle through the Array, starting from the index next to the last filled
    // and then going until it stops right before the last filled
    let flagLetterIsEmpty = false;
    for (let i = index + 1; i < index + 5; i++) {
      if (inputRefs.current[i % WORDSIZE]?.value === "") {
        flagLetterIsEmpty = true;
        inputNode = inputRefs.current[i % WORDSIZE];
        inputNode?.focus();
        break;
      }
    }
    if (!flagLetterIsEmpty) {
      inputNode = inputRefs.current[index];
      buttonRef.current?.focus();
    }
  }



  //Backspace logic
  //If Input is Empty and you press backspace/delete, it will focus on the previous index.
  function ifInputIsEmptyGoBackOne(e: any, index: number) {
    if (e.keyCode == '8' || e.keyCode == '46') {

      // Focus on the previous index if the current focused input is empty and backspace is pressed
      if (inputRefs.current[index]?.value === "" && index - 1 >= 0) {
        inputRefs.current[index - 1]?.focus();
      }
      // Basically, if everything is filled, then the button is focused.
      // So, pressing backspace must lead to last letter.
      else if (buttonRef.current === document.activeElement) {
        inputRefs.current[index]?.focus()
      }
    }
  }



  if (status === "activated") {
    return (
      <>
        <form action="" className='game-screen-row' ref={formRef} onSubmit={(e) => handleSubmit(e)}>
          {
            [0, 1, 2, 3, 4].map(index => (
              <input
                type="text"
                key={index}
                className="letter-square activated"
                ref={el => { inputRefs.current[index] = el; }}
                maxLength={1}
                value={letters[index]}
                onChange={e => handleLetterChangeOnWord(e, index)}
                onFocus={e => handleFocus(e, index)}
                onKeyDown={e => ifInputIsEmptyGoBackOne(e, index)}
              />
            ))
          }
          <button type="submit" onKeyDown={e => ifInputIsEmptyGoBackOne(e, 4)} ref={buttonRef}></button>
        </form>

      </>)
  }

  



}

export default WordInput