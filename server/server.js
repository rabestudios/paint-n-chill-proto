require('dotenv').config(); // load .env conf
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

const corsOptions = require('./src/utils/cors.options');

const db = require('./src/database')();

const { joinRoom, leaveRoom } = require('./src/socket');

const app = express();

// middleware setup
app.use(cors(corsOptions));

const server = http.createServer(app);
const options = {
    cors: true,
    origins: ["*:*"]
}
const io = socketIO(server, options);

io.use((socket, next) => {
    const handshakeData = socket.request;
    const query = handshakeData._query;
    const playerInfo = {
        displayName: query.displayName
    };
    socket.playerInfo = playerInfo;
    next();
});

io.on('connection', socket => {
    console.log('user connected', socket.id, socket.playerInfo);
    const existingSocket = db.getUser(socket.id);

    if (!existingSocket) {
        db.addUser(socket.playerInfo, socket);
        const activeSockets = db.getUsers();
        const user = db.getUser(socket.id);
        const users = activeSockets.filter(sock => sock.id !== socket.id);
        const rooms = db.getRooms();
        socket.emit('update-user-list', {users});
        socket.emit('update-room-list', {rooms});
        socket.broadcast.emit('update-user-list', {
            users: [user]
        });
    }

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
        const rooms = db.getRooms();
        // disconnect from room
        for (const room of rooms) {
            const playerIdx = room.players.findIndex(p => p.id === socket.id);
            if (playerIdx !== -1) {
                const host = db.removePlayerFromRoom(room.code, socket.id);
                if (!host) {
                    socket.broadcast.emit('remove-room', {roomCode: room.code});
                } else {
                    socket.broadcast.emit('update-room-list', {rooms});
                }
                break;
            }
        }
        db.disconnectUser(socket.id);
        socket.broadcast.emit('disconnect-user', {
            socketId: socket.id
        });
    });

});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Listening too port ${PORT}`));
