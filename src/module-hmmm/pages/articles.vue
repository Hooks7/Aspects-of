<template>
  <el-card>
    <div class="dashboard-container">
      <div class="app-container">面试技巧</div>
      <el-button  @click="jump">新增面试技巧</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ArticlesList',
  data() {
    return {}
  },
  methods: {
    jump() {
      this.$router.push('/articles/newly')
    }
  }
}
</script>

<style scoped>
</style>
