import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    roomList: [],
    currentPlayer: '',
    currentRoom: null,
    currentRole: null,
  },
  getters: {
    getPlayer: state => state.players,
    getRoomList: state => state.roomList,
    getCurrentPlayer: state => state.currentPlayer,
    getOneRoom: state => id => state.roomList.find(room => room.id == id),
    getCurrentRoom: state => state.currentRoom,
    getCurrentRole: state => state.currentRole
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
    },

    setCurrentRole: (state, role) => {
      state.currentRole = role
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
    },

    setCurrentRole({ commit }, role) {
      commit('setCurrentRole', role)
    }
  },
  modules: {
  }
})