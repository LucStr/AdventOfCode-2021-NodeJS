let data = require('fs').readFileSync(require('path').join(__dirname, 'data.in')).toString();

const normal = {open: '(', close: ')', error: 3, valid: 1};
const edget = {open: '[', close: ']', error: 57, valid: 2};
const curvy = {open: '{', close: '}', error: 1197, valid: 3};
const vector = {open: '<', close: '>', error: 25137, valid: 4};

const config = [
    normal,
    edget,
    curvy,
    vector
]

const configMapping = {
    '(': {config: normal, isOpen: true},
    ')': {config: normal, isOpen: false},
    '[': {config: edget, isOpen: true},
    ']': {config: edget, isOpen: false},
    '{': {config: curvy, isOpen: true},
    '}': {config: curvy, isOpen: false},
    '<': {config: vector, isOpen: true},
    '>': {config: vector, isOpen: false},
}

const scores = data.split('\n').map(e => e.trim()).map(line => {
    const tail = [];

    for(let char of line){
        if(configMapping[char].isOpen){
            tail.push(configMapping[char].config.close);
        } else if(tail[tail.length - 1] === char) {
            tail.pop();
        } else {
            return 0;
        }
    }    
    
    return tail.reverse().reduce((a, b) => a * 5 + configMapping[b].config.valid, 0);
}).filter(e => e > 0).sort((a, b) => a - b);


const result = scores[Math.floor(scores.length / 2)]

console.log(result);