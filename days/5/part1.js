const data = require('../../get_data')(5).split('\n');

const field = new Array(1000 * 1000).fill(0);

for(let i = 0; i < data.length; i++){
    const [_, x1, y1, x2, y2] = data[i].match(/(\d+),(\d+) -> (\d+),(\d+)/).map(Number);

    if(!(x1 == x2 || y1 == y2)){
        continue;
    }

    for(let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++){
        for(let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++){
            field[y * 1000 + x]++;
        }
    }
}

const result = field.filter(e => e > 1).length;

console.log(result);