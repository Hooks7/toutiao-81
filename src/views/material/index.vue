<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="tabPosition">
      <el-tab-pane label="全部图片" name="first">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="second"></el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tabPosition: 'first',
      list: []
    }
  },
  methods: {
    //   获取图片列表
    getMaterial () {
      this.$http({
        url: 'user/images',
        params: { collect: 'false' }
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
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
