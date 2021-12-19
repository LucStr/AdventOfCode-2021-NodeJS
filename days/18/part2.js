let data = require('../../get_data')(18);

const EXPLODE_DEPTH = 4;

const calcs = data.split('\n');

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

function parseNode(calc){
    const chars = [...calc];
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
}

function getMagnitude(node){
    if(node.value !== undefined){
        return node.value;
    }

    return getMagnitude(node.left) * 3 + getMagnitude(node.right) * 2;
}

let max = 0;

for(var i = 0; i < calcs.length; i++){
    for(var j = 0; j < calcs.length; j++){
        if(i === j){
            continue;
        }

        const node = add(parseNode(calcs[i]), parseNode(calcs[j]));
        
        while(reduce(node, 1));

        const result = getMagnitude(node);
        if(result > max){
            max = result;
        }
    }
}

const result = max;

console.log(result);