<template>
  <div class="layout-aside">
    <div class="title">
      <img src="../../assets/img/56.png" :style = "{width:collapse?'60px': '200px'}" alt />
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#353b4e"
      text-color="#ccc"
      active-text-color="#ffd04b"
      :collapse="collapse"
      :collapse-transition = 'false'
      router>
<!-- 开启路由 -->
      <!-- 内容一 -->
      <el-menu-item index ='/home'>
        <i class="el-icon-loading"></i>
        <span>首页</span>
      </el-menu-item>
      <!-- 内容管理 -->
      <el-submenu index='content'>
        <template slot="title">
          <i class="el-icon-s-unfold"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index='/home/publish'>发布文章</el-menu-item>
        <el-menu-item index='/home/articles'>内容列表</el-menu-item>
        <el-menu-item index='/home/material'>素材列表</el-menu-item>
        <el-menu-item index='/home/comment'>评论列表</el-menu-item>
      </el-submenu>
      <!-- 粉丝管理 -->
      <el-submenu index='fans'>
        <template slot='title'>
          <i class='el-icon-s-check'></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="/home/fansdata">图文数据</el-menu-item>
        <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fansimg">粉丝画像</el-menu-item>
        <el-menu-item index="/home/account">账户信息</el-menu-item>
      </el-submenu>
      <!-- 账户信息 -->
      <el-menu-item index="/home/account">
        <i class='el-icon-setting'></i>
        <span>账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false

    }
  },
  created () {
    eventBus.$on('collopseOrClose', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>

<style lang='less' scoped>
.title {
  text-align: center;

  img {
    width: 200px;
    height: 60px;
  }
}
</style>
