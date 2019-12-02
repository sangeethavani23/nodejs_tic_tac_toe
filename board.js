class Board{
    constructor() {
        this.boardSize = 3;
        this.boardValues = [];
        this.emptyPositions = [];
    }
    setUpBoard = () => {
        for(let i = 1; i <= this.boardSize; i++){
            const row = [];
            for(let j = 1; j <= this.boardSize; j++){
                row.push(null);
                this.emptyPositions.push(i+''+j)
            }
            this.boardValues.push(row)
        }
    };

    printBoard = () => {
        const divider = '+-----------+';
        for (let i = 0; i < 3; i += 1) {
            console.log(divider);
            let row = '|';
            for (let k = 0; k < 3; k += 1) {
                if (this.boardValues[i][k])
                    row += ' ' + this.boardValues[i][k] + ' |';
                else
                    row += '   |';
            }
            console.log(row);
        }
        console.log(divider);
    };

    updateBoard = (player,position) => {
        let emptyIndex = -1;
        this.boardValues[position[0]-1][position[1]-1] = player.mark;
        emptyIndex = this.emptyPositions.indexOf(position[0] + '' + position[1]);
        this.emptyPositions.splice(emptyIndex, 1);
    };
}

module.exports = Board;