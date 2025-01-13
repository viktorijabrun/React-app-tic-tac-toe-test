import React, { useState, useEffect } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!isXNext && !winner) {
      const aiMove = getBestMove(board);
      if (aiMove !== null) {
        setTimeout(() => handleClick(aiMove), 500); // Delay for better UX
      }
    }
  }, [isXNext, winner, board]);

  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore click if cell is filled or there is a winner

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const calculateWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const getBestMove = (board) => {
    const minimax = (newBoard, depth, isMaximizing) => {
      const winner = calculateWinner(newBoard);
      if (winner) {
        return winner === "O" ? 10 - depth : winner === "X" ? depth - 10 : 0;
      }
      if (!newBoard.includes(null)) return 0; // Tie

      if (isMaximizing) {
        let maxEval = -Infinity;
        for (let i = 0; i < newBoard.length; i++) {
          if (!newBoard[i]) {
            newBoard[i] = "O";
            const evalScore = minimax(newBoard, depth + 1, false);
            newBoard[i] = null;
            maxEval = Math.max(maxEval, evalScore);
          }
        }
        return maxEval;
      } else {
        let minEval = Infinity;
        for (let i = 0; i < newBoard.length; i++) {
          if (!newBoard[i]) {
            newBoard[i] = "X";
            const evalScore = minimax(newBoard, depth + 1, true);
            newBoard[i] = null;
            minEval = Math.min(minEval, evalScore);
          }
        }
        return minEval;
      }
    };

    let bestMove = null;
    let bestValue = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = "O";
        const moveValue = minimax(board, 0, false);
        board[i] = null;
        if (moveValue > bestValue) {
          bestValue = moveValue;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div
      className="app"
      style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}
    >
      <h1 className="title">Tic Tac Toe</h1>
      <div className="status-message" data-testid="status-message">
        {winner
          ? `Winner: ${winner}`
          : board.includes(null)
          ? `Next Turn: ${isXNext ? "X (You)" : "O (AI)"}`
          : "It's a Tie!"}
      </div>
      <div
        className="board"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "10px",
          justifyContent: "center",
        }}
        data-testid="board"
      >
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            data-testid={`cell-${index}`}
            onClick={() => isXNext && handleClick(index)} // Only allow user to play during their turn
            style={{
              width: "100px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              border: "1px solid #000",
              cursor: isXNext ? "pointer" : "not-allowed",
              backgroundColor: "#f9f9f9",
            }}
          >
            {cell}
          </div>
        ))}
      </div>
      <button
        className="reset-button"
        onClick={resetGame}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
        data-testid="reset-button"
      >
        Reset Game
      </button>
    </div>
  );
}

export default App;
