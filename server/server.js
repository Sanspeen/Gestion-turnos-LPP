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


listOfUsers = [];

//Listeners
io.on('connection', (socket) => {
    console.log("User connected: ", socket.id);
    socket.emit("data-turnos", listOfUsers)

    socket.on("agregar-turno", (data) => {
        listOfUsers.push(data);
        io.emit("data-turnos", listOfUsers)
    })

    socket.on("actualizar-turno", (turno)=>{
        let indexTurno = listOfUsers.findIndex(x=>x.id===turno.id);
        listOfUsers.splice(indexTurno, 1, turno)
        io.emit("data-turnos", listOfUsers)
    });

    socket.on("reiniciar", (vacio) =>{
        listOfUsers = vacio;
        io.emit("data-turnos", listOfUsers)
    });
});

server.listen(3000, () => {
    console.log("Server on port: 3000");
});