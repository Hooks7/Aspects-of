<template>
  <div class="dashboard-container">
    <el-card>
      <!-- 新增学科 -->
     <el-button type="primary" @click="showDialog = true">新建标签</el-button>
     <el-button type="primary" @click="toDiscipline">返回学科</el-button>
     <!-- 表单 -->
      <el-row style="margin:10px 10px 10px 0" type="flex" justify="space-between">
       <div>
          <span style="margin-right:10px">学科名称</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in simple"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      <div>
          <el-button>清除</el-button>
          <el-button type="primary">搜索</el-button>
      </div>
      </el-row>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="subjectName"
          label="标签名称"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="creatorID"
          label="创建者"
          width="150">
        </el-table-column>
         <el-table-column
          prop="addDate"
          label="创建日期"
          width="200">
        </el-table-column>
         <el-table-column
          prop="isFrontDisplay"
          label="面试题数量"
          width="162">
        </el-table-column>
         <el-table-column
          prop="totals"
          width="180"
          label="状态">
        </el-table-column>
         <el-table-column
          prop="address"
          label="操作"
          width="220">
          <template slot-scope="scope">
          <span
          size="mini"
          @click="subjectClassification" style="cursor:pointer; color:blue">学科分类</span>
        <span
          size="mini"
          @click="labelManagement" style="cursor:pointer; color:blue">学科标签</span>
        <span
          size="mini"
          @click="handleEdit(scope.$index, scope.row)" style="cursor:pointer; color:blue">编辑</span>
        <span
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index,scope.row)" style="cursor:pointer; color:blue">删除</span>
      </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新增学科" :visible='showDialog' @close="showDialog = false">
        <el-card>
          <layout-add></layout-add>
        </el-card>
      </el-dialog>

      <!-- 分页 -->
    <el-row type="flex" justify="center" style="margin:20px 0">
      <!-- <el-pagination
      background
      layout="prev, pager, next"
      :current-page="page.currentPage"
      :page-sizes="page.pageSize"
      @current-change="changePage"
      :total="page.total">
    </el-pagination> -->
    </el-row>
  </el-card>
  </div>
</template>

<script>
export default {
  name: 'TagsList',
  data() {
    return {}
  },
  methods:{
    toDiscipline() {
      this.$router.push('/subjects/list')
    }
  }
}
</script>

<style scoped>
</style>
