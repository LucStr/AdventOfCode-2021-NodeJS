let data = require('../../get_data')(15);

const defaultField = data.trim().split('\n').map(e => e.trim()).map(e => [...e].map(Number));
const field = [];

for(let i = 0; i < 5; i++){
    for(let j = 0; j < 5; j++){
        for(let y = 0; y < defaultField.length; y++){
            if(!field[defaultField.length * i + y]){
                field[defaultField.length * i + y] = [];
            }
            for(let x = 0; x < defaultField[y].length; x++){
                field[defaultField.length * i + y][defaultField[y].length * j + x] = {
                    level: (defaultField[y][x] + i + j - 1) % 9 + 1,
                    x: defaultField[y].length * j + x,
                    y: defaultField.length * i + y
                };
            }
        }
    }
}

const neighborVectors = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
];

const start = field[0][0];
start.minimumRisk = 0;

let queue = [{risk: 0, last: start}];

while(queue.length){
    const {risk, last} = queue.shift();

    for(let neighbor of neighborVectors.map(e => field[last.y + e[0]] ? field[last.y + e[0]][last.x + e[1]] : undefined).filter(e => e && e.minimumRisk === undefined)){
        neighbor.minimumRisk = risk + neighbor.level;

        queue.push({risk: risk + neighbor.level, last: neighbor});
    }

    queue = queue.sort((a, b) => a.risk - b.risk);
}

const lastRow = field[field.length - 1];
const result = lastRow[lastRow.length - 1].minimumRisk;

console.log(result);