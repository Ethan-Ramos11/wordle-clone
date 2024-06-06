import "../styles.css";
const ResetButton = ({ onReset, result }) => {
  return (
    <button
      className={`reset-button ${!result ? "reset-button" : ""}`}
      onClick={onReset}
    >
      Reset Game
    </button>
  );
};

export default ResetButton;
