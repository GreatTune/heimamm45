<template>
  <el-container>
    <el-header>
      <!-- 左侧 -->
      <div class="header-left">
        <i class="left-icon el-icon-s-fold"></i>
        <img class="left-img" src="../../assets/logo (2).png" alt />
        <span class="left-text">黑马面面</span>
      </div>
      <!-- 右侧 -->
      <div class="header-right">
        <img src="../../assets/02.jpg" alt />
        <span class="right-text">疑惑猫,您好</span>
        <el-button @click="getlogout" type="primary" size="small">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    // 退出按钮点击事件
    getlogout(){
      
    }
  },
};
</script>

<style lang="less">
.el-container {
  height: 100%;
  .el-header {
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    line-height: 60px;
    // 顶部左边属性设置
    .header-left {
      display: flex;
      align-items: center;
      .left-icon {
        font-size: 24px;
      }
      .left-img {
        margin-left: 22px;
        margin-right: 11px;
      }
      .left-text {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    // 顶部右侧属性设置
    .header-right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
      }
      .right-text {
        margin-left: 9px;
        margin-right: 38px
      }
    }
  }
}
</style>