import { useState } from "react";
import Title from "/assets/images/Title.svg";
import QuestionMark from "/assets/images/QuestionMark.svg";
import Reload from "/assets/images/Reload.svg";

import { GameScreen } from "./GameScreen";
import InvalidWordModal from "./InvalidWordModal";
import EndGameScreen from "./EndGameScreen";
import { EndGameContext, ModalContext } from "./context";
import type { EndGame } from "./types";

function App() {
  const [isInvalidWordModalOpen, setIsInvalidWordModalOpen] = useState<boolean>(false);
  const [isEndGameModalOpen, setIsEndGameModalOpen] = useState<EndGame>([false, "", 0]);
  const [tryAgainKey, setTryAgainKey] = useState<number>(0);
  const [gameWord, setGameWord] = useState<string>("");

  const handleReload = () => {
    setIsEndGameModalOpen([false, "", 0]);
    setTryAgainKey((prev) => prev + 1);
  };

  return (
    <div className="main-container">
      <div className="header">
        <div>
          Feito com poeira cosmica por <span>Codelab</span>
        </div>
      </div>

      <div className="logo-container">
        <button>
          <img src={QuestionMark} alt="" />
        </button>
        <div className="logo-text">
          <img src={Title} alt="" />
        </div>
        <button onClick={handleReload}>
          <img src={Reload} alt="" />
        </button>
      </div>

      <InvalidWordModal isInvalidWordModalOpen={isInvalidWordModalOpen} />

      <EndGameContext.Provider value={{ isEndGameModalOpen, setIsEndGameModalOpen, gameWord, setGameWord }}>
        <ModalContext.Provider value={{ isInvalidWordModalOpen, setIsInvalidWordModalOpen }}>
          <GameScreen key={tryAgainKey} />
        </ModalContext.Provider>

        <EndGameScreen
          isEndGameModalOpen={isEndGameModalOpen}
          setTryAgainKey={setTryAgainKey}
          setIsEndGameModalOpen={setIsEndGameModalOpen}
        />
      </EndGameContext.Provider>
    </div>
  );
}

export default App;
