const dotenv = require('dotenv').config();
const server = require('http').createServer();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
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

io.on('connection',(socket)=>{
    console.log(`The user connected`);
});


