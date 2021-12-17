let data = require('../../get_data')(17);

const [_, x1, x2, y1, y2] = data.match(/target area: x=(\-?\d+)..(\-?\d+), y=(\-?\d+)..(\-?\d+)/).map(Number);

function test(x, y){
    if((x + 1) * x / 2 < x1){
        return false;
    }

    let xPos = 0;
    let yPos = 0;

    while((xPos < x2 && x > 0) || yPos > y1){
        xPos += x;
        yPos += y;

        if(xPos <= x2 && xPos >= x1 && yPos >= y1 && yPos <= y2){
            return true;
        }

        if(x > 0){
            x--;
        }

        y--;
    }

    return false;
}

let count = 0;

for(let x = 0; x <= x2; x++){
    for(let y = y1; y <= Math.abs(y1); y++){
        if(test(x, y)){
            count++
        }
    }
}

const result = count;

console.log(result);