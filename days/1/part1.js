const data = require('fs').readFileSync(require('path').join(__dirname, 'data.in')).toString().split('\n').map(Number);

const result = data.filter((v, i, a) => i > 1 && v > a[i - 1]).length

console.log(result);