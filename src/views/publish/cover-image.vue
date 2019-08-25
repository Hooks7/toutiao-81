<template>
  <div class="cover-image">
    <!-- 点击事件弹出 -->
    <div @click="clickImg(index)" class="cover-item" v-for="(item,index) in images" :key="index">
      <img :src="item?item:defaultImg" alt />
    </div>
    <!-- 弹出框 -->
    <el-dialog :visible="showDialog" @close="showDialog=false">
      <select-images @selectOneImg="selectImg"></select-images>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      selectIndex: -1,
      defaultImg: require('../../assets/img/pic_bg.png'), // 设置默认图片
      showDialog: false
    }
  },
  methods: {
    // 接受子属性
    selectImg (url) {
      // 显示图片  => 图片来源 =>上层 => props只能读取 不能更改 只能上层去改
      // 显示图片 => 获取图片 => 通过 再次传递 传给上层组件 => 只传图片 => 因为images是个数组 只传一个值 不足以修改
      this.$emit('updateImages', url, this.selectIndex) // 再次抛出事件
      this.showDialog = false // 关闭弹窗
    },
    clickImg (index) {
      this.showDialog = true // 控制弹出框
      this.selectIndex = index
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
    padding: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
