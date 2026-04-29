import React, { useCallback, useEffect, useState } from "react";
import GameRow from "./GameRow";
import Keyboard from "./Keyboard";
import { useEndGameContext, useModalContext } from "./context";
import { useGameWord } from "./useGameWord";
import { useKeyboardStatuses } from "./useKeyboardStatuses";
import { NUM_OF_ROWS, WORD_SIZE } from "./constants";

export const GameScreen: React.FC = () => {
  const { setIsInvalidWordModalOpen } = useModalContext();
  const { isEndGameModalOpen, setIsEndGameModalOpen } = useEndGameContext();
  const { gameWord, isWordInDictionary } = useGameWord();

  const [rowStatus, setRowStatus] = useState<string[]>(() => {
    const initial = Array(NUM_OF_ROWS).fill("deactivated");
    initial[0] = "activated";
    return initial;
  });

  const [guesses, setGuesses] = useState<string[][]>(() =>
    Array.from({ length: NUM_OF_ROWS }, () => Array(WORD_SIZE).fill("")),
  );

  const setLettersForRow = useCallback(
    (rowIdx: number) => (updater: React.SetStateAction<string[]>) => {
      setGuesses((prev) => {
        const next = [...prev];
        next[rowIdx] =
          typeof updater === "function"
            ? (updater as (p: string[]) => string[])(prev[rowIdx])
            : updater;
        return next;
      });
    },
    [],
  );

  // Lost when every row is completed without a win.
  useEffect(() => {
    const allCompleted = rowStatus.every((s) => s === "completed");
    if (allCompleted && !isEndGameModalOpen[0]) {
      setIsEndGameModalOpen([true, "lost", NUM_OF_ROWS]);
    }
  }, [rowStatus, isEndGameModalOpen, setIsEndGameModalOpen]);

  // Once the end-game modal is open, freeze any still-active row.
  useEffect(() => {
    if (isEndGameModalOpen[0]) {
      setRowStatus((prev) => prev.map((s) => (s === "activated" ? "deactivated" : s)));
    }
  }, [isEndGameModalOpen]);

  const keyboardStatuses = useKeyboardStatuses(guesses, rowStatus, gameWord);

  if (!gameWord) {
    return <div style={{ color: "white" }}>Carregando dicionário...</div>;
  }

  return (
    <>
      <div className="game-screen-container">
        {Array.from({ length: NUM_OF_ROWS }, (_, idx) => (
          <GameRow
            key={idx}
            rowIdx={idx}
            rowStatus={rowStatus[idx]}
            correctWord={gameWord}
            isWordInDictionary={isWordInDictionary}
            setRowStatus={setRowStatus}
            setIsInvalidWordModalOpen={setIsInvalidWordModalOpen}
            letters={guesses[idx]}
            setLetters={setLettersForRow(idx)}
          />
        ))}
      </div>
      <Keyboard statuses={keyboardStatuses} />
    </>
  );
};
