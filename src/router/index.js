import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'
// import product from '@/pages/Home/product'

import allRoutes from './allRoutes'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName:'login' */ '../pages/Login')
  },
  {
    path: '/',
    component: Home,
    children: allRoutes
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName:'page404' */ '../pages/page404')
  }
]

const router = new VueRouter({
  routes
})

export default router
