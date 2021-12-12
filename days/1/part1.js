const data = require('../../get_data')(1).split('\n').map(Number);

const result = data.filter((v, i, a) => i > 1 && v > a[i - 1]).length

console.log(result);