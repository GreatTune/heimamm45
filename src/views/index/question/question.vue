<template>
  <el-col>
    <el-card shadow="always" class="always">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <el-select v-model="formInline.region" placeholder="请选择学科">
            <el-option label="启用" value="shanghai"></el-option>
            <el-option label="禁用" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="formInline.region" placeholder="请选择阶段">
            <el-option label="启用" value="shanghai"></el-option>
            <el-option label="禁用" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-select v-model="formInline.region" placeholder="请选择企业">
            <el-option label="启用" value="shanghai"></el-option>
            <el-option label="禁用" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型">
          <el-select v-model="formInline.region" placeholder="请选择题型">
            <el-option label="启用" value="shanghai"></el-option>
            <el-option label="禁用" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="难度">
          <el-select v-model="formInline.region" placeholder="请选择难度">
            <el-option label="启用" value="shanghai"></el-option>
            <el-option label="禁用" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="启用" value="shanghai"></el-option>
            <el-option label="禁用" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-form-item label="标题">
            <el-input class="form-item__content" v-model="formInline.user"></el-input>
          </el-form-item>
          <el-button class="el-btn" type="primary" @click="onSubmit">搜索</el-button>
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
        <el-table-column prop="name" label="题目"></el-table-column>
        <el-table-column prop="amount1" label="学科.阶段"></el-table-column>
        <el-table-column prop="amount2" label="题型"></el-table-column>
        <el-table-column prop="amount3" label="企业"></el-table-column>
        <el-table-column prop="amount3" label="创建者"></el-table-column>
        <el-table-column prop="amount3" label="状态"></el-table-column>
        <el-table-column prop="amount3" label="访问量"></el-table-column>
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
      total: 11,
      pageSize: [2, 10, 16, 20],
      currentPage4: 2,
      formInline: {
        user: "",
        region: ""
      },
      // 日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: ""
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
.el-form-item{
  .el-form-item__label {
    padding-right: 30px;
  }
}
.el-form-item__content{
  padding-right: 20px;
.el-input{ 
  width: 150px;
}

// 标题输入框
.form-item__content {
  width: 388px;
}
.el-btn {
  margin-left: -20px;
}
}
</style>