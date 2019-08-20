<template>
  <!-- 外层容器 -->
  <el-container>
    <!-- 左侧布局 -->
    <el-aside style="width:200px; height:100vh; background-color:#323745">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧布局 -->
    <el-container>
      <!-- 右侧头部区域 -->
      <el-header>
       <layout-header></layout-header>
      </el-header>
      <el-main>尾部</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
}
</script>

<style lang='less' scoped>
</style>
