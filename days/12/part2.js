let data = require('fs').readFileSync(require('path').join(__dirname, 'data.in')).toString();

const caves = [...new Set(data.match(/(\w+)/g))].map(e => {
    return {
        name: e,
        isBig: e.toLocaleUpperCase() === e,
        paths: []
    }
});

for(let path of data.trim().split('\n')){
    const split = path.split('-');
    const first = caves.find(e => e.name === split[0]);
    const second = caves.find(e => e.name === split[1]);

    first.paths.push(second);
    second.paths.push(first);
}

let current = [{hasVisitedSmallCaveTwice: false, path: [caves.find(e => e.name === 'start')]}];
const completedPahts = [];

while(current.length){
    const newQueue = [];

    for(let {hasVisitedSmallCaveTwice, path} of current){
        const last = path[path.length - 1];

        const potential = last.paths.filter(e => e.isBig || !path.includes(e) || (!hasVisitedSmallCaveTwice && e.name !== 'start' && e.name != 'end'));

        for(let newCave of potential){
            const newPath = {
                hasVisitedSmallCaveTwice: hasVisitedSmallCaveTwice || (!newCave.isBig && path.includes(newCave)),
                path: [...path, newCave]
            };

            if(newCave.name === 'end'){
                completedPahts.push(newPath);
            } else {
                newQueue.push(newPath);
            }
        }
    }

    current = newQueue;
}

const result = completedPahts.length;

console.log(result);