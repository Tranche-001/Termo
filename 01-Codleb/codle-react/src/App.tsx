import { Letter } from './Letter'

import Title from "/assets/images/Title.svg";
import QuestionMark from "/assets/images/QuestionMark.svg";
import Reload from "/assets/images/Reload.svg"
import { Input } from 'postcss';

function App() {
  const inputs = Array.from({ length: 30 }, (_, i) => i + 1);

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

        <div className="game-screen-container">
          {inputs.map((index) => (
            <input
              key={index}
              type="text"
              className="letter-square empty"
              maxLength={1}
            />
          ))}

        </div>
        <div className="keyboard-container">
          {/* Teclado */}
        </div>
      </div>
    </>
  )
}

export default App
