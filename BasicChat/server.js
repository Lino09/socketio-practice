const express = require('express')
const socketio = require('socket.io')

const app = express();

app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(9000, () => console.log('Running on 9000'))
const io = socketio(expressServer)

io.on('connection', (socket) => {
  socket.emit('baseMsg', {data: 'Connected to root'})
  socket.on('chatMsgFromClient', (dataFromClient) => {
    io.emit('setMessage', {data:dataFromClient.data, user:dataFromClient.client});
  })
})

io.of('/admin').on('connection', (socket) => {
  socket.emit('adminMsg', {data: 'Connection on admin'})
  // socket.on('chatMsgFromClient', (dataFromClient) => {
  //   io.emit('setMessage', {data:dataFromClient.data, user:dataFromClient.client});
  // })
})