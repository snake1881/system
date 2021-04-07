<template>
  <div class="login">
    <div class="login-container">
      <div class="login-container-title">
        <img
          class="login-container-title-image"
          src="../assets/images/logo2.png"
        />
        <h3 class="login-container-title-text">定边采油厂一体化信息平台</h3>
      </div>
      <div class="login-container-form">
        <div class="login-container-form-left">
          <img
            class="login-container-form-left-image"
            src="../assets/images/login_img.png"
          />
        </div>
        <div class="login-container-form-right">
          <el-form
            :model="sysUserLogin"
            :rules="rules"
            ref="loginForm"
            class="login-container-form-right-form"
          >
            <el-form-item prop="username">
              <el-input
                v-model="sysUserLogin.username"
                type="text"
                placeholder="输入用户名"
                id="username"
              >
                <i
                  slot="prefix"
                  class="el-input__icon el-icon-user"
                  style="font-size: 20px; margin: 0 2px"
                />
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="sysUserLogin.password"
                type="password"
                placeholder="输入密码"
                id="password"
              >
                <i
                  slot="prefix"
                  class="el-input__icon el-icon-key"
                  style="font-size: 20px; margin: 0 2px"
                />
              </el-input>
            </el-form-item>
            <el-checkbox
              v-model="checked"
              class="loginContainer-checkbox"
              @change="savePwd()"
              >记住密码</el-checkbox
            >
            <span class="loginContainer-span">忘记密码?</span>
            <el-button
              type="primary"
              round
              class="loginContainer-button"
              @click.native.prevent="submitLogin()"
              @keyup.enter.native="submitLogin()"
            >
              登录
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import websocket from "../utils/websocket.js"
export default {
  data() {
    return {
      sysUserLogin: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      // 复选框状态
      checked: false,
    };
  },
  created() {
    var _self = this;
    document.onkeydown = function (e) {
      e = window.event || e;
      if (e.code == "Enter" || e.code == "enter") {
        _self.submitLogin();
      }
    };
  },
  methods: {
    // 提交信息，登录后进入首页
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.postKeyValueRequest("/login", this.sysUserLogin).then((resp) => {
            if (resp) {
              if (resp.code === 200) {
                this.$store.commit("INIT_CURRENTHR", resp.data);
                window.sessionStorage.setItem(
                  "user",
                  JSON.stringify(resp.data)
                );
                websocket.Init();
                this.$router.replace("/Home");
              } else {
                this.$message("账号或密码错误，请重新输入");
              }
            }
          });
        } else {
          return false;
        }
      });
    },
    // 记住密码
    savePwd() {
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      if (this.checked === true) {
        sessionStorage.setItem(username, password);
      } else {
        sessionStorage.removeItem(username);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "../assets/css/login.css";
</style><style>
.login .el-checkbox .el-checkbox__label {
  color: #303133;
  margin-top: -5%;
  font-size: 13px;
}
.login .el-input__inner {
  background-color: transparent;
  color:#303133;
  border: 1px solid #303133;
}
.login .el-checkbox__inner {
  background-color: transparent;
  border: 1px solid #646464;
}
.login .el-form-item {
  margin-bottom: 10%;
}
</style>
