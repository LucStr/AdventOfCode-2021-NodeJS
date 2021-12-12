const data = require('../../get_data')(11);

const field = data
    .trim()
    .split('\n')
    .map((row, y) => [...row.trim()].map((char, x) => {
        return {
            level: +char,
            x,
            y
        }
    }))
    .reduce((a, b) => a.concat(...b), []);

const neighborVector = [
    {x: 0, y: 1},
    {x: 1, y: 0},
    {x: 0, y: -1},
    {x: -1, y: 0},
    {x: 1, y: 1},
    {x: -1, y: 1},
    {x: -1, y: -1},
    {x: 1, y: -1},
]

for(let tile of field){
    tile.neighbors = neighborVector.map(e => field.find(f => f.x === e.x + tile.x && f.y === e.y + tile.y)).filter(e => e);
}

let flashes = 0;

for(let i = 0; i < 100; i++){
    field.forEach(tile => {
        tile.level++;
    });

    let current;

    while((current = field.filter(e => e.level > 9 && !e.hasFlashed)).length){
        for(let tile of current){
            tile.hasFlashed = true;
            flashes++;

            tile.neighbors.forEach(n => n.level++);
        }
    }

    for(let tile of field.filter(e => e.hasFlashed)){
        tile.hasFlashed = false;
        tile.level = 0;
    }
}

console.log(flashes);