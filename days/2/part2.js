const data = require('../../get_data')(2).split('\n');

const instructions = data.map(e => {
    const split = e.split(' ');
    return {
        instruction: split[0],
        value: Number(split[1])
    }
});

let [x, y, aim] = [0, 0, 0];

const operations = {
    'forward' : (value) => {
        x += value
        y += aim * value;
    },
    'up' : (value) => {
        aim -= value;
    },
    'down' : (value) => {
        aim += value;
    },
}

instructions.forEach(({instruction, value}) => {
    operations[instruction](value);
})

console.log(x * y);