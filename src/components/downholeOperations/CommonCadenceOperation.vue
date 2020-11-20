<template>
<el-dialog :title="cadenceData.wellId + '井 井下作业终止'" :visible.sync="cadenceOperVisible" width="43%" :before-close="cadenceOperClose">
  <div class="cadenceDiv">
    <el-form :model="cadenceData" label-width="80px">
      <el-form-item label="终止原因:">
        <el-input v-model="cadenceData.remark" type="textarea" />
      </el-form-item>
    </el-form>
  </div>
  <el-button type="primary" @click="saveCaCdenceOper(), cadenceOperClose()" class="caCdenceOperButton">终止</el-button>
  <el-button type="info" @click="cadenceOperClose()">取消</el-button>
</el-dialog>
</template>

<script>
export default {
  props: {
    cadenceOperVisible: {
      type: Boolean
    },
    cadenceData: {
      type: Object
    }
  },
  inject: ["reload"],
  data(){
    return{}
  },
  methods: {
    // 对话框父子组件传值
    cadenceOperClose() {
      this.$emit("cadenceRowClose");
    },
    // 保存修改后的信息
    saveCaCdenceOper() {
      //设置状态为终止状态
      this.cadenceData.operationState='2';
      this.putRequest("/operation/operationInfo/updateOperation", this.cadenceData).then(resp => {
        if (resp) {
          this.$message({
            message: "终止成功!",
            type: "success"
          });
          this.reload();
        } else {
          this.$message.error("终止失败，请重新提交!");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.cadenceDiv {
  height: 375px;
  overflow: auto;
}

.cadenceDiv .el-input {
  width: 180px;
  height: 2px;
}

.caCdenceOperButton {
  margin: 0 0 0 180px;
}
</style>
