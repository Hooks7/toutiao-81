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
        <quill-editor
          style="width:800px;height:400px;margin-bottom:100px"
          placeholder="请输入内容"
          type="textarea"
          v-model="formData.content"
        ></quill-editor>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="formData.cover.type" @change="changeType">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 父组件给子组件传值  props 封面图片-->
      <el-form-item>
        <!-- 子组件 -->
        <cover-image @updateImages="updateImages" :images="formData.cover.images"></cover-image>
        <!-- 接受子传父 -->
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <el-option :label="item.name" :value="item.id" v-for="item in channels" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="info" plain @click="publish(false)">发布</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
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
        title: [
          { required: true, message: '请输入内容', tigger: 'blur' },
          {
            min: 5,
            max: 30,
            message: '标题内容必须在5到30个字符之间'
          }
        ],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    // 传过来的参数
    updateImages (url, index) {
      // 数据改变视图
      this.formData.cover.images = this.formData.cover.images.map((item, i) => {
        // if (i === index) {
        //   // 更新某条数据
        //   return url
        // }
        // return item
        console.log(item)
        return i === index ? url : item
      })
    },
    changeType () {
      // 获取最新数据类型
      // 根据type属性改变imgaes属性
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    // 发布内容
    publish (draft) {
      this.$refs.myForm.validate(isOk => {
        if (isOk) {
          let { articleId } = this.$route.params // 接受id
          let method = articleId ? 'put' : 'post' // 根据id判断是新增还有修改
          let url = articleId ? `/articles/${articleId}` : 'articles' // 根据id判断当前请求地址
          this.$http({
            method,
            url,
            params: { draft }, // 是否存在草稿
            data: this.formData
          }).then(result => {
            this.$router.push('/home/articles')
          })
        }
      })
    },
    // 修改内容
    getArticleById () {
      let { articleId } = this.$route.params // 接受内容列表修改传来的id
      this.$http({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data // 将文章数据传入进行绑定
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
    let { articleId } = this.$route.params

    articleId && this.getArticleById() // 编辑频道
    this.getChannels() // 获取频道
  }
}
</script>

<style>
</style>
