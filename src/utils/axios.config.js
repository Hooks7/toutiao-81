import axios from 'axios'
import { Message } from 'element-ui' // 引入消息提示模块
import JSONBig from 'json-bigint' // 引入大事件处理模块
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置全局属性

// 处理大数字
axios.defaults.transformResponse = [
  function (data) {
    return data ? JSONBig.parse(data) : {}
  }
]

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
  console.log(error)
  let code = error.response ? error.response.status : ''
  let message = ''
  switch (code) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '用户非实名认证用户'
      break
    case 507:
      message = '服务器数据异常'
      break
    case 404:
      message = '手机号错误'
      break
    case 401:
      message = 'token过期或为上传'
      window.localStorage.clear() // 清楚缓存
      window.localStorage.hash('#/login') // 跳转到登录页
      break
    default :
      message = '未知错误'
  }
  Message({ message, type: 'error' })
  return new Promise(function () {})
})
export default axios
