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

    socket.on('host-room', (data) => {
       const { hostId } = data;
       console.log('user started hosting a game', hostId);
       const newRoom = db.createRoom(hostId);
       const rooms = db.getRooms();
       const user = db.getUser(hostId);
       joinRoom(socket, newRoom, user);
       socket.emit('update-room-list', { rooms });
       socket.broadcast.emit('update-room-list', {
           rooms: [newRoom]
       });
    });

    socket.on('join-room', (data) => {
       const { playerId, roomCode, playerInfo } = data;
       const user = db.setUserInfo(playerId, playerInfo);
       if (user) {
           const res = db.addPlayerToRoom(roomCode, playerId);
           if (res) {
               const { newDetails, room } = res;
               const updatedUser = db.setUserInfo(playerId, newDetails);
               if (updatedUser) {
                   joinRoom(socket, room, updatedUser);
               }
           }
       }
    });

    socket.on('leave-room', (data) => {
       const { roomCode, playerId } = data;
       const host = db.removePlayerFromRoom(roomCode, socket.id);
       const user = db.getUser(playerId);
       leaveRoom(socket, roomCode, user, host);
    });

    socket.on('draw', (data) => {
        const { roomCode, event } = data;
        console.log(`(${roomCode}) new drawing event:`, event.id);
        const newStack = db.pushToRoomDrawStack(roomCode, event);
        if (newStack) {
            socket.emit("update-room-draw-stack", {
                drawStack: newStack
            });
            socket.broadcast.to(roomCode).emit("update-room-draw-stack", {
                drawStack: newStack
            });
        }
    })
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Listening too port ${PORT}`));
