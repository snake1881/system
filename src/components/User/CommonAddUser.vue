<template>
  <el-dialog
    title="新增用户信息"
    :visible.sync="addUserVisible"
    width="60%"
    :before-close="addUserClose"
  >
    <div class="dialogDiv">
      <el-form :model="addData" label-width="80px">
        <el-form-item label="登录名称">
          <el-input v-model="addData.loginName" />
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input
            v-model="addData.departmentName"
            @click.native="depChose()"
          />
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="addData.userName" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addData.password" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addData.email" />
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="addData.phone" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="addData.sex">
            <el-option label="男" value="0" />
            <el-option label="女" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="addData.status">
            <el-option label="停用" value="0" />
            <el-option label="正常" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-checkbox-group v-model="addData.character">
            <el-checkbox label="管理员" value="1" />
            <el-checkbox label="普通角色" value="2" />
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveAddUser(addData), addUserClose()">
        提交
      </el-button>
    </span>
    <!-- 部门名称 -->
    <el-dialog
      title="部门选择"
      :visible.sync="depVisible"
      width="30%"
      :before-close="depClose()"
    >
      <el-tree
        ref="tree"
        empty-text="暂无数据"
        show-checkbox
        :data="deparmentData"
        :props="defaultProps"
        node-key="deparmentData.departmentId"
        @check="getCheckedKeys()"
      />
    </el-dialog>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addUserVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      // 表单数据
      addData: {
        loginName: "",
        depName: "",
        userName: "",
        password: "",
        email: "",
        phone: "",
        sex: "",
        status: "",
        post: "",
        character: ""
      },
      // 部门选择
      depVisible: false,
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
    addUserClose() {
      this.$emit("addClose");
    },
    // 保存新增用户信息
    saveAddUser() {
      this.putRequest("/system/sysUser/save", this.addtData).then(resp => {
        if (resp) {
          console.log(1);
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
    getCheckedKeys() {
      this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
    },
    // 选择部门
    depChose() {
      this.depVisible = true;
    },
    // 关闭部门选择对话框
    depClose() {
      this.depVisible = false;
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
