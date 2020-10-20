<template>
  <el-dialog  title="编辑用户信息" :visible.sync="editUserVisible" width="40%" :before-close="editUserClose">
    <div class="dialogEditDiv">
      <el-form :model="editData" label-width="80px">
        <el-form-item label="登录名称">
          <el-input v-model="editData.loginName" />
        </el-form-item>
        <el-form-item label="部门名称">
          <el-select v-model="editData.departmentName">
            <el-option :value="editData.departmentName" style="height: auto">
              <!-- 部门名称 -->
              <el-tree
                ref="tree"
                empty-text="暂无数据"
                :data="deparmentData"
                :props="defaultProps"
                node-key="deparmentData.departmentId"
                @node-click="getCheckedKeys"
              />
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="editData.userName" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editData.email" />
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="editData.phone" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="editData.status">
            <el-option label="停用" value="0" />
            <el-option label="正常" value="2" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary" @click="editUserClose(), saveEditUser(editData)" class="editUserButton">提交</el-button>
    <el-button type="info" @click="editUserClose()">取消</el-button>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editUserVisible: {
      type: Boolean
    },
    editData: {
      type: Object
    }
  },
  data() {
    return {
      // 部门
      deparmentData: [],
      defaultProps: {
        children: "children",
        label: "departmentName"
      }
    };
  },
  created() {
    this.treeInIt();
  },
  methods: {
    // 对话框父子组件传值
    editUserClose() {
      this.$emit("orderRowClose");
    },
    // 保存修改后的信息
    saveEditUser() {
      this.putRequest("/system/sysUser/user", this.editData).then(resp => {
        if (resp) {
          this.$message({
            message: "用户编辑成功!",
            type: "success"
          });
        } else {
          this.$message.error("用户编辑失败，请重新提交!");
        }
      });
    },
    // 部门菜单树
    treeInIt() {
      this.getRequest("/system/department/getDepartmentTree").then(resp => {
        if (resp) {
          this.deparmentData = resp.data;
        }
      });
    },
    getCheckedKeys(val) {
      console.log(val);
      this.editData.departmentName = val.departmentName;
      // this.$refs.tree
      //   .getCheckedKeys()
      //   .concat(this.$refs.tree.getHalfCheckedKeys());
    }
  }
};
</script>

<style lang="less" scoped>
.dialogEditDiv {
  height: 375px;
  overflow: auto;
}
.dialogEditDiv .el-input {
  width: 420px;
  height: 2px;
}
.editUserButton {
  margin: 0 0 0 180px;
}
</style>
