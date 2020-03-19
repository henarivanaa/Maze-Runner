import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    roomList: [],
    currentPlayer: ''
  },
  getters: {
    getPlayer: state => state.players,
    getRoomList: state => state.roomList,
    getCurrentPlayer: state => state.currentPlayer
  },
  mutations: {
    setPlayer: (state, userData) => {
      state.players = userData
    },

    setRoom: (state, roomData) => {
      state.roomList = roomData
    },

    register: (state, username) => {
      state.currentPlayer = username
    }
  },
  actions: {
    setPlayer ({ commit }, userData) {    
      commit('setPlayer', userData)
    },

    setRoom({ commit }, roomData) {
      commit('setRoom', roomData)
    },

    register({ commit }, username) {
      commit('register', username)
    }
  },
  modules: {
  }
})
