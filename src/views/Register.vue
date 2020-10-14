<template>
  <div class="container">
    <el-form
      :model="registerForm"
      :rules="rules"
      ref="registerForm"
      label-width="20px"
      class="loginContainer"
    >
      <h3 style="text-align: center;color: #505458;">注册</h3>
      <el-form-item prop="name">
        <el-input v-model="registerForm.name" placeholder="用户名">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="passWord">
        <el-input v-model="registerForm.passWord" placeholder="密码">
          <i slot="prefix" class="el-input__icon el-icon-goods"></i>
        </el-input>
      </el-form-item>
      <el-button
        size="small"
        type="primary"
        style="width: 40%;"
        @click="submitRegister"
      >
        注册
      </el-button>
      <el-link
        type="primary"
        style="margin-left:70px;font-size:14px"
        @click="goLogin"
      >
        使用已有账号进行登录
      </el-link>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      registerForm: {
        name: "",
        passWord: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 跳转到登录页
    goLogin() {
      this.$router.replace("/");
    },
    // 注册后跳转到登录页
    submitRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.postRequest("/", this.registerForm).then(resp => {
            if (resp) {
              this.$router.replace("/Login");
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

<style lang="less">
.container {
  height: 100vh;
  // background-image: url("../assets/images/login.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  // margin: 0;
}
.loginContainer {
  position: fixed;
  border-radius: 15px;
  background-clip: padding-box;
  width: 350px;
  margin: 200px 0px 0 1000px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>
