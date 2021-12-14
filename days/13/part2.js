let data = require('../../get_data')(13);

const split = data.split('\n\n');
const instructions = split[1].split('\n').map(e => e.match(/(x|y)\=(\d+)/).slice(1, 3));
let dots = split[0].split('\n').map(e => {
    const split = e.split(',');

    return {
        x: +split[0],
        y: +split[1]
    }
});

console.log(dots.length);

for(let i = 0; i < instructions.length; i++){
    const [axis, index] = instructions[i];

    const dotsToKill = [];
    for(let dot of dots){
        if(dot[axis] == index){
            dotsToKill.push(dot);
        }

        if(dot[axis] <= index){
            continue;
        }

        dot[axis] = 2 * index - dot[axis];

        if(dots.find(e => e != dot && e.x === dot.x && e.y === dot.y)){
            dotsToKill.push(dot);
        }
    }    

    dots = dots.filter(e => !dotsToKill.includes(e));

    console.log(dots.length);

    const xMin = Math.min(...dots.map(e => e.x));
    const xMax = Math.max(...dots.map(e => e.x));
    const yMin = Math.min(...dots.map(e => e.y));
    const yMax = Math.max(...dots.map(e => e.y));

    let out = '';

    for(var y = yMin; y <= yMax; y++){
        for(var x = xMin; x <= xMax; x++){
            out += dots.find(e => e.x === x && e.y === y) ? '#' : '.';
        }

        out += '\n';
    }

    console.log(out);
}



const result = dots.length;

console.log(result);