const data = require('fs').readFileSync(require('path').join(__dirname, 'data.in')).toString().split('\n').map(Number);

const result = data.filter((v, i, a) => i > 3 && v > a[i - 3]).length

console.log(result);