import { useState } from "react";
import "./App.css";

function App() {
    return (
        <main className="app">
            <Board />
        </main>
    );
}

function calculateWinner(board) {
    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningPatterns.length; i++) {
        const [a, b, c] = winningPatterns[i];

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function isBoardFull(currentBoard) {
    return currentBoard.every((cell) => cell !== null);
}

function Board() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isX, setIsX] = useState(true);

    function handleClick(idx) {
        if (calculateWinner(board) || board[idx]) return;

        board[idx] = isX ? "X" : "O";

        setBoard(board);
        setIsX(!isX);
    }

    const winner = calculateWinner(board);
    let status;

    if (winner) {
        status = `🎉 The Winner is: ${winner} 🎉`;
    } else if (isBoardFull(board)) {
        status = "It's a tie!";
    } else {
        status = "Next Player: " + (isX ? "X" : "O");
    }

    function handleRestart() {
        setIsX(true);
        setBoard(Array(9).fill(null));
    }

    return (
        <>
            <div
                className={`btn ${
                    winner
                        ? "winner_class"
                        : isBoardFull(board)
                        ? "tie_class"
                        : "status"
                }`}
            >
                {status}
            </div>
            <div className="board">
                {board.map((value, idx) => {
                    return (
                        <Square
                            key={idx}
                            value={value}
                            onClick={() => handleClick(idx)}
                        />
                    );
                })}
            </div>
            <button onClick={handleRestart} className="btn restart">
                Restart The Game!
            </button>
        </>
    );
}

function Square({ onClick, value }) {
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
}

export default App;
