const fs = require('fs');
const path = require('path');

const lines: string[] = fs.readFileSync(path.join(__dirname, '../input2.txt'), "utf8")
    .split(/\n/);

let instructions: Array<[number, number]> = new Array(); // value, lifetime

for (let l of lines) {
    if (l === "noop")
        instructions.push([0, 1]);
    else
        instructions.push([
            Number(l.split(' ')[1]),
            2
        ]);
}

let cycle = 0;
let register = 1;
let renderingRow = 0;
let renderingCol = 0;
const crtRows = 6;

let crtScreen: string[][] = new Array<string[]>(crtRows);
for (let i = 0; i < crtRows; i++) {
    crtScreen[i] = new Array<string>(40);
}

while (instructions.length > 0) {

    renderingRow = Math.floor(cycle / 40);
    renderingCol = cycle % 40;

    if (register >= renderingCol - 1 && register <= renderingCol + 1)
        crtScreen[renderingRow][renderingCol] = "#";
    else
        crtScreen[renderingRow][renderingCol] = ".";

    // lifetime of the first instruction
    instructions[0][1]--;

    if (instructions[0][1] === 0) {
        register += instructions[0][0];
        instructions.shift();
    }

    cycle++;
}

//render crt screen
let rowRender = "";
for (let r = 0; r < 6; r++) {
    rowRender = "";
    for (let c = 0; c < 40; c++) {
        rowRender += crtScreen[r][c];
    }
    console.log(rowRender);
}