import axios from '@/utils/axios.config'

/**
 *
 * @param {*} data 评论列表数据
 */
export const lookComment = (data) => {
  return axios.get('/articles', data)
}

/**
 *
 * @param {*} data 评论状态
 */
// export const closeComment = (
//   { article_id, // 文章id
//     allowComment // 是否允许评论
//   }
// ) => {
//   return axios.put(`/comments/status?${article_id}`, {

//     allow_comment: allowComment
//   })
// }
