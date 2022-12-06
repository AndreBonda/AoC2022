import { start } from "repl";

const fs = require('fs');
const path = require('path');

let position = 0;
const numberOfDifferentCharacters = 14; //part 1 = 4

const characters: string[] = fs.readFileSync(path.join(__dirname, '../input2.txt'), "utf8")
    .split('');

let startingSignal = new Set<string>();

for (let i = 0; i < characters.length; i++) {
    if (startingSignal.has(characters[i])) {
        for (let c of startingSignal) {
            startingSignal.delete(c);

            if (c === characters[i]) {
                startingSignal.add(c);
                break;
            }
        }
    }
    else {
        startingSignal.add(characters[i]);

        if (startingSignal.size == numberOfDifferentCharacters) {
            position = i + 1;
            break;
        }
    }
}

console.log(position);