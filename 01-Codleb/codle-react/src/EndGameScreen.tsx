import React from 'react'

interface EngGameScreenProps {
  endGameValue: string
}

const EndGameScreen: React.FC<EngGameScreenProps>= ({ endGameValue }) => {
  if (endGameValue == "win") {
    return (
      <div>
        <div>
          You Won!!!!!!!
        </div>
      </div>
    )

  }
  else if (endGameValue == "lose") {
    <div>
      <div>
        You LOST!!!!!
      </div>
    </div>
  }

}

export default EndGameScreen