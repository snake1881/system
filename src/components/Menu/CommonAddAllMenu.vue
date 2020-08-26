<template>
  <el-dialog
    title="新增所有菜单"
    :visible.sync="addAllMenuVisible"
    width="60%"
    :before-close="addAllMenuClose"
  >
    <div class="dialogDiv">
      <el-form :model="allMenuData" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="allMenuData.roleName" />
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
  data() {
    return {
      allMenuData: {
        roleName: ""
      }
    };
  },
  methods: {
    // 对话框父子组件传值
    addAllMenuClose() {
      this.$emit("menuRowClose");
    },
    // 菜单树
    saveAddAllMenu() {
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
