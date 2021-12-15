let data = require('../../get_data')(15);

const field = data.trim().split('\n').map((row, y) => {
    return [...row.trim()].map((level, x) => {
        return {
            x, 
            y, 
            level: +level,
        };
    });
}).reduce((a, b) => a.concat(...b), []);

const neighborVectors = [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: 0, y: -1},
    {x: -1, y: 0}
];

for(var tile of field){
    tile.neighbors = neighborVectors.map(e => field.find(f => f.x === e.x + tile.x && f.y === e.y + tile.y)).filter(e => e);
}

const start = field[0];
start.minimumRisk = 0;

let queue = [{risk: 0, last: start}];

while(queue.length){
    const {risk, last} = queue.shift();

    for(let neighbor of last.neighbors.filter(e => e.minimumRisk === undefined)){
        neighbor.minimumRisk = risk + neighbor.level;

        queue.push({risk: risk + neighbor.level, last: neighbor});
    }

    queue = queue.sort((a, b) => a.risk - b.risk);
}

console.log(field[field.length - 1].minimumRisk);