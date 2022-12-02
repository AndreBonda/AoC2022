const fs = require('fs');
const path = require('path');

const topElves = 3;
let counter: number = 0;
let topElvesCalories: number[] = Array(topElves).fill(0); // Use priority queue for better performance
const calorieLines = fs.readFileSync(path.join(__dirname, '../input.txt'), "utf8")
    .split(/\r?\n/);

calorieLines.push(''); // Add a new empty row at the end to calculate calories of the last Elf

for (let i = 0; i < calorieLines.length; i++) {
    if (calorieLines[i] === "") {
        if (topElvesCalories[0] < counter) {
            topElvesCalories[0] = counter;
            topElvesCalories = topElvesCalories.sort((a, b) => a - b);
        }
        counter = 0;
    } else {
        counter += Number(calorieLines[i]);
    }
}

let sumCalories = 0;
topElvesCalories.forEach(c => sumCalories += c);
console.log(sumCalories);