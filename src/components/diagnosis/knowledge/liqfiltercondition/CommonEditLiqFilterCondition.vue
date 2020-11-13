<template>
  <el-dialog
    title="液量异常筛选条件编辑"
    :visible.sync="editLiqFilterConditionVisible"
    width="42%"
    :before-close="editLiqFilterConditionClose"
  >
    <div class="dialogDiv">
      <el-form :model="editData" label-width="100px" >
        <el-form-item label="井号:">
          <el-input :disabled="true" v-model="editData.wellName" />
        </el-form-item>
        <el-form-item label="检查日期:">
          <el-input :disabled="true" v-model="editData.prodDate" />
        </el-form-item>
        <el-form-item label="条件:">
            <el-radio-group v-model="editData.filter">
              <el-radio  label="昨日" border></el-radio >
              <el-radio  label="上月" border></el-radio>
              <el-radio label="前三月" border></el-radio >
              <el-radio label="任意天" border></el-radio >
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="editData.filter === '任意天'" label="指定日期:">
          <el-date-picker
            v-model="editData.appointDate"
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
      class="saveEditLiqFilterConditionButton"
      type="primary"
      @click="saveEditLiqFilterCondition(), editLiqFilterConditionClose()"
    >
      提交
    </el-button>
    <el-button type="info" @click="editLiqFilterConditionClose()">
      取消
    </el-button>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editLiqFilterConditionVisible: {
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
    //判断是否为任意天
    editAppointDate() {
      if (editData.filter === "任意天") {
        this.saveEditLiqFilterCondition(), this.editLiqFilterConditionClose();
      } else {
        editData.appointDate = null;
        this.saveEditLiqFilterCondition(), this.editLiqFilterConditionClose();
      }
    },
    // 对话框父子组件传值
    editLiqFilterConditionClose() {
      this.$emit("liqFilterConditionRowClose");
    },
    // 保存修改后的信息
    saveEditLiqFilterCondition() {
      this.putRequest(
        "/knowledge/LiqFilterCondition/LiqFilterCondition",
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
  width: 460px;
  height: 2px;
}
.dialogDiv .el-select {
  width: 460px;
  height: 2px;
}
.dialogDiv .el-radio-group {
  margin-top:-40px;
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
.saveEditLiqFilterConditionButton {
  margin: 0 0 0 240px;
}
.el-dialog__header {
  background:#dadee6;
  border-bottom: 2px solid #F2F6FC;
  height: 15px;

}
</style>
