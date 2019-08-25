<template>
  <el-card>
    <!-- 标签页组件 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="素材库" name="material">
        <div class="material-list">
          <el-card class="material-item" v-for="item in list" :key="item.id">
            <img @click="selectOneImg(item)" :src="item.url" alt />
          </el-card>
        </div>
        <!-- 分页设置 -->
        <el-row type="flex" justify="center" style="margin:10px 0">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :page-size="page.pageSize"
            :current-page="page.currentPage"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传图片">
        <el-upload :show-file-list="false" :http-request="uploadImg" action>
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 8
      },
      activeName: 'material', // 选项卡属性
      list: [] // 要循环的素材数据
    }
  },
  methods: {
    //  上传图片
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file) // 上传参数
      this.$http({
        url: '/user/images',
        data,
        method: 'post'
      }).then(result => {
        this.$emit('selectOneImg', result.data.url)
      })
    },
    // 图片点击
    selectOneImg (item) {
      this.$emit('selectOneImg', item.url)
    },
    //   获取图片数据
    getMaterial () {
      let pageParams = {
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.$http({
        url: '/user/images',
        params: { collect: false, ...pageParams }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 分页总数
      })
    },
    // 分页
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    }

  },
  created () {
    this.getMaterial()
  }
}
</script>

<style  lang='less' scoped>
.material-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .material-item {
    width: 150px;
    height: 150px;
    margin: 5px 0;
    img {
      width: 100%;
      height: 100px;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
