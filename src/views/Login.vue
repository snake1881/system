<template>
  <div class="login">
    <h3 class="login-title">定边采油厂智能油田一体化平台</h3>
    <el-form
      :model="sysUserLogin"
      :rules="rules"
      ref="loginForm"
      class="loginContainer"
    >
      <h4 class="loginContainer-h3">用户登录</h4>
      <el-form-item prop="username">
        <el-input v-model="sysUserLogin.username" type="text" placeholder="输入用户名">
          <i slot="prefix" class="el-input__icon el-icon-user" style="font-size:20px;margin:0 2px" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="sysUserLogin.password" type="password" placeholder="输入密码">
          <i slot="prefix" class="el-input__icon el-icon-key" style="font-size:20px;margin:0 2px" />
        </el-input>
      </el-form-item>
      <!-- <el-link type="primary" style="margin:0 0 0 100px;font-size:16px" @click="goRegister()">
        注册
      </el-link> -->
      <el-button
        type="primary"
        class="loginContainer-button"
        @click.native.prevent="submitLogin()"
        @keyup.enter.native="submitLogin()"
      >
        登录
      </el-button>
      <el-checkbox v-model="checked" class="loginContainer-checkbox">记住密码</el-checkbox>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sysUserLogin: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      },
      // 复选框状态
      checked: false
    };
  },
  created() {
    var _self = this;
    document.onkeydown = function(e) {
      var key;
      if (window.event == undefined) {
        key = e.keyCode;
      } else {
        key = window.event.keyCode;
      }
      if (key == 13 || key == 100) {
        _self.submitLogin();
      }
    };
  },
  methods: {
    // 跳转到注册页
    // goRegister() {
    //   this.$router.replace("/Register");
    // },
    // 提交信息，登录后进入首页
    submitLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.postKeyValueRequest("/login", this.sysUserLogin).then(resp => {
            if (resp) {
              this.$store.commit("INIT_CURRENTHR", resp.data);
              window.sessionStorage.setItem("user", JSON.stringify(resp.data));
              this.$router.replace("/Home");
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/login.css";
</style>
<style>
.el-checkbox .el-checkbox__label{
  color: white;
}
</style>