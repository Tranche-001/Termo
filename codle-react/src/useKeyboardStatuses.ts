import { useMemo } from "react";
import type { LetterStatus } from "./types";
import { WORD_SIZE } from "./constants";

const PRIORITY: Record<LetterStatus, number> = {
  "right-position": 3,
  "wrong-position": 2,
  "absent-letter": 1,
};

export function useKeyboardStatuses(
  guesses: string[][],
  rowStatus: string[],
  correctWord: string,
): Record<string, LetterStatus> {
  return useMemo(() => {
    const result: Record<string, LetterStatus> = {};
    if (!correctWord) return result;

    for (let r = 0; r < guesses.length; r++) {
      if (rowStatus[r] !== "completed") continue;
      for (let i = 0; i < WORD_SIZE; i++) {
        const letter = guesses[r][i];
        if (!letter) continue;
        const upper = letter.toUpperCase();

        let status: LetterStatus = "absent-letter";
        if (correctWord.includes(letter)) {
          status = correctWord[i] === letter ? "right-position" : "wrong-position";
        }

        const existing = result[upper];
        if (!existing || PRIORITY[status] > PRIORITY[existing]) {
          result[upper] = status;
        }
      }
    }
    return result;
  }, [guesses, rowStatus, correctWord]);
}
