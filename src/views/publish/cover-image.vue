<template>
  <div class="cover-image">
    <div class="cover-item" v-for="(item,index) in images" :key="index">
      <img src="item?item:defaultImg" alt />
    </div>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png') // 设置默认图片
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
  display: flex;
  .cover-item {
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    margin-right: 30px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
