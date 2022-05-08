import express, { json, urlencoded } from 'express'
import { mongoConnect } from './util/db'
import { config } from 'dotenv'
import { Server } from 'socket.io'
import http from 'http'
import { authenticate, connectToSpace } from './controllers/sockets'
import { createNewSpace } from './controllers/connectCreate'

// load env vars
config()

const app = express()
app.use(json())
app.post('/createspace', createNewSpace)
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: '*'
  }
})

io.use(authenticate)

io.on('connection', (socket) => {
  console.log('Connected socket: ', socket.id, socket.handshake.auth.token.space)
  socket.on('connectToSpace', (data) => {
    connectToSpace(socket, data)
  })
  socket.on('syncState', (data) => {

  })
})
const port = process.env.PORT ?? '8000'
app.listen(port, () => {
  const onConnect = (message: string) => {
    console.log(message)
    console.log('Listening at: ', port)
  }
  mongoConnect(onConnect)
})
