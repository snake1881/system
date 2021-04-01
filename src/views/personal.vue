<template>
  <div class="personal">
    <el-card>
      <div slot="header">About Me</div>
      <el-form label-width="80px">
        <el-form-item>
          <img
            class="personal_form_img"
            alt="用户"
            src="../assets/images/header.jpg"
          />
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item style="padding-left: 50px" label="昵称">
          <span>{{ this.user.username }}</span>
        </el-form-item>
        <el-form-item style="padding-left: 50px" label="ID">
          <span>{{ this.user.userId }}</span>
        </el-form-item>
        <el-form-item style="padding-left: 50px">
          <el-button type="primary" @click="changePassword()">修改密码</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <common-change-password
      :changePasswordVisible="changePasswordVisible"
      :passwordData="changePasswordData"
      @changePasswordClose="changePasswordClose"
    />
  </div>
</template>

<script>
import CommonChangePassword from "../components/CommonChangePassword";
export default {
  components: {
    CommonChangePassword,
  },
  data() {
    return {
      userId: "",
      userName: "",
      user: {},
      // 修改密码
      changePasswordVisible: false,
      changePasswordData: {},
    };
  },
  created() {
    this.userInfoInit();
  },
  methods: {
    userInfoInit() {
      console.log("初始化用户信息");
      this.user = JSON.parse(window.sessionStorage.getItem("user"));
      console.log(this.user);
    },
    // 新增菜单
    changePassword() {
      console.log("修改密码点击！");
      this.changePasswordVisible = true;
    },
    // 关闭新增对话框
    changePasswordClose() {
      this.changePasswordVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/personal.css";
</style>
