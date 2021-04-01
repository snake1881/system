<template>
  <el-dialog
    title="修改密码"
    :visible.sync="changePasswordVisible"
    width="36%"
    :before-close="changePasswordClose"
  >
    <div class="changePasswordDiv"></div>
    <el-form :model="passwordData" label-width="100px">
      <el-form-item label="旧密码：">
        <el-input
          type="password"
          placeholder="输入旧密码"
          v-model="passwordData.oldPassword"
        />
      </el-form-item>
      <el-form-item label="新密码：">
        <el-input
          type="password"
          placeholder="输入新密码"
          v-model="passwordData.newPassword"
        />
      </el-form-item>
      <el-form-item label="确认密码：">
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
      class="addAllMenuButton"
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
    return {
      passwordData: {
        userId: "",
        oldPassword: "",
        newPassword: "",
        commitPassword: "",
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
        // this.$refs.uToast.show({
        //   title: "请输入原密码",
        //   icon: false,
        //   type: "error",
        // });
      } else if (
        this.passwordData.newPassword === null ||
        this.passwordData.newPassword.length < 1
      ) {
        this.$message({
          type: "error",
          message: "请输入新密码!",
        });
        // this.$refs.uToast.show({
        //   title: "请输入新密码",
        //   icon: false,
        //   type: "error",
        // });
      } else if (
        this.passwordData.commitPassword === null ||
        this.passwordData.commitPassword.length < 1
      ) {
        this.$message({
          type: "error",
          message: "请确认新密码!",
        });
        // this.$refs.uToast.show({
        //   title: "请确认新密码",
        //   icon: false,
        //   type: "error",
        // });
      } else if (
        this.passwordData.newPassword !== this.passwordData.commitPassword
      ) {
        this.$message({
          type: "error",
          message: "输入密码不一致!请重确认!",
        });
        // this.errorMessage = "输入密码不一致";
        /* this.$refs.uToast.show({
						title: '新密码与确认密码不一致',
						icon: false,
						type: 'error'
					}) */
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
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>