import React from "react";
import "../styles.css";
import ResetButton from "./reset";
import { useState, useEffect, useCallback } from "react";
import { useEnterKey, useBackspaceKey, useKeyPress } from "../keyboardHooks";

const wordLst = ["CODER", "ASCII", "REACT", "CACHE", "STACK", "QUEUE", "GRAPH"];

const Board = () => {
  const [word, setWord] = useState(() =>
    wordLst[Math.floor(Math.random() * wordLst.length)].split("")
  );
  const [attempts, setAttempts] = useState(() =>
    Array(6)
      .fill(null)
      .map(() => Array(5).fill({ letter: "", status: "empty" }))
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCell, setCurrentCell] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [animateSpin, setAnimateSpin] = useState(false);

  const resetGame = () => {
    setWord(wordLst[Math.floor(Math.random() * wordLst.length)].split(""));
    setAttempts(
      Array(6)
        .fill(null)
        .map(() => Array(5).fill({ letter: "", status: "empty" }))
    );
    setCurrentRow(0);
    setCurrentCell(0);
    setGameOver(false);
    setIsWinner(false);
    setAnimateSpin(false);
  };
  const checkGameOver = useCallback(() => {
    if (currentRow === 0) return false;
    const victory = attempts[currentRow - 1].every(
      (cell) => cell.status === "correct"
    );
    const defeat = currentRow - 1 === 5;
    if (victory || defeat) {
      setIsWinner(victory);
      setGameOver(true);
      return true;
    } else return false;
  }, [currentRow, attempts]);
  useEffect(() => {
    checkGameOver();
  }, [currentRow, attempts, checkGameOver]);
  const handleEnter = useEnterKey(
    word,
    currentRow,
    attempts,
    setAttempts,
    setAnimateSpin
  );
  const handleBackspace = useBackspaceKey(
    currentCell,
    setCurrentCell,
    attempts,
    setAttempts,
    currentRow
  );
  const handleKeyPress = useKeyPress(
    currentCell,
    setCurrentCell,
    attempts,
    setAttempts,
    currentRow
  );
  const handleKeyDown = useCallback(
    (event) => {
      if (checkGameOver()) {
        return;
      }
      if (event.key === "Enter" && currentCell === 5) {
        handleEnter();
        if (checkGameOver()) return;
        setCurrentRow(currentRow + 1);
        setCurrentCell(0);
      } else if (event.key === "Backspace") handleBackspace();
      else handleKeyPress(event.key);
    },
    [
      handleEnter,
      handleBackspace,
      handleKeyPress,
      currentCell,
      checkGameOver,
      setCurrentRow,
      currentRow,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
  return (
    <div>
      {gameOver && (
        <div className="game-over">
          {isWinner ? "Congratulations!" : "Try Again!"}
        </div>
      )}
      {attempts.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`cell cell-${cell.status} ${
                animateSpin && rowIndex === currentRow - 1 ? "spin" : ""
              }`}
            >
              {cell.letter}
            </div>
          ))}
        </div>
      ))}
      {gameOver && (
        <div className="game-over">
          {isWinner ? "Congratulations!" : "Try Again!"}
        </div>
      )}
      <ResetButton onReset={resetGame} />
    </div>
  );
};
export default Board;
