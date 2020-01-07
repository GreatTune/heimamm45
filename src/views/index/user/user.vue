<template>
  <el-col>
    <el-card shadow="always" class="always">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="启用" value="shanghai"></el-option>
            <el-option label="禁用" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="removeClick">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addClick">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="always" class="always">
      <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="amount1" label="电话"></el-table-column>
        <el-table-column prop="amount2" label="邮箱"></el-table-column>
        <el-table-column prop="amount3" label="角色"></el-table-column>
        <el-table-column prop="amount3" label="备注"></el-table-column>
        <el-table-column prop="amount3" label="状态"></el-table-column>
        <el-table-column prop="amount3" label="操作"></el-table-column>
      </el-table>
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
  </el-col>
</template>

<script>
export default {
  data() {
    return {
      tableData: "",
      total: 11,
      pageSize: [2, 10, 16, 20],
      currentPage4: 2,
      formInline: {
        user: "",
        region: ""
      },
    };
  },

  methods: {
    onSubmit() {
      window.console.log("你好");
    },
    addClick() {
      window.console.log("你好");
    },
    removeClick() {
      window.console.log("你好");
    },
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
</style>