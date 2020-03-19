import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import JoinRoom from '../views/JoinRoom.vue'
import Room from '../views/Room.vue'
import Home from '../views/Home.vue'
import Lobby from '../views/Lobby.vue'
import Game from '../views/Game.vue';
//import Home from '../views/Home.vue'
// import Result from '../views/Result.vue'
import Temp from '../views/Temp.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/join',
    name: 'JoinRoom',
    component: JoinRoom
  },
  {
    path: '/room',
    name: 'Room',
    component: Room
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/lobby',
    name: 'Lobby',
    component: Lobby,
  },
  {
    path: '/game/:id',
    name: 'Game',
    component:Game
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Temp // () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/result',
    name: 'Result',
    component: Temp,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
