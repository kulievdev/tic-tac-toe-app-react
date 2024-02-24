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

const isBoardFull = (currentBoard) => {
    return currentBoard.every((cell) => cell !== null);
};

function Board() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState("X");

    const handleClick = (i) => {
        if (calculateWinner(board) || board[i]) return;

        board[i] = currentPlayer ? "X" : "O";

        setBoard(board);

        setCurrentPlayer(!currentPlayer);
    };

    const winner = calculateWinner(board);
    let status;

    if (winner) {
        status = `🎉 The Winner is: ${winner} 🎉`;
    } else if (isBoardFull(board)) {
        status = "It's a tie!";
    } else {
        status = "Next Player: " + (currentPlayer ? "X" : "O");
    }

    const handleRestart = () => {
        setCurrentPlayer("X");
        setBoard(Array(9).fill(null));
    };

    return (
        <div className="app">
            <div className="board">
                {board.map((value, idx) => {
                    return (
                        <Cell onclick={() => handleClick(idx)} value={value} />
                    );
                })}
            </div>
            <div className="status">{status}</div>
            <button className="restart" onClick={handleRestart}>
                Restart The Game!
            </button>
        </div>
    );
}

function Cell({ onclick, value }) {
    return (
        <button className="cell" onClick={onclick}>
            {value}
        </button>
    );
}

export default App;
