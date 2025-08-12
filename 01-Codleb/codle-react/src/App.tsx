
import Title from "/assets/images/Title.svg";
import QuestionMark from "/assets/images/QuestionMark.svg";
import Reload from "/assets/images/Reload.svg"
import { Input } from 'postcss';
import { GameScreen } from './GameScreen';
import { createContext, useContext, useState } from 'react';
import Modal from './Modal.tsx'
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
        {isInvalidWordModalOpen && <Modal isInvalidWordModalOpen={isInvalidWordModalOpen} />}

        <ModalContext.Provider value={{ isInvalidWordModalOpen, setIsInvalidWordModalOpen }}>
          <GameScreen setIsInvalidWordModalOpen={setIsInvalidWordModalOpen} />
        </ModalContext.Provider>

        {/* eng game modal */}
        {isEndGameModalOpen && <EndGameScreen endGameValue={"win"} /> }

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
