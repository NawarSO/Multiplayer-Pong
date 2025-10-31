let readyPlayerCount = 0;

function listen(io) {
    const pongNameSpace = io.of('/pong');
    pongNameSpace.on('connection',(socket)=>{
        let room;
        console.log(`The user connected ${socket.id}`);

        socket.on('ready', () => {
            room = 'room' + Math.floor(readyPlayerCount / 2);
            socket.join(room);
            readyPlayerCount ++;
            if(readyPlayerCount % 2 == 0) {
                pongNameSpace.in(room).emit('start', socket.id); // the seconde parameter is the referee player and in this case he is the second player
            }
            console.log('player ready', socket.id, room);
        });
        socket.on('paddleMove', (paddleData) => {
            socket.to(room).emit('paddleMove', paddleData);
        })
        socket.on('ballMove', (ballData) => {
            socket.to(room).emit('ballMove',ballData)
        });
        socket.on('disconnect', (reason) => {
            console.log(`Client ${socket.id} disconnected for ${reason} `);
            socket.leave(room);
        });
    });
}

module.exports = {
    listen,
}