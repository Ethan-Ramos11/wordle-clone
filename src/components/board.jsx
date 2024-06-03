import React from "react";
import Tile from "./tile";
import "../styles.css";
import { useState, useEffect } from "react";
const Board = () => {
  const [attempts, setAttempts] = useState(() =>
    Array(6)
      .fill(null)
      .map(() => Array(5).fill(""))
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCell, setCurrentCell] = useState(0);

  useEffect(() => {
    console.log(attempts);
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        if (attempts[currentRow].includes("")) {
          console.log("Please fill in all the blanks");
          return;
        } else {
          setCurrentRow(currentRow + 1);
          setCurrentCell(0);
        }
      } else if (event.key === "Backspace") {
        if (currentCell === 0) {
          console.log("You have reached the beginning of the row");
          return;
        } else {
          setAttempts((prev) => {
            const newAtempts = prev.map((row) => [...row]);
            newAtempts[currentRow][currentCell - 1] = "";
            return newAtempts;
          });
          setCurrentCell(currentCell - 1);
        }
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        if (currentCell === 5) {
          return;
        } else {
          setAttempts((prev) => {
            const newAtempts = [...prev];
            newAtempts[currentRow][currentCell] = event.key;
            return newAtempts;
          });
          setCurrentCell(currentCell + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentRow, attempts]);

  return (
    <>
      <div id="gameboard">
        {attempts.map((attempt, idx) => (
          <div key={idx} className="row">
            {attempt.map((letter, index) => (
              <Tile key={index} letters={letter} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
