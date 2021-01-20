<template>
  <el-dialog
    title="液量异常筛选条件新增"
    :visible.sync="addLiqFilterConditionVisible"
    width="60%"
    :before-close="addLiqFilterConditionClose"
  >
    <div class="dialogDiv">
      <el-form
        :model="LiqFilterConditiontData"
        label-position="left"
        label-width="300px"
      >
        <el-form-item label="井号:">
          <el-input
            v-model="LiqFilterConditiontData.wellId"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="检查日期:">
          <el-date-picker
            v-model="LiqFilterConditiontData.setDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 300px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="条件（选择任意天后可选择日期）:">
          <template>
            <el-radio-group v-model="LiqFilterConditiontData.filter">
              <el-radio value="0" label="0" border>昨日</el-radio>
              <el-radio value="1" label="1" border>上月</el-radio>
              <el-radio value="2" label="2" border>前三月</el-radio>
              <el-radio value="3" label="3" border>任意天</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item
          v-if="LiqFilterConditiontData.filter === '任意天'"
          label="指定日期:"
        >
          <el-date-picker
            v-model="LiqFilterConditiontData.appointDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 300px"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button
        type="primary"
        @click="saveAddLiqFilterCondition(), addLiqFilterConditionClose()"
        >提交</el-button
      >
    </span>
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
      this.putRequest(
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
</style>
<style lang="less" scoped>
.el-input {
  width: 700px;
}
</style>
