const fs = require('fs');
const path = require('path');

let result = 0;

const pairs = fs.readFileSync(path.join(__dirname, '../input2.txt'), "utf8")
    .split(/\r?\n/)
    .map((i: string) => {
        const first: string = i.split(',')[0];
        const second: string = i.split(',')[1];

        return {
            first: {
                init: Number(first.split('-')[0]),
                end: Number(first.split('-')[1])
            },
            second: {
                init: Number(second.split('-')[0]),
                end: Number(second.split('-')[1])
            }
        }
    });

// part 1
// for (let i in pairs) {
//     if (pairs[i].first.init === pairs[i].second.init
//         || (pairs[i].first.init < pairs[i].second.init && pairs[i].first.end >= pairs[i].second.end)
//         || (pairs[i].second.init < pairs[i].first.init && pairs[i].second.end >= pairs[i].first.end)) {
//         result++;
//     }
// }

// part 2
for(let i in pairs) {
    if (pairs[i].first.init === pairs[i].second.init
        || (pairs[i].first.init < pairs[i].second.init && pairs[i].first.end >= pairs[i].second.init)
        || (pairs[i].second.init < pairs[i].first.init && pairs[i].second.end >= pairs[i].first.init)) {
            result++;
        }
}

console.log(result);
