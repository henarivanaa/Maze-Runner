import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [
      { id: 1, name: 'Ram' },
      { id: 2, name: 'Ivan' },
      { id: 3, name: 'Rofandi' },
      { id: 4, name: 'Hitsam' },
      { id: 5, name: 'Erlang' },
      { id: 6, name: 'Ajo Lampung' },
      { id: 7, name: 'Restu' },
      { id: 8, name: 'Ojan' },
      { id: 9, name: 'Darin' },
    ],
    rooms: [
      { id: 1, name: 'Room 1', ownerId: 2, participantId: [] },
      { id: 2, name: 'Room 2', ownerId: 3, participantId: [5] },
      { id: 3, name: 'Room 3', ownerId: 4, participantId: [7,8] },
    ],
  },
  mutations: {
    // rooms(state) {
    //   console.log(this.rooms)
    //   state.rooms = this.rooms
    // },
  },
  actions: {
    // rooms(context) {
    //   context.commit('rooms')
    // },
  },
  modules: {
  }
})
