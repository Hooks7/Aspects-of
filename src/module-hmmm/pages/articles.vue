<template>
  <el-card>
    <div class="dashboard-container">
      <!-- <div class="app-container">面试技巧</div> -->
      <el-button type="success" plain @click="jump">新增面试技巧</el-button>
      <el-row type="flex" style="margin-top:15px" justify="space-between">
        <el-col :span="6">
          <el-input placeholder="请输入题目编号/题干">
            <template slot="prepend">关键字</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-delete">清除</el-button>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="list" style="margin-top:20px">
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="阅读数" prop="reads"></el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="录入人" prop="creator"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text" size="small">预览</el-button>
            <el-button type="text" size="small">修改</el-button>
            <el-button type="text" size="small">删除</el-button>
            <el-button type="text" size="small">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="center"><el-col :span="8" style="margin-top:25px">
      <el-pagination
      layout="prev,pager,next"
       background
      :total="100">
      </el-pagination>
      </el-col></el-row>
    </div>
  </el-card>
</template>

<script>
// 文章列表
import { list } from '../../api/hmmm/articles'
export default {
  name: 'ArticlesList',
  data() {
    return {
      list: []
    }
  },
  methods: {
    jump() {
      this.$router.push('/articles/newly')
    }
  },
  async created() {
    // 文章列表
    let result = await list()
    console.log(result)
    this.list = result.data.items
  }
}
</script>

<style scoped>
.dashboard-container {
  width: 100%;
  height: 100vh;
}
.flex {
  display: flex;
  flex-direction: row-reverse;
}
</style>
