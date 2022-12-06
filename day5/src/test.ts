const fs = require('fs');
const path = require('path');

let result = 0;
const columnWidth = 4;

const lines: string[] = fs.readFileSync(path.join(__dirname, '../input2.txt'), "utf8")
    .split(/\r?\n/);

const getNumberOfStacks = (line: string): number => (line.length + 1) / columnWidth;

const initStacks = (numberOfStacks: number): Array<Array<string>> => {
    const stacks = Array<Array<string>>(numberOfStacks);

    for (let s = 0; s < stacks.length; s++) {
        stacks[s] = new Array<string>();
    }
    return stacks;
}

const insertRacks = (line: string, stacks: Array<Array<string>>): void => {
    let rackContent = "";

    for (let i = 0; i < stacks.length; i++) {
        rackContent = line.substring(i * columnWidth, i * columnWidth + columnWidth).trim();

        if (rackContent) {
            stacks[i].push(rackContent)
        }
    }
}

const getEmptyLinePosition = (lines: Array<string>): number => {
    let res = 0;

    for (let l = 0; l < lines.length; l++) {
        if (!lines[l]) {
            res = l;
            break;
        };
    }
    return res;
}

const moveRack = (line: string, stacks: Array<Array<string>>): void => {
    const move = line
        .replace('move ', '')
        .replace(' from ', ' ')
        .replace(' to ', ' ')
        .split(' ');

    const nMovements = Number(move[0]);
    const source = Number(move[1]) - 1;
    const dest = Number(move[2]) - 1;

    // part 1
    //let popped: string;
    // for (let i = 0; i < nMovements; i++) {
    //     popped = stacks[source].pop()!;
    //     stacks[dest].push(popped);
    // }

    // part 2
    let movingRacks: string[] = [];
    for (let i = 0; i < nMovements; i++) {
        movingRacks.push(stacks[source].pop()!);
    }

    while (movingRacks.length) {
        stacks[dest].push(movingRacks.pop()!);
    }

}

const numberOfStacks = getNumberOfStacks(lines[0]);

const stacks = initStacks(numberOfStacks);

const emptyLinePos = getEmptyLinePosition(lines);

// reading first part of input for stacks composing
for (let i = emptyLinePos - 2; i >= 0; i--) {
    insertRacks(lines[i], stacks);
}

for (let i = emptyLinePos + 1; i < lines.length; i++) {
    moveRack(lines[i], stacks);
}

//console.log(stacks);

stacks.forEach(s => console.log(s[s.length - 1]));