<template>
  <div class="subject-content">
    <el-card shadow="always" class="always">
      <el-form :inline="true" :model="formInline" class="demo-form-inline"  ref="formInline">
        <el-form-item label="学科编号">
          <el-input class="input-small" v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input class="input-normall" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="input-small" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="input-normall" v-model="formInline.status" placeholder="请选择状态">
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
        <el-table-column prop="status" label="状态" width="180">
          <span>禁用</span>
          <span>启用</span>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="">
            <el-button type="text">编辑</el-button>
            <el-button type="text">禁用</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <addDialog ref="addDialog"></addDialog>
  </div>
</template>

<script>
import addDialog from "./components/addDialog";
// 导入api接口
import { subjectList } from "@/api/subject.js";
export default {
  data() {
    return {
      // 表单数据
      tableData: [],
      // 行内表单数据
      formInline: {
        rid: "",
        name: "",
        username: "",
        status: ""
      },
      // 默认页码
      page: 1,
      // 页容量选项
      pageSizes: [2, 10, 16, 20],
      // 页容量
      size: 2,
      // 总条数
      total: 0
    };
  },
  created() {
    subjectList({
      // 使用定义好的数据, 方便后期维护
      // 页码
      page: this.page,
      // 页容量
      limit: this.size,
      // 将formInline合并起来
      ...this.formInline
    }).then(res => {
      window.console.log(res);
      // 数据赋值
      this.tableData = res.data.items;
    });
  },
  components: {
    addDialog
  },
  methods: {
    handleSizeChange(size) {
      window.console.log(`每页 ${size} 条`);
      // 把页码保存起来
      this.size = size;
      // 回到第一页
      this.page = 1;
      // 通过新的页面去调用数据
    },
    handleCurrentChange(current) {
      window.console.log(`当前页: ${current}`);
      // 把页面保存起来
      this.page = current;
    }
  }
};
</script>

<style lang="less">
.subject-content {
  .always {
    margin-bottom: 19px;
  }
  .input-small {
    width: 100px;
  }
  .input-normall {
    width: 150px;
  }
  // 分页
  .el-card__body {
    .is-background {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }
  }
}
</style>