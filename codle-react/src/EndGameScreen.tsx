import React from 'react'

  type EndGame = [boolean, string];

interface EngGameScreenProps {
  endGameValue: string;
  isEndGameModalOpen: EndGame;
  setTryAgainKey: React.Dispatch<React.SetStateAction<number>>;
  setIsEndGameModalOpen: React.Dispatch<React.SetStateAction<EndGame>>


}

const EndGameScreen: React.FC<EngGameScreenProps> = ({ endGameValue, isEndGameModalOpen, setTryAgainKey, setIsEndGameModalOpen }) => {

  //Try Again -> Re-render the main page and Close the Modal
  function handleTryAgain() {
    setTryAgainKey(prev => prev + 1);
    setIsEndGameModalOpen(prev => [false, prev[1]]);
  }

  const EndGameComponent = () => {
    if(isEndGameModalOpen[1]=="won") {
      return "YOU WON!!!!!!!!";
    }
    else {
      return "YOU LOST!!!!!!!"
    }
  }



    return (
      <div className={isEndGameModalOpen[0] ? 'modal endGame fade-in' : 'modal endGame fade-out'}>
        <div>
          <EndGameComponent/>
        </div>
        <button onClick={() => { handleTryAgain() }}>Play Again?</button>
      </div>
    )

  }
 



export default EndGameScreen