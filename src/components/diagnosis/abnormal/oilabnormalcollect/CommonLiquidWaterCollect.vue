<template>
  <el-dialog
    title="液量含水异常数据详情"
    height="5%"
    :visible.sync="liquidAbnormalVisible"
    width="90%"
    :before-close="liquidAbnormalClose"
  >
    <template>
      <div class="dialogDiv">
        <div class="waterAbnormal_top">
          <el-form style="height: 42px" :model="termForm" :inline="true">
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
                v-model="termForm.oilProdDate"
                style="width: 150px"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="异常条件">
              <el-select
                size="medium"
                style="width: 150px"
                filterable
                clearable
                v-model="termForm.abnormalType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-search"
                @click="waterAbnormalSearch()"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          :data="liquidAbnormal"
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
            :index="
              (index) => {
                return index + 1 + (this.currentPage - 1) * this.pageSize;
              }
            "
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
            prop="oilProdDate"
            label="产油日期"
            width="180"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="prodTime"
            label="生产时间"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="liquidProd"
            label="产液量"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="waterCut"
            label="含水率(%)"
            width="120"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="liquidProdStandard"
            label="标准产液量(M3)"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="waterCutStandard"
            label="标准含水率(%)"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="abnormalResult"
            label="异常结论"
            width="180"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="abnormalType"
            label="异常类型"
            width="80"
            align="center"
            ><template slot-scope="scope">
              <p v-if="scope.row.abnormalType == '0'">液量异常</p>
              <p v-if="scope.row.abnormalType == '1'">含水异常</p>
              <p v-if="scope.row.abnormalType == '2'">液量含水异常</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="abnormalReason"
            label="异常原因"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="80"
            align="center"
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
    liquidAbnormalVisible: {
      type: Boolean,
    },
    liquidData: {
      type: Object,
    },
  },
  data() {
    return {
      termForm: {
        oilStationId: "",
        oilProdDate: "",
        abnormalType: "",
      },
      orgNameData: [],
      loading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      liquidAbnormal: [],
      options: [
        {
          value: "0",
          label: "液量异常",
        },
        {
          value: "1",
          label: "含水异常",
        },
        {
          value: "2",
          label: "液量含水异常",
        },
      ],
    };
  },
  created() {
    //初始化表格数据
    this.liquidAbnormalInit();
  },
  methods: {
    // 对话框父子组件传值
    liquidAbnormalClose() {
      this.$emit("liquidRowlClose");
    },
    liquidAbnormalInit() {
      console.log(this.liquidData);
      this.getRequest(
        "/diagnosis/abnormal/queryLiquidWaterAbnormalByStationId?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize +
          "&oilStationId=" +
          this.termForm.oilStationId +
          "&oilProdDate=" +
          this.termForm.oilProdDate +
          "&abnormalType=" +
          this.termForm.abnormalType
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.liquidAbnormal = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.liquidAbnormalInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.liquidAbnormalInit();
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
