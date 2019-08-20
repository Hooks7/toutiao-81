<template>
  <div>
    <el-row type="flex" class="layout-header" justify="space-between">
      <el-col :span="6" class="left-header">
        <i class="el-icon-moon-night"></i>
        <span>上海香蕉计划文化发展有限公司</span>
      </el-col>
      <el-col :span="3" class="layout-right">
        <img src="../../assets/img//avatar.jpg" alt />
        <!-- 下拉模板 -->
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>git地址</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.layout-header {
  padding: 12px 0;
  .left-header {
    display: flex;
    align-items: center;
    i {
      font-size: 20px;
      margin-right: 4px;
    }
    .layout-right {
      display: flex;
      align-items: center;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
