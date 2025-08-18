import React from 'react'

interface EngGameScreenProps {
  endGameValue: string;
  isEndGameModalOpen: boolean;
  setTryAgainKey: React.Dispatch<React.SetStateAction<number>>;
  setIsEndGameModalOpen: React.Dispatch<React.SetStateAction<boolean>>


}

const EndGameScreen: React.FC<EngGameScreenProps> = ({ endGameValue, isEndGameModalOpen, setTryAgainKey, setIsEndGameModalOpen }) => {

  function handleTryAgain() {
    setTryAgainKey(prev => prev + 1);
    setIsEndGameModalOpen(false);
  }



  if (endGameValue == "win") {
    return (
      <div className={isEndGameModalOpen ? 'modal endGame fade-in' : 'modal endGame fade-out'}>
        <div>
          You Won!!!!!!!
        </div>
        <button onClick={() => { handleTryAgain() }}>Play Again?</button>
      </div>
    )

  }
  else if (endGameValue == "lose") {
    <div className={isEndGameModalOpen ? 'modal fade-in' : 'modal fade-out'}>
      <div>
        You LOST!!!!!
      </div>
      <button>Play Again?</button>
    </div>
  }

}

export default EndGameScreen