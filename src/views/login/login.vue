<template>
  <div class="login-content">
    <div class="left">
      <div class="box-title">
        <img class="left-img" src="../../assets/logo.png" alt />
        <div class="left-title">黑马面面</div>
        <div class="left-link"></div>
        <div class="left-user-title">用户登录</div>
      </div>
      <!-- 用户输入框 -->
      <div class="demo-input-suffix login-icon">
        <el-input class="login-user" placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="inputUser"></el-input>
        <el-input class="login-user" placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="inputWrap"></el-input>
        <el-row>
          <!-- 验证码输入框 -->
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-input class="login-code" placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="inputCode"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <!-- 验证码图形接收 -->
            <div class="grid-content bg-purple-light ">
              <img src="" alt="">
            </div>
          </el-col>
        </el-row>
        <!-- 勾选框 -->
        <el-checkbox class="lef-text" v-model="checked">我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link type="primary">隐私条款</el-link></el-checkbox>
        <!-- 点击按钮 -->
        <div>
          <el-button class="left-bottom" type="primary">登录</el-button>
          <el-button class="left-bottom" type="primary">注册</el-button>
        </div>
      </div>
    </div>
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputUser: "",
      inputWrap: "",
      inputCode: "",
      checked: false,
    };
  }
};
</script>

<style lang="less">
.login-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  height: 100%;
  .left {
    display: inline-block;
    width: 478px;
    height: 550px;
    padding-top: 48px;
    background: rgba(245, 245, 245, 1);
    box-sizing: content-box;
    .box-title {
      display: flex;
      align-items: center;
      margin-left: 48px;
      .left-img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .left-title {
        font-size: 24px;
        font-weight: 400;
        margin-right: 14px;
      }
      .left-link {
        width: 1px;
        height: 28px;
        margin-right: 12px;
        background: rgba(199, 199, 199, 1);
      }
      .left-user-title {
        font-size: 22px;
        font-weight: 400px;
      }
    }
    .login-icon {
      margin-top: 29px;
      margin-bottom: 32px;
      margin-left: 43px;
      .login-user {
        width: 394px;
        // height: 43px;
        // margin-left: 43px;
        margin-bottom: 25px;
        border-radius: 4px;
        border: 1px solid rgba(204, 207, 213, 1);
      }
      .login-code {
        width: 284px;
        // height: 44px;
        margin-top: 1px;
        margin-bottom: 32px;
        border: 1px solid rgba(204, 207, 213, 1);
      }
      .lef-text {
        margin-bottom: 28px;
      }
      .left-bottom {
        width: 394px;
        height: 40px;
        margin-left: 0;
        margin-bottom: 26px;
      }
    }
  }
  .bg {
    height: 100%;
  }
}
</style>