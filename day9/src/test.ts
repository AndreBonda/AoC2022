import { Rope } from "./rope";

const fs = require('fs');
const path = require('path');

const lines: string[] = fs.readFileSync(path.join(__dirname, '../input2.txt'), "utf8")
    .split(/\n/);

let next_movement: string;
let num_movements = 0;
const rope = new Rope(10);

for (let l of lines) {
    next_movement = l.split(' ')[0];
    num_movements = Number(l.split(' ')[1]);

    console.log(`\n----Mov:${next_movement},${num_movements}`);

    while (num_movements > 0) {
        rope.moveRope(next_movement);
        num_movements--;
    }
}

console.log(rope.getTailPositions());