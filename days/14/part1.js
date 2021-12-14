let data = require('../../get_data')(14);

const split = data.split('\n\n');

const chain = [...split[0]].map(e => {
    return {
        element: e
    }
}).map((e, i, a) => {
    e.next = a[i + 1];
    
    return e;
});

const rules = split[1].split('\n').map(e => {
    const [_, first, second, out] = e.match(/(\w)(\w) -> (\w)/);

    return {
        first, second, out
    }
})

let state = '';

for(var i = 0; i < 10; i++){
    let current = chain[0];
    state = '';

    while(current.next){
        state += current.element;
        const next = current.next;
    
        const {out} = rules.find(e => e.first === current.element && e.second === next.element);
    
        if(out){
            state += out;
            current.next = {
                element: out,
                next: next
            }
        }
    
        current = next;
    }

    state += current.element;
}

const sorted = [...state].reduce((a, b) => {
    if(!a[b]){
        a[b] = 0;
    }

    a[b]++;

    return a;
}, {});

const counts = Object.values(sorted).sort((a, b) => a - b);

const result = counts[counts.length - 1] - counts[0];

console.log(result);
