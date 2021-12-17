let data = require('../../get_data')(16);

let binary = data.match(/.{1}/g).map(e => parseInt(e, 16).toString(2).padStart(4, '0')).join('');

const lengthTypeMap = {
    '0': 15,
    '1': 11
}

function parse(index){
    function read(count){
        return parseInt(binary.slice(index, index += count), 2)
    }

    const version = read(3);
    const typeId = read(3);

    const packet = {version, typeId, subPackets: []}

    if(typeId == 4){
        let valueString = '';
        while(binary[index] == '1'){
            valueString += binary.slice(index + 1, index += 5);
        }

        valueString += binary.slice(index + 1, index += 5);

        packet.value = parseInt(valueString, 2);

        return {packet, index};
    }

    const lengthType = binary[index++];
    const length = lengthTypeMap[lengthType];
    const lengthValue = read(length);

    if(lengthType == '0'){
        const desiredIndex = index + lengthValue;
        while(index != desiredIndex){
            const result = parse(index);
            index = result.index;
            packet.subPackets.push(result.packet);
        }
    } else {
        for(let i = 0; i < lengthValue && index < binary.length; i++){
            const result = parse(index);
            index = result.index;
            packet.subPackets.push(result.packet);
        }
    }

    return {packet, index};
}

const operation = {
    0: (packets) => packets.map(getValue).reduce((a, b) => a + b, 0),
    1: (packets) => packets.map(getValue).reduce((a, b) => a * b, 1),
    2: (packets) => Math.min(...packets.map(getValue)),
    3: (packets) => Math.max(...packets.map(getValue)),
    5: (packets) => {
        const values = packets.map(getValue);

        return values[0] > values[1] ? 1 : 0;
    },
    6: (packets) => {
        const values = packets.map(getValue);

        return values[0] < values[1] ? 1 : 0;
    },
    7: (packets) => {
        const values = packets.map(getValue);

        return values[0] == values[1] ? 1 : 0;
    },
}

function getValue(packet){
    if(packet.typeId == 4){
        return packet.value;
    }

    return operation[packet.typeId](packet.subPackets);
}

const {packet} = parse(0);

const result = getValue(packet);

console.log(result);
