const { Socket } = require('dgram');
const experss = require('express');
const app = experss();
const http = require('http').createServer(app)
const io = require('socket.io')(http)


app.use(experss.static('./public'))

app.use('/', (req, res) => {
    res.redirect('/index.html');
})
var roomno = 1;
var playerno = 0;
var players = {};
io.on("connection", (socket) => {
    console.log('A user is connected');
    if (io.nsps['/'].adapter.rooms["room-" + roomno] && io.nsps['/'].adapter.rooms["room-" + roomno].length > 1) roomno++;
    socket.join("room-" + roomno);

    playerno = (playerno % 2) + 1;
    players[socket.id] = {
        rotation: 0,
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        playerId: socket.id,
        team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
    };

    socket.on('disconnect', function () {
        console.log('user disconnected');
        // remove this player from our players object
        delete players[socket.id];
        // emit a message to all players to remove this player
        io.emit('disconnect', socket.id);
    });

    socket.emit('currentPlayers', players);
    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);


    io.sockets.in("room-" + roomno).emit('connectToRoom', "You are in room no. " + roomno);
    
    // when a player moves, update the player data
    socket.on('playerMovement', function (movementData) {
        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;
        players[socket.id].rotation = movementData.rotation;
        // emit a message to all players about the player that moved
        socket.broadcast.emit('playerMoved', players[socket.id]);
    });

    socket.on('fire-missile', function (movementData) {
        socket.broadcast.emit('missile-fired', players[socket.id]);
    });
})


http.listen('5000', () => { console.log('Running on port 5000') });