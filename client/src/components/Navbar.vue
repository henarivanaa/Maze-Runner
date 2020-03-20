<template>
  <nav class="navbar navbar-light shadow-border mb-3 shadow">
      <form class="form-inline">
        <button v-if="this.$route.path!='/'" @click="logout" type="button" class="btn btn-outline-danger btn-lg">◀ Logout</button>
      </form>

      <div class="h1">Maze Runner</div>
      <form class="form-inline">
        <button v-if="this.$route.path!='/'" @click="onCreate" type="button" class="btn btn-outline-success btn-lg">✚ New</button>
      </form>
    </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import io from 'socket.io-client'

const socket = io('https://enigmatic-escarpment-45133.herokuapp.com/')

export default {
  name: 'Navbar',
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
    logout() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>

</style>