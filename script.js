// makes gameboard
const gameBoard = (function() {
    const board = [];
    for (let i = 0; i < 9; i++) {
        board.push('');
    }

    const getBoard = () => board;

    const placeMarker = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
            return true;
        } else return false;
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    };

    return { getBoard, placeMarker, resetBoard };
})();

// flow of the game
const gameController = (function() {
    const players = [
        { name: 'Player 1', marker: 'X' },
        { name: 'Player 2', marker: 'O' },
    ];
    let activePlayer = players[0];
    let gameOver = false;

    const whosTurn = document.querySelector('.whosTurn');
    whosTurn.textContent = `${activePlayer.name}'s Turn`;

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const playTurn = (index) => {
        if (gameOver) return;

        const success = gameBoard.placeMarker(index, activePlayer.marker);

        if (success) {
            displayController.render();
            if (checkWinner()) {
                gameOver = true;
            } else {
                switchPlayer();
                whosTurn.textContent = `${activePlayer.name}'s Turn`;
            }
        }
    };

    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const checkWinner = () => {
        const board = gameBoard.getBoard();
        const gameResult = document.querySelector('.gameResult');

        const hasWinner = winConditions.some(condition => {
            const [a, b, c] = condition;
            return (board[a] !== '') && (board[a] === board[b]) && (board[a] === board[c]);
        });

        if (hasWinner) {
            gameResult.textContent = `Game over! ${activePlayer.name} wins!!`;
            return true;
        } else if (!board.includes('')) {
            gameResult.textContent = "Game over! It's a Tie";
            return true;
        }

        return false;
    };

    // Reset game
    const resetGame = () => {
        gameBoard.resetBoard();
        activePlayer = players[0];
        gameOver = false;
        whosTurn.textContent = `${activePlayer.name}'s Turn`;
        document.querySelector('.gameResult').textContent = '';
        displayController.render();
    };

    return { playTurn, getActivePlayer: () => activePlayer, resetGame };
    })();

    const displayController = (function() {
        const cells = document.querySelectorAll('.cell');

        const render = () => {
            const board = gameBoard.getBoard();
            board.forEach((marker, index) => {
                cells[index].textContent = marker;
                cells[index].classList.remove('x', 'o'); // Reset classes
                if (marker !== '') {
                    cells[index].classList.add(marker.toLowerCase());
                }
            });
        };

        return { render };
    })();

// add click listener to each cell
const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        gameController.playTurn(index);
    });
});

// Add reset button listener 
const resetButton = document.querySelector('.reset');
if (resetButton) {
    resetButton.addEventListener('click', gameController.resetGame);
}