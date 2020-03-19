<template>
  <div>
    {{getCurrentRoom}}
    <div v-for="(user, index) in userJoined" :key="index">
      <h4>{{user}}</h4>
    </div>
    <form @submit.prevent="send" >
      <input type="text" v-model="message">
      <button type="submit">Send</button>
    </form>
    <h1>{{display}}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import io from 'socket.io-client'
const socket = io('http://localhost:3000')

export default {
  name: 'Room',
  created() {
    socket.emit('join', this.getCurrentRoom)

    socket.on('message', message => {
      console.log(message)
      this.display = message
    })
  },
  computed: mapGetters(['getCurrentPlayer', 'getRoomList', 'getCurrentRoom']),
  data() {
    return {
      message: '',
      display: '',
      userJoined: []
    }
  },
  methods: {
    send() {
      this.display = this.message
      socket.emit('send-message', { id: this.getCurrentRoom, message: this.message })
    }
  }
}
</script>

<style>

</style>