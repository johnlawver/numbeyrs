import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import "./App.css";

function App() {
  const [confetti, setConfetti] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [round, setRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [roundResults, setRoundResults] = useState<string[]>([]);

  const questions = [
    {
      addend: [2, 3],
      options: [5, 6, 7],
      sum: 5,
    },
    {
      addend: [4, 3],
      options: [5, 6, 7],
      sum: 7,
    },
    {
      addend: [2, 2],
      options: [2, 3, 4],
      sum: 4,
    },
    {
      addend: [5, 1],
      options: [6, 2, 9],
      sum: 6,
    },
    {
      addend: [1, 8],
      options: [9, 5, 3],
      sum: 9,
    },
  ];

  const equationString = `${questions[round].addend[0]} + ${questions[round].addend[1]} = _`;

  return (
    <>
      {confetti && <ConfettiExplosion />}

      {!gameOver && (
        <>
          <h1>{equationString}</h1>
          <h1>
            {isSelected && isCorrect && "😀"}
            {isSelected && !isCorrect && "😟"}
          </h1>
          {!isSelected &&
            questions[round].options.map((option) => {
              return (
                <button
                  key={option}
                  onClick={() => {
                    const correct = option == questions[round].sum;
                    setRoundResults([...roundResults, correct ? "✅" : "🟥"]);
                    setIsCorrect(correct);
                    setConfetti(correct);
                    setIsSelected(true);
                    setTimeout(() => {
                      if (round + 1 < questions.length) {
                        setRound((round) => (round += 1));
                        setIsSelected(false);
                        setConfetti(false);
                      } else {
                        setGameOver(true);
                      }
                    }, 1500);
                  }}
                >
                  {option}
                </button>
              );
            })}
        </>
      )}
      {gameOver && (
        <>
          <h1>Game Over</h1>
          {roundResults.map((result, i) => {
            return (
              <p key={i}>
                <h2>
                  {i + 1}: {result}
                </h2>
              </p>
            );
          })}
        </>
      )}
    </>
  );
}

export default App;
