<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="addTime" label="日期" width="180"></el-table-column>
      <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
      <el-table-column prop="id" label="试题ID"></el-table-column>
      <el-table-column prop="progressOfAnswer" label="答题进度"></el-table-column>
      <el-table-column prop="accuracyRate" label="正确率"></el-table-column>
      <el-table-column prop="totalSeconds" label="答题总耗时（秒）"></el-table-column>
      <el-table-column prop="questionType" label="组题类型/详情"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="del(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin:20px ;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.currentpage"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import { randoms, removeRandoms } from '../../api/hmmm/questions'
import {simple} from '@/api/hmmm/subjects'
export default {
  name: 'QuestionsRandoms',
  methods: {
    del(row) {      
      this.$confirm('您确定要删除吗').then(() => {
        // console.log(tableData)
          removeRandoms({id: row})
      })
    },
    changePage(newpage) {
      this.page.currentpage = newpage
      this.getasd()
    },
    async getasd() {
      // console.log(await randoms())
      let n1 = await randoms({
        page: this.page.currentpage,
        pagesize: this.page.pageSize
      })
      // console.log(n1.data.items)
      this.tableData = n1.data.items
      // console.log(this.tableData)
      this.page.total = n1.data.pages
      console.log(this.page.total)
    }
  },

  data() {
    return {
      tableData: [],
      page: {
        pageSize: 10,
        total: 0,
        currentpage: 1
      }
    }
  },
  created() {

    this.getasd()
  }
}
</script>

<style scoped >
</style>
