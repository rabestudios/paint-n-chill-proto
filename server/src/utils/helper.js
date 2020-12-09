const { ROOM_CODE_LENGTH } = require('./constants');

const generateCode = () => {
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890';
    const chars = [];
    while (chars.length < ROOM_CODE_LENGTH) {
        const randomIdx = Math.random() * str.length;
        chars.push(str.charAt(randomIdx));
    }
    return chars.join('');
}

const getUniqueName = (room, player) => {
    const displayName = player.playerInfo.displayName;
    let newName = displayName;
    let count = 1;
    while(room.players.some(p => p.playerInfo.displayName === newName)) {
        newName = `${displayName} ${count}`;
        count++;
    }
    return newName;
}

const getPlayerDetailsForRoom = (room, player) => {
    const displayName = getUniqueName(room, player);
    return {
        displayName,
    };
}

module.exports = {
    generateCode,
    getPlayerDetailsForRoom
}
