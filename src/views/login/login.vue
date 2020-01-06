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
          <el-form ref="registerForm" :model="registerForm" :rules="register">
            <!-- 头像上传 -->
            <el-form-item label="头像" prop="avatar" :label-width="formLabelWidth">
              <el-upload class="avatar-uploader" :action="uploadURL" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" name="image"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <!-- 昵称输入框 -->
            <el-form-item label="昵称" :label-width="formLabelWidth" prop="username">
              <el-input v-model="registerForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 邮箱输入框 -->
            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
              <el-input v-model="registerForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 手机号输入框 -->
            <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
              <el-input v-model="registerForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 密码输入框 -->
            <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
              <el-input show-password v-model="registerForm.password" autocomplete="off"></el-input>
            </el-form-item>

            <el-row>
              <!-- 图形码输入框 -->
              <el-col :span="16">
                <el-form-item label="图形码" :label-width="formLabelWidth" prop="code">
                  <el-input class="code-input" v-model="registerForm.code" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <!-- 图形码获取 -->
              <el-col :offset="1" :span="7">
                <img class="code-loc" @click="graphicClick" :src="graphicUrl" alt />
              </el-col>
            </el-row>
            <!-- 验证码输入框 -->
            <el-row>
              <el-col :span="16">
                <el-form-item label="验证码" :label-width="formLabelWidth" prop="imgCode">
                  <el-input v-model="registerForm.imgCode" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <!-- 验证码获取按钮 -->
              <el-col :offset="1" :span="7">
                <el-button
                  class="code-loc"
                  @click="verification"
                  :disabled="delayTime!=0"
                >{{btnMessage}}</el-button>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitRegisterBtn">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <!-- 右边图片模块 -->
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
// api导入
import { login, sendsms, register } from "../../api/login.js";
// token导入
import {saveToken} from '../../utils/token.js'
// 判断手机号输入框输入状态
const validatephone = (rule, value, callback) => {
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

// 定义验证邮箱的方式
const validateEmail = (rule, value, callback) => {
  if (value === "") {
    // 如果输入内容为空 . 则提示
    callback(new Error("邮箱不能为空!"));
  } else {
    // 判断手机号码格式是否正确
    const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (reg.test(value) == true) {
      callback();
    } else {
      // 如果不正确 , 则提示
      callback(new Error("邮箱格式不对 , 请重新输入!"));
    }
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
      // 按钮的文本
      btnMessage: "获取用户验证码", 
      // 定义倒计时的时间
      delayTime : 0, 
      uploadURL: process.env.VUE_APP_BASEURL + "/uploads",
      registerForm: {
        username: "", //昵称
        email: "", // 邮箱
        phone: "", // 手机号
        password: "", // 密码
        imgCode: "", // 验证码
        avatar: "", // 头像
        code: "",
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
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 18, message: "长度为6~18位数", trigger: "change" }
        ],
        // 判断验证码位数是否正确
        code: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "长度为4位数", trigger: "change" }
        ]
      },
      // 注册表单的验证规则
      register: {
        // 头像的验证规则
        avatar: [{ required: true, message: "头像不能为空!", trigger: "change" }],
        // 昵称的验证规则
        username: [{ required: true, message: "请输入昵称", trigger: "change" }],
        // 邮箱的验证规则
        email: [{required: true, validator: validateEmail, trigger: "change" }],
        // 手机号的验证规则
        phone: [{ required: true, validator: validatephone, trigger: "change" }],
        // 密码的验证规则
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 18, message: "长度为6~18位数", trigger: "change" }
        ],
        // 图形码的验证规则
        code: [
          { required: true, message: "请输入图形验证码", trigger: "change" }
        ],
      }
    };
  },
  methods: {
    // 验证码点击事件  点击验证码图片重新获取验证码
    codeClick() {
      this.codeUrl =`${process.env.VUE_APP_BASEURL}/captcha?type=login&t=${Date.now()}`
        
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
              // token存储
              // window.localStorage.setItem("heimammtoken",res.data.data.token)
              saveToken(res.data.data.token)
              this.$router.push("/index");
            } else if (res.data.code === 202) {
              // 否则错误 , 直接提示用户
              this.$message.error(res.data.message);
            }
            // window.console.log(res);
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

    // 图形码获取
    graphicClick() {
      this.graphicUrl = `${
        process.env.VUE_APP_BASEURL
      }/captcha?type=sendsms&t=${Date.now()}`;
    },
    // 短信获取
    verification() {
      // 手机号判断
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(this.registerForm.phone)==false) {
        // 如果手机号格式不对 则提示用户
        return this.$message.error("手机号码不正确 , 请重新输入!");
      }
      // 图片验证码
      if (this.registerForm.code.length != 4) {
        // 如果长度不等于 4 , 则提示用户
        return this.$message.error("验证码错误 , 请检查!");
      }
      // 如果没有倒计时  开启
      if (this.delayTime === 0) {
        // 倒计时时间60秒
        this.delayTime = 60;
        // 判断 一些值
        let interId = setInterval(() => {
          // 倒计时递减
          this.delayTime--;
          // 显示修改的文本
          this.btnMessage = `还剩下${this.delayTime}秒!`;
          if (this.delayTime === 0) {
            // 倒计时结束 清零计时器
            clearInterval(interId);
            // 还原文本
            this.btnMessage = "获取用户验证码";
          }
        }, 100);
      } else {
        // 正在倒计时中
        return;
      }
      sendsms({
        // 图形码参数获取
        code: this.registerForm.code,
        // 手机号参数获取
        phone: this.registerForm.phone
      }).then(res => {
        this.$message.success("您的验证码是:" + res.data.data.captcha)
        // window.console.log(res);
      });
    },
     // 头像上传
    handleAvatarSuccess(res, file) {
      // 生成本地的预览
      this.imageUrl = URL.createObjectURL(file.raw);
      // window.console.log(res)
      // 保存到注册表单的头像中
      this.registerForm.avatar = res.data.file_path;
    },
    beforeAvatarUpload(file) {
      // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      const isJPG = file.type === "image/jpeg"; // 限制上传图片的格式
      const isLt2M = file.size / 1024 / 1024 < 2; // 限制上传图片的大小
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
    // 提交注册
    submitRegisterBtn() {
      // 验证表单
      this.$refs.registerForm.validate(valid => {
        // 接口调用
        if (valid) {
          register({
             // 获取昵称参数
            username: this.registerForm.username, 
            // 获取手机参数
            phone: this.registerForm.phone, 
            // 获取邮箱参数
            email: this.registerForm.email, 
            // 获取头像参数 
            avatar: this.registerForm.avatar,
            // 获取密码参数
            password: this.registerForm.password, 
            // 获取手机验证码参数
            rcode: this.registerForm.rcode
          }).then(res => {
            if(res.data.code===200){
              this.$message.success("恭喜您,已经注册成功!")
              this.dialogFormVisible=false
            }else if(res.data.code===201){
              this.$message.error(res.data.message)
            }
            // window.console.log(res);
          });
        }
      });
    },
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
          cursor: pointer;
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
        .el-dialog__title {
          color: #fff;
        }
      }
      .code-loc {
        width: 100%;
        cursor: pointer;
      }
      .avatar-uploader {
        text-align: center;
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
  .bg {
    height: 100%;
  }
}
</style>