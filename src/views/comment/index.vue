<template>
  <el-card v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"

    style="width: 100%">
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
    <!-- 分页 -->
    <el-row type="flex" justify="center" style="margin:20px 0;">
      <el-pagination
        :page-size="page.pageSize"
        :total="page.total"
        :current-page="page.currentpage"
        @current-change="changePage"
        background
        layout="prev, pager, next"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        pageSize: 10, // 单页显示条目个数
        total: 0, // 总数
        currentpage: 1 // 当前页数
      },
      // 加载效果
      loading: true
    }
  },
  methods: {
    // 分页事件
    changePage (newPage) {
      // console.log(newPage)
      this.page.currentpage = newPage
      this.getcomments()
    },
    //   查询评论列表数据
    async  getcomments () {
      this.loading = true
      let result = await this.$http({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.currentpage, // 当前页数
          per_page: this.page.pageSize // 每页条数
        }
      })
      this.list = result.data.results
      // 设置分页总数
      this.page.total = result.data.total_count
      this.loading = false
    },
    // 状态设置
    formatter (row, column, callValue, index) {
      console.log(callValue)
      return callValue ? '正常' : '关闭'
    },
    // 关闭评论
    async closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      await this.$confirm(`您确定要${mess}评论吗`, '提示')
      await this.$http({
        method: 'put',
        url: 'comments/status',
        params: { article_id: row.id.toString() },
        data: { allow_comment: !row.comment_status }
      })
      this.getcomments()
    }
  },
  created () {
    this.getcomments()
  }
}
</script>

<style>
</style>
