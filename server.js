const dotenv = require('dotenv').config();
const server = require('http').createServer();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { read } = require('fs');
const PORT = process.env.PORT || 3000;
const io = require("socket.io")(server, {
    cors: {
        origin: '*',
    }
});

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(morgan("combined"));

server.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT} ...`)
});

let readyPlayerCount = 0;

io.on('connection',(socket)=>{
    console.log(`The user connected ${socket.id}`);

    socket.on('ready', () => {
        console.log('player ready', socket.id);
        readyPlayerCount ++;
        if(readyPlayerCount == 2) {
            io.emit('start', socket.id); // the seconde parameter is the referee player and in this case he is the second player
        } 
    })
});

