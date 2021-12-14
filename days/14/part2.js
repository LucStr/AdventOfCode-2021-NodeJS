let data = require('../../get_data')(14);

const split = data.split('\n\n');

const chain = [...split[0]]

const rules = split[1].split('\n').map(e => {
    const [_, first, second, out] = e.match(/(\w)(\w) -> (\w)/);

    return {
        first, second, out
    }
});

let count = [];

for(let i = 1; i < chain.length; i++){
    count[chain[i - 1] + chain[i]] = (count[chain[i - 1] + chain[i]] || 0) + 1;
}

for(let i = 0; i < 40; i++){
    let newCount = [];
    
    for(let pair in count){
        const rule = rules.find(e => e.first === pair[0] && e.second === pair[1]);

        newCount[pair[0] + rule.out] = (newCount[pair[0] + rule.out] || 0) + count[pair];
        newCount[rule.out + pair[1]] = (newCount[rule.out + pair[1]] || 0) + count[pair];
    }

    count = newCount;
}

const uniqueCount = [];
for(let pair in count){
    uniqueCount[pair[0]] = (uniqueCount[pair[0]] || 0) + count[pair];
}

uniqueCount[chain[chain.length - 1]]++;

console.log(uniqueCount);

const sorted = Object.values(uniqueCount).sort((a, b) => b - a);

console.log(sorted[0] - sorted[sorted.length - 1]);
