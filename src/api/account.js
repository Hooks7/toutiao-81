import axios from '@/utils/axios.config'

/**
 * 获取账户信息
 */
export const getAccount = () => {
  return axios.get('/user/profile')
}

// 编辑账户信息
export const editAccount = ({
  name, // 用户名
  intro, // 头条号简介
  email // 邮箱
}) => {
  return axios.patch('/user/profile', {
    name,
    intro,
    email
  })
}

/**
   * 上传账户图片
   */
export const instantUpload = (key, file) => {
  let formData = new FormData()
  formData.append(key, file)
  return axios.patch('/user/photo', formData)
}
