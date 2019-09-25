<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-form label-width="100px" :model="formData" :rules="rules" ref="userForm">
      <!-- 用户名 -->
      <el-form-item label="用户名称" prop="name">
        <el-input style="width:300px" v-model="formData.name"></el-input>
      </el-form-item>
      <!-- 简介 -->
      <el-form-item label="用户简介" prop="intro">
        <el-input style="width:300px" v-model="formData.intro"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="用户邮箱" prop="email">
        <el-input style="width:300px" v-model="formData.email"></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item label="用户手机号" prop="mobile" disabled>
        <el-input style="width:300px" disabled v-model="formData.mobile"></el-input>
      </el-form-item>
      <!-- 保存按钮 -->
      <el-form-item>
        <el-button type="primary" @click="saveUserInfo">保存信息</el-button>
      </el-form-item>
    </el-form>
    <el-upload :http-request="uploadImg" action :show-file-list="false">
      <img class="head-img" :src="formData.photo" alt />
    </el-upload>
  </el-card>
</template>

<script>
import eventBus from '@/utils/eventBus'
import { getAccount, editAccount, instantUpload } from '@/api/account'

export default {
  data () {
    return {
      formData: {
        name: '',
        mobile: '',
        email: '',
        intro: '',
        photo: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名称不能为空' },
          { min: 1, max: 7, message: '用户名称必须控制在2到10个字符' }
        ],
        email: [
          { required: true, message: '邮箱不能为空' },
          {
            pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
            message: '邮箱格式不正确'
          }
        ]
      }
    }
  },
  methods: {
    // 获取数据
    async getUserInfo () {
      let result = await getAccount()
      this.formData = result.data
    },
    // 编辑用户个人资料
    saveUserInfo () {
      this.$refs.userForm.validate(async isOk => {
        if (isOk) {
          await editAccount(this.formData)
          this.$message({ message: '保存成功', type: 'success' })
          eventBus.$emit('updateUserInfoSuccess')
        }
      })
    },
    // 图片上传
    async uploadImg (params) {
      let result = await instantUpload('photo', params.file)
      this.formData.photo = result.data.photo
      eventBus.$emit('updateUserInfoSuccess') // 触发
    }

  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
span {
  margin-left: 30px;
}
.head-img {
  position: absolute;
  left: 700px;
  top: 150px;
  height: 200px;
  width: 200px;
  border-radius: 50%;
}
</style>
