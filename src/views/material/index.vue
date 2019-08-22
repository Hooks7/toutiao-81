<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs  v-model="tabPosition">
      <el-tab-pane label="全部图片" name="first"></el-tab-pane>
      <el-tab-pane label="收藏图片" name="second"></el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tabPosition: 'first'
    }
  }
}
</script>

<style>
</style>
