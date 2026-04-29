import React from "react";
import { KEYBOARD_EVENT, KEYBOARD_LAYOUT } from "./constants";
import type { LetterStatus } from "./types";

interface KeyboardProps {
  statuses: Record<string, LetterStatus>;
}

const Keyboard: React.FC<KeyboardProps> = ({ statuses }) => {
  const press = (letter: string) => {
    window.dispatchEvent(
      new CustomEvent(KEYBOARD_EVENT, { detail: { key: letter } }),
    );
  };

  return (
    <div className="keyboard-container">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((letter) => {
            const status = statuses[letter];
            const className = `letter-button${status ? ` ${status}` : ""}`;
            return (
              <button
                key={letter}
                id={`button-${letter}`}
                type="button"
                className={className}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => press(letter)}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
