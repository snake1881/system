<template>
  <el-dialog
    title="新增菜单"
    :visible.sync="addMenuVisible"
    width="36%"
    :before-close="addMenuClose"
  >
    <div class="addMenuDiv">
      <el-form :model="addData" label-width="80px">
        <el-form-item label="上级菜单">
          <el-input v-model="addData.moduleName" />
        </el-form-item>
      </el-form>
      <el-form :model="addMenuData" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="addMenuData.moduleName" />
        </el-form-item>
        <el-form-item label="访问地址">
          <el-input v-model="addMenuData.moduleUrl" />
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="addMenuData.permissionMark" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="addMenuData.moduleType">
            <el-option label="目录" value="0" />
            <el-option label="菜单" value="1" />
            <el-option label="按钮" value="2" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-button
      type="primary"
      @click="saveAddMenu(addData), addMenuClose()"
      class="addMenuButton"
      >提交</el-button
    >
    <el-button type="info" @click="addMenuClose()">取消</el-button>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addMenuVisible: {
      type: Boolean,
    },
    addData: {
      type: Object,
    },
  },
  inject: ["reload"],
  data() {
    return {
      // 菜单信息
      addMenuData: {
        moduleName: "",
        moduleUrl: "",
        moduleType: "",
        permissionMark: "",
        parentModuleId: "",
      },
    };
  },
  methods: {
    // 对话框父子组件传值
    addMenuClose() {
      this.$emit("menuRowClose");
    },
    // 菜单树
    saveAddMenu(val) {
      //将父节点id赋值给子节点
      this.addMenuData.parentModuleId = val.moduleId;
      this.postRequest("/system/sysModule/insert", this.addMenuData).then(
        (resp) => {
          if (resp) {
            this.$message({
              message: "菜单新增成功!",
              type: "success",
            });
            this.reload();
          } else {
            this.$message.error("菜单新增失败，请重新提交!");
          }
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.addMenuDiv {
  height: 320px;
  overflow: auto;
}
.addMenuDiv .el-input {
  width: 400px;
  height: 2px;
}
.addMenuButton {
  margin: 0 0 0 180px;
}
</style>
</style>
