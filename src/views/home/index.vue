<template>
  <!-- 外层容器 -->
  <el-container>
    <!-- 左侧布局 -->
    <el-aside :style="{width}"  style="min-height:100vh; background-color:#323745">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧布局 -->
    <el-container>
      <!-- 右侧头部区域 -->
      <el-header>
       <layout-header></layout-header>
      </el-header>
      <el-main style="padding:0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      width: '200px'
    }
  },
  created () {
    eventBus.$on('collopseOrClose', () => {
      this.width = this.width === '200px' ? '60px' : '200px'
    })
  }
}
</script>

<style lang='less' scoped>
</style>
