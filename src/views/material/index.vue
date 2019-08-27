<template>
  <el-card >
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 上传 -->
    <el-upload :http-request="uploadImg" action :show-file-list="false" class="upload-material">
      <el-button type="primary">
        上传
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
    </el-upload>
    <el-tabs v-model="tabPosition" @tab-click="changeTab">
      <el-tab-pane label="全部图片" name="all">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row align="middle" class="operate" type="flex" justify="space-around">
              <!-- 收藏事件 -->
              <i
                :style="{color:item.is_collected?'red':''}"
                @click="collectOrCancel(item)"
                class="el-icon-star-on"
              ></i>
              <!-- 删除 -->
              <i @click="delMaterial(item)" class="el-icon-delete"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
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
      page: {
        currentPage: 1, // 当前页数
        pageSize: 15, // 每页条数
        total: 0
      },
      tabPosition: 'all',
      list: []
    }
  },
  methods: {
    // 上传
    uploadImg (a) {
      let formData = new FormData()
      formData.append('image', a.file)
      this.$http({
        method: 'post',
        url: 'user/images',
        data: formData
      }).then(result => {
        this.getMaterial()
      })
    },
    // 收藏操作
    async  collectOrCancel (item) {
      // is_collected  是否是收藏 如果is_collected为true  则表示已经收藏 这时点击时  应该取消
      // 如果is_collected为false  则表示没有收藏 这时点击时  应该收藏\
      let mess = item.is_collected ? '取消收藏' : '收藏'
      await this.$confirm(`您确定${mess}这张图片吗`)
      await this.$http({
        method: 'put',
        url: `/user/images/${item.id}`,
        data: { collect: !item.is_collected }
      })
      this.getMaterial()
    },
    // 删除
    async  delMaterial (item) {
      await this.$confirm('您确定删除此图片吗', '提示')
      await this.$http({
        method: 'delete',
        url: `user/images/${item.id}`
      })
      this.getMaterial()
    },
    // 分页事件
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 切换功能
    changeTab () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    //   获取图片列表
    async  getMaterial () {
      let pageParams = {
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      let result = await this.$http({
        url: 'user/images',
        params: { collect: this.tabPosition === 'collect', ...pageParams }
      })
      // console.log(result.data)
      this.list = result.data.results
      this.page.total = result.data.total_count
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 200px;
    margin: 20px 10px;
    position: relative;
    img {
     width: 100%;
      height: 140px;
    }
  }
  .operate {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 30px;
    width: 100%;
    background-color: #f4f5f6;
    i {
      font-size: 22px;
    }
  }
}

.upload-material {
  position: absolute;
  right: 60px;
  margin-top: -10px;
}
</style>
