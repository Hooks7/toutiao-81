<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="tabPosition" @tab-click="changeTab">
      <el-tab-pane label="全部图片" name="all">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row align="middle" class="operate" type="flex" justify="space-around">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete"></i>
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
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tabPosition: 'all',
      list: []
    }
  },
  methods: {
    changeTab () {
      this.getMaterial()
    },
    //   获取图片列表
    getMaterial () {
      this.$http({
        url: 'user/images',
        params: { collect: this.tabPosition === 'collect' }
      }).then(result => {
        // console.log(result.data)
        this.list = result.data.results
      })
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
      height: 100%;
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
}
</style>
