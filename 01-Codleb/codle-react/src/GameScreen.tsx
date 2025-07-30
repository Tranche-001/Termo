import { useEffect, useState } from "react";
import GameRow from "./GameRow";

export function GameScreen() {
 


  return (
    <>
      <div className="game-screen-container">
        <GameRow status={"activated"}/>
      </div>
    </>
  )
}