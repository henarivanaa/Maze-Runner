<template>
  <div class="card mb-5" style="width: 12rem;">
    <img src="https://ak0.picdn.net/shutterstock/videos/9417290/thumb/1.jpg" class="card-img-top" alt="Maze Room">
    <div class="card-body">
      <h5 class="card-title">Room {{ room.id }}</h5>
      <p class="card-text">Players:</p>
      <div class="ul">
        <div v-for="(player, index) in room.players" :key="index" class="li">{{ player }}</div>
      </div>
      <button class="btn btn-primary btn-block" @click="onJoin()">Join</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import io from 'socket.io-client'
// const socket = io('http://localhost:3000')

export default {
  name: 'RoomCard',
  props: ['room'],
  methods: {
    ...mapGetters(['getCurrentPlayer']),
    ...mapActions(['joinRoom']),
    async onJoin () {
      this.$store.getters.getOneRoom(this.room.id).players.push(this.getCurrentPlayer)
      // console.log(this.$store.getters.getOneRoom(this.room.id).players)
      // console.log(this.getCurrentPlayer())
      // this.joinRoom()
      // socket.emit('')
      this.$router.push({ path: '/room' })
    },
  }
}
</script>

<style>

</style>