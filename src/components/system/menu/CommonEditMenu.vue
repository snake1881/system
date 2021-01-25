<template>
  <el-dialog
    title="菜单编辑"
    :visible.sync="editMenuVisible"
    width="40%"
    :before-close="editMenuClose"
  >
    <div class="editMenuDiv">
      <el-form :model="editData" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="editData.moduleName" />
        </el-form-item>
        <el-form-item label="访问地址">
          <el-input v-model="editData.moduleUrl" />
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="editData.permissionMark" />
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="editData.moduleType">
            <el-radio label="0">目录</el-radio>
            <el-radio label="1">菜单</el-radio>
            <el-radio label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <el-button
      type="primary"
      @click="saveEditMenu(), editMenuClose()"
      class="editMenuButton"
      >提交</el-button
    >
    <el-button type="info" @click="editMenuClose()">取消</el-button>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editMenuVisible: {
      type: Boolean,
    },
    editData: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    // 对话框父子组件传值
    editMenuClose() {
      this.$emit("menuRowClose");
    },
    // 保存修改后的信息
    saveEditMenu() {
      this.postRequest("/system/sysModule/update", this.editData).then(
        (resp) => {
          if (resp) {
            this.$message({
              message: "信息更改成功!",
              type: "success",
            });
          } else {
            this.$message.error("信息更改失败，请重新提交!");
          }
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.editMenuDiv {
  height: 260px;
  overflow: auto;
}
.editMenuDiv .el-input {
  width: 400px;
  height: 2px;
}
.editMenuButton {
  margin: 0 0 0 180px;
}
</style>
