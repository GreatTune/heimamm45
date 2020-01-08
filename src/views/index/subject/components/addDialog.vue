<template>
  <el-dialog title="新增学科" :visible.sync="dialogFormVisible" width="600px" center>
    <el-form :model="addFrom">
      <el-form-item label="学科编号" :label-width="formLabelWidth">
        <el-input v-model="addFrom.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth">
        <el-input v-model="addFrom.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="addFrom.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="addFrom.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="addFrom.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      formLabelWidth: "120px",
      dialogFormVisible: false,
      addFrom:{},
    };
  }
};
</script>

<style lang="less">
// 对话框
  .el-dialog {
    .el-dialog__header {
      background: linear-gradient(
        225deg,
        rgba(20, 147, 250, 1),
        rgba(1, 198, 250, 1)
      );
      .el-dialog__title {
        color: #fff;
      }
    }
  }
</style>