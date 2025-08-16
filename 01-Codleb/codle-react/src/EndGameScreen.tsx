import React from 'react'

interface EngGameScreenProps {
  endGameValue: string;
  isEndGameModalOpen: boolean;
}

const EndGameScreen: React.FC<EngGameScreenProps>= ({ endGameValue, isEndGameModalOpen}) => {
  if (endGameValue == "win") {
    return (
      <div className={isEndGameModalOpen ? 'modal endGame fade-in' : 'modal endGame fade-out'}>
        <div>
          You Won!!!!!!!
        </div>
      </div>
    )

  }
  else if (endGameValue == "lose") {
    <div className={isEndGameModalOpen ? 'modal fade-in' : 'modal fade-out'}>
      <div>
        You LOST!!!!!
      </div>
    </div>
  }

}

export default EndGameScreen