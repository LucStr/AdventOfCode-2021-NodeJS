const input = require('fs').readFileSync(__dirname + '\\data.in').toString();

const split = input.split('\n\n');

const draw = split[0].split(',').map(Number);

const numbers = new Array(100).fill(0).map((e, i) => {
    return {
        number: i,
        index: draw.indexOf(i)
    }
});

const cards = split.slice(1).map(e => {
    const entries = e.split('\n').map(e => e.split(' ').filter(e => e).map(e => numbers[e]));

    const rows = entries.map(e => e.reduce((a, b) => a.index > b.index ? a : b));
    const columns = entries[0].map((e, i) => entries.map(e => e[i])).map(e => e.reduce((a, b) => a.index > b.index ? a : b));

    return {
        entries,
        result: [...rows, ...columns].reduce((a, b) => a.index < b.index ? a : b),
        rows,
        columns
    } 
});

const winner = cards.reduce((a, b) => a.result.index < b.result.index ? a : b);
const numbersLeftOnBoard = winner.entries
    .reduce((a, b) => a.concat(...b), [])
    .filter(e => e.index > winner.result.index)
    .reduce((a, b) => a + b.number, 0)

console.log(winner.result.number * numbersLeftOnBoard);