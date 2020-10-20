<template>
  <el-dialog title="新增角色" :visible.sync="addRoleVisible"  width="40%" :before-close="addRoleClose">
    <div class="addRoleDiv">
      <el-form :model="roleData" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="roleData.roleName" />
        </el-form-item>
        <el-form-item label="权限字符">
          <el-input v-model="roleData.roleKey" />
        </el-form-item>
        <el-form-item label="角色状态">
          <el-select v-model="roleData.status" placeholder="请选择">
            <el-option label="正常" value="1"></el-option>
            <el-option label="停用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <div class="addMenuDescription">
        <el-form-item label-width="菜单权限">
          <el-tree
            :data="roleData.menu"
            show-checkbox
            empty-text="暂无数据"
            ref="tree"
            highlight-current
            :props="defaultProps"
            node-key="moduleId"
            @check="getCheckedKeys()"
          />
        </el-form-item>
        </div>
      </el-form>
    </div>
    <el-button type="primary" @click="saveAddRole(), addRoleClose()" class="addRoleButton">提交</el-button>
    <el-button type="info" @click="addRoleClose()">取消</el-button>

  </el-dialog>
</template>
<script>
export default {
  props: {
    addRoleVisible: {
      type: Boolean
    }
  },
  inject: ["reload"],
  data() {
    return {
      roleData: {
        roleName: "",
        roleKey: "",
        status: "",
        menu: [],
        menuIds: []
      },
      defaultProps: {
        children: "children",
        label: "moduleName"
      }
    };
  },
  created() {
    this.treeInIt();
  },
  methods: {
    // 对话框父子组件传值
    addRoleClose() {
      this.$emit("roleRowClose");
    },
    // 菜单树
    treeInIt() {
      this.getRequest("/system/sysModule/getSysModuleTree").then(resp => {
        if (resp) {
          this.roleData.menu = resp.data;
        }
      });
    },
    // 点击树节点选择对应菜单权限
    getCheckedKeys() {
      this.roleData.menuIds = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
    },
    // 保存修改后的信息
    saveAddRole() {
      this.postRequest("/system/sysRole/insert", this.roleData).then(resp => {
        if (resp) {
          this.$message({
            message: "角色新增成功!",
            type: "success"
          });
          this.reload();
        } else {
          this.$message.error("角色新增失败，请重新提交!");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.addRoleDiv {
  height: 400px;
  overflow: auto;
}
.addRoleDiv .el-input {
  width: 420px;
  height: 2px;
}
.addRoleButton {
  margin: 0 0 0 180px;
}
.addMenuDescription {
 height:150px;
 overflow-y:scroll 
}
</style>
