<template>
  <div class="card mb-5" style="width: 12rem;">
    <img src="https://ak0.picdn.net/shutterstock/videos/9417290/thumb/1.jpg" class="card-img-top" alt="Maze Room">
    <div class="card-body">
      <h5 class="card-title">Room {{ room.id }}</h5>
      <p class="card-text">Players:</p>
      <div class="ul mb-3">
        <div v-for="(player, index) in room.players" :key="index" class="li">{{ player }}</div>
      </div>
      <button class="btn btn-primary btn-block" @click="onJoin(room.id)">Join</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import io from 'socket.io-client'
const socket = io('https://enigmatic-escarpment-45133.herokuapp.com/')

export default {
  name: 'RoomCard',
  props: ['room'],
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