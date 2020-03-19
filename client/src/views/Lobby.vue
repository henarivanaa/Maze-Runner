<template>
  <div>
    <!-- <h1>Welcome to lobby</h1> -->
    <div class="h2 my-5 text-center">Join A Room or Create A New One</div>
    <p class="text-center">Online Players:</p>
    <div class="container d-flex flex-row flex-wrap justify-content-center align-items-start mb-5">
      <button v-for="(player, index) in getPlayer" :key="index" class="btn btn-sm btn-success btn-disabled mx-1">
        {{ player }}
      </button>
    </div>
    <!-- <div v-for="room in getRoomList" :key="room.id">
      <h1>room {{ room.id }}</h1>
      <div v-for="(player, index) in room.players" :key="index">
        <h3>{{player}}</h3>
      </div>
    </div> -->
    <div class="container d-flex flex-row flex-wrap justify-content-around align-items-start mb-5">
      <RoomCard v-for="room in getRoomList" :key="room.id" :room="room" />
    </div>
    <!-- <button @click="onCreate" >Create Room</button> -->
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapActions, mapGetters } from 'vuex'
import RoomCard from '../components/RoomCard.vue'

const socket = io('http://localhost:3000')

export default {
  name: 'Lobby',
  components: {
    RoomCard
  },
  created() {
    socket.on('room', roomList => {
      this.setRoom(roomList)
    })

    socket.on('user', userList => {
      this.setPlayer(userList)
    })

    this.getRoomList.sort((a,b) => a - b)
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