<template>
  <div>
    <div class="h2 my-5 text-center">Join Room</div>

    <div class="container d-flex flex-row flex-wrap justify-content-around align-items-start mb-5">
      <RoomCard v-for="room in rooms" :key="room.id" :room="room" />
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import RoomCard from '../components/RoomCard.vue'

export default {
  name: 'JoinRoom',
  components: {
    RoomCard
  },
  data() {
    return {

    }
  },
  created() {
    // this.$store.dispatch('rooms')
    // // console.log(this.$store.state.rooms)
  },
  computed: mapState(['players','rooms']),
}
</script>

<style>

</style>