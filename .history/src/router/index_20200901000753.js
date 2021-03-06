import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Edit',
    name: 'Edit',
    component: () => import(/* webpackChunkName: "about" */ '../views/Edit.vue')
  },
  {
    path: '/Published',
    name: 'Published',
    component: () => import(/* webpackChunkName: "about" */ '../views/Published.vue')
  },
  {
    path: '/MyCollect',
    name: 'MyCollect',
    component: () => import(/* webpackChunkName: "about" */ '../views/MyCollect.vue')
  },
  {
    path: '/Message',
    name: 'Message',
    component: () => import(/* webpackChunkName: "about" */ '../views/Message.vue')
  },
  {
    path: '/Forget',
    name: 'Forget',
    component: () => import(/* webpackChunkName: "about" */ '../views/Forget.vue')
  },
  {
    path: '/Publish',
    name: 'Publish',
    component: () => import(/* webpackChunkName: "about" */ '../views/Publish.vue')
  },
  {
    path: '/Show',
    name: 'Show',
    component: () => import(/* webpackChunkName: "about" */ '../views/Show.vue')
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router