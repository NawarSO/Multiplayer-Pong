let readyPlayerCount = 0;

function listen(io) {
    io.on('connection',(socket)=>{
        console.log(`The user connected ${socket.id}`);

        socket.on('ready', () => {
            console.log('player ready', socket.id);
            readyPlayerCount ++;
            if(readyPlayerCount % 2 == 0) {
                io.emit('start', socket.id); // the seconde parameter is the referee player and in this case he is the second player
            } 
        });
        socket.on('paddleMove', (paddleData) => {
            socket.broadcast.emit('paddleMove', paddleData);
        })
        socket.on('ballMove', (ballData) => {
            socket.broadcast.emit('ballMove',ballData)
        });
        socket.on('disconnect', (reason) => {
            console.log(`Client ${socket.id} disconnected for ${reason} `);
        });
    });
}

module.exports = {
    listen,
}