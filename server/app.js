const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const cors = require('cors')

app.use(cors())

const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(port, () => console.log(`listening on port *3000`))


io.on('connection', socket => {
  console.log('a user is connected')
  socket.on('lobby', () => {
    console.log('Insert Name Please')
  })
  socket.on('newUser', user => {
    console.log(`${user} has connected`)
  })
})

io.on('disconnect', socket => {
  console.log('a user disconnected');
})
