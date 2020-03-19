import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import JoinRoom from '../views/JoinRoom.vue'
import Room from '../views/Room.vue'

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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
