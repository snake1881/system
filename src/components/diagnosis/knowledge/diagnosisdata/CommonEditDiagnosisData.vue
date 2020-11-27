<template>
  <el-dialog
    title="功图诊断参数编辑"
    :visible.sync="editDiagnosisDataVisible"
    width="42%"
    :before-close="editDiagnosisDataClose"
  >
    <div class="dialogDiv">
      <el-form :model="editData" label-width="180px">
        <el-form-item label="模块名称:">
          <el-input :disabled="true" v-model="editData.modelName" />
        </el-form-item>
        <el-form-item label="诊断步骤:">
          <el-input :disabled="true" v-model="editData.diagnosisStep" />
        </el-form-item>
        <el-form-item label="序号(数字):">
          <el-input :disabled="true" v-model="editData.sequence" />
        </el-form-item>
        <el-form-item label="诊断结果:">
          <el-input v-model="editData.diagnosisResult" />
        </el-form-item>
        <el-form-item label="诊断依据:(符号;换行)">
          <el-input
            type="textarea"
            v-model="editData.diagnosisBasis"
          />
        </el-form-item>
      </el-form>
    </div>
    <el-button
      type="primary"
      class="saveEditDiagnosisDataButton"
      @click="saveEditDiagnosisData(), editDiagnosisDataClose()"
    >
      提交
    </el-button>
    <el-button type="info" @click="editDiagnosisDataClose()">
      取消
    </el-button>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editDiagnosisDataVisible: {
      type: Boolean
    },
    editData: {
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
      this.putRequest(
        "/modelPrinciple/modelPrinciple",
        this.editData
      ).then(resp => {
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
.dialogDiv .el-input {
  width: 410px;
  height: 2px;
}
.dialogDiv .el-select {
  width: 410px;
  height: 2px;
}
.dialogDiv .el-date-picker {
  width: 410px;
  height: 2px;
}
.saveEditDiagnosisDataButton {
  margin: 0 0 0 240px;
}
.el-dialog__header {
  background:#dadee6;
  border-bottom: 2px solid #F2F6FC;
  height: 15px;

}
</style>
