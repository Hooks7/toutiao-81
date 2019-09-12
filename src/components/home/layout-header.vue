<template>
  <el-row type="flex" class="layout-header">
    <el-col :span="17" class="left-header">
      <i @click="openOrClose" :class="currentClass"></i>
      <span>今日头条</span>
    </el-col>
    <el-col :span="4">
      <!-- 搜索框 -->
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="seek"
     @blur='hunt'></el-input>
    </el-col>
    <el-col :span="3" class="layout-right">
      <!-- 图片设置 -->
      <img :src="user.photo ? user.photo :defaultImg" alt />
      <!-- 下拉模板 -->
      <el-dropdown trigger="click" @command=" handleCommand ">
        <span class="el-dropdown-link">
          {{user.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="account">个人信息</el-dropdown-item>
          <el-dropdown-item command="git">git地址</el-dropdown-item>
          <el-dropdown-item command="out">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      user: {},
      defaultImg: require('../../assets/img/avatar.jpg'),
      currentClass: 'el-icon-s-fold',
      seek: ''
    }
  },
  methods: {
    // 侧边栏伸缩
    openOrClose () {
      eventBus.$emit('collopseOrClose') // 触发了一个事件 打开或者
      this.currentClass =
        this.currentClass === 'el-icon-s-fold'
          ? 'el-icon-s-unfold'
          : 'el-icon-s-fold'
    },
    // 获取用户信息
    async getUserInfo () {
      // let userInfo = window.localStorage.getItem('user-info') // 获取用户存储信息 存储信息没有token
      // let token = userInfo ? JSON.parse(userInfo).token : null
      // 发送请求
      // token &&
      let result = await this.$http({
        url: 'user/profile'
        // headers: { Authorization: `Bearer ${token}` } // 将headers中赋值 后端需要的token身份信息  携带令牌
      })
      this.user = result.data
    },
    // 退出操作
    handleCommand (command) {
      // 个人信息
      if (command === 'account') {
        this.$router.push('/home/account')
        // git地址
      } else if (command === 'git') {
        window.location.href = 'https://github.com'
        // 退出
      } else {
        //
        this.$router.push('/login')
        window.localStorage.clear() // 清除本地在游览器上所有前端缓存
      }
    },
    hunt () {
      this.$router.push('/home/articles')
    }
  },
  created () {
    this.getUserInfo()
    eventBus.$on('updateUserInfoSuccess', () => {
      this.getUserInfo()
    })
  }
}
</script>

<style lang='less' scoped>
.layout-header {
  padding: 12px 0;
  .left-header {
    display: flex;
    align-items: center;

    i {
      font-size: 20px;
      margin-right: 4px;
    }
  }
  .layout-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
