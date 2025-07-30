import React from 'react'
interface WordInputProps {
  letters: string[];
  handleLetterChangeOnWord: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  inputRefs: React.RefObject<HTMLDivElement | null>;
  status: string
}


const WordInput: React.FC<WordInputProps> = ({ letters, handleLetterChangeOnWord, handleFocus, inputRefs, status }) => {
  if (status === "activated") {
    return (<div className='game-screen-row' ref={inputRefs}>{
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
    </div>)
  }

  else if(status=="deactivated"){
    return (<div className='game-screen-row' ref={inputRefs}>{
      [0, 1, 2, 3, 4].map(index => (
        <input
          type="text"
          key={index}
          className="letter-square"
        />
      ))
    }
    </div>)

  }


  
}

export default WordInput