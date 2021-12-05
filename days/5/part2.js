const data = require('fs').readFileSync(__dirname + '\\data.in').toString().split('\n');

const field = new Array(1000 * 1000).fill(0);

for(let i = 0; i < data.length; i++){
    let [_, x1, y1, x2, y2] = data[i].match(/(\d+),(\d+) -> (\d+),(\d+)/).map(Number);

    const xVector = Math.sign((x2 - x1));
    const yVector = Math.sign((y2 - y1));

    while(x1 != x2 || y1 != y2){
        field[y1 * 1000 + x1]++;

        x1 += xVector;
        y1 += yVector;
    }

    field[y1 * 1000 + x1]++;
}

const result = field.filter(e => e > 1).length;

console.log(result);