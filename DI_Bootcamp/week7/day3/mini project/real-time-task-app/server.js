const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// Store active users: { socketId: { username, room } }
const users = {};

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room);
        
        users[socket.id] = { username, room };

        // Welcome current user
        socket.emit('message', { user: 'System', text: `Welcome to the ${room} room, ${username}!` });

        // Broadcast to others when a user connects
        socket.to(room).emit('message', { user: 'System', text: `${username} has joined the chat.` });

        // Update user list in the room
        io.to(room).emit('roomData', {
            room: room,
            users: Object.values(users).filter(u => u.room === room)
        });
    });

    socket.on('chatMessage', (msg) => {
        const user = users[socket.id];
        if (user) {
            io.to(user.room).emit('message', { user: user.username, text: msg });
        }
    });

    socket.on('disconnect', () => {
        const user = users[socket.id];
        if (user) {
            io.to(user.room).emit('message', { user: 'System', text: `${user.username} has left.` });
            delete users[socket.id];
            
            // Refresh user list for remaining users
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: Object.values(users).filter(u => u.room === user.room)
            });
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Chat server running on http://localhost:${PORT}`));