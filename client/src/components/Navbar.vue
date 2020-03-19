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

const socket = io('http://localhost:3000')

export default {
  name: 'Navbar',
  computed: mapGetters(['getPlayer', 'getRoomList', 'getCurrentPlayer']),
  methods: {
    ...mapActions(['setPlayer', 'setRoom']),
    onCreate() {
      const room = {
        id: this.getRoomList.length + 1,
        players: [this.getCurrentPlayer]
      }
      socket.emit('newRoom', room)
    },
    logout() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>

</style>