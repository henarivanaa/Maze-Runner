import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    roomList: [],
  },
  getters: {
    getPlayer: state => state.players
  },
  mutations: {
    addPlayer: (state, userData) => {
      state.players = userData
    },
  },
  actions: {
    register ({ commit }, userData) {    
      commit('addPlayer', userData)
    },
  },
  modules: {
  }
})
