import axios from './config'
// 登入
export const login = (username, password) => axios({
  url: '/users/login',
  method: 'post',
  data: {
    username,
    password
  }
})

// 获取登入日志
export const getLoginLog = () => axios.get('/getloginlog')

// 获取用户菜单
export const getMenuList = () => axios.get('/permission/getMenuList')

// 获取学员信息
export const getStuList = () => axios.get('/students/getstulist')
// 增加学员信息
export const addStuDetail = (stuDetail) => axios({
  url: '/students/addstu',
  method: 'post',
  data: stuDetail
})
//删除学员
export const delStu = (sId) => axios.get(`/students/delstu?sId=${sId}`)
//编辑学员信息
export const updateStu = (updated = {}) => axios({
  url: '/students/updatestu',
  method: 'post',
  data: updated
})
//搜索学员
export const searchStu = (key) => axios.get(`/students/searchstu?key=${key}`)