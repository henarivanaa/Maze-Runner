<template>
  <div>
    <h1>Welcome to lobby</h1>
    <div v-for="(player, index) in getPlayer" :key="index">
      {{ player }}
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapActions, mapGetters } from 'vuex'

const socket = io('http://localhost:3000')

export default {
  name: 'Lobby',
  created() {
    socket.on('new', userList => {
      this.register(userList)
    })
  },
  computed: mapGetters(['getPlayer']),
  methods: {
    ...mapActions(['register'])
  }
}
</script>

<style>

</style>