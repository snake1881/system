<template>
  <el-dialog
    title="新增用户信息"
    :visible.sync="addUserVisible"
    width="60%"
    :before-close="addUserClose"
  >
    <div class="dialogDiv">
      <el-form :model="addData" label-width="80px">
        <el-form-item label="登录名称">
          <el-input v-model="addData.loginName" />
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input v-model="addData.depName" />
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="addData.userName" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addData.password" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addData.email" />
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="addData.phone" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="addData.sex">
            <el-option label="男" value="0" />
            <el-option label="女" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="addData.status" />
        </el-form-item>
        <el-form-item label="岗位">
          <el-input v-model="addData.post" />
        </el-form-item>
        <el-form-item label="角色">
          <el-checkbox-group v-model="addData.character">
            <el-checkbox label="管理员" name="1" />
            <el-checkbox label="普通角色" name="2" />
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveAddUser(addData), addUserClose">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addUserVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      addData: {
        loginName: "",
        depName: "",
        userName: "",
        password: "",
        email: "",
        phone: "",
        sex: "",
        status: "",
        post: "",
        character: ""
      }
    };
  },
  methods: {
    // 对话框父子组件传值
    addUserClose() {
      this.$emit("addClose");
    },
    // 保存新增用户信息
    saveAddUser() {
      this.putRequest("/system/sysUser/save", this.addtData).then(resp => {
        if (resp) {
          console.log(1);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.dialogDiv {
  height: 400px;
  overflow: auto;
}
</style>
<style lang="less" scoped>
.el-input {
  width: 700px;
}
</style>
