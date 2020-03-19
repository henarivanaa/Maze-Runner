<template>
  <div>
    <h1>Home</h1>
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
  created() {
    socket.emit('lobby')
  },
  data() {
    return {
      username: ''
    }
  },
  methods: {
    ...mapActions(['register']),
    async onSubmit () {
      await this.register(this.username)
      socket.emit('newUser', this.username)
    },
  }
}
</script>

<style>

</style>