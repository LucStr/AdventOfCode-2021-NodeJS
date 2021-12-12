const data = require('../../get_data')(6);

const fishes = data.split(',').map(Number).reduce((a, b) => {
     a[b]++;

     return a;
}, new Array(9).fill(0));

for(var i = 0; i < 80; i++){
    const growth = fishes.shift();

    fishes[6] += growth;
    fishes[8] = growth;
}

const result = fishes.reduce((a, b) => a + b);

console.log(result);