<template>
<!-- 面包组件 -->
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>
      <!-- 具名插槽 -->
      <slot name='title'></slot>
  </el-breadcrumb-item>
 </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
