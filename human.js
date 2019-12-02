const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

class Human{
    constructor() {
        this.player = 'human';
        this.mark = 'O';
    }

    getInput = (emptyPositions,players,callback) => {
        return new Promise(function (resolve,reject) {
            console.log(`Human move`);
            console.log(`${JSON.stringify(readline)}`);
            readline.question(players[0].type + '\'s move (enter row column): ',(input) => {
                    if (emptyPositions.indexOf(input) !== -1) {
                        resolve(input);
                    } else {
                        console.log(`Input Missing`);
                        this.getInput(emptyPositions,players,callback);
                    }
            });
        })
    }
}

module.exports = Human;