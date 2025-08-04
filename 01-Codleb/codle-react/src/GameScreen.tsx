import { useEffect, useState } from "react";
import GameRow from "./GameRow";

export function GameScreen() {
 //I need a function that every game pulls a random word to be the Game Word so that I can compare with the input


  return (
    <>
      <div className="game-screen-container">
        <GameRow status={"activated"}/>
      </div>
    </>
  )
}