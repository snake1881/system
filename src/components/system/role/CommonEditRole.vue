<template>
  <el-dialog
    title="角色编辑"
    :visible.sync="editRoleVisible"
    width="40%"
    :before-close="editRoleClose"
  >
    <div class="editRoleDiv">
      <el-form :model="editData" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="editData.roleName" />
        </el-form-item>
        <el-form-item label="权限字符">
          <el-input v-model="editData.roleKey" />
        </el-form-item>
        <el-form-item label="角色状态">
          <el-select v-model="editData.status" placeholder="请选择">
            <el-option label="正常" value="1" />
            <el-option label="停用" value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 树形结构 -->
      <div class="editMenuDescription">
        <el-tree
          :data="treeData"
          show-checkbox
          empty-text="暂无数据"
          ref="tree"
          highlight-current
          :props="defaultProps"
          node-key="moduleId"
          @check="getCheckedKeys()"
        />
      </div>
    </div>
    <el-button
      type="primary"
      @click="saveEditRole(), editRoleClose()"
      class="editRoleButton"
      >提交</el-button
    >
    <el-button type="info" @click="editRoleClose()">取消</el-button>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editRoleVisible: {
      type: Boolean,
    },
    editData: {
      type: Object,
    },
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: "children",
        label: "moduleName",
      },
    };
  },
  created() {
    this.treeInIt();
  },
  methods: {
    // 对话框父子组件传值
    editRoleClose() {
      this.$emit("roleRowClose");
    },
    // 菜单树
    treeInIt() {
      this.getRequest("/system/sysModule/getSysModuleTree").then((resp) => {
        if (resp) {
          this.treeData = resp.data;
        }
      });
    },
    // 点击树节点选择对应菜单权限
    getCheckedKeys() {
      this.editData.menuIds = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
    },
    // 保存修改后的信息
    saveEditRole() {
      this.putRequest("/system/sysRole/update", this.editData).then((resp) => {
        if (resp) {
          this.$message({
            message: "信息更改成功!",
            type: "success",
          });
        } else {
          this.$message.error("信息更改失败，请重新提交!");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.editRoleDiv {
  height: 375px;
  overflow: auto;
}
.editRoleDiv .el-input {
  width: 420px;
  height: 2px;
}
.editRoleButton {
  margin: 0 0 0 180px;
}
.editMenuDescription {
  height: 150px;
  overflow-y: scroll;
}
</style>
