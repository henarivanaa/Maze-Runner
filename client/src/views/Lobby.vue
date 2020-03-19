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
    socket.on('room', roomList => {
      this.setRoom(roomList)
    })

    socket.on('user', userList => {
      this.setPlayer(userList)
    })
  },
  computed: mapGetters(['getPlayer', 'getRoomList', 'getCurrentPlayer']),
  methods: {
    ...mapActions(['setPlayer', 'setRoom']),
    onCreate() {
      const room = {
        id: this.getRoomList.length + 1,
        players: [this.getCurrentPlayer]
      }
      socket.emit('newRoom', room)
    }
  }
}
</script>

<style>

</style>