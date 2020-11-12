<template>
<el-dialog title="编辑考核结果" :visible.sync="editResultVisible" width="45%" :before-close="editResultClose">
  <div class="editResult">
    <el-form :model="editData" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="参考单位">
            <el-input v-model="editData.takeObject" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总得分">
            <el-input :disabled="true" v-model="editData.totalScore" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="备注">
            <el-input v-model="editData.remark" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="考核时间">
            <el-date-picker type="datetime" v-model="editData.examineDate" value-format="yyyy-MM-dd hh:mm:ss" />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </div>
  <el-button type="primary" @click="saveEditResult(), editResultClose()" class="editResultButton">提交 </el-button>
  <el-button type="info" @click="editResultClose()">取消 </el-button>
</el-dialog>
</template>

<script>
export default {
  props: {
    editResultVisible: {
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
    editResultClose() {
      this.$emit("editClose");
    },
    // 保存
    saveEditResult() {
      this.putRequest(
        "/examine/resultInfor/bizExamineResultInfor",
        this.editData
      ).then(resp => {
        if (resp) {
          this.$message({
            message: "考核结果修改成功!",
            type: "success"
          });
        } else {
          this.$message.error("考核结果修改失败，请重新提交!");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.editResult {
  height: 200px;
  overflow: auto;
}

.editResult .el-input {
  width: 240px;
}

.editResultButton {
  margin-left: 200px;
}
</style>
