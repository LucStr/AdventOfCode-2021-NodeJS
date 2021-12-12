const data = require('../../get_data')(10);

const normal = {open: '(', close: ')', error: 3};
const edget = {open: '[', close: ']', error: 57};
const curvy = {open: '{', close: '}', error: 1197};
const vector = {open: '<', close: '>', error: 25137};

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

const result = data.split('\n').map(line => {
    const tail = [];

    for(let char of line){
        if(configMapping[char].isOpen){
            tail.push(configMapping[char].config.close);
        } else if(tail[tail.length - 1] === char) {
            tail.pop();
        } else {
            return configMapping[char].config.error;
        }
    }    

    return 0;
}).reduce((a, b) => a + b);



console.log(result);