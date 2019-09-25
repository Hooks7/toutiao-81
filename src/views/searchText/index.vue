<template>
  <el-card>
    <div class="total_title">共找到{{page.total}}条符合条件的内容</div>
    <div class="content-list">
      <!-- 循环项 -->
      <div class="content-item" v-for="(item,index) in list" :key='index'>
        <!-- 左侧内容 -->
        <div class="left">
          <img :src="item.cover.images[0]?item.cover.images[0]:photo" alt />
          <!-- 内容信息 -->
          <div class="info">
            <span>{{item.title}}</span>
            <el-tag class="button" >{{item.status|statusText}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <!-- 右侧内容 -->
        <div class="right">
          <span @click="goEdit(item)">
            <i class="el-icon-edit">修改</i>
          </span>
          <span @click="deltem(item)" style="cursor:pointer">
            <i class="el-icon-delete">删除</i>
          </span>
        </div>
      </div>
    </div>
    <el-row class="compare">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change = changePage
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
import { gtArticles } from '@/api/articles'
import { searchArticles } from '@/api/search'

import { mapState } from 'vuex'
export default {
  props: ['q'],
  name: 'searchText',
  data () {
    return {
      seek: '', // 输入框
      list: [], // 内容列表
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      photo: require('../../assets/img/56.png')
    }
  },
  created () {
    this.search()
    console.log(this.q)
    // this.$store.commit('getValue', this.q)
    // if (this.value) {
    //   this.search()
    // }
  },
  computed: {
    ...mapState(['value'])

  },
  methods: {
    // 获取文章
    async getArticle () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      let res = await gtArticles({ params })
      this.list = res.data.results
      this.page.total = res.data.total_count
    },

    // 分页
    changePage (newPage) {
      this.page.currentPage = newPage
      this.search({ q: this.value })
    },

    // 搜索

    async search () {
      if (this.value) {
        let res = await searchArticles({
          page: this.page.currentPage,
          perPage: this.page.pageSize,
          q: this.value
        })
        this.list = res.data.results
        this.page.total = res.data.total_count
        return
      }
      this.getArticle()
    }
  },
  filters: {
    statusText (value) {
      switch (value) {
        case 0 :
          return '草稿'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    }
  },
  watch: {

    value (n) {
      if (n) {
        this.search()
      }
    }
  }
}
</script>

<style lang='less' scoped>
.total_title {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px dashed #ccc;
}
.content-list {
  .content-item {
    padding: 10px;
    border-bottom: 1px solid #f2f3f5;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 140px;
        height: 100px;
        border-radius: 5px;
      }
      .info {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        height: 100px;
        padding: 5px 0;
        justify-content: space-between;
      }
      .button {
        width: 70px;
      }
      .date {
        color: #999;
        font-size: 12px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      span {
        padding: 0 10px;
      }
    }
  }
}
.compare{
  display: flex;
  justify-content: center
}
</style>
