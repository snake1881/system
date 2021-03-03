<template>
  <el-dialog
    title="角色编辑"
    :visible.sync="editRoleVisible"
    width="40%"
    :before-close="editRoleClose"
    @opened="opened"
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
          :data="editTreeData"
          show-checkbox
          empty-text="暂无数据"
          ref="tree"
          highlight-current
          :expand-on-click-node="false"
          :default-checked-keys="editData.menuIds"
          :check-strictly="true"
          :props="defaultProps"
          node-key="moduleId"
          @check="getCheckedKeys"
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
    editTreeData: {
      type: Array,
    },
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: "children",
        label: "moduleName",
        disabled: this.isDisabled,
      },
      menuIds: [],
    };
  },
  methods: {
    opened(){
      // this.isCheck = true  //重点：给数节点赋值之前 先设置为true
      // this.$refs.tree.setCheckedKeys(this.editTreeData.menuIds) //给树节点赋值
      // this.isCheck= false //重点： 赋值完成后 设置为false
    },
    // 对话框父子组件传值
    editRoleClose() {
      this.$emit("roleRowClose");
    },
    // 点击树节点选择对应菜单权限
    getCheckedKeys(currentObj, treeStatus) {
      this.menuIds = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());

      // 用于：父子节点严格互不关联时，父节点勾选变化时通知子节点同步变化，实现单向关联。
      let selected = treeStatus.checkedKeys.indexOf(currentObj.moduleId); // -1未选中
      //如果选中
      if (selected !== -1) {
        //子节点只要被选中父节点就被选中
        this.selectedParent(currentObj);
        //父节点只要被选中统一处理子节点为相同的勾选状态
        this.uniteChildSame(currentObj, true);
      } else {
        //未选中 处理子节点全部未选中
        if (currentObj.children.length !== 0) {
          this.uniteChildSame(currentObj, false);
        }
      }
    },
    //统一处理子节点为相同的勾选状态
    uniteChildSame(treeList, isSelected) {
      this.$refs.tree.setChecked(treeList.moduleId, isSelected);
      for (let i = 0; i < treeList.children.length; i++) {
        this.uniteChildSame(treeList.children[i], isSelected);
      }
    },
    //统一处理父节点为选中
    selectedParent(currentObj) {
      let currentNode = this.$refs.tree.getNode(currentObj);
      if (currentNode.parent.key !== undefined) {
        this.$refs.tree.setChecked(currentNode.parent, true);
        this.selectedParent(currentNode.parent);
      }
    },
    //保存修改后的信息
    saveEditRole() {
      this.editData.menuIds = this.menuIds;
      console.log(this.menuIds);
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
