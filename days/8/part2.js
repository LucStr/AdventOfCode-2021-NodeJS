const data = require('fs').readFileSync(require('path').join(__dirname, 'data.in')).toString().split('\n');

function sortLetters(letters){
    return [...letters].sort((a, b) => a.localeCompare(b)).join('');
}


function getMappings(inputs){
    inputs = inputs.map(sortLetters);

    const one = inputs.find(e => e.length == 2);
    const four = inputs.find(e => e.length == 4);
    const seven = inputs.find(e => e.length == 3);
    const eight = inputs.find(e => e.length == 7);
    const nine = inputs.find(e => e.length == 6 && [...seven, ...four].every(f => e.includes(f)));
    const zero = inputs.find(e => e.length == 6 && e != nine && [...one].every(f => e.includes(f)));
    const six = inputs.find(e => e.length == 6 && e != zero && e != nine);
    const five = inputs.find(e => e.length == 5 && [...e].every(f => six.includes(f)));
    const three = inputs.find(e => e.length == 5 && e != five && [...e].every(f => nine.includes(f)));
    const two = inputs.find(e => e.length == 5 && e != five && e != three);

    const mappings = {};
    mappings[zero] = 0;
    mappings[one] = 1;
    mappings[two] = 2;
    mappings[three] = 3;
    mappings[four] = 4;
    mappings[five] = 5;
    mappings[six] = 6
    mappings[seven] = 7;
    mappings[eight] = 8;
    mappings[nine] = 9;
    
    return mappings;
}

const result = data.map(e => {
    const mappings = getMappings(e.match(/\w+/g));
    const input = e.split(' | ')[1].split(' ');
    let sum = 0;
    for(number of input){
        sum *= 10;
        sum += mappings[sortLetters(number)];
    }
    return sum;
}).reduce((a, b) => a + b)

console.log(result);
