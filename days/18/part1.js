let data = require('../../get_data')(18);

const EXPLODE_DEPTH = 4;

const nodes = data.split('\n').map(row => {
    const chars = [...row];
    let index = 0;

    function getNode(){
        if(chars[index].match(/\d/)){
            return {
                value: +chars[index++]
            };
        } else {
            index++; // Skip [
            const left = getNode(index);
            index++; // Skip ,
            const right = getNode(index);
            index++; // Skip ]

            const node = {
                left, right
            }

            left.parent = node;
            left.isLeft = true;
            right.parent = node;
            right.isLeft = false;

            return node;
        }
    }

    return getNode();
});

nodes.forEach(e => {
    while(reduce(e, 1)){
        console.log(print(e));
    }
});

function reduceSplit(node){
    const direction = node.isLeft ? 'left' : 'right';
    if(node.value >= 10){
        const newNode = {
            left: {
                value: Math.floor(node.value / 2),
                isLeft: true,
            },
            right: {
                value: Math.ceil(node.value / 2),
                isLeft: false,
            },
            isLeft: node.isLeft,
            parent: node.parent
        };

        newNode.left.parent = newNode;
        newNode.right.parent = newNode;
        
        node.parent[direction] = newNode;

        return true;
    }

    if(node.value !== undefined){
        return false;
    }

    return reduceSplit(node.left) || reduceSplit(node.right);
}

function reduceExplode(node, depth){
    const direction = node.isLeft ? 'left' : 'right';
    if(node.value !== undefined){
        return false;
    }

    if(depth > EXPLODE_DEPTH && node.value === undefined){
        let current = node;

        while(current && current.isLeft){
            current = current.parent;
        }

        current = current && current.parent ? current.parent[current.isLeft ? 'right' : 'left'] : undefined;

        while(current && current.value === undefined){
            current = current.right;
        }

        if(current){
            current.value += node.left.value;
        }

        current = node;

        while(current && !current.isLeft){
            current = current.parent;
        }

        current = current && current.parent ? current.parent[current.isLeft ? 'right' : 'left'] : undefined;

        while(current && current.value === undefined){
            current = current.left;
        }

        if(current){
            current.value += node.right.value;
        }

        node.parent[direction] = {
            value: 0,
            parent: node.parent,
            isLeft: node.isLeft
        };
    
        return true;
    }

    return reduceExplode(node.left, depth + 1) || reduceExplode(node.right, depth + 1)
}

function reduce(node, depth){
    return reduceExplode(node, depth) || reduceSplit(node);
}

function add(leftNode, rightNode){
    leftNode.isLeft = true;
    rightNode.isLeft = false;

    const node = {
        left: leftNode,
        right: rightNode
    };

    leftNode.parent = node;
    rightNode.parent = node;

    return node;
}

let finale = nodes.reduce((a, b) => {
    while(reduce(a, 1));
    while(reduce(b, 1));

    return add(a, b);
});

while(reduce(finale, 1));

function getMagnitude(node){
    if(node.value !== undefined){
        return node.value;
    }

    return getMagnitude(node.left) * 3 + getMagnitude(node.right) * 2;
}

const result = getMagnitude(finale);

console.log(result);

function print(node){
    if(node.value !== undefined){
        return node.value;
    }

    return `[${print(node.left)},${print(node.right)}]`;
}