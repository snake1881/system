<template>
  <el-dialog
    title="新增新菜单"
    :visible.sync="addAllMenuVisible"
    width="60%"
    :before-close="addAllMenuClose"
  >
    <div class="dialogDiv">
      <el-form :model="allMenuData" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="allMenuData.moduleName" />
        </el-form-item>
        <el-form-item label="访问地址">
          <el-input v-model="allMenuData.moduleUrl" />
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="allMenuData.permissionMark" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="allMenuData.moduleType">
            <el-option label="目录" value="0" />
            <el-option label="菜单" value="1" />
            <el-option label="按钮" value="2" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveAddAllMenu(), addAllMenuClose()">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addAllMenuVisible: {
      type: Boolean
    }
  },
  inject: ["reload"],
  data() {
    return {
      allMenuData: {
        moduleName: "",
        moduleUrl: "",
        moduleType: "",
        permissionMark: ""
      }
    };
  },
  methods: {
    // 对话框父子组件传值
    addAllMenuClose() {
      this.$emit("menuRowClose");
    },
    // 保存新增菜单信息
    saveAddAllMenu() {
      this.postRequest("/system/sysModule/insert", this.allMenuData).then(
        resp => {
          if (resp) {
            this.$message({
              message: "菜单新增成功!",
              type: "success"
            });
            this.reload();
          } else {
            this.$message.error("菜单新增失败，请重新提交!");
          }
        }
      );
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
