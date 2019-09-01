<template>
  <div class="dashboard-container">
    <el-card>
      <!-- 新增学科 -->
      <el-button type="primary" @click="openDialog">新增学科</el-button>
      <el-row style="margin:10px 10px 0 0" type="flex" justify="space-between">
        <div>
          <el-form label-width="80px">
            <el-form-item label="学科名称">
              <el-input v-model="input"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="screen">搜索</el-button>
        </div>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%"  v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column prop="id" label="序号" width="60"></el-table-column>
        <el-table-column label="学科名称" width="120">
          <span slot-scope="p">{{p.row.subjectName}}</span>
        </el-table-column>
        <el-table-column prop="creatorID" label="创建者" width="100"></el-table-column>
        <el-table-column prop="addDate" label="创建日期" width="180">
          <span slot-scope="obj">{{obj.row.addDate | parseTimeByString}}</span>
        </el-table-column>
        <el-table-column prop="isFrontDisplay" label="前台是否显示" width="130"></el-table-column>
        <el-table-column prop="twoLevelDirectory" label="二级目录" width="130"></el-table-column>
        <el-table-column prop="tags" label="标签" width="100"></el-table-column>
        <el-table-column prop="totals" label="题目数量"></el-table-column>
        <el-table-column prop="address" label="操作" width="220">
          <template slot-scope="scope">
            <span size="mini" @click="subjectClassification" style="cursor:pointer; color:blue">学科分类</span>
            <span size="mini" @click="labelManagement" style="cursor:pointer; color:blue">学科标签</span>
            <span
              size="mini"
              @click="edit(scope.$index,scope.row)"
              style="cursor:pointer; color:blue"
            >编辑</span>
            <span
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index,scope.row)"
              style="cursor:pointer; color:blue"
            >删除</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增弹层 -->
      <el-dialog
        :title="this.form.id ? '修改学科' : '新增学科'"
        :visible="showDialog"
        @close="showDialog = false"
      >
        <el-form label-width="80px">
          <el-form-item label="学科名称">
            <el-input v-model="form.subjectName"></el-input>
          </el-form-item>
          <el-form-item label="是否显示">
            <el-switch active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="subMit">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 分页 -->
      <el-row type="flex" justify="center" style="margin:20px 0">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="page.currentPage"
          :page-sizes="page.pageSize"
          @current-change="changePage"
          :total="page.total"
        ></el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {
  list,
  simple,
  remove,
  add,
  detail,
  update
} from '../../api/hmmm/subjects'

import subJectAdd from '../components/subjects-add' // 引入弹框组件
export default {
  name: 'SubjectsList',
  data() {
    return {
      loading:false,
      input: '',
      value: '',
      showDialog: false,
      tableData: [],
      simple: [],
      page: {
        pageSizes: 10,
        total: 0,
        currentPage: 1
      },
      form: {
        subjectName: '',
        isFrontDisplay: true
      }
    }
  },
  methods: {
    // 打开弹框
    openDialog() {
      this.form.subjectName = ''
      this.form.id = ''
      this.showDialog = true
    },

    // 编辑
    async edit(index, row) {
      this.showDialog = true
      let p = await detail(row)
      this.form = p.data
    },

    //切换页码
    changePage(newPage) {
      this.page.currentPage = newPage
      this.getList()
    },

    // 添加学科或者修改
    async subMit() {
      if (this.form.id) {
        await update(this.form)
      } else {
        await add(this.form)
      }
      this.getList()
      this.form.subjectName = ''
      this.showDialog = false
    },

    // 学科分类
    subjectClassification() {
      this.$router.push('/subjects/directorys')
    },
    labelManagement() {
      this.$router.push('/subjects/tags')
    },

    // 删除
    async handleDelete(index, row) {
      await this.$confirm('确定要删除吗', '提示')
      await remove(row)
      this.getList()
    },

    //  显示列表
    async getList() {
      this.loading = true
      let n = await list({
        page: this.page.currentPage,
        pagesize: this.pageSizes
      })
      this.tableData = n.data.items
      this.page.total = n.data.counts
      this.loading = false
    },
    // 筛选
    screen() {
        this.tableData =  this.tableData.filter(item => item.subjectName.indexOf(this.input) > -1 )
    },
    //清除
    clear() {
        this.input = '',
        this.getList()
    }

  },

  

  async created() {
    await this.getList()
    // 学科简单列表
    let w = await simple()
    this.simple = w.data
  }
}
</script>

<style scoped>
</style>
