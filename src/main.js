import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局css和element-rest
import './assets/css/global.css'
import '@/assets/css/el-reset.css'

Vue.use(ElementUI)
// Vue.config.productionTip = false

// 路由守卫
router.beforeEach((to, from, next) => {
  // 注册和登入可以给用户访问
  // 其它页面不给访问
  console.log(to)
  if (to.path === '/login') { // 访问登入页面 那么放行
    next()
  } else { // 访问别的页面
    // 判断是否登入 判断是否有token
    const token = localStorage.getItem('wf-token')
    console.log(token)
    if (token) {
      next()
    } else { // 跳转到登入页
      next({ path: '/login' })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
