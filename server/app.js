const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const io = require('socket.io')(server)

const cors = require('cors')

app.use(cors())

const server = require('http').Server(app)

server.listen(port, () => console.log(`listening on port *3000`))

io.on('connection', socket => {
  console.log('a user is connected')
})
