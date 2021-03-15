import React, { useState, useEffect } from 'react'
import './App.css';

const DEFAULT_BOARD = ["", "", "", "", "", "", "", "", ""];
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState(DEFAULT_BOARD)
  const [circleTurn, setCircleTurn] = useState(null)
  const [result, setResult] = useState(null)

  useEffect(() => {
    console.log('useEffect')
    if (circleTurn === null) {
      setCircleTurn(false);
    } else if (checkWin(circleTurn ? CIRCLE_CLASS : X_CLASS)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      setCircleTurn(circleTurn => !circleTurn)
    }

    return () => {}
  }, [board])

  const squareClicked = (index) => {
    if (result) {
      return;
    }

    let newBoard = board.map((square, idx) => {
      if (idx === index) {
        return circleTurn ? CIRCLE_CLASS : X_CLASS;
      }
      return square;
    })
    setBoard(newBoard)
  }

  const checkWin = (currentClass) => {
    return WINNING_COMBINATIONS.some(combination =>
      combination.every(index =>
        board[index] === currentClass))
  };

  const isDraw = () => board.every(cell => cell !== '')

  const endGame = (draw) => {
    if (draw) {
      setResult('Draw!')
    } else {
      setResult(`${circleTurn ? "O's" : "X's"} Wins!`)
    }
  };

  const restartGame = () => {
    setBoard(DEFAULT_BOARD);
    setCircleTurn(null);
    setResult(null);
  };

  return (
    <div className="App">
      <h2>{circleTurn ? "O" : "X"}'s turn</h2>
      <div className={`board ${circleTurn ? CIRCLE_CLASS : X_CLASS}`}>
        {
          board.map((square, index) => (
            <div
              key={index}
              className={`cell${square ? ' ' + square : ''}`}
              onClick={() => squareClicked(index)}
            />
          ))
        }
      </div>
      <div className={`winning-message${result ? ' show' : ''}`}>
        <div>{result}</div>
        <button onClick={restartGame}>Restart</button>
      </div>
    </div>
  );
}

export default App;
