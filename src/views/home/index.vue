<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form>
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入验证码" style="width:240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-button  type="danger" style="width:100%" class="button-a">按钮</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>
<style lang ='less' scoped>
/* 设置背景图片 */
.login {
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/img/login_bg.jpg");
  background-size: cover; /* 图片可视区域最大展示*/
  display: flex;
  justify-content: center; /* 横向 居中*/
  align-items: center; /* 纵向 居中*/
  .login-card {
    width: 420px;
    height: 320px;
  }
  .title {
    text-align: center;
    margin-bottom: 30px;
  }
  img {
    width: 200px;
    height: 40px;
  }

}
</style>
