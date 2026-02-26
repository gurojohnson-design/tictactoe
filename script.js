// need to make array constructor to create gameboard




//players stored as objects
function makePlayer(name, marker) {
    if (!new.target) {
        alert('Must use "new" when declaring new player');
    }
    this.name = name;
    this.marker = marker;
}

const playerOne = new makePlayer('Gus', 'X');
console.log(playerOne);