import axios from '@/utils/axios.config'
import URL from '@/constant/api'

/**
 *
 * @param {*} data 登录提交服务器的数据
 */
export const LoginByMobile = (data) => {
  return axios.post(URL.APP_LOGIN, data)
}
