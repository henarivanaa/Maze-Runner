import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    roomList: [],
    currentPlayer: '',
    currentRoom: null
  },
  getters: {
    getPlayer: state => state.players,
    getRoomList: state => state.roomList,
    getCurrentPlayer: state => state.currentPlayer,
    getCurrentRoom: state => state.currentRoom
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
    },

    setCurrentRoom: (state, roomId) => {
      state.currentRoom = roomId
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
    },

    setCurrentRoom({ commit }, roomId) {
      commit('setCurrentRoom', roomId)
    }
  },
  modules: {
  }
})
