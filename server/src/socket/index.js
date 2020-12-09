const joinRoom = (socket, room, user) => {
    socket.join(room.code);
    console.log(`socket (${socket.id}) joined room (${room.code})`);
    socket.broadcast.emit('update-user-list', { users: [user] })
    socket.emit('set-connection', { isConnected: true, room, playerInfo: user.playerInfo });
    socket.broadcast.to(room.code).emit('room-connect', {
        player: user
    });
    socket.broadcast.emit('update-room-list', { rooms: [room] });
    socket.emit('update-room-list', {rooms: [room]});
};

const leaveRoom = (socket, roomCode, player, host) => {
    console.log(`socket(${socket.id}) left the room(${roomCode})`);
    socket.leave(roomCode);
    const roomsCount = socket.rooms.size;
    console.log(`socket room count: ${roomsCount}`);
    socket.broadcast.to(roomCode).emit('room-disconnect', {
        playerId: player.id,
        host: host
    });
    if (host === undefined) {
        socket.broadcast.emit('remove-room', { roomCode });
        socket.emit('remove-room', {roomCode});
    }
    socket.broadcast.emit('update-user-list', { users: [player] })
};


module.exports = {
    joinRoom,
    leaveRoom
}
