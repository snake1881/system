<template>
  <el-dialog
    title="修改密码"
    :visible.sync="changePasswordVisible"
    width="36%"
    :before-close="changePasswordClose"
  >
    <div class="changePasswordDiv"></div>
    <el-form :model="passwordData" :rules="rules" label-width="100px">
      <el-form-item label="旧密码：" prop="oldPassword">
        <el-input
          type="password"
          placeholder="输入旧密码"
          v-model="passwordData.oldPassword"
        />
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassword">
        <el-input
          type="password"
          placeholder="输入新密码"
          v-model="passwordData.newPassword"
        />
      </el-form-item>
      <el-form-item label="确认密码：" prop="commitPassword">
        <el-input
          v-model="passwordData.commitPassword"
          type="password"
          placeholder="确认密码"
        />
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      @click="changePassword(), changePasswordClose()"
      style="margin: 0 0 0 180px"
      class="changePassword"
      >提交</el-button
    >
    <el-button type="info" @click="changePasswordClose()">取消</el-button>
  </el-dialog>
</template>
<script>
export default {
  props: {
    changePasswordVisible: {
      type: Boolean,
    },
  },
  inject: ["reload"],
  data() {
    var checkOld = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("旧密码不能为空！"));
      }
    };
    var checkNew = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码！"));
      } else if (value !== this.passwordData.commitPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkCommit = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passwordData.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      passwordData: {
        userId: "",
        oldPassword: "",
        newPassword: "",
        commitPassword: "",
      },
      rules: {
        oldPassword: [{ validator: checkOld, trigger: "blur" }],
        newPassword: [{ validator: checkNew, trigger: "blur" }],
        commitPassword: [{ validator: checkCommit, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 对话框父子组件传值
    changePasswordClose() {
      this.$emit("changePasswordClose");
    },
    // 修改密码
    changePassword() {
      let self = this;
      console.log(this.passwordData);
      if (
        this.passwordData.oldPassword === null ||
        this.passwordData.oldPassword.length < 1
      ) {
        this.$message({
          type: "error",
          message: "请输入原密码!",
        });
      } else if (
        this.passwordData.newPassword === null ||
        this.passwordData.newPassword.length < 1
      ) {
        this.$message({
          type: "error",
          message: "请输入新密码!",
        });
      } else if (
        this.passwordData.commitPassword === null ||
        this.passwordData.commitPassword.length < 1
      ) {
        this.$message({
          type: "error",
          message: "请确认新密码!",
        });
      } else if (
        this.passwordData.newPassword !== this.passwordData.commitPassword
      ) {
        this.$message({
          type: "error",
          message: "输入密码不一致!请重新确认!",
        });
      } else {
        let differPassword = {
          oldPass: this.passwordData.oldPassword,
          newPass: this.passwordData.newPassword,
        };
        this.putRequest(
          "/system/sysUser/user/password?credentials=%7B%7D&details=%7B%7D&principal=%7B%7D",
          differPassword
        ).then((resp) => {
          this.loading = false;
          console.log(resp);
          if (resp.code === 200) {
            this.$message({
              type: "success",
              message: "密码修改成功！",
            });
          } else {
            this.$message({
              type: "error",
              message: "旧密码错误！请重新输入！",
            });
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>