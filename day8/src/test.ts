const fs = require('fs');
const path = require('path');

const lines: string[] = fs.readFileSync(path.join(__dirname, '../input2.txt'), "utf8")
    .split(/\n/);

let forest: number[][] = [];
let heights: number[];

// build forest
for (let i = 0; i < lines.length; i++) {
    forest.push([]);
    heights = lines[i].split('').map(h => Number(h));
    for (let h of heights) {
        forest[i].push(h);
    }
}

const rows = forest.length;
const cols = forest[0].length;

/* 
// # PART1
// computing external trees. (-4) removing corner trees because they are computed twice
let visibleTree = (rows*2)+(cols*2)-4;
let isVisible = false;
let cursor: number;

// visiting only internals tree
for(let r = 1; r < rows-1; r++){
    for(let c = 1; c < cols-1; c++) {
        isVisible = false;

        // search top
        cursor = r-1;
        while(cursor >= 0) {
            if (forest[cursor][c] >= forest[r][c]) break;
            if(cursor == 0) isVisible = true;
            cursor--;
        }

        // search bottom
        if(!isVisible) {
            cursor = r+1;

            while(cursor < rows) {
                if (forest[cursor][c] >= forest[r][c]) break;
                if(cursor == rows-1) isVisible = true;
                cursor++;
            }
        }

        // search left
        if(!isVisible) {
            cursor = c-1;
            while(cursor >= 0) {
                if(forest[r][cursor] >= forest[r][c]) break;
                if(cursor == 0) isVisible = true;
                cursor--;
            }
        }

        //search right
        if(!isVisible) {
            cursor = c+1;
            while(cursor < cols) {
                if(forest[r][cursor] >= forest[r][c]) break;
                if(cursor === cols-1) isVisible = true;
                cursor++;
            }
        }

        if(isVisible)
            visibleTree++;
    }
}

console.log(visibleTree);
*/

// # PART2
let maxScenicScore = 0;
let scenicScore = 0;
let visibleTreeTop: number;
let visibleTreeBot: number;
let visibleTreeLeft: number;
let visibleTreeRight: number;
let cursor = 0;

for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        scenicScore = 0;
        visibleTreeTop = 0;
        visibleTreeBot = 0;
        visibleTreeLeft = 0;
        visibleTreeRight = 0;

        // search top
        cursor = r - 1;
        while (cursor >= 0) {
            visibleTreeTop++;
            if (forest[cursor][c] >= forest[r][c]) break;
            cursor--;
        }

        // search bottom
        cursor = r + 1;
        while (cursor < rows) {
            visibleTreeBot++;
            if (forest[cursor][c] >= forest[r][c]) break;
            cursor++;
        }

        // search left
        cursor = c - 1;
        while (cursor >= 0) {
            visibleTreeLeft++;
            if (forest[r][cursor] >= forest[r][c]) break;
            cursor--;
        }

        // search right
        cursor = c + 1;
        while (cursor < cols) {
            visibleTreeRight++;
            if (forest[r][cursor] >= forest[r][c]) break;
            cursor++;
        }

        scenicScore = visibleTreeTop *
            visibleTreeBot *
            visibleTreeLeft *
            visibleTreeRight;

        maxScenicScore = Math.max(maxScenicScore, scenicScore);
    }
}

console.log(maxScenicScore);