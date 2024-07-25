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
    const values = {
        u: Key.W,
        l: Key.A,
        d: Key.S,
        r: Key.D,
        select: Key.Z,
        start: Key.F,
        a: Key.C,
        b: Key.X
    }

    socket.on('dir', (msg) => {
        console.log(msg)
        // moverMouse(msg)
    })
    socket.on('type', (msg) => {
        const v = msg.toLowerCase();
        console.log("k: " + v)
        type(values[v]);
    })
    socket.on('touchstart', (msg) => {
        const v = msg.toLowerCase();
        console.log("inicio: " + v)
        pressKey(values[v]);
        // keysInUse[v] = true;
    })
    socket.on('touchend', (msg) => {
        const v = msg.toLowerCase();
        console.log("termino: " + v)
        // releaseKey(values[v]);
    })
})

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html')
});

server.listen(port, () => {
    console.log("corriendo en el puerto " + port)
});