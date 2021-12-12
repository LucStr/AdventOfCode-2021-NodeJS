const data = require('../../get_data')(2).split('\n').map(Number);

const result = data.filter((v, i, a) => i > 3 && v > a[i - 3]).length

console.log(result);