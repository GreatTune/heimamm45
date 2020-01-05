<template>
  <div class="login-content">
    <!-- 左边登录框板块 -->
    <div class="left">
      <!-- 顶部导航 -->
      <div class="box-title">
        <img class="left-img" src="../../assets/logo.png" alt />
        <div class="left-title">黑马面面</div>
        <div class="left-link"></div>
        <div class="left-user-title">用户登录</div>
      </div>
      <div>
        <!-- 用户登录框 -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="43px"
          class="demo-ruleForm login-from"
        >
          <!-- 手机号输入框 -->
          <el-form-item label prop="phone">
            <el-input prefix-icon="el-icon-user" placeholder="请输入手机号" v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <!-- 密码输入框 -->
          <el-form-item label prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              v-model="ruleForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <!-- 验证码板块 -->
          <el-row>
            <!-- 验证码输入框 -->
            <el-col :span="18">
              <div class="grid-content bg-purple">
                <el-form-item label prop="code">
                  <el-input prefix-icon="el-icon-key" placeholder="请输入验证码" v-model="ruleForm.code"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <!-- 验证码图片获取 -->
            <el-col class="code-img" :span="6">
              <img @click="codeClick" :src="codeUrl" alt />
            </el-col>
          </el-row>
          <!-- 用户协议 -->
          <el-checkbox class="login-checked" v-model="ruleForm.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
          <el-form-item>
            <!-- 登录按钮 -->
            <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <!-- 注册按钮 -->
            <el-button
              class="login-btn login-btns"
              type="primary"
              @click="dialogFormVisible = true"
            >注册</el-button>
          </el-form-item>
        </el-form>
        <el-dialog title="用户注册" :visible.sync="dialogFormVisible" width="600px" center>
          <el-form :model="form" :rules="register">
            <!-- 头像上传 -->
            <el-form-item label="头像" :label-width="formLabelWidth">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <!-- 昵称输入框 -->
            <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
              <el-input v-model="form.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 邮箱输入框 -->
            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 手机号输入框 -->
            <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 密码输入框 -->
            <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-row>
              <!-- 图形码输入框 -->
              <el-col :span="16">
                <el-form-item label="图形码" :label-width="formLabelWidth" prop="graphic">
                  <el-input class="code-input" v-model="form.graphic" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <!-- 图形码获取 -->
              <el-col :offset="1" :span="7">
                <img class="graphic" @click="graphicClick" :src="graphicUrl" alt />
              </el-col>
            </el-row>
            <el-row>
              <!-- 验证码输入框 -->
              <el-col :span="16">
                <el-form-item label="验证码" :label-width="formLabelWidth" prop="imgCode">
                  <el-input class="code-input" v-model="form.imgCode" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <!-- 验证码获取按钮 -->
              <el-col :offset="1" :span="7">
                <el-button @click="verification">获取用户验证码</el-button>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <!-- 右边图片模块 -->
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
import login from '../../api/login'
// 判断手机号输入框输入状态
var validatephone = (rule, value, callback) => {
  if (value === "") {
    // 如果输入内容为空 . 则提示
    callback(new Error("手机号码不能为空!"));
  } else {
    // 判断手机号码格式是否正确
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(value) == true) {
      callback();
    } else {
      // 如果不正确 , 则提示
      callback(new Error("手机号码不正确 , 请重新输入!"));
    }
    callback();
  }
};
export default {
  data() {
    return {
      codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login", // 验证码获取
      graphicUrl: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms", // 图形码获取
      imageUrl: "", // 头像上传
      ruleForm: {
        phone: "", // 手机号
        password: "", // 密码
        code: "", // 验证码
        checked: false // 勾选框是否勾选
      },
      // 注册对话框板块
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {
        nickname: "", //昵称
        email: "", // 邮箱
        phone: "", // 手机号
        password: "", // 密码
        graphic: "", // 图形码
        imgCode: "" // 验证码
      },
      // 输入框输入条件判断
      rules: {
        // 判断手机个数是否正确
        phone: [
          { validator: validatephone, trigger: "blur" },
          { min: 11, max: 11, message: "长度为11位数", trigger: "blur" }
        ],
        // 判断密码位数是否正确
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度为6~18位数", trigger: "blur" }
        ],
        // 判断验证码位数是否正确
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为4位数", trigger: "blur" }
        ]
      },
      register: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 16, message: "长度为2~16位数", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" }
          // { min: 2, max: 16, message: "长度为2~16位数", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11位数", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度为6~16位数", trigger: "blur" }
        ],
        graphic: [
          { required: true, message: "请输入图形验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为4位数", trigger: "blur" }
        ],
        imgCode: [
          { required: true, message: "请输入手机验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为4位数", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 验证码点击事件  点击验证码图片重新获取验证码
    codeClick() {
      this.codeUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login" + Date.now();
    },
    // 登录按钮点击判断
    submitForm(formName) {
      // 判断勾选选是否已经勾选上
      if (this.ruleForm.checked == false) {
        // 如果没有勾选则弹窗提示用户勾选之后再登录
        this.$message.warning("请勾选用户选择后再登录");
        return;
      }
      // 等同于 this.$refs.ruleForm
      this.$refs[formName].validate(valid => {
        if (valid) {
          login({
            phone: this.ruleForm.phone,
            password: this.ruleForm.password,
            code: this.ruleForm.code
          }).then(res => {
            // 判断登录状态
            if (res.data.code === 200) {
              // 如果状态提示 200 则正确 , 提示登录成功 同时跳转到首页
              this.$message.success("登录成功");
            } else if (res.data.code === 202) {
              // 否则错误 , 直接提示用户
              this.$message.error(res.data.message);
            }
            window.console.log(res);
          });
        } else {
          // 其他错误提示
          this.$message.error("格式不正确 , 请重新输入!");
          return false;
        }
      });
    },
    // 注册按钮点击
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 头像上传
    handleAvatarSuccess(res, file) {
      // 文件上传成功时的钩子
      // 生成本地的预览
      this.imageUrl = URL.createObjectURL(file.raw);
      // 准备提交的数据
      this.regForm.avatar = res.data.file.path;
    },
    beforeAvatarUpload(file) {
      // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      const isJPG = file.type === "inage/jpeg"; // 限制上传图片的格式
      const isLt2M = file.size / 1024 / 1024 / 2; // 限制上传图片的大小
      // 判断上传的图像格式
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      // 判断上传头像的大小
      if (!isLt2M) {
        this.$message.error("上传头像图片不能大于2MB");
      }
      return isJPG && isLt2M;
    },
    // 图形码获取
    graphicClick() {
      this.graphicUrl = `${process.env.VUE_APP_BASEURL}/captcha?type=sendsms&t=${Date.now()}`
    },
    // 验证码获取
    verification() {
      // 输入框验证码输入判断
      if (this.form.imgCode != 4) {
        return this.$message.error("验证码错误 , 请检查!");
      }
      // 手机号判断
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(this.from.phone)) {
        this.$message.error("手机号码不正确 , 请重新输入!");
      }
      if (this.delayTime === 0) {
        this.delayTime = 60;
        let interId = setInterval(() => {
          this.delayTime--;
          if (this.dealyTime == 0) {
            clearInterval(interId);
          }
        }, 100);
        // sendsms({
        //   code: this.from.imgCode,
        //   phone: this.from.phone
        // }).then(res => {
        //   window.console.log(res);
        // });
      }
    }
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
    .login-from {
      margin-top: 27px;
      margin-right: 41px;
      .code-img {
        height: 40px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .login-checked {
        margin-left: 43px;
        margin-bottom: 28px;
      }
      .login-btn {
        width: 100%;
        margin-left: 0;
      }
      .login-btns {
        margin-top: 26px;
      }
    }
    // 注册对话框
    .el-dialog {
      .el-dialog__header {
        background: linear-gradient(
          225deg,
          rgba(20, 147, 250, 1),
          rgba(1, 198, 250, 1)
        );
      }
      .el-dialog__body {
        .el-input {
          width: 489px;
          height: 39px;
        }
        .code-input {
          width: 325px;
        }
      }
      .avatar-uploader {
        display: flex;
        justify-content: center;
      }
      .el-upload {
        display: block;
        width: 179px;
        height: 179px;
        border-radius: 4px;
        line-height: 179px;
        border: 1px solid rgba(206, 206, 206, 1);
        overflow: hidden;
      }
      .graphic {
        width: 100%;
      }
    }
  }
  .bg {
    height: 100%;
  }
}
</style>