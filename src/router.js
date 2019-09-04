import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import Main from '@/views/home/main'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/',
    redirect: '/login'
  }, {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '',
      component: Main
    },
    { // 评论列表
      path: '/home/comment',
      component: () => import('./views/comment')
    },
    // 素材列表
    {
      path: '/home/material',
      component: () => import('./views/material')
    },
    { // 内容列表
      path: '/home/articles',
      component: () => import('./views/articles')
    },
    { // 发布内容
      path: '/home/publish',
      component: () => import('./views/publish')
    },
    { // 发布内容 动态路由
      path: '/home/publish/:articleId',
      component: () => import('./views/publish')
    },
    {
      path: '/home/account', // 账户信息
      component: () => import('./views/account')
    },
    {
      path: '/home/fansdata',
      component: () => import('./views/fansdata')
    },
    {
      path: '*',
      component: () => import('./views/404.vue')
    }
    ]
  }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
