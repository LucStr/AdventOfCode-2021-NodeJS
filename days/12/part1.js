const data = require('../../get_data')(12);

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

let current = [[caves.find(e => e.name === 'start')]];
const completedPahts = [];

while(current.length){
    const newQueue = [];

    for(let path of current){
        const last = path[path.length - 1];

        const potential = last.paths.filter(e => e.isBig || !path.includes(e));

        for(let newCave of potential){
            const newPath = [...path, newCave];

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