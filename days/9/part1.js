const data = require('fs').readFileSync(require('path').join(__dirname, 'data.in')).toString();

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

const result = field.filter(e => e.neighbors.filter(f => f.height > e.height).length === e.neighbors.length).map(e => e.height + 1).reduce((a, b) => a + b);
console.log(result);

let out = ''
    
for(tile of field){
    if(tile.x === 0){
        out += '\n';
    }

    if(tile.neighbors.filter(f => f.height > tile.height).length === tile.neighbors.length){
        out += `\x1b[42m${tile.height}\x1b[0m`
    } else {
        out += tile.height
    }
}

console.log(out);