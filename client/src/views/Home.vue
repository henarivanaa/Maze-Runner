<template>
  <div>
    <div class="h2 text-center my-5">Get Started</div>
    <!-- <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Input your username" v-model="username">
      <button type="submit">Enter</button>
    </form> -->
      <div class="d-flex flex-row justify-content-center">
        <form @submit.prevent="onSubmit" class="form-inline">
          <div class="form-group col-md-9 pr-2">
            <input type="text" class="form-control" placeholder="Input your username" v-model="username">
          </div>
          <div class="form-group col-md-3 pl-0">
          <button type="submit" class="btn btn-outline-primary form-control">Enter</button>
          </div>
        </form>
      </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapActions } from 'vuex'
const socket = io('https://enigmatic-escarpment-45133.herokuapp.com/')

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
      this.register(this.username)
      socket.emit('newUser', this.username)
      socket.emit('newRoom')
      this.$router.push({ path: '/lobby' })
    },
  }
}
</script>

<style>

</style>
