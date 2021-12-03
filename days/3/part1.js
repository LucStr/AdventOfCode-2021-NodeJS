const data = require('fs').readFileSync(__dirname + '\\data.in').toString().split('\n');

const values = data.map(e => e.split('').map(Number));
const remapped = values[0].map(e => [e]);

for(let i = 1; i < values.length; i++){
    for(var j = 0; j < values[i].length; j++){
        remapped[j].push(values[i][j]);
    }
}

const mostCommonValues = remapped.map(e => e.sort((a, b) => a - b)[values.length / 2]);
const leastCommonValues = mostCommonValues.map(e => 1 - e);

const gamma = parseInt(mostCommonValues.join(''), 2);
const epsilon = parseInt(leastCommonValues.join(''), 2);


console.log(gamma * epsilon);