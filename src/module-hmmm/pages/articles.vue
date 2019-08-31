/* eslint-disable vue/no-dupe-keys */
/* eslint-disable vue/no-dupe-keys */
<template>
  <el-card>
    <div class="dashboard-container">
      <div class="app-container">
        <el-button type="success" plain @click="jump">新增面试技巧</el-button>
        <el-row type="flex" style="margin-top:15px" justify="space-between">
          <el-col :span="6">
            <el-input placeholder="请输入题目编号/题干" v-model="inputBox" >
              <template slot="prepend">关键字</template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" icon="el-icon-delete" @click="eliminate">清除</el-button>
            <el-button type="primary" icon="el-icon-search" @click="seek">搜索</el-button>
          </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table :data="list" style="margin-top:20px " stripe >
          <el-table-column label="序号"  width="150" prop="id"></el-table-column>
          <el-table-column label="标题"  width="430" prop="title"></el-table-column>
          <el-table-column label="阅读数" width="150" prop="state"></el-table-column>
          <el-table-column label="状态" prop="state" :formatter="formatter"></el-table-column>
          <el-table-column label="录入人" prop="creator"></el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button type="text" showConfirmButton='false' size="small" @click="open(scope.row)">预览</el-button>

              <el-button type="text" size="small" @click="amend(scope.row) ">修改</el-button>
              <el-button type="text" size="small" @click="removelist(scope.row)">删除</el-button>
              <!-- 打开关闭功能 -->
              <el-button
                type="text"
                size="small"
                :style="{color:scope.row.state?'#F56C6C':'#E6A23C'}"
                @click="closeopen(scope.row)"
              >{{scope.row.state?'禁用':'打开'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="center" style="margin-top:20px">
          <el-pagination
            layout="prev,pager,next,jumper"
            background
            @current-change="changePage"
            :page-size="page.pageSize"
            :current-page="page.currentpage"
            :total="page.total"
          ></el-pagination>
        </el-row>
      </div>
    </div>
  </el-card>
</template>

<script>
// 文章列表
import { list, remove, state } from '../../api/hmmm/articles'
export default {
  name: 'ArticlesList',
  data() {
    return {
      // 文章列表
      list: [],
      // 页面数据
      page: {
        pageSize: 10,
        total: 0,
        currentpage: 1

      },
      // 输入框
      inputBox: '',
        table: false,
        dialog: false,
        loading: false
    }
  },
  methods: {

    // 新增跳转
    jump() {
      this.$router.push('/articles/newly')
    },

    // 修改跳转
    async amend(row) {
      this.$router.push(`/articles/newly/${row.id}`)
    },

    // 删除
    async removelist(row) {
      await this.$confirm('您确定要删除吗', '提示')
      await remove(row)
      this.getList()
    },

    // 评论状态
    formatter(callValue) {
      return callValue.state ? '正常' : '禁用'
    },

    // 修改评论状态
    async closeopen(row) {
      let mess = row.state ? '禁用' : '打开'
      await this.$confirm(`您确定定要${mess}吗`, '提示')
      await state({ id: row.id, state: Number(!row.state) })
      this.getList()
    },

    // 清除搜索框
    eliminate() {
      this.inputBox = ''
      this.getList()
    },

    // 预览
    open(row) {
      this.$alert(row.articleBody, row.title, {
           dangerouslyUseHTMLString: true
      })
    },
    // 分页
    changePage(newpage) {
      this.page.currentpage = newpage
      this.getList()
    },

    // 获取列表数据
    async getList() {
      let result = await list({
        page: this.page.currentpage,
        pagesize: this.page.pageSize
      })
      this.list = result.data.items
      this.page.total = result.data.counts
    },

    // 搜索
    seek() {
      if (!this.inputBox) {
        this.getList()
      }
     this.list = this.list.filter(item =>
           item.title.startsWith(this.inputBox)
        )
        this.page.total = 1
    }
  },

  created() {
    // 文章列表
    this.getList()
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
