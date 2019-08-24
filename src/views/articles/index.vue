<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form>
      <el-form-item label="文章状态">
        <el-radio-group v-model="radio">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="草稿"></el-radio-button>
          <el-radio-button label="待审核"></el-radio-button>
          <el-radio-button label="审核通过"></el-radio-button>
          <el-radio-button label="审核失败"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表">
        <el-dropdown>
          <el-button type="primary">
            请选择
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item label="时间选择">
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="value"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-form-item>
    </el-form>
    <div class="total_title">共找到{{page.total}}条符合条件的内容</div>
    <div class="content-list">
      <!-- 循环项 -->
      <div class="content-item" v-for="(item,index) in list" :key="index">
        <!-- 左侧内容 -->
        <div class="left">
          <img :src="item.cover.images[0]" alt />
          <!-- 内容信息 -->
          <div class="info">
            <span>{{item.title}}</span>
            <el-tag :type="item.status|statusType" class="button">{{item.status|statusText}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <!-- 右侧内容 -->
        <div class="right">
          <span>
            <i class="el-icon-edit">修改</i>
          </span>
          <span>
            <i class="el-icon-delete">删除</i>
          </span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radio: 1,
      value: '',
      list: [],
      page: {
        total: ''
      }
    }
  },
  methods: {
    // 查询文章
    getArticles () {
      this.$http({
        url: 'articles'
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  // 过滤器
  filters: {
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 2:
          return 'sucess'
        case 3:
          return 'danger'
        case 4:
          return 'info'
      }
    }
  },
  created () {
    this.getArticles()
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
</style>
