<template>
  <el-card >
      <bread-crumb slot='header'>
       <template slot='title'>账户信息</template>
      </bread-crumb>
      <el-form label-width="100px">
          <!-- 用户名 -->
          <el-form-item label='用户名称'>
              <el-input style='width:300px' v-model="formData.name"></el-input>
          </el-form-item>
           <!-- 简介 -->
          <el-form-item label='用户简介'>
                <el-input style='width:300px' v-model="formData.intro"></el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item label='用户邮箱'>
                <el-input style='width:300px' v-model="formData.email"></el-input>
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item label='用户手机号'>
                <el-input style='width:300px' disabled v-model="formData.mobile"></el-input>
          </el-form-item>
         <!-- 保存按钮 -->
         <el-form-item>
             <el-button type='primary'>保存信息</el-button>
         </el-form-item>
      </el-form>
      <img class='head-img' :src="formData.photo" alt="">
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        mobile: '',
        email: '',
        intro: '',
        photo: ''
      }
    }
  },
  methods: {
    async getUserInfo () {
      let result = await this.$http({ url: 'user/profile' })
      this.formData = result.data
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
span{
  margin-left:30px
}
.head-img{
     position: absolute;
     left: 700px;
     top:150px;
     height: 200px;
     width: 200px;
     border-radius: 50%;
}
</style>
