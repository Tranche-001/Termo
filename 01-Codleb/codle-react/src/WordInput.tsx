import React from 'react'
interface WordInputProps {
  letters: string[];
  inputRefs: React.RefObject<HTMLFormElement | null>;
  status: string
  handleStartCorrection: React.Dispatch<React.SetStateAction<boolean>>;
  setLetters:  React.Dispatch<React.SetStateAction<string[]>>;
  setLastEditedIndex:  React.Dispatch<React.SetStateAction<number | null>>;
}


const WordInput: React.FC<WordInputProps> = ({ letters, inputRefs, status, handleStartCorrection, setLetters, setLastEditedIndex }) => {
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