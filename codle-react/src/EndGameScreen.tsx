import React from "react";
import type { EndGame } from "./types";
import { NUM_OF_ROWS } from "./constants";
import { useGameStats } from "./useGameStats";
import { useEndGameContext } from "./context";

interface EndGameScreenProps {
  isEndGameModalOpen: EndGame;
  setTryAgainKey: React.Dispatch<React.SetStateAction<number>>;
  setIsEndGameModalOpen: React.Dispatch<React.SetStateAction<EndGame>>;
}

const PRAISE: Record<number, string> = {
  1: "Magnífico",
  2: "Impressionante",
  3: "Esplêndido",
  4: "Admirável",
  5: "Adequado",
  6: "Foi por pouco",
};

const EndGameScreen: React.FC<EndGameScreenProps> = ({
  isEndGameModalOpen,
  setTryAgainKey,
  setIsEndGameModalOpen,
}) => {
  const [open, status, attempt] = isEndGameModalOpen;
  const { gameWord } = useEndGameContext();
  const { stats } = useGameStats(isEndGameModalOpen);

  function handleTryAgain() {
    setTryAgainKey((prev) => prev + 1);
    setIsEndGameModalOpen([false, "", 0]);
  }

  const winPct = stats.games === 0 ? 0 : Math.round((stats.wins / stats.games) * 100);
  const headline =
    status === "won" ? PRAISE[attempt] ?? "Parabéns" : status === "lost" ? "Que pena!" : "";

  const distMax = Math.max(1, ...stats.distribution, stats.losses);
  const winningIdx = status === "won" ? attempt - 1 : -1;

  return (
    <div
      className={open ? "end-game-overlay open" : "end-game-overlay"}
      onClick={handleTryAgain}
      aria-hidden={!open}
    >
      <div className="end-game-card" onClick={(e) => e.stopPropagation()}>
        <button className="end-game-close" onClick={handleTryAgain} aria-label="Fechar">
          ×
        </button>

        <div className={`end-game-badge ${status}`}>{headline}</div>

        {status === "lost" && gameWord && (
          <div className="end-game-answer">
            A palavra era{" "}
            <span className="end-game-answer-word">{gameWord.toUpperCase()}</span>
          </div>
        )}

        <div className="end-game-stats">
          <Stat value={stats.games} label="jogos" />
          <Stat value={`${winPct}%`} label="de vitórias" />
          <Stat value={stats.currentStreak} label={"sequência\nde vitórias"} />
          <Stat value={stats.bestStreak} label="melhor sequência" />
        </div>

        <h2 className="end-game-distribution-title">distribuição de tentativas</h2>

        <div className="end-game-distribution">
          {Array.from({ length: NUM_OF_ROWS }, (_, i) => (
            <DistributionRow
              key={i}
              label={String(i + 1)}
              count={stats.distribution[i] ?? 0}
              max={distMax}
              highlight={i === winningIdx}
            />
          ))}
          <DistributionRow
            label="💀"
            count={stats.losses}
            max={distMax}
            highlight={status === "lost"}
            tone="loss"
          />
        </div>

        <button className="end-game-action" onClick={handleTryAgain}>
          Jogar de novo
        </button>
      </div>
    </div>
  );
};

const Stat: React.FC<{ value: number | string; label: string }> = ({ value, label }) => (
  <div className="end-game-stat">
    <div className="end-game-stat-value">{value}</div>
    <div className="end-game-stat-label">{label}</div>
  </div>
);

interface DistributionRowProps {
  label: string;
  count: number;
  max: number;
  highlight: boolean;
  tone?: "loss";
}

const DistributionRow: React.FC<DistributionRowProps> = ({
  label,
  count,
  max,
  highlight,
  tone,
}) => {
  const pct = Math.max(6, (count / max) * 100);
  const classes = ["end-game-bar"];
  if (highlight) classes.push("highlight");
  if (tone === "loss") classes.push("loss");
  return (
    <div className="end-game-dist-row">
      <span className="end-game-dist-label">{label}</span>
      <div className={classes.join(" ")} style={{ width: count === 0 ? "auto" : `${pct}%` }}>
        {count}
      </div>
    </div>
  );
};

export default EndGameScreen;
