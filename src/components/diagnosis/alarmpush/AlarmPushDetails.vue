<template>
  <el-dialog
    title="异常报警详情"
    :visible.sync="alarmPushDetailsVisible"
    width="80%"
    :before-close="alarmPushDetailsClose"
    @opened="opens"
  >
    <div class="dialogDiv">
       <el-table
          :data="editData.content"
          border
          height="88%"
          style="width: 100%"
          :row-style="{ height: '2px' }"
          :cell-style="{ padding: '0px' }"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        >
          <el-table-column
            fixed
            label="序号"
            width="60"
            align="center"
            type="index"
            :index="
              (index) => {
                return index+1;
              }
            "
          />
          <el-table-column
            fixed
            prop="wellName"
            label="井号"
            width="120"
            align="center"
          />
          <el-table-column
            fixed
            prop="oilStationName"
            label="采油站"
            width="120"
            align="center"
          />
          <el-table-column
        prop="acquisitionTime"
        align="center"
        label="量液时间"
        width="180"
      />
      <el-table-column
        prop="stroke"
        align="center"
        label="冲程(M)"
        width="80"
      />
      <el-table-column
        prop="frequency"
        align="center"
        label="冲次"
        width="80"
      />
      <el-table-column
        prop="maxLoad"
        align="center"
        label="最大载荷"
        width="90"
      />
      <el-table-column
        prop="minLoad"
        align="center"
        label="最小载荷"
        width="90"
      />
      <el-table-column
        prop="maxDisplacement"
        align="center"
        label="最大位移"
        width="80"
      />
      <el-table-column
        prop="minDisplacement"
        align="center"
        label="最小位移"
        width="80"
      />
    <el-table-column
          prop="diagnosisResult"
          label="诊断结果"
          min-width="150"
          align="center"
        />
        <el-table-column
          prop="diagnosisLevel"
          label="报警级别"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.diagnosisLevel == '0'">一级</p>
            <p v-if="scope.row.diagnosisLevel == '1'">二级</p>
            <p v-if="scope.row.diagnosisLevel == '2'">三级</p>
            <p v-if="scope.row.diagnosisLevel == '3'">四级</p>
            <p v-if="scope.row.diagnosisLevel == '4'">正常</p>
          </template></el-table-column
        >
       </el-table>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    alarmPushDetailsVisible: {
      type: Boolean,
    },
    editData: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
     // 对话框父子组件传值
    alarmPushDetailsClose() {
      this.$emit("AlarmPushRowClose");
    },
    opens(){
      console.log(this.editData);
    },
    
  },
};
</script>

<style lang="less" scoped>
.dialogDiv {
  height: 600px;
  overflow: auto;
}
.dialogDiv .el-input {
  width: 700px;
}
</style>

