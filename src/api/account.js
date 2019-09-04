import axios from '@/utils/axios.config'
import URL from '@/constant/api'

/**
 * 获取账户信息
 */
export const getAccount = () => {
  return axios.get(URL.APP_ACCOUNT)
}
/**
   * 编辑账户信息
   */
export const editAccount = (data) => {
  return axios.patch(URL.APP_ACCOUNT, data)
}

/**
   * 上传账户图片
   */
export const instantUpload = (data) => {
  return axios.patch(URL.APP_IMAGE, data)
}
