const express = require('express')
const app = express()
const port = process.env.PORT || 3000
// const routes = require('./routes')

const cors = require('cors')

app.use(cors())
// app.use(routes)

const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(port, () => console.log(`listening on port *3000`))

const userList = {}
const identifier = []
const roomList = []

io.on('connection', socket => {
  console.log('a user is connected')

  socket.on('newUser', user => {
    if (user) {
      userList[socket.id] = user
      console.log(`${user} has connected`)
      socket.broadcast.emit('user', userList)
    } else {
      io.emit('user', userList)
    }
  })

  socket.on('newRoom', room => {
    if (room) {
      roomList.push(room)
      io.emit('room', roomList)
    } else {
      io.emit('room', roomList)
    }
  })

  socket.on('joinRoom', object => {
    roomList.forEach(room => {
      if (room.id === object.id) {
        room.players.push(object.name)
      }
    })
    io.emit('room', roomList)
  })
  
  socket.on('join', id => {
    socket.join(id)
    let room = roomList.filter(room => room.id === id)[0]
    io.to(id).emit('join', room)
  })

  socket.on('send-message', room => {
    socket.to(room.id).broadcast.emit('message', room.message)
  })

  socket.on('disconnect', data => {
    delete userList[socket.id]
    socket.broadcast.emit('user', userList)
  })
})