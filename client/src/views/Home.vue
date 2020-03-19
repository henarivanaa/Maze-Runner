<template>
  <div>
    <h1>Welcome to Maze Runner Game</h1>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Input your username" v-model="username">
      <button type="submit">Enter</button>
    </form>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapActions } from 'vuex'
const socket = io('http://localhost:3000')

export default {
  name: 'Home',
  data() {
    return {
      username: ''
    }
  },
  methods: {
    ...mapActions(['register']),
    async onSubmit () {
      socket.emit('newUser', this.username)
      this.$router.push({ path: '/lobby' })
    },
  }
}
</script>

<style>

</style>