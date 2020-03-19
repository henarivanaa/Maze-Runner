<template>
  <div :id="room.id" class="card mb-5" style="width: 12rem;">
    <img src="https://ak0.picdn.net/shutterstock/videos/9417290/thumb/1.jpg" class="card-img-top" alt="Maze Room">
    <div class="card-body">
      <h5 class="card-title">{{ room.name }}</h5>
      <p class="card-text">Owner: {{ owner.name }}<br>Participants: {{ participantList.length }}</p>
      <p class="card-text"></p>
      <button class="btn btn-primary btn-block" @click="gotoRoom(room.id)">Go Maze!</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RoomCard',
  props: ['room'],
  data() {
    return {
      owner: {},
      participantList: []
    }
  },
  created() {
    this.players.forEach(p => {
      if (this.room.ownerId == p.id) {
        this.owner = p
      }
    });
    this.room.participantId.forEach(r => {
      this.players.forEach(p => {
        if (r == p.id) {
          this.participantList.push(p)
        }
      })
    });
  },
  computed: mapState(['players']),
  methods: {
    gotoRoom(roomId) {
      this.$router.push('/room/'+roomId)
    }
  }
}
</script>

<style>

</style>