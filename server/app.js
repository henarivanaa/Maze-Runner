const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')

const cors = require('cors')

app.use(cors())
// app.use(routes)

const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(port, () => console.log(`listening on port *3000`))

const userList = []

io.on('connection', socket => {
  console.log('a user is connected')
  socket.on('newUser', user => {
    userList.push(user)
    console.log(`${user} has connected`)
    socket.broadcast.emit('new', userList)
  })

  socket.on('disconnect', data => {
    console.log(`a user is disconnected`)
    console.log(data)
  })
})
