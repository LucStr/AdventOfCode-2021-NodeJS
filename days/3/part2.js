const data = require('../../get_data')(3).split('\n');

const values = data.map(e => e.split('').map(Number));

let filtered = values;
let index = 0;

while(filtered.length > 1 && index < filtered[0].length){
    const mostCommonValue = filtered.map(e => e[index]).sort((a, b) => a - b)[Math.floor(filtered.length / 2)];
    filtered = filtered.filter(e => e[index] === mostCommonValue);
    index++;
}

const oxygen = parseInt(filtered[0].join(''), 2);

filtered = values;
index = 0;

while(filtered.length > 1 && index < filtered[0].length){
    const leastCommonValue = 1 - filtered.map(e => e[index]).sort((a, b) => a - b)[Math.floor(filtered.length / 2)];
    filtered = filtered.filter(e => e[index] === leastCommonValue);
    index++
}

const co2 = parseInt(filtered[0].join(''), 2);

console.log(oxygen * co2);