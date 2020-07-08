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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router