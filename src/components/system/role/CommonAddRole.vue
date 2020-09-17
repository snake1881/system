<template>
  <el-dialog
    title="新增角色"
    :visible.sync="addRoleVisible"
    width="60%"
    :before-close="addRoleClose"
  >
    <div class="dialogDiv">
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
        <el-form-item label="显示顺序">
          <el-input v-model="roleData.sequence" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="roleData.remark" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="roleData.createTime"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
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
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveAddRole(), addRoleClose()">
        提交
      </el-button>
    </span>
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
        sequence: "",
        remark: "",
        createTime: "",
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
