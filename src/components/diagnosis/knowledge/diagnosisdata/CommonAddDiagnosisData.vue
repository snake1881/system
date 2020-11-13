<template>
  <el-dialog
    title="功图诊断参数新增"
    :visible.sync="addDiagnosisDataVisible"
    width="42%"
    :before-close="addDiagnosisDataClose"
  >
    <div class="dialogDiv">
      <el-form :model="DiagnosisData" label-width="120px">
        <el-form-item label="诊断步骤:">
          <el-input v-model="DiagnosisData.diagnosticStep" />
        </el-form-item>
        <el-form-item label="序号(数字):">
          <el-input v-model="DiagnosisData.orderNumber" />
        </el-form-item>
        <el-form-item label="诊断结果:">
          <el-input v-model="DiagnosisData.abnormalProblem" />
        </el-form-item>
        <el-form-item label="诊断依据（符号;换行）:">
          <el-input
            type="textarea"
            autosize
            v-model="DiagnosisData.diagnosticBasis"
          />
        </el-form-item>
      </el-form>
    </div>
    <el-button
      type="primary"
      class="saveAddDiagnosisDataButton"
      @click="saveAddDiagnosisData(), addDiagnosisDataClose()"
    >
      提交
    </el-button>
    <el-button type="info" @click="addDiagnosisDataClose()">
      取消
    </el-button>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addDiagnosisDataVisible: {
      type: Boolean
    }
  },
  inject: ["reload"],
  data() {
    return {
      DiagnosisData: {
        diagnosticStep: "",
        orderNumber: "",
        abnormalProblem: "",
        diagnosticBasis: ""
      }
    };
  },
  methods: {
    // 对话框父子组件传值
    addDiagnosisDataClose() {
      this.$emit("diagnosisDataRowClose");
    },
    // 保存修改后的信息
    saveAddDiagnosisData() {
      this.postRequest(
        "/knowledge/DiagnosticParametersGt/DiagnosticParametersGt",
        this.DiagnosisData
      ).then(resp => {
        if (resp) {
          this.$message({
            message: "功图诊断参数新增成功!",
            type: "success"
          });
          this.reload();
        } else {
          this.$message.error("功图诊断参数新增失败，请重新提交!");
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
.dialogDiv .el-input {
  width: 420px;
  height: 2px;
}
.dialogDiv .el-select {
  width: 420px;
  height: 2px;
}
.dialogDiv .el-date-picker {
  width: 420px;
  height: 2px;
}
.saveAddDiagnosisDataButton {
  margin: 0 0 0 240px;
}
.el-dialog__header {
  background:#dadee6;
  border-bottom: 2px solid #F2F6FC;
  height: 15px;

}
</style>
