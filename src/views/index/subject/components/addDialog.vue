<template>
  <el-dialog title="新增学科" :visible.sync="dialogFormVisible" width="600px" center>
    <el-form :model="addFrom" :rules="addRules" ref="addFrom">
      <el-form-item prop="rid" label="学科编号"  :label-width="formLabelWidth">
        <el-input v-model="addFrom.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="学科名称"  :label-width="formLabelWidth">
        <el-input v-model="addFrom.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="short_name" label="学科简称"  :label-width="formLabelWidth">
        <el-input v-model="addFrom.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="intro" label="学科简介"  :label-width="formLabelWidth">
        <el-input type="textarea" v-model="addFrom.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="学科备注"  :label-width="formLabelWidth">
        <el-input v-model="addFrom.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {subjectAdd} from '@/api/subject.js'
export default {
  data() {
    return {
      formLabelWidth: "120px",
      dialogFormVisible: false,
      addFrom:{
        // 学科编号
        rid: "",
        // 学科名称
        name: "",
        // 学科简历
        short_name: "",
        // 学科简介
        intro: "",
        // 学科备注
        remark: "",
      },
      addRules:{
        rid: [{required: true,message: "学科编号,不能为空!", trigger: "change" }],
        name: [{required: true,message: "学科名称,不能为空!", trigger: "change" }],
      },

    };
  },
  methods: {
    submitAdd(){
      this.$refs.addFrom.validate(valid=>{
        if (valid) {
          // 调用 api 新增接口
          subjectAdd(this.addFrom).then(res=>{
            window.console.log(res)
            if(res.coed === 200){
              // 如果是 200 , 则提示用户新增成功 , 同时关闭对话框 , 清空对话框内容
              this.$message.success("新增成功");
              // 关闭对话框
              this.dialogFormVisible = false;
              // 清空对话框内容
              this.$refs.addForm.resetFields();
            }else if (res.code === 201) {
              // 如果提示错误 201 id重复 也提示用户
              this.$message.warning("学科编号不能重复 , 请重新输入!");
            }
          });
        }else{
          this.$message.error("格式不对哦,请检查一下!");
          return false;
        }
      })
    }
  },
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