import React, { useEffect, useRef, useState } from "react";
import { useModalContext } from "./context";
import { KEYBOARD_EVENT, WORD_SIZE } from "./constants";

interface WordInputProps {
  letters: string[];
  status: string;
  handleStartCorrection: () => void;
  setLetters: (updater: React.SetStateAction<string[]>) => void;
}

const WordInput: React.FC<WordInputProps> = ({
  letters,
  status,
  handleStartCorrection,
  setLetters,
}) => {
  const { isInvalidWordModalOpen, setIsInvalidWordModalOpen } = useModalContext();
  const [lastEditedIndex, setLastEditedIndex] = useState<number | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, WORD_SIZE);
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleStartCorrection();
  }

  function handleLetterChangeOnWord(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const newLetter = e.target.value;
    setLetters((prev) => {
      const next = [...prev];
      next[index] = newLetter;
      return next;
    });
    setLastEditedIndex(index);
  }

  // Keep the caret at the end whenever an input is focused.
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>, index: number) => {
    setTimeout(() => {
      e.target.setSelectionRange(e.target.value.length, e.target.value.length);
      inputRefs.current[index]?.select();
    }, 0);
  };

  useEffect(() => {
    if (lastEditedIndex !== null && letters[lastEditedIndex] !== "") {
      jumpToNextEmptyLetter(lastEditedIndex);
    }
  }, [letters, lastEditedIndex]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Cycles forward from the last edited index to find an empty input;
  // if every slot is filled, focus the hidden submit button so Enter submits.
  function jumpToNextEmptyLetter(index: number) {
    for (let i = index + 1; i < index + WORD_SIZE; i++) {
      const node = inputRefs.current[i % WORD_SIZE];
      if (node?.value === "") {
        node.focus();
        return;
      }
    }
    buttonRef.current?.focus();
  }

  function ifInputIsEmptyGoBackOne(e: React.KeyboardEvent, index: number) {
    if (e.keyCode === 8 || e.keyCode === 46) {
      if (inputRefs.current[index]?.value === "" && index - 1 >= 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (buttonRef.current === document.activeElement) {
        inputRefs.current[index]?.focus();
      }
      if (isInvalidWordModalOpen) setIsInvalidWordModalOpen(false);
    }
  }

  // Virtual keyboard: a click on a Keyboard button dispatches a CustomEvent
  // carrying the letter. The currently active row writes it into the next
  // empty slot and lets the existing focus logic advance the caret.
  useEffect(() => {
    function onKey(e: Event) {
      const ce = e as CustomEvent<{ key: string }>;
      const key = (ce.detail?.key || "").toLowerCase();
      if (!key) return;
      const idx = letters.findIndex((l) => l === "");
      if (idx < 0) return;
      setLetters((prev) => {
        const next = [...prev];
        next[idx] = key;
        return next;
      });
      setLastEditedIndex(idx);
    }
    window.addEventListener(KEYBOARD_EVENT, onKey);
    return () => window.removeEventListener(KEYBOARD_EVENT, onKey);
  }, [letters, setLetters]);

  if (status !== "activated") return null;

  return (
    <form className="game-screen-row" ref={formRef} onSubmit={handleSubmit}>
      {Array.from({ length: WORD_SIZE }, (_, index) => (
        <input
          type="text"
          key={index}
          className="letter-square activated"
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          maxLength={1}
          value={letters[index]}
          onChange={(e) => handleLetterChangeOnWord(e, index)}
          onFocus={(e) => handleFocus(e, index)}
          onKeyDown={(e) => ifInputIsEmptyGoBackOne(e, index)}
        />
      ))}
      <button
        type="submit"
        onKeyDown={(e) => ifInputIsEmptyGoBackOne(e, WORD_SIZE - 1)}
        ref={buttonRef}
      ></button>
    </form>
  );
};

export default WordInput;
