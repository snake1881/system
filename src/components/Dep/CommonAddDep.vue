<template>
  <el-dialog
    title="新增部门"
    :visible.sync="addDepVisible"
    width="60%"
    :before-close="addDepClose"
  >
    <div class="dialogDiv">
      <el-form :model="addDepData" label-width="80px">
        <!-- <el-form-item label="上级部门">
          <el-input v-model="addDepData.departmentName" />
        </el-form-item> -->
        <el-form-item label="id">
          <el-input v-model="addDepData.departmentId" />
        </el-form-item>
      </el-form>
      <el-form :model="depData" label-width="80px">
        <!-- <el-form-item label="部门名称">
          <el-input v-model="depData.departmentName" />
        </el-form-item> -->
        <el-form-item label="父级id">
          <el-input v-model="depData.parentDepartmentId" />
        </el-form-item>
        <el-form-item label="排列顺序">
          <el-input v-model="depData.sequence" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="depData.phone" />
        </el-form-item>
        <el-form-item label="父级id">
          <el-input v-model="depData.parentDepartmentId" />
        </el-form-item>
        <el-form-item label="部门类型">
          <el-select v-model="depData.departmentType">
            <el-option label="内部单位" value="0" />
            <el-option label="管理机构" value="1" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveAddDep(), addDepClose()">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addDepVisible: {
      type: Boolean
    },
    addDepData: {
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
        sequence: ""
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
