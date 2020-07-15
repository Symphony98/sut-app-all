import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/pages/home'
import product from '@/pages/home/product'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName:'login' */ '../pages/login.vue')
  },
  {
    path: '/',
    component: home,
    children: [
      {
        path: 'product',
        component: product
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
