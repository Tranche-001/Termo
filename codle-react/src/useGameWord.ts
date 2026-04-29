import { useEffect, useState } from "react";
import { WORDS_API_URL } from "./constants";

export function useGameWord() {
  const [words, setWords] = useState<string[]>([]);
  const [gameWord, setGameWord] = useState<string>("");

  useEffect(() => {
    fetch(WORDS_API_URL)
      .then((response) => response.json())
      .then((data: { word: string }[]) => {
        const list = data.map((item) => item.word.toLowerCase());
        setWords(list);
        if (list.length > 0) {
          const random = list[Math.floor(Math.random() * list.length)];
          setGameWord(random);
        }
      })
      .catch((error) => console.error("Error fetching words:", error));
  }, []);

  const isWordInDictionary = (word: string) => words.includes(word);

  return { gameWord, isWordInDictionary };
}
