import axios from '@/utils/axios.config'

/**
 *
 * @param {*} data 登录提交服务器的数据
 */
export const LoginByMobile = ({
  mobile, // 手机号
  code // 验证码
}) => {
  return axios.post('/authorizations', {
    mobile,
    code
  })
}
