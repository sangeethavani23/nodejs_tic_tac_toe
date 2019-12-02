class Computer{
    constructor() {
        this.player = 'computer';
        this.mark = 'X';
    }
    move = (emptyPositions) => {
        console.log(`Computer move`);
        let index = -1;

        index = Math.floor(Math.random() * emptyPositions.length);
        console.log(`emptyPositions ${emptyPositions[index]}`);
        const position = [Number(emptyPositions[index][0]),Number(emptyPositions[index][1])];
        console.log(position);
        return position;
    }
}

module.exports = Computer;