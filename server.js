const dotenv = require('dotenv').config();
const http = require('http')
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const io = require('socket.io');
const sockets = require('./sockets');

const apiServer = require('./api');
const httpServer = http.createServer(apiServer);

const socketServer = io(httpServer, {
    cors: {
        origin: '*',
    }
});

httpServer.listen(PORT,()=>{
    console.log(`The server running on http://localhost:${PORT}`);
});

sockets.listen(socketServer);