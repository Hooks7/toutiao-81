import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置全局属性
// 请求拦截
axios.interceptors.request.use(function (config) {
// 发送前操作
  let userInfo = window.localStorage.getItem('user-info')
  let result = userInfo ? JSON.parse(userInfo).token : null
  config.headers.Authorization = `Bearer ${result}`
  return config
  // 失败进行处理
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截
axios.interceptors.response.use(function (response) {
  // 对响应数据做处理
  return response.data ? response.data : {}
}, function (error) {
  // 对响应错误做处理
  return Promise.reject(error)
})
export default axios
