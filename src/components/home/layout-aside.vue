<template>
  <div class="layout-aside">
    <div class="title">
      <img src="../../assets/img/logo_admin.png" alt />
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#353b4e"
      text-color="#ccc"
      active-text-color="#ffd04b"
      >
      <!-- 内容一 -->
      <el-menu-item>
        <i class="el-icon-loading"></i>
        <span>首页</span>
      </el-menu-item>
      <!-- 内容管理 -->
      <el-submenu>
        <template slot="title">
          <i class="el-icon-s-unfold"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item>发布文章</el-menu-item>
        <el-menu-item>内容列表</el-menu-item>
        <el-menu-item>评论列表</el-menu-item>
        <el-menu-item>素材列表</el-menu-item>
      </el-submenu>
      <!-- 粉丝管理 -->
      <el-submenu>
        <template slot="title">
          <i class="el-icon-s-check"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item>图文数据</el-menu-item>
        <el-menu-item>粉丝概况</el-menu-item>
        <el-menu-item>粉丝画像</el-menu-item>
        <el-menu-item>账户信息</el-menu-item>
      </el-submenu>
      <!-- 账户信息 -->
      <el-menu-item>
        <i class="el-icon-setting"></i>
        <span>账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.title {
  padding: 13px 0;
  text-align: center;
  background-color: red;
  img {
    width: 120px;
    height: 30px;
  }
}
</style>
