import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { Key, keyboard, sleep } from '@nut-tree-fork/nut-js'
import { type, pressKey, releaseKey } from './control.js'

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server)

const keysInUse = {

}

io.on('connection', (socket) => {
    // console.log('se contecto un usuario')

    // socket.on('disconnect', () => {
    //     console.log('el usuario se desconecto')
    // })
    socket.on('touchstart', (msg) => {
        let v = msg;
        if (v.length <= 1) v = msg.toUpperCase();
        // console.log("inicio: " + v)
        if (!keysInUse[v]) pressKey(Key[v]);
        keysInUse[v] = true;
        // keysInUse[v] = true;
    })
    socket.on('touchend', (msg) => {
        let v = msg;
        if (v.length <= 1) v = msg.toUpperCase();
        // console.log("termino: " + v)
        if (keysInUse[v]) releaseKey(Key[v]);
        keysInUse[v] = false;
    })
})

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html')
});
app.get('/player2', (req, res) => {
    res.sendFile(process.cwd() + '/client/index2.html')
});
app.get('/aux', (req, res) => {
    res.sendFile(process.cwd() + '/client/index3.html')
});
app.get('/btn1', (req, res) => {
    res.sendFile(process.cwd() + '/client/btn1.html')
});
app.get('/btn2', (req, res) => {
    res.sendFile(process.cwd() + '/client/btn2.html')
});
app.get('/btn3', (req, res) => {
    res.sendFile(process.cwd() + '/client/btn3.html')
});

server.listen(port, () => {
    console.log("corriendo en el puerto " + port)
});