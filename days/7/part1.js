const data = require('../../get_data')(7)
    .split(',')
    .map(Number)
    .sort((a, b) => a - b);

const median = data[Math.floor(data.length / 2)];

const result = data.map(e => Math.abs(e - median)).reduce((a, b) => a + b);

console.log(result);