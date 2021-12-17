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

function sumVersions(packet){
    return packet.version + packet.subPackets.map(sumVersions).reduce((a, b) => a + b, 0);
}

const {packet} = parse(0);

const result = sumVersions(packet);

console.log(result);
