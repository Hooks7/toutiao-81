import axios from '@/utils/axios.config'

// 内容列表 查询文章
export const gtArticles = (data) => {
  return axios.get('/articles', data)
}

// 频道查询
export const gtChannels = () => {
  return axios.get('/channels')
}

// 删除文章
export const dlArticles = (target) => {
  return axios.delete(`/articles/${target.id.toString()}`)
}
