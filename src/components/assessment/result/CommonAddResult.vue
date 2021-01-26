<template>
  <el-dialog
    title="新增考核结果"
    :visible.sync="addResultVisible"
    width="60%"
    :before-close="addResultClose"
  >
    <div class="dialogDiv">
      <el-form :model="addData" label-width="80px">
        <el-form-item label="参考单位">
          <el-input v-model="addData.takeObject" />
        </el-form-item>
        <el-form-item label="总得分">
          <el-input v-model="addData.totalScore" />
        </el-form-item>
        <el-form-item label="考核时间">
          <el-date-picker
            type="datetime"
            v-model="addData.examineDate"
            value-format="yyyy-MM-dd hh:mm:ss"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addData.remark" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveAddResult(), addResultClose()">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addResultVisible: {
      type: Boolean,
    },
  },
  inject: ["reload"],
  data() {
    return {
      addData: {
        takeObject: "",
        totalScore: "",
        examineDate: "",
        remark: "",
      },
    };
  },
  methods: {
    // 对话框父子组件传值
    addResultClose() {
      this.$emit("addClose");
    },
    // 部门
    saveAddResult() {
      this.postRequest(
        "/examine/resultInfor/bizExamineResultInfor",
        this.addData
      ).then((resp) => {
        if (resp) {
          this.$message({
            message: "考核结果新增成功!",
            type: "success",
          });
          this.reload();
        } else {
          this.$message.error("考核结果新增失败，请重新提交!");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.dialogDiv {
  height: 400px;
  overflow: auto;
}
.dialogDiv .el-input {
  width: 700px;
}
</style>

