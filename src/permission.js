import router from './router'
// 设置导航守卫
router.beforeEach(function (to, form, next) {
  // 判断开头
  if (to.path.startsWith('/home')) {
    let result = window.localStorage.getItem('user-info')
    if (result) {
      let userInfo = JSON.parse(result)
      if (userInfo && userInfo.token) {
        next()
      } else {
        next('/login')
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
