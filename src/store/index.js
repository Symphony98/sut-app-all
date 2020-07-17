import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { getMenuList } from "@/api"
import DynamicRoutes from "@/router/DynamicRoutes" //动态路由
import router from "@/router" //引入路由
//引入recursionRoutes递归函数 处理用户路由
import recursionRoutes from "../uitils/recursionRoutes"
//引入allRoutes
import allRoutes from "../router/allRoutes"
export default new Vuex.Store({
  state: {
    sideMenu: []
  },
  mutations: {
    SET_SIDEMENU(state, payload) { //设置用户菜单 
      state.sideMenu = payload
      //找到"/"路径的路由 因为所有的路由页面都是它的children
      let target = DynamicRoutes.find(item => item.path === '/')
      target.children = [...state.sideMenu]
      console.log(DynamicRoutes)
      router.addRoutes(DynamicRoutes)
    },
    CLEAR_SIDEMENU(state) {
      state.sideMenu = []
    }
  },
  actions: {
    async FETCH_MENULIST({ commit }) { //获取用户菜单
      //发起异步请求 获取用户菜单
      let res = await getMenuList();
      if (res && res.data) { //得到结果了
        //递归获取用户路由
        let userMenu = recursionRoutes(allRoutes, res.data.menuList)
        commit("SET_SIDEMENU", userMenu)
      }
    }
  },
  modules: {
  }
})
