<template>
  <el-card>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <!-- 定义具名插槽 -->
        <slot name="title">评论列表</slot>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="list" style="width: 100%" stripe>
      <el-table-column prop="title" label="标题" width="500"></el-table-column>
      <el-table-column :formatter="formatter" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <el-button type="text">修改</el-button>
        <el-button type="text">关闭评论</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    //   查询评论列表数据
    getcomments () {
      this.$http({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(result => {
        console.log(result)
        this.list = result.data.results
      })
    },
    formatter (row, column, callValue, index) {
      return callValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getcomments()
  }
}
</script>

<style>
</style>
