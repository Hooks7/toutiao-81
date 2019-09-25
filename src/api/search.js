import axios from '@/utils/axios.config'

// 搜索
export const searchArticles = ({
  q,
  page,
  perPage
}) => {
  return axios.get('/search', {
    params: {
      q,
      page,
      per_page: perPage
    }
  })
}
