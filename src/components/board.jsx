import React from "react";
import Tile from "./tile";
import "../styles.css";
import { useState, useEffect, useRef } from "react";
const word = ["C", "O", "D", "E", "R"];
const Board = () => {
  const [attempts, setAttempts] = useState(() =>
    Array(6)
      .fill(null)
      .map(() => Array(5).fill({ letter: "", status: "empty" }))
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCell, setCurrentCell] = useState(0);
  const eventHandlerRef = useRef();
  eventHandlerRef.current = (event) => {
    let updatedAttempts = attempts.map((row) =>
      row.map((cell) => ({ ...cell }))
    );
    if (
      event.key === "Enter" &&
      !updatedAttempts[currentRow].map((curr) => curr.letter).includes("")
    ) {
      updatedAttempts[currentRow].forEach((row, rowIndex) => {
        if (row.letter === word[rowIndex]) {
          row.status = "correct";
          console.log("correct");
        } else if (word.includes(row.letter)) {
          row.status = "wrongPosition";
        } else {
          row.status = "wrong";
        }
      });
      setCurrentRow(currentRow + 1);
      setCurrentCell(0);
    } else if (event.key === "Backspace" && currentCell !== 0) {
      updatedAttempts[currentRow][currentCell - 1] = "";
      setCurrentCell(currentCell - 1);
    } else if (/^[a-zA-Z]$/.test(event.key) && currentCell !== 5) {
      updatedAttempts[currentRow][currentCell].letter = event.key.toUpperCase();
      setCurrentCell(currentCell + 1);
    }
    setAttempts(updatedAttempts);
    return;
  };
  useEffect(() => {
    const eventListener = (event) => eventHandlerRef.current(event);
    window.addEventListener("keydown", eventListener);
    return () => {
      window.removeEventListener("keydown", eventListener);
    };
  }, []);

  return (
    <div>
      {attempts.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className={`cell cell-${cell.status}`}>
              {cell.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
