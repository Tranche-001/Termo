import React from "react";
import WordInput from "./WordInput";
import WordCorrectness from "./WordCorrectness";
import { WORD_SIZE } from "./constants";

interface GameRowProps {
  rowIdx: number;
  rowStatus: string;
  correctWord: string;
  isWordInDictionary: (word: string) => boolean;
  setRowStatus: React.Dispatch<React.SetStateAction<string[]>>;
  setIsInvalidWordModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  letters: string[];
  setLetters: (updater: React.SetStateAction<string[]>) => void;
}

const GameRow: React.FC<GameRowProps> = ({
  rowIdx,
  rowStatus,
  correctWord,
  isWordInDictionary,
  setRowStatus,
  setIsInvalidWordModalOpen,
  letters,
  setLetters,
}) => {
  const word = letters.join("");

  function startCorrection() {
    if (!isWordInDictionary(word)) {
      setIsInvalidWordModalOpen(true);
      return;
    }
    setRowStatus((prev) => {
      const next = [...prev];
      for (let i = 0; i < next.length; i++) {
        if (next[i] === "activated") {
          next[i] = "completed";
          if (i < next.length - 1) next[i + 1] = "activated";
          break;
        }
      }
      return next;
    });
  }

  if (rowStatus === "activated") {
    return (
      <WordInput
        letters={letters}
        status={rowStatus}
        handleStartCorrection={startCorrection}
        setLetters={setLetters}
      />
    );
  }

  if (rowStatus === "completed") {
    return (
      <WordCorrectness
        rowIdx={rowIdx}
        letters={letters}
        correctWord={correctWord}
        setRowStatus={setRowStatus}
      />
    );
  }

  return (
    <div className="game-screen-row">
      {Array.from({ length: WORD_SIZE }, (_, i) => (
        <div key={i} className="letter-square" />
      ))}
    </div>
  );
};

export default GameRow;
