export type EndGameStatus = "" | "won" | "lost";

export type EndGame = [boolean, EndGameStatus, number];

export type RowStatusValue = "activated" | "completed" | "deactivated";

export type LetterStatus = "right-position" | "wrong-position" | "absent-letter";

export interface GameStats {
  games: number;
  wins: number;
  currentStreak: number;
  bestStreak: number;
  distribution: number[];
  losses: number;
}
