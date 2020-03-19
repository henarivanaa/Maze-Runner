import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: []
  },
  mutations: {
    addPlayer: (state, username) => {
      state.players.push(username)
    },
  },
  actions: {
    register ({ commit }, username) {
      commit('addPlayer', username)
    }
  },
  modules: {
  }
})
