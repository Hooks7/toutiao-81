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
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button
            type="text"
            @click="closeOrOpen(obj.row)"
          >{{obj.row.comment_status ?'关闭评论':'打开评论'}}</el-button>
        </template>
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
        this.list = result.data.results
      })
    },
    // 状态设置
    formatter (row, column, callValue, index) {
      return callValue ? '正常' : '关闭'
    },
    // 关闭评论
    closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}评论吗`, '提示').then(() => {
        this.$http({
          method: 'put',
          url: 'comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(() => {
          this.getcomments()
        })
      })
    }
  },
  created () {
    this.getcomments()
  }
}
</script>

<style>
</style>
