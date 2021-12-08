const data = require('fs').readFileSync(require('path').join(__dirname, 'data.in')).toString().split('\n');

const uniqueLengths = [2, 4, 3, 7];
const result = data.map(e => e.split(' | ')[1]).join(' ').split(' ').filter(e => uniqueLengths.includes(e.length)).length;

console.log(result);