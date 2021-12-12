const data = require('../../get_data')(7)
    .split(',')
    .map(Number)
    .sort((a, b) => a - b);

const result = data.map(e => data.map(f => Math.abs(f - e) * (Math.abs(f - e) + 1) / 2).reduce((a, b) => a + b)).sort((a, b) => a - b)[0];

console.log(result);