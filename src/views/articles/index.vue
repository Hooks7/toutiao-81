<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form>
      <el-form-item label="文章状态">
        <el-radio-group v-model="formData.status" @change="refreshList">
          <el-radio-button :label="5">全部</el-radio-button>
          <el-radio-button :label="0">草稿</el-radio-button>
          <el-radio-button :label="1">待审核</el-radio-button>
          <el-radio-button :label="2">审核通过</el-radio-button>
          <el-radio-button :label="3">审核失败</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表">
        <!-- 下拉 -->
        <el-select v-model="formData.channel_id" placeholder="请选择" @change="refreshList">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 时间选择 -->
      <el-form-item label="时间选择">
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="formData.dateRange"
            @change="refreshList"
            value-format="yyyy-MM-dd"
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
          <img :src="item.cover.images[0]?item.cover.images[0]:defaultImg" alt />
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
      formData: {
        status: 5,
        channel_id: null, // 频道id 当前选择的频道
        dateRange: null // 时间范围 是个数组
      },
      defaultImg: require('../../assets/img/toutiao.png'), // 默认图片设置
      channels: [], // 频道数据
      list: [], // 内容列表
      page: {
        total: 0 // 文章总数
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
    },
    getChannels () {
      this.$http({
        url: 'channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 筛选
    refreshList () {
      this.$http({
        url: 'articles',
        params: {
          status: this.formData.status === 5 ? null : this.formData.status,
          channel_id: this.formData.channel_id,
          begin_pubdate:
            this.formData.dateRange && this.formData.dateRange.length
              ? this.formData.dateRange[0]
              : null,
          end_pubdate:
            this.formData.dateRange && this.formData.dateRange.length > 1
              ? this.formData.dateRange[1] : null
        }
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
    this.getArticles() // 获取文章列表
    this.getChannels() // 获取频道列表
    this.refreshList()
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
