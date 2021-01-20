<template>
  <el-dialog
    title="液量异常筛选条件新增"
    :visible.sync="addLiqFilterConditionVisible"
    width="42%"
    :before-close="addLiqFilterConditionClose"
  >
    <div class="dialogDiv">
      <el-form :model="LiqFilterConditiontData" label-width="100px">
        <el-form-item label="井号:">
          <el-input v-model="LiqFilterConditiontData.wellId" />
        </el-form-item>
        <el-form-item label="检查日期:">
          <el-date-picker
            v-model="LiqFilterConditiontData.setDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="条件:">
          <template>
            <el-radio-group
              v-model="LiqFilterConditiontData.filter"
              size="medium"
            >
              <el-radio value="0" label="0" border>昨日</el-radio>
              <el-radio value="1" label="1" border>上月</el-radio>
              <el-radio value="2" label="2" border>前三月</el-radio>
              <el-radio value="3" label="3" border>任意天</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item
          v-if="LiqFilterConditiontData.filter === '3'"
          label="指定日期:"
        >
          <el-date-picker
            v-model="LiqFilterConditiontData.appointDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>

    <el-button
      type="primary"
      class="saveAddLiqFilterConditionButton"
      @click="saveAddLiqFilterCondition(), addLiqFilterConditionClose()"
      >提交</el-button
    >
    <el-button type="info" @click="addLiqFilterConditionClose()"
      >取消</el-button
    >
  </el-dialog>
</template>
<script>
export default {
  props: {
    addLiqFilterConditionVisible: {
      type: Boolean,
    },
  },
  inject: ["reload"],
  data() {
    return {
      LiqFilterConditiontData: {
        wellId: "",
        setDate: "",
        filter: "",
        appointDate: "",
      },
    };
  },
  methods: {
    // 对话框父子组件传值
    addLiqFilterConditionClose() {
      this.$emit("liqFilterConditionRowClose");
    },
    // 保存修改后的信息
    saveAddLiqFilterCondition() {
      this.postRequest(
        "/liquidFilterCondition/liquidFilter",
        this.LiqFilterConditiontData
      ).then((resp) => {
        if (resp) {
          this.$message({
            message: "液量异常筛选条件新增成功!",
            type: "success",
          });
          this.reload();
        } else {
          this.$message.error("液量异常筛选条件新增失败，请重新提交!");
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
  width: 460px;
  height: 2px;
}
.dialogDiv .el-select {
  width: 460px;
  height: 2px;
}
.dialogDiv .el-radio-group {
  margin-top: -40px;
  width: 460px;
  height: 2px;
}
.dialogDiv .el-radio {
  width: 85px;
  // height: 2px;
}
.dialogDiv .el-date-picker {
  width: 460px;
  height: 2px;
}
.saveAddLiqFilterConditionButton {
  margin: 0 0 0 240px;
}
.el-dialog__header {
  background: #dadee6;
  border-bottom: 2px solid #f2f6fc;
  height: 15px;
}
</style>
