<template>
  <div class="container">
    <el-form
      :model="sysUserLogin"
      :rules="rules"
      ref="loginForm"
      label-width="20px"
      class="loginContainer"
    >
      <h3 style="text-align: center;color: #505458;">管理系统</h3>
      <el-form-item prop="loginName">
        <el-input v-model="sysUserLogin.loginName" placeholder="用户名">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="sysUserLogin.password" placeholder="密码">
          <i slot="prefix" class="el-input__icon el-icon-goods"></i>
        </el-input>
      </el-form-item>
      <el-link
        type="primary"
        style="margin:0 0 15px 320px;font-size:10px"
        @click="goRegister"
      >
        注册
      </el-link>
      <el-button
        size="small"
        type="primary"
        style="width: 100%;"
        @click="submitLogin"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sysUserLogin: {
        loginName: "",
        password: ""
      },
      rules: {
        loginName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    // 跳转到注册页
    goRegister() {
      this.$router.replace("/Register");
    },
    // 提交信息，登录后进入首页
    submitLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.postRequest("/login", this.sysUserLogin).then(resp => {
            if (resp) {
              this.$store.commit("INIT_CURRENTHR", resp.token);
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
.container {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/bb.png");
  background-repeat: no-repeat;
  z-index: -10;
  margin: 0;
}
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  width: 350px;
  margin: 160px 100px 0 500px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>
