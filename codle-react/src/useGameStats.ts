import { useCallback, useEffect, useRef, useState } from "react";
import { NUM_OF_ROWS } from "./constants";
import type { EndGame, GameStats } from "./types";

const STORAGE_KEY = "codle:stats";

const emptyStats = (): GameStats => ({
  games: 0,
  wins: 0,
  currentStreak: 0,
  bestStreak: 0,
  distribution: Array(NUM_OF_ROWS).fill(0),
  losses: 0,
});

function readStats(): GameStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStats();
    const parsed = JSON.parse(raw) as Partial<GameStats>;
    const base = emptyStats();
    return {
      ...base,
      ...parsed,
      distribution:
        Array.isArray(parsed.distribution) && parsed.distribution.length === NUM_OF_ROWS
          ? parsed.distribution.map((n) => Number(n) || 0)
          : base.distribution,
    };
  } catch {
    return emptyStats();
  }
}

export function useGameStats(endGame: EndGame) {
  const [stats, setStats] = useState<GameStats>(() => readStats());
  const recordedRef = useRef<string>("");

  useEffect(() => {
    const [open, status, attempt] = endGame;
    if (!open || (status !== "won" && status !== "lost")) {
      recordedRef.current = "";
      return;
    }

    const key = `${status}:${attempt}`;
    if (recordedRef.current === key) return;
    recordedRef.current = key;

    setStats((prev) => {
      const next: GameStats = {
        ...prev,
        games: prev.games + 1,
        distribution: [...prev.distribution],
      };
      if (status === "won") {
        next.wins = prev.wins + 1;
        next.currentStreak = prev.currentStreak + 1;
        next.bestStreak = Math.max(prev.bestStreak, next.currentStreak);
        const idx = Math.min(Math.max(attempt, 1), NUM_OF_ROWS) - 1;
        next.distribution[idx] = prev.distribution[idx] + 1;
      } else {
        next.currentStreak = 0;
        next.losses = prev.losses + 1;
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // storage might be full or unavailable; stats are best-effort
      }
      return next;
    });
  }, [endGame]);

  const reset = useCallback(() => {
    const fresh = emptyStats();
    setStats(fresh);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    } catch {
      // ignore
    }
  }, []);

  return { stats, reset };
}
