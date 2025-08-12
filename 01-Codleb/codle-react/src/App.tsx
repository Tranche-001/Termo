
import Title from "/assets/images/Title.svg";
import QuestionMark from "/assets/images/QuestionMark.svg";
import Reload from "/assets/images/Reload.svg"
import { Input } from 'postcss';
import { GameScreen } from './GameScreen';
import { useState } from 'react';
import  Modal  from './Modal.tsx'

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


  const [isModalOpen, setIsModalOpen] = useState<boolean> (false);

   

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
        {isModalOpen && <Modal isModalOpen= {isModalOpen}/>}

        <GameScreen />


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
