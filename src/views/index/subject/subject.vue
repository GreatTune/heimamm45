<template>
  <div class="subject-contentt">
    <el-card shadow="always" class="always">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="启用" value="shanghai"></el-option>
            <el-option label="禁用" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$refs.addDialog.dialogFormVisible=true"
          >新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="always" class="always">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="70" type="index"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="180"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="180"></el-table-column>
        <el-table-column prop label="简介" width="180"></el-table-column>
        <el-table-column prop="username" label="创建者" width="180"></el-table-column>
        <el-table-column prop="date" label="创建日期" width="180"></el-table-column>
        <el-table-column prop="status" label="状态" width="180"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary">编辑</el-button>
          <el-button type="primary">禁用</el-button>
          <el-button type="primary">删除</el-button>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="pageSize"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <addDialog ref="addDialog"></addDialog>
  </div>
</template>

<script>
import addDialog from "./components/addDialog";
export default {
  data() {
    return {
      // 表单数据
      tableData: [],
      // 分页
      total: 11,
      pageSize: [2, 10, 16, 20],
      currentPage4: 2,
      formInline: {
        user: "",
        region: ""
      }
    };
  },
  components: {
    addDialog
  },

  methods: {
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less">
.subject-content {
  .always {
    margin-bottom: 19px;
  }
  .el-main {
    background-color: #e8e9ec;
    .el-col-8 {
      width: 100%;
    }
  }
  .el-card__body {
    .is-background {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }
  }
}
</style>