import { useCallback } from "react";

export const useEnterKey = (
  word,
  currentRow,
  attempts,
  setAttempts,
  setAnimateSpin
) => {
  return useCallback(() => {
    setAnimateSpin(true);
    setTimeout(() => setAnimateSpin(false), 600);

    const updatedAttempts = attempts.map((row, idx) =>
      idx === currentRow
        ? row.map((cell, index) => ({
            ...cell,
            status:
              cell.letter === word[index]
                ? "correct"
                : word.includes(cell.letter)
                ? "wrongPosition"
                : "wrong",
          }))
        : row
    );

    setAttempts(updatedAttempts);
  }, [word, attempts, setAttempts, currentRow, setAnimateSpin]);
};

export const useBackspaceKey = (
  currentCell,
  setCurrentCell,
  attempts,
  setAttempts,
  currentRow
) => {
  return useCallback(() => {
    if (currentCell > 0) {
      const updatedAttempts = attempts.map((row, idx) =>
        idx === currentRow
          ? row.map((cell, cellIdx) =>
              cellIdx === currentCell - 1 ? { ...cell, letter: "" } : cell
            )
          : row
      );

      setAttempts(updatedAttempts);
      setCurrentCell(currentCell - 1);
    }
  }, [currentCell, setCurrentCell, attempts, setAttempts, currentRow]);
};

export const useKeyPress = (
  currentCell,
  setCurrentCell,
  attempts,
  setAttempts,
  currentRow
) => {
  return useCallback(
    (key) => {
      if (/^[a-zA-Z]$/.test(key) && currentCell < 5) {
        const updatedAttempts = attempts.map((row, idx) =>
          idx === currentRow
            ? row.map((cell, cellIdx) =>
                cellIdx === currentCell
                  ? { ...cell, letter: key.toUpperCase() }
                  : cell
              )
            : row
        );

        setAttempts(updatedAttempts);
        setCurrentCell((cell) => cell + 1);
      }
    },
    [currentCell, setCurrentCell, attempts, setAttempts, currentRow]
  );
};
