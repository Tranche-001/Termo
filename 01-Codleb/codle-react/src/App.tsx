
import Title from "/assets/images/Title.svg";
import QuestionMark from "/assets/images/QuestionMark.svg";
import Reload from "/assets/images/Reload.svg"
import { Input } from 'postcss';
import { GameScreen } from './GameScreen';
import { createContext, useContext, useEffect, useState } from 'react';
import Modal from './InvalidWordModal.tsx'
import EndGameScreen from "./EndGameScreen.tsx";

const ModalContext = createContext<{
  isInvalidWordModalOpen: boolean;
  setIsInvalidWordModalOpen: (value: boolean) => void;
}>({
  isInvalidWordModalOpen: false,
  setIsInvalidWordModalOpen: () => { },
});

export function useModalContext() {
  return useContext(ModalContext);
}


const EndGameContext = createContext<{
  isEndGameModalOpen: boolean;
  setIsEndGameModalOpen: (value: boolean) => void;
}>({
  isEndGameModalOpen: false,
  setIsEndGameModalOpen: () => { },
});

export function useEndGameContext() {
  return useContext(EndGameContext);
}



function App() {

  const lettersRow1 = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  const lettersRow2 = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  const lettersRow3 = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );


  const [isInvalidWordModalOpen, setIsInvalidWordModalOpen] = useState<boolean>(false);
  const [isEndGameModalOpen, setIsEndGameModalOpen] = useState<boolean>(false);

  const[tryAgainKey, setTryAgainKey] = useState<number>(0);
  
  return (
    <>
      <div className='main-container'>
        <div className="header">
          <div>Feito com poeira cosmica por <span>Codelab</span></div>
        </div>

        <div className="logo-container">
          <button>
            <img src={QuestionMark} alt="" />
          </button>
          <div className="logo-text">
            <img src={Title} alt="" />
          </div>
          <button>
            <img src={Reload} alt="" />
          </button>
        </div>
        
        {/* invalid word modal */}

        <Modal isInvalidWordModalOpen={isInvalidWordModalOpen} />
        <EndGameContext.Provider value={{ isEndGameModalOpen, setIsEndGameModalOpen }}>
          <ModalContext.Provider value={{ isInvalidWordModalOpen, setIsInvalidWordModalOpen }}>
            <GameScreen key={tryAgainKey} setIsInvalidWordModalOpen={setIsInvalidWordModalOpen} isEndGameModalOpen = {isEndGameModalOpen}/>
          </ModalContext.Provider>
        </EndGameContext.Provider>

        {/* eng game modal */}
        <EndGameScreen endGameValue={"win"} isEndGameModalOpen={isEndGameModalOpen} setTryAgainKey={setTryAgainKey} setIsEndGameModalOpen = {setIsEndGameModalOpen} />
        <div className="keyboard-container">
          {lettersRow1.map((letter) => (
            <button
              key={letter}
              id={`button-${letter}`}
              className='letter-button'>

              {letter}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
