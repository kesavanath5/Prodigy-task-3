const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function createBoard() {
    boardElement.innerHTML = "";
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.textContent = cell;
        cellElement.addEventListener("click", () => makeMove(index));
        boardElement.appendChild(cellElement);
    });
}

function makeMove(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatus();
        createBoard();
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    winPatterns.forEach(pattern => {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusElement.textContent = `Player ${board[a]} wins!`;
            gameActive = false;
        }
    });
    if (!board.includes("") && gameActive) {
        statusElement.textContent = "It's a draw!";
        gameActive = false;
    }
}

function updateStatus() {
    if (gameActive) {
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    updateStatus();
    createBoard();
}

restartBtn.addEventListener("click", resetGame);

createBoard();