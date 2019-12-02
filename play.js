const Board = require('./board');
const Human = require('./human');
const Computer = require('./computer');

class Play {
    constructor() {
        this.board = new Board();
        this.human = new Human();
        this.computer = new Computer();
        this.players = [];
    }

    startGame = () => {
        this.board.setUpBoard();
        this.setUpPlayers();
        this.findPlayerToNextMove();
    };

    setUpPlayers = () => {
        this.players = [
            {
                type: this.computer.player,
                mark: this.computer.mark
            },
            {
                type: this.human.player,
                mark: this.human.mark
            }
        ];
        console.log(`${JSON.stringify(this.players)}`);
    };

    findPlayerToNextMove = async () => {
        let position = [];
        if(this.players[0].type === 'computer'){
            position = this.computer.move(this.board.emptyPositions);
            this.updateInput(position);
        }
        else{
            position = await this.human.getInput(this.board.emptyPositions,this.players);
            this.updateInput(position);
        }
    };

    updateInput = (position) => {
        this.board.updateBoard(this.players[0],position);
        this.board.printBoard();
        if(this.board.emptyPositions.length === 0 ){
            console.log(`<--- Match Draw --->`);
            return true;
        }
        if(this.checkWinner(this.players[0])){
            return true;
        }
        else{
            this.rotatePlayer();
            this.findPlayerToNextMove(this.players[0]);
        }
    };

    rotatePlayer = () => {
        this.players.push( this.players.shift() );
    };

    checkWinner = (player) => {
        const playerStr = player.mark+player.mark+player.mark;
        let winner = null;
        let colStrs = ['','',''];
        let diagStrs = ['',''];

        for (let i = 0; i < 3; i++) {
            let rowStrs = this.board.boardValues[i].join('');
            if (rowStrs === playerStr) {
                winner = player;
            }

            for (let k = 0; k < 3; k++) {
                colStrs[k] += this.board.boardValues[i][k];
            }

            if (i === 0) {
                diagStrs[0] += this.board.boardValues[i][1];
                diagStrs[1] += this.board.boardValues[i][3];
            } else if (i === 1) {
                diagStrs[0] += this.board.boardValues[i][2];
                diagStrs[1] += this.board.boardValues[i][2];
            } else if (i === 2) {
                diagStrs[0] += this.board.boardValues[i][3];
                diagStrs[1] += this.board.boardValues[i][1];
            }
        }
        if (colStrs.indexOf(playerStr) > -1) {
            winner = player;
        }
        if (diagStrs.indexOf(playerStr) > -1) {
            winner = player;
        }

        if (winner) {
            console.log(`<--- ${winner.type} WON the Game! --->`);
            return true;
        }

        return false;
    };
}

const init = new Play();
init.startGame();

module.exports = Play;

