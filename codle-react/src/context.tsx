import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { EndGame } from "./types";

interface ModalContextValue {
  isInvalidWordModalOpen: boolean;
  setIsInvalidWordModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContextValue>({
  isInvalidWordModalOpen: false,
  setIsInvalidWordModalOpen: () => {},
});

export const useModalContext = () => useContext(ModalContext);

interface EndGameContextValue {
  isEndGameModalOpen: EndGame;
  setIsEndGameModalOpen: Dispatch<SetStateAction<EndGame>>;
}

export const EndGameContext = createContext<EndGameContextValue>({
  isEndGameModalOpen: [false, "", 0],
  setIsEndGameModalOpen: () => {},
});

export const useEndGameContext = () => useContext(EndGameContext);
