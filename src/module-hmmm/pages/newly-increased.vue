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
import { add, detail, update } from '../../api/hmmm/articles'
export default {
  data() {
    return {
      ruleForm: {
        title: '', // 标题
        articleBody: '', // 副本问内容
        videoURL: '' // 视频地址
      },
      loading: true,
      rules: {
        // 校验
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        articleBody: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        videoURL: [{ required: true, message: '请输入地址', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(async isOk => {
        if (isOk) {
          let articleId = Number(this.$route.params.articleId) // id
          // 接受传参
          let parameter = {
            title: this.ruleForm.title,
            articleBody: this.ruleForm.articleBody,
            videoURL: this.ruleForm.videoURL
          }
          articleId
            ? await update({ id: articleId, ...parameter }) // 修改
            : await add({ ...parameter }) // 新增
          this.jump()
        }
      })
    },

    // 取消跳转主页
    headback() {
      this.jump()
    },

    // 获取数据
    async getArticleByid() {
      let { articleId } = this.$route.params
      let result = await detail({ id: articleId })
      this.ruleForm = result.data
    },

    // 跳转主页
    jump() {
      this.$router.push('/articles/list')
    }
  },

  created() {
    let { articleId } = this.$route.params
    articleId && this.getArticleByid() // 获取数据（文章详情）
  }
}
</script>

<style scoped>
.dashboard-container {
  width: 100%;
  height: 100vh;
}
</style>
