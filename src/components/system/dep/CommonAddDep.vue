<template>
  <el-dialog title="新增部门" :visible.sync="addDepVisible" width="40%" :before-close="addDepClose">
    <div class="addDepDiv">
      <el-form :model="addData" label-width="80px">
        <el-form-item label="上级部门">
          <el-input v-model="addData.departmentName" />
        </el-form-item>
      </el-form>
      <el-form :model="depData" label-width="80px">
        <el-form-item label="部门名称">
          <el-input v-model="depData.departmentName" />
        </el-form-item>
        <el-form-item label="排列顺序">
          <el-input v-model="depData.sequence" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="depData.phone" />
        </el-form-item>
        <el-form-item label="部门类型">
          <el-select v-model="depData.departmentType">
            <el-option label="内部单位" value="0" />
            <el-option label="管理机构" value="1" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary" @click="saveAddDep(), addDepClose()" class="addDepButton">提交</el-button>
    <el-button type="info" @click="addDepClose()">取消</el-button>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addDepVisible: {
      type: Boolean
    },
    addData: {
      type: Object
    }
  },
  inject: ["reload"],
  data() {
    return {
      depData: {
        departmentName: "",
        parentDepartmentId: "",
        departmentType: "",
        phone: "",
        departmentId: "",
        sequence:""
      }
    };
  },
  methods: {
    // 对话框父子组件传值
    addDepClose() {
      this.$emit("depRowClose");
    },
    // 部门
    saveAddDep() {
      this.depData.parentDepartmentId=this.addData.departmentId;
      this.postRequest(
        "/system/department/insertDepartment",
        this.depData
      ).then(resp => {
        if (resp) {
          this.$message({
            message: "部门新增成功!",
            type: "success"
          });
          this.reload();
        } else {
          this.$message.error("部门新增失败，请重新提交!");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.addDepDiv {
  height: 260px;
  overflow: auto;
}
.addDepDiv .el-input {
  width: 420px;
  height: 2px;
}
.addDepButton {
  margin: 0 0 0 180px;
}
</style>
