const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);

const { Server } = require('socket.io');

const io = new Server(server);

app.use(express.static(`${__dirname}/assets`));

const getAvatar = () => {
    const number = Math.floor(Math.random() * 10) + 1;
    return number;
};

const users = [];
const onlineUsers = [];
const messages = [];

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
        if (onlineUsers[socket.id]) {
            onlineUsers[socket.id].status = 'Offline';
            onlineUsers[socket.id].joinDate = Date.now();
            delete onlineUsers[socket.id];
            io.emit('display users', users);
        } else {
            socket.emit('error', 'Sorry, there seems to be an issue with the connection!');
        }
    });
});

io.on('connection', (socket) => {
    socket.on('new user', (userName) => {
        const result = users.findIndex((item) => item.userName === userName);
        if (result === -1) {
            const status = 'Online';
            const avatar = getAvatar();
            const joinDate = Date.now();
            const messageCount = 0;
            onlineUsers[socket.id] = {
                userName, avatar, status, joinDate, messageCount,
            };
            users.push(onlineUsers[socket.id]);
            io.emit('display users', users);
            socket.broadcast.emit('joining user', onlineUsers[socket.id]);
            socket.emit('get my info', onlineUsers[socket.id]);
        } else if (users[result].status === 'Offline') {
            users[result].status = 'Online';
            users[result].joinDate = Date.now();
            onlineUsers[socket.id] = users[result];
            io.emit('display users', users);
            socket.emit('get my info', users[result]);
        } else {
            socket.emit('error', `${userName} username is taken! Try some other username.`);
        }
        socket.emit('display users', users);
        socket.emit('display messages', messages);
        console.log(users);
        console.log(onlineUsers);
        console.log(messages);
    });
    socket.on('typing', (data) => {
        socket.broadcast.emit('add typing', data);
    });
    socket.on('chat message', (data) => {
        messages.push(data);
        socket.broadcast.emit('other message', data);
        if (onlineUsers[socket.id]) {
            onlineUsers[socket.id].messageCount += 1;
            socket.emit('my message', data);
            socket.emit('get my info', onlineUsers[socket.id]);
            io.emit('display users', users);
        } else {
            socket.emit('error', 'Sorry, there seems to be an issue with the connection!');
        }
        console.log(`message from ${data.name}: ${data.msg}`);
        console.log(messages);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
