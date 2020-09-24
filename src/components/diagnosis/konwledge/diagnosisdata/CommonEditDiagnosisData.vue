<template>
  <el-dialog
    title="功图诊断参数编辑"
    :visible.sync="editDiagnosisDataVisible"
    width="60%"
    :before-close="editDiagnosisDataClose"
  >
    <div class="dialogDiv">
      <el-form :model="editData" label-position="left" label-width="100px">
        <el-form-item label="诊断步骤:">
          <el-input v-model="editData.diagnosticStep" />
        </el-form-item>
        <el-form-item label="序号(数字):">
          <el-input v-model="editData.orderNumber" />
        </el-form-item>
        <el-form-item label="诊断结果:">
          <el-input v-model="editData.abnormalProblem" />
        </el-form-item>
        <el-form-item label="诊断依据:">
          <el-input v-model="editData.diagnosticBasis" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveEditDiagnosisData(), editDiagnosisDataClose()">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editDiagnosisDataVisible: {
      type: Boolean
    },
    editData:{
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    // 对话框父子组件传值
    editDiagnosisDataClose() {
      this.$emit("diagnosisDataRowClose");
    },
    // 保存修改后的信息
    saveEditDiagnosisData() {
      this.putRequest("/knowledge/DiagnosticParametersGt/DiagnosticParametersGt",this.editData).then(resp => {
        if (resp) {
          this.$message({
            message: "液量异常筛选条件信息修改成功!",
            type: "success"
          });
        } else {
          this.$message.error("液量异常筛选条件信息修改失败，请重新提交!");
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
