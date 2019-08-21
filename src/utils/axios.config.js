import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置全局属性
// 请求拦截
axios.interceptors.request.use(function (config) {
// 发送前操作
  let userInfo = window.localStorage.getItem('user-info')
  let result = userInfo ? JSON.parse(userInfo).token : null
  config.headers.Authorization = `Bearer ${result}`
  return config
}, function (error) {
  return Promise.reject(error)
})
export default axios
