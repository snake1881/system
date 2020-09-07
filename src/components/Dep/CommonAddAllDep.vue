<template>
  <el-dialog
    title="创建新部门"
    :visible.sync="addAllDepVisible"
    width="60%"
    :before-close="addAllDepClose"
  >
    <div class="dialogDiv">
      <el-form :model="allDepData" label-width="80px">
        <el-form-item label="部门名称">
          <el-input v-model="allDepData.departmentName" />
        </el-form-item>
        <el-form-item label="排列顺序">
          <el-input v-model="allDepData.sequence" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="allDepData.phone" />
        </el-form-item>
        <!-- <el-form-item label="父级ID">
          <el-input v-model="allDepData.parentDepartmentId" />
        </el-form-item> -->
        <el-form-item label="部门类型">
          <el-select v-model="allDepData.departmentType">
            <el-option label="内部单位" value="0" />
            <el-option label="管理机构" value="1" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveAddAllDep(), addAllDepClose()">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addAllDepVisible: {
      type: Boolean
    }
  },
  inject: ["reload"],
  data() {
    return {
      allDepData: {
        departmentName: "",
        departmentType: "",
        sequence: "",
        phone: ""
      }
    };
  },
  methods: {
    // 对话框父子组件传值
    addAllDepClose() {
      this.$emit("depRowClose");
    },
    // 保存新增部门信息
    saveAddAllDep() {
      this.postRequest(
        "/system/department/insertDepartment",
        this.allDepData
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
