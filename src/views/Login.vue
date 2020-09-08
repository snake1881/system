<template>
  <div class="container">
    <div class="container-left">
      <img
        src="../assets/images/logo1.png"
        alt="加载中..."
        style="width: 30%; height: 25%;margin: 6% 35% 0 35%"
      />
      <h3 style="text-align: center;color: #303133;font-size:32px;">
        定边采油厂 - 延长油田股份有限公司
      </h3>
      <img
        src="../assets/images/chouyouji.png"
        alt="加载中..."
        style="width: 40%; height: 32%;margin: 9% 30% 0 30%"
      />
    </div>
    <div style="width: 28%; height: 100%;">
      <img
        src="../assets/images/logo.png"
        alt="加载中..."
        style="width: 46%; height: 15%;margin: 10% 27% 2% 27%"
      />
      <h3
        style="text-align: center;color: #606266;font-size:20px;margin-bottom:70px"
      >
        定边采油厂智能油田平台
      </h3>
      <el-form
        :model="sysUserLogin"
        :rules="rules"
        ref="loginForm"
        label-width="20px"
        class="loginContainer"
      >
        <el-form-item prop="username">
          <el-input
            v-model="sysUserLogin.username"
            type="text"
            placeholder="用户名"
          >
            <i slot="prefix" class="el-input__icon el-icon-user" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="sysUserLogin.password"
            type="password"
            placeholder="密码"
          >
            <i slot="prefix" class="el-input__icon el-icon-goods" />
          </el-input>
        </el-form-item>
        <el-link
          type="primary"
          style="margin: 10px 25% 10px 65%;font-size:16px"
          @click="goRegister"
        >
          注册
        </el-link>
        <el-button
          size="small"
          type="primary"
          style="width: 50%;margin: 12px 25%;"
          @click.native.prevent="submitLogin()" 
          @keyup.enter.native="submitLogin()"
        >
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    var _self = this;
    document.onkeydown = function(e){
      var key;
      if(window.event == undefined){
          key = e.keyCode;
      }else{
          key = window.event.keyCode;
      }
      if(key == 13 || key == 100){
          _self.submitLogin();
      }
    }
  },
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
      }
    };
  },
  methods: {
    // 跳转到注册页
    goRegister() {
      this.$router.replace("/Register");
    },
    // 提交信息，登录后进入首页
    submitLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.postKeyValueRequest("/login", this.sysUserLogin).then(resp => {
            if (resp) {
              this.$store.commit("INIT_CURRENTHR", resp.data);
              window.sessionStorage.setItem("user", JSON.stringify(resp.data));
              this.$router.replace("/Home");
              // 在请求成功后把document.onkeydown置为undefined
              document.onkeydown = undefined;
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
  display: flex;
  flex-direction: row;
}
.container-left {
  width: 72%;
  height: 100%;
  background: #9addff;
}
</style>
<style>
.loginContainer .el-input__inner {
  border-left-width: 0px;
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-color: #909399;
  border-radius: 0;
  width: 60%;
  margin: 10px 20%;
}
.el-input--prefix .el-input__prefix {
  margin-left: 20%;
}
.el-form-item__content .el-form-item__error {
  margin-left: 20%;
}
.loginContainer .el-button {
  border-radius: 20px;
}
</style>
