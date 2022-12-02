const fs = require('fs');
const path = require('path');

// outcomes
const lose = 0;
const draw = 3;
const win = 6;
//shapes
const rock = 1;
const paper = 2;
const scissors = 3;

// const match = new Map<string, number>([
//     ['A Y', win + paper],
//     ['A X', draw + rock],
//     ['A Z', lose + scissors],

//     ['B Z', win + scissors],
//     ['B Y', draw + paper],
//     ['B X', lose + rock],

//     ['C X', win + rock],
//     ['C Z', draw + scissors],
//     ['C Y', lose + paper],
// ]);

const match = new Map<string, number>([
    ['A Z', win + paper],
    ['A Y', draw + rock],
    ['A X', lose + scissors],

    ['B Z', win + scissors],
    ['B Y', draw + paper],
    ['B X', lose + rock],

    ['C Z', win + rock],
    ['C Y', draw + scissors],
    ['C X', lose + paper],
]);


const rounds: string[] = fs.readFileSync(path.join(__dirname, '../input2.txt'), "utf8")
    .split(/\r?\n/);

let result = 0;

for (let i = 0; i < rounds.length; i++) {
        result += match.get(rounds[i]) ?? 0;
}

console.log(result);