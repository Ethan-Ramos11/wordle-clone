import React from "react";
import "../styles.css";
import { useState, useEffect, useCallback } from "react";
import { useEnterKey, useBackspaceKey, useKeyPress } from "../keyboardHooks";
const word = ["C", "O", "D", "E", "R"];
const Board = () => {
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
  const checkGameOver = useCallback(() => {
    const victory = attempts[currentRow].every(
      (cell) => cell.status === "correct"
    );
    const defeat = currentRow === 5;

    if (victory) {
      setIsWinner(true);
      return true;
    } else if (defeat) {
      setIsWinner(false);
      return true;
    } else {
      return false;
    }
  }, [currentRow, attempts]);
  const handleEnter = useEnterKey(
    word,
    currentRow,
    attempts,
    setAttempts,
    checkGameOver,
    setAttempts,
    setGameOver,
    setCurrentRow,
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
      if (gameOver) return;
      if (event.key === "Enter") handleEnter();
      else if (event.key === "Backspace") handleBackspace();
      else handleKeyPress(event.key);
    },
    [gameOver, handleEnter, handleBackspace, handleKeyPress]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
  return (
    <div>
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
    </div>
  );
};
export default Board;
