<template>
  <div>
    <div class="h2 my-5 text-center">Room</div>

    <div class="container">
      <div class="row">
        <div class="col-4">
          <img src="https://ak0.picdn.net/shutterstock/videos/9417290/thumb/1.jpg" class="w-100">
          <div class="h3 my-3">Room {{ getCurrentRoom }}</div>
          <p>Owner: {{ userJoined[0] }}</p>
        </div>
        <div class="col-4">
          <div class="h3">Users Joined:</div>
          <ul class="list-group">
            <li class="list-group-item" v-for="(user, index) in userJoined" :key="index">{{ user }}</li>
          </ul>
          <button v-if="start" class="btn btn-success btn-block my-3" @click="a">Play</button>
        </div>
      <div class="col-4">
        <div class="h3">Broadcast Message</div>
    <form @submit.prevent="send" >
      <input type="text" v-model="message">
      <button class="btn btn-primary " type="submit">Send</button>
    </form>
    <h2>{{display}}</h2>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import maze from '../helpers/maze';
import io from 'socket.io-client';
const socket = io('http://localhost:3000')

export default {
  name: 'Room',
  created() {
    socket.emit('join', this.getCurrentRoom)
    if (this.getCurrentRole === 'host') {
      this.isHost = true
    }
    socket.on('join', data => {
      this.userJoined = data.players
      if (this.userJoined.length === 3 && this.getCurrentRole === 'host') {
        this.start = true
      }
    })
    socket.on('message', message => {
      this.display = message
    })
    socket.on('get-maze',maze=>{
      console.log('Get Maze',maze);
      this.setMaze(maze);
      var idPos=Math.floor(Math.random()*3);
      var url='/game/'+idPos;
      this.$router.push(url);
    })
  },
  computed: mapGetters(['getCurrentPlayer', 'getRoomList', 'getCurrentRoom', 'getCurrentRole']),
  data() {
    return {
      message: '',
      display: '',
      userJoined: [],
      isHost: false,
      start: false
    }
  },
  methods: {
    ...mapActions(['setMaze']),
    send() {
      this.display = this.message
      socket.emit('send-message', { id: this.getCurrentRoom, message: this.message })
    },
    a(){
      var _maze=maze.make();
     
      var obj={
        maze:_maze,
        id:this.getCurrentRoom
      }
      socket.emit('send-maze',obj);
      console.log('Send Maze',_maze);

      this.setMaze(_maze);
      var idPos=Math.floor(Math.random()*3);
      var url='/game/'+idPos;
      this.$router.push(url);
    }
  }
}
</script>

<style>

</style>