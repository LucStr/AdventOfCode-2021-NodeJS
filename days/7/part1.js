const data = require('fs').readFileSync(require('path').join(__dirname, 'data.in')).toString()
    .split(',')
    .map(Number)
    .sort((a, b) => a - b);

const median = data[Math.floor(data.length / 2)];

const result = data.map(e => Math.abs(e - median)).reduce((a, b) => a + b);

console.log(result);