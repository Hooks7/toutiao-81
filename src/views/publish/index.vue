<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form ref="myForm" :model="formData" :rules="rules" label-width="80px" class="publish-form">
      <el-form-item prop="title" label="标题">
        <el-input placeholder="请输入内容" style="width:400px" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <el-input placeholder="请输入内容" type="textarea" :rows="4" v-model="formData.content"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <el-option :label="item.name" :value="item.id" v-for="item in channels" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="info" plain @click="publish(false)">发布</el-button>
        <el-button @click='publish(true)'>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        channel_id: null,
        cover: {
          type: 0,
          images: []
        }
      },
      rules: {
        title: [{ required: true, message: '请输入内容', tigger: 'blur' },
          {
            min: 5,
            max: 30,
            message: '标题内容必须在5到30个字符之间'
          }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    // 发布内容
    publish (draft) {
      this.$refs.myForm.validate(isOk => {
        if (isOk) {
          this.$http({
            method: 'post',
            url: 'articles',
            params: { draft }, // 是否存在草稿
            data: this.formData
          }).then(result => {})
        }
      })
    },
    // 获取频道列表
    getChannels () {
      this.$http({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>
</style>
