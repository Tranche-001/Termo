import React, { useEffect } from "react";
import { useEndGameContext } from "./context";
import { WORD_SIZE } from "./constants";

interface WordCorrectnessProps {
  rowIdx: number;
  letters: string[];
  correctWord: string;
  setRowStatus: React.Dispatch<React.SetStateAction<string[]>>;
}

const WordCorrectness: React.FC<WordCorrectnessProps> = ({ rowIdx, letters, correctWord }) => {
  const { setIsEndGameModalOpen } = useEndGameContext();

  // Each index can receive one of: wrong-position, right-position, absent-letter.
  // NOTE: this is a naive nested loop and does not handle duplicate-letter
  // accounting like real Wordle. Preserved intentionally — see CLAUDE.md.
  const lettersStatus = seeIfAWordIsCorrect();

  useEffect(() => {
    seeIfPlayerWon(lettersStatus);
  }, []);

  function seeIfAWordIsCorrect() {
    const newStatus = ["", "", "", "", ""];
    for (let i = 0; i < WORD_SIZE; i++) {
      for (let j = 0; j < WORD_SIZE; j++) {
        if (letters[i] === correctWord[j]) {
          newStatus[i] = "wrong-position";
          if (i === j) {
            newStatus[i] = "right-position";
            break;
          }
        }
      }
      if (newStatus[i] === "") newStatus[i] = "absent-letter";
    }
    return newStatus;
  }

  function seeIfPlayerWon(newStatus: string[]) {
    const playerWon = newStatus.every((s) => s === "right-position");
    if (playerWon) setIsEndGameModalOpen([true, "won", rowIdx + 1]);
  }

  return (
    <div className="game-screen-row">
      {lettersStatus.map((status, index) => (
        <div key={index} className={`letter-square ${status}`}>
          {letters[index]}
        </div>
      ))}
    </div>
  );
};

export default WordCorrectness;
