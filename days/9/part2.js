const data = require('../../get_data')(9);

const field = data.trim().split('\n').map((row, y) => [...row.trim()].map((item, x) => {
    return {
        x, y, height: Number(item)
    };
})).reduce((a, b) => a.concat(...b));

const neigborVector = [
    {y: -1, x: 0},
    {y: 0, x: -1},
    {y: 0, x: 1},
    {y: 1, x: 0}
];

for(let tile of field){
    tile.neighbors = neigborVector.map(({x, y}) => field.find(e => e.x === tile.x + x && e.y === tile.y + y)).filter(e => e);
}

const lowpoints = field.filter(e => e.neighbors.filter(f => f.height > e.height).length === e.neighbors.length);

const result = lowpoints.map(point => {
    let current = point.neighbors.filter(e => e.height != 9);
    const seen = [point, ...current];

    while(current.length){
        const newQueue = [];

        for(let tile of current){
            const newTiles = tile.neighbors.filter(e => !seen.includes(e) && e.height < 9);
            newQueue.push(...newTiles);
            seen.push(...newTiles);
        }

        current = newQueue;
    }

    return seen.length;
}).sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b)

console.log(result);