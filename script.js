// makes gameboard

const gameBoard = (function() {
    // make the board
    const board = [];
    for(let i = 0; i < 9; i++) {
        board.push('');
    }

    // get the board
    const getBoard = board;

    // place markers
    const placeMarker = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
            return [true, getBoard];
        } else return [false, getBoard];
    };

    // reset board
    const resetBoard = () => {
        for(let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    };

    return {
        getBoard,
        placeMarker,
        resetBoard
    };
})();

const gameController = (function() {
    const players = [
        { name: 'Player 1', marker: 'X'},
        { name: 'Plaer 2', marker: 'O'},
    ];
    let activePlayer = players[0];
    let gameOver = false;

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const playTurn = (index) => {
        if (gameOver) return;

        const success = gameBoard.placeMarker(index, activePlayer.marker);

        if (success) {
            checkWinner();
            gameOver = true;
        } else {
            switchPlayer();
        }
    };

    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    const checkWinner = () => {
        const board = gameBoard.getBoard;

        return winConditions.some(condition => {
            const [a, b, c] = condition;
            if ((board[a] !== '') && (board[a] === board[b]) && (board[a] === board[c])) {
                return console.log(`Game over! ${board[a]} wins!!`);
            } else if (!board.includes('')) {
                return console.log("Game over! It's a Tie");
            }
        });
    };
    return { playTurn, getActivePlayer: () => activePlayer};
})();


// alternate players and placement
function gameFlow() {
    const emptyBoard = getboard => getboard.every(value => value === getboard[0]);
    if (emptyBoard) {
        let turn = 0;

    }
}

