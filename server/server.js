const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { emit } = require('process');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:"http://127.0.0.1:5500"
    }
});

app.use(cors())

app.get("/",(req, res) =>{
    res.send("App tiempo real socket.io");
});

io.on('connection', (socket) => {
    console.log("User connected: ", socket.id);
    io.emit("bienvenido", {"mensaje":"Alguien se ha conectado"})
});



server.listen(3000, () => {
    console.log("Server on port: 3000");
});