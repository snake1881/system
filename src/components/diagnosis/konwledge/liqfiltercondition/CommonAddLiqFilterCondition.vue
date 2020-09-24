<template>
  <el-dialog
    title="液量异常筛选条件新增"
    :visible.sync="addLiqFilterConditionVisible"
    width="60%"
    :before-close="addLiqFilterConditionClose"
  >
    <div class="dialogDiv">
      <el-form :model="LiqFilterConditiontData" label-position="right" label-width="300px">
        <el-form-item label="井号:">
          <el-input v-model="LiqFilterConditiontData.wellName" style="width: 300px" />
        </el-form-item>
        <el-form-item label="检查日期(格式：yyyy-mm-dd):">
          <el-input v-model="LiqFilterConditiontData.prodDate" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="条件（填写选定日期后可选择任意天）:" >
          <template>
            <el-radio-group v-model="LiqFilterConditiontData.filter">
              <el-radio label="昨日" border></el-radio>
              <el-radio label="上月" border></el-radio>
              <el-radio label="前三月" border></el-radio>
              <el-radio label="任意天" border></el-radio>
            </el-radio-group>
          </template>
          <!-- <el-input v-model="LiqFilterConditiontData.filter" style="width: 300px" ></el-input> -->
        </el-form-item>
        <el-form-item 
        v-if="LiqFilterConditiontData.filter==='任意天'"
        label="指定日期(格式：yyyy-mm-dd):">
          <el-input v-model="LiqFilterConditiontData.appointDate" style="width: 300px" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button
        type="primary"
        @click="saveAddLiqFilterCondition(), addLiqFilterConditionClose()"
      >提交</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addLiqFilterConditionVisible: {
      type: Boolean
    }
  },
  inject: ["reload"],
  data() {
    return {
      LiqFilterConditiontData: {
        wellName: "",
        prodDate: "",
        filter: "",
        appointDate: ""
      }
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
        "/knowledge/LiqFilterCondition/LiqFilterCondition",
        this.LiqFilterConditiontData
      ).then(resp => {
        if (resp) {
          this.$message({
            message: "液量异常筛选条件新增成功!",
            type: "success"
          });
          this.reload();
        } else {
          this.$message.error("液量异常筛选条件新增失败，请重新提交!");
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
