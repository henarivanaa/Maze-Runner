<template>
  <div>
    <h1>Welcome to lobby</h1>
    <div v-for="(player, index) in getPlayer" :key="index">
      {{ player }}
    </div>
    <div v-for="room in getRoomList" :key="room.id">
      <h1>room {{ room.id }}</h1>
      <div v-for="(player, index) in room.players" :key="index">
        <h3>{{player}}</h3>
      </div>
      <button @click="onJoin(room.id)" >Join</button>
    </div>
    <button @click="onCreate" >Create Room</button>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapActions, mapGetters } from 'vuex'

const socket = io('http://localhost:3000')

export default {
  name: 'Lobby',
  created() {
    if (!this.getCurrentPlayer) {
      this.$router.push({ path: '/' })
    }
    socket.emit('newRoom')
    socket.emit('newUser')

    socket.on('room', roomList => {
      this.setRoom(roomList)
    })

    socket.on('user', userList => {
      this.setPlayer(userList)
    })
  },
  computed: mapGetters(['getPlayer', 'getRoomList', 'getCurrentPlayer']),
  methods: {
    ...mapActions(['setPlayer', 'setRoom', 'setCurrentRoom', 'setCurrentRole']),
    onCreate() {
      const room = {
        id: this.getRoomList.length + 1,
        players: [this.getCurrentPlayer]
      }
      socket.emit('newRoom', room)
      this.setCurrentRoom(room.id)
      this.setCurrentRole('host')
      this.$router.push({ path: `/room/${room.id}` })
    },
    onJoin(roomId) {
      socket.emit('joinRoom', { id: roomId, name: this.getCurrentPlayer })
      this.setCurrentRoom(roomId)
      this.setCurrentRole('visitor')
      this.$router.push({ path: `/room/${roomId}` })
    }
  }
}
</script>

<style>

</style>
