import React from 'react'
interface WordInputProps {
  letters: string[];
  handleLetterChangeOnWord: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  inputRefs: React.RefObject<HTMLFormElement | null>;
  status: string
  handleStartCorrection: React.Dispatch<React.SetStateAction<boolean>>;
}


const WordInput: React.FC<WordInputProps> = ({ letters, handleLetterChangeOnWord, inputRefs, status, handleStartCorrection }) => {
  // when submiting we begin the process of correction on GameRow
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleStartCorrection(true);
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