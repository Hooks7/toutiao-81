<template>
  <el-card>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <!-- 定义具名插槽 -->
        <slot name="title">评论列表</slot>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="date" label="标题"  width="500"></el-table-column>
      <el-table-column prop="name" label="评论状态"></el-table-column>
      <el-table-column prop="address" label="总评论数"></el-table-column>
      <el-table-column prop="address" label="粉丝评论数"></el-table-column>
       <el-table-column label='操作'></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  }
}
</script>

<style>
</style>
