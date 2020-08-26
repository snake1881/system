<template>
  <el-dialog
    title="新增菜单"
    :visible.sync="addMenuVisible"
    width="60%"
    :before-close="addMenuClose"
  >
    <div class="dialogDiv">
      <el-form :model="menuData" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="menuData.roleName" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveAddMenu(), addMenuClose()">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addMenuVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      menuData: {
        roleName: ""
      }
    };
  },
  methods: {
    // 对话框父子组件传值
    addMenuClose() {
      this.$emit("menuRowClose");
    },
    // 菜单树
    saveAddMenu() {
      this.getRequest("/").then(resp => {
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
