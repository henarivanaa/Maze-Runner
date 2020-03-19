<template>
  <div class="card mb-5" style="width: 12rem;">
    <img src="https://ak0.picdn.net/shutterstock/videos/9417290/thumb/1.jpg" class="card-img-top" alt="Maze Room">
    <div class="card-body">
      <h5 class="card-title">Room {{ room.id }}</h5>
      <p class="card-text">Players:</p>
      <div class="ul">
        <div v-for="(player, index) in room.players" :key="index" class="li">{{ player.name }}</div>
      </div>
      <button class="btn btn-primary btn-block" @click="onJoin(room.id)">Join</button>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  name: 'RoomCard',
  props: ['room'],
  methods: {
    ...mapActions(['joinRoom']),
    async onJoin () {
      this.joinRoom(this.username)
      socket.emit('newUser', this.username)
      socket.emit('newRoom')
      this.$router.push({ path: '/lobby' })
    },
    gotoRoom(roomId) {
      this.$router.push('/room/'+roomId)
    }
  }
}
</script>

<style>

</style>