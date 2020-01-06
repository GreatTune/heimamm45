<template>
  <el-container>
    <el-header>
      <!-- 左侧 -->
      <div class="header-left">
        <i class="left-icon el-icon-s-fold" @click="collapse=!collapse"></i>
        <img class="left-img" src="../../assets/logo (2).png" alt />
        <span class="left-text">黑马面面</span>
      </div>
      <!-- 右侧 -->
      <div class="header-right">
        <!-- 头像显示板块 -->
        <img :src="userInfo.avatar" alt />
        <!-- 昵称显示板块 -->
        <span class="right-text">{{userInfo.username}},您好</span>
        <!-- 退出按钮板块 -->
        <el-button @click="getlogout" type="primary" size="small">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 导航菜单 -->
      <el-aside width="aotu">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="collapse"
        >
          <el-menu-item index="1">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入api方法
import { info, logout } from "../../api/login.js";
// 导入删除token方法
import { removeToken } from "../../utils/token.js";
export default {
  data() {
    return {
      // 存储获取得到的用户信息
      userInfo: {},
      // 是否折叠菜单
      collapse: false
    };
  },
  created() {
    info().then(res => {
      this.userInfo = res.data.data;
      // window.console.log(res)
      this.userInfo.avatar =
        process.env.VUE_APP_BASEURL + "/" + this.userInfo.avatar;
    });
  },
  methods: {
    // 退出按钮点击事件
    getlogout() {
      this.$confirm("您好,退出后需要重新登录!确定退出吗?", "提示", {
        confirmButtonText: "残忍退出",
        cancelButtonText: "再考虑考虑",
        type: "warning"
      })
        .then(() => {
          // 点击确认  调用出退出接口
          logout().then(res => {
            // window.console.log(res)
            // 点击确认之后 删除token 返回登录页面
            if (res.data.code === 200) {
              // 清除会话保持 token
              removeToken();
              // 跳转回到login 登录页面
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          // 点击取消
        });
    },
    handleOpen(){
      window.console.log("你好")
    },
    handleClose(){
      window.console.log("你好")
    }
  }
};
</script>

<style lang="less">
// 菜单折叠
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
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
        margin-right: 38px;
      }
    }
  }
}
</style>