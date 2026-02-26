// makes gameboard

const gameBoard = (function() {
    // make the board
    const board = [];
    for(let i = 0; i < 9; i++) {
        board.push(['']);
    }

    // get the board
    const getBoard = board;

    // place markers
    const placeMarker = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
            return true;
        } else return false;
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

// makes players stored as objects
function makePlayer(name, marker) {
    if (!new.target) {
        alert('Must use "new" when declaring new player');
    }
    this.name = name;
    this.marker = marker;
}

// i have a way to make the board
// update it
// and reset it

// also can make players if that's even necessary

// need to be able to check for winning placement
// alternate players and placement









const playerOne = new makePlayer('John', 'X');
console.log(playerOne);


console.log(gameBoard.getBoard);
console.log(gameBoard.placeMarker);
console.log(gameBoard.resetBoard);
