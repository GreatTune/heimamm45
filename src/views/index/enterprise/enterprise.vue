<template>
  <el-col>
    <el-card shadow="always" class="always">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
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
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="removeClick">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addClick">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="always" class="always">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="150" type="index"></el-table-column>
        <el-table-column prop="rid" label="企业编号" width="200"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="200"></el-table-column>
        <el-table-column prop="username" label="创建者" width="200"></el-table-column>
        <el-table-column prop="date" label="创建日期" width="200"></el-table-column>
        <el-table-column prop="status" label="状态" width="200"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary">编辑</el-button>
          <el-button type="primary">禁用</el-button>
          <el-button type="primary">删除</el-button>
        </el-table-column>
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
      total: 11,
      pageSize: [2, 10, 16, 20],
      currentPage4: 2,
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          rid: "BAD1",
          name: "黑马程序员",
          username: "王小虎",
          date: "2016-05-02",
          status: "启用"
        },
        {
          rid: "BAD1",
          name: "黑马程序员",
          username: "王小虎",
          date: "2016-05-02",
          status: "启用"
        },
        {
          rid: "BAD1",
          name: "黑马程序员",
          username: "王小虎",
          date: "2016-05-02",
          status: "启用"
        },
        {
          rid: "BAD1",
          name: "黑马程序员",
          username: "王小虎",
          date: "2016-05-02",
          status: "启用"
        },
        {
          rid: "BAD1",
          name: "黑马程序员",
          username: "王小虎",
          date: "2016-05-02",
          status: "启用"
        }
      ]
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
    margin-top: 30px
  }
}
</style>