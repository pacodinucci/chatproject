import express from "express";
import http from 'http';
import { Server as SocketServer } from "socket.io";
import { resolve } from 'path';
import { PORT } from './config.js';
import morgan from 'morgan';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

app.use(morgan('dev'));
app.use(express.static(resolve('client/dist')))

io.on('connection', socket => {
    console.log(socket.id);

    socket.on('message', (body) => {
        console.log(body);
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(6)
        });
    })
})


server.listen(PORT);
console.log('server on port', PORT)
