const data = require('fs').readFileSync(__dirname + '\\data.in').toString().split('\n');

const instructions = data.map(e => {
    const split = e.split(' ');
    return {
        instruction: split[0],
        value: Number(split[1])
    }
});

let [x, y] = [0, 0];

const operations = {
    'forward' : (value) => x += value,
    'up' : (value) => y -= value,
    'down' : (value) => y += value,
}

instructions.forEach(({instruction, value}) => {
    operations[instruction](value);
})

console.log(x * y);