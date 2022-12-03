const fs = require('fs');
const path = require('path');

const lines: string[] = fs.readFileSync(path.join(__dirname, '../input2.txt'), "utf8")
    .split(/\r?\n/);

let totalPriorities = 0;

const getPriority = (input: string): number => {
    if (input.charCodeAt(0) >= 97 && input.charCodeAt(0) <= 122) {
        return input.charCodeAt(0) - 96;
    }
    return input.charCodeAt(0) - 38;
}

// # PART 1
//const items = new Set<string>();

// for (let i = 0; i < lines.length; i++) {
//     // first compartment
//     for (let a = 0; a < lines[i].length / 2; a++) {
//         items.add(lines[i][a]);
//     }

//     // second compartment
//     for (let k = lines[i].length / 2; k < lines[i].length; k++) {
//         if (items.has(lines[i][k])) {
//             totalPriorities += getPriority(lines[i][k]);
//             items.delete(lines[i][k]);
//         }
//     }

//     items.clear();
// }

// # PART 2
let set1: Set<string>;
let set2: Set<string>;

for (let i = 0; i < lines.length; i += 3) {
    set1 = new Set(lines[i]);
    set2 = new Set(lines[i + 1]);

    for (let a = 0; a < lines[i + 2].length; a++) {
        if (set1.has(lines[i + 2][a]) && set2.has(lines[i + 2][a])) {
            totalPriorities += getPriority(lines[i + 2][a]);
            break;
        }
    }
}

console.log(totalPriorities);