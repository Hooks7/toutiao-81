<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/56.png" />
      </div>
      <el-form ref="form" :model="formData" :rules="rules">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="formData.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码" v-model="formData.code" style="width:240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="formData.check">我已经阅读并同意协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="danger" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 接口封装
import { LoginByMobile } from '@/api/login'
export default {
  methods: {
    login () {
      // 登录方法
      // 要进行手机号和验证码的校验 validate手动校验表单数据
      this.$refs.form.validate(async isOk => {
        if (isOk) {
          let result = await LoginByMobile(this.formData)
          // console.log(result)
          window.localStorage.setItem('user-info', JSON.stringify(result.data))
          this.$router.push('/home')
        }
      })
    }
  },
  data () {
    // 自定义检验
    var func = function (rule, value, callback) {
      value ? callback() : callback(new Error('您必须点击'))
    }
    return {
      // 定义数据
      formData: {
        mobile: '13911111111',
        code: '246810',
        check: false
      },
      // 定义数据规则
      rules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          {
            len: 11,
            message: '手机长度必须为11个字符',
            trigger: 'blur'
          },
          {
            pattern: /^1[345678]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码长度必须为6个数字',
            trigger: 'blur'
          }
        ],
        check: [{ validator: func }]
      }
    }
  }
}
</script>
<style lang ='less' scoped>
/* 设置背景图片 */
.login {
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/img/001.jpg");
  background-size: cover; /* 图片可视区域最大展示*/
  display: flex;
  justify-content: center; /* 横向 居中*/
  align-items: center; /* 纵向 居中*/
  .login-card {
    width: 420px;
    height: 350px;
  }
  .title {
    text-align: center;
    margin-bottom: 10px;
  }
  img {
    width: 320px;
    height: 60px;
    background-size: cover
  }
}
</style>
