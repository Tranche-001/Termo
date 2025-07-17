import { Letter } from './Letter'

import Title from "/assets/images/Title.svg";
import QuestionMark from "/assets/images/QuestionMark.svg";
import Reload from "/assets/images/Reload.svg"

function App() {

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
          {/* Um monte de input */}
        </div>
        <div className="keyboard-container">
          {/* Teclado */}
        </div>
      </div>
    </>
  )
}

export default App
