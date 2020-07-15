import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../pages/home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName:'login' */ '../pages/login.vue')
  },
  {
    path: '/',
    component: home
  }
]

const router = new VueRouter({
  routes
})

export default router
