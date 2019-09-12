import axios from '@/utils/axios.config'

//  素材列表 上传图片
export const upMaterial = (data) => {
  return axios.post('/user/images', data)
}

// 收藏
export const scMaterial = (data, collect) => {
  return axios.put('/user/images' + `/${data.id}`, collect)
}
// 删除
export const dlMaterial = (data) => {
  return axios.delete('/user/images' + `/${data.id}`)
}

// 获取图片列表
export const gtMaterial = ({
  collect, // 是否是收藏的图片
  page, // 页数
  perPage // 每页数量
}) => {
  return axios.get('/user/images', {
    params: {
      collect,
      page,
      per_page: perPage
    }
  })
}
