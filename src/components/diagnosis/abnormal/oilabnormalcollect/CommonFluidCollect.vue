<template>
  <el-dialog
    title="动液面异常数据详情"
    height="5%"
    :visible.sync="fluidAbnormalVisible"
     width="76%"
    :before-close="fluidAbnormalClose"
  >
  <template>
    <div class="dialogDiv">
      <div class="waterAbnormal_top">
        <el-form style="height:42px;" :model="termForm" :inline="true">
          <el-form-item label="采油站">
            <el-select
              size="medium"
              v-model="termForm.oilStationId"
              style="width: 150px"
              filterable
              clearable
              placeholder="全区"
            >
              <el-option
                v-for="item in orgNameData"
                :key="item.oilStationId"
                :label="item.oilStationName"
                :value="item.oilStationId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              size="medium"
              v-model="termForm.analysisDate"
              style="width: 150px"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-search"
              @click="fluidAbnormalInit()"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="fluidAbnormal"
        border
        height="83%"
        style="width: 100%"
        :row-style="{ height: '2px' }"
        :cell-style="{ padding: '0px' }"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column
         
          label="序号"
          width="60"
          align="center"
          type="index"
          :index="(index)=>{return (index+1) + (this.currentPage-1)*this.pageSize }"
        >
        </el-table-column>
        <el-table-column
          prop="wellName"
          label="井号"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
            prop="oilStationName"
            label="采油站"
            width="120"
            align="center"
          ></el-table-column>
        <el-table-column
          prop="analysisDate"
          label="分析日期"
          width="180"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="fluidLevel"
          label="动液面(M)"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="fluidLevelStandard"
          label="标准动液面(M)"
          width="100"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="abnormalResult"
          label="异常结论"
          width="240"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="abnormalReason"
          label="异常原因"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="100"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
      </el-table>
      <div class="liqFilterCondition_page">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 30, 40, 50]"
          layout="total, prev, pager, next, jumper, sizes"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </template>
  </el-dialog>
</template>
<script>
export default {
  props: {
    fluidAbnormalVisible: {
      type: Boolean,
    },
    fluidData: {
      type: Object,
    },
  },
  data() {
    return {
      termForm: {
        oilStationId: "",
        analysisDate: "",
      },
      orgNameData: [],
      loading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      fluidAbnormal: [],
      options: [
        {
          value: "0",
          label: "正常",
        },
        {
          value: "1",
          label: "欠注",
        },
        {
          value: "2",
          label: "超注",
        },
      ],
    };
  },
  created() {
    //初始化表格数据
    this.fluidAbnormalInit();
  },
  methods: {
    // 对话框父子组件传值
    fluidAbnormalClose() {
      this.$emit("fluidRowClose");
    },
    fluidAbnormalInit() {
      console.log(this.editData);
      this.getRequest(
        "/diagnosis/abnormal/queryFluidLevelAbnormalByStationId?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize+
          "&analysisDate"+
          this.termForm.analysisDate +
          "&oilStationId=" +
          this.termForm.oilStationId 
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.fluidAbnormal = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    //采油站下拉框初始化
    orgNameInit() {
      this.getRequest("/waterAbnormalCollect/oilStation").then((resp) => {
        this.loading = false;
        if (resp) {
          this.orgNameData = resp.data;
        }
      });
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = parseInt(val);
      this.waterAbnormalSearch();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = parseInt(val);
      this.waterAbnormalSearch();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../../assets/css/diagnosis/abnormal/waterAbnormalCollect.css";
.dialogDiv {
  height: 480px;
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
  background: #dadee6;
  border-bottom: 2px solid #f2f6fc;
  height: 15px;
}
</style>
