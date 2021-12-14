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

for(let i = 0; i < 1; i++){
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
}

const result = dots.length;

console.log(result);