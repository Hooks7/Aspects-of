<template>
  <el-card>
    <div class="dashboard-container">
      <div class="app-container">
        <el-form :rules="rules" :model="ruleForm" ref="ruleForm">
          <el-form-item label="标题" prop="title">
            <el-input style="width:654px" v-model="ruleForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <!-- 富文本编辑器 -->
          <el-form-item prop="articleBody">
            <quill-editor
              style="width:707px;height:218px;margin-top:21px; margin-bottom:81px"
              type="textarea"
              placeholder="请输入内容"
              v-model="ruleForm.articleBody"
            ></quill-editor>
          </el-form-item>
          <el-form-item label="视频地址" prop="videoURL">
            <el-input style="width:640px" placeholder="请输入视频地址" v-model="ruleForm.videoURL"></el-input>
          </el-form-item>
          <el-form-item style="margin:50px 0 0 300px">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button type="info" @click="headback">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-card>
</template>
<script>
import { add, detail } from '../../api/hmmm/articles'
export default {
  data() {
    return {
      ruleForm: {
        title: '', // 标题
        articleBody: '', // 副本问内容
        videoURL: '' // 视频地址
      },
      rules: {
        // 校验
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
         articleBody: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        videoURL: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      // 提交
      this.$refs.ruleForm.validate(async isOk => {
        if (isOk) {
          await add({
            title: this.ruleForm.title,
            articleBody: this.ruleForm.articleBody,
            videoURL: this.ruleForm.videoURL
          })
          this.$router.push('/articles/list')
        }
      })
    },
    // 跳转
    headback() {
      this.$router.push('/articles/list')
    },
    // 修改
    async getArticleByid() {
      let { articleId } = this.$route.params
      // console.log(articleId)
      let result = await detail({
        id: articleId
      })
      console.log(result.data)
      this.ruleForm = result.data
    }
  },
  created() {
    let { articleId } = this.$route.params
    if (articleId) {
      this.getArticleByid()
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  width: 100%;
  height: 100vh;
}
</style>
