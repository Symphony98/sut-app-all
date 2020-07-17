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
// 引入图标样式
import '@/assets/iconFonts/iconfont.css'
Vue.use(ElementUI)
// Vue.config.productionTip = false

// 路由守卫
router.beforeEach((to, from, next) => {
  // 注册和登入可以给用户访问
  // 其它页面不给访问
  if (to.path === '/login') { // 访问登入页面 那么放行
    next()
  } else { // 访问别的页面
    // 判断是否登入 判断是否有token
    const token = localStorage.getItem('wf-token')
    if (token) {
      //判断vuex中sideMenu是不是一个空数组 如果是空数组,那么要触发action获取用户菜单
      let { sideMenu } = store.state
      if (sideMenu && sideMenu.length) {
        next()
      } else {
        store.dispatch("FETCH_MENULIST")
          .then(function () {
            next({ path: to.path })//这里要注意, next里面要传参数即要进入的页面的路由信息，因为next传参数后，当前要进入的路由会被废止，转而进入参数对应的路由，虽然是同一个路由，这么做主要是为了确保addRoutes生效了。
          })
      }


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
