<template>
  <el-dialog
    title="工况异常数据详情"
    height="5%"
    :visible.sync="diagnosisAbnormalVisible"
    width="90%"
    :before-close="diagnosidsAbnormalClose"
    @opened="opened"
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
                v-model="termForm.acquisitionTime"
                style="width: 150px"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="报警级别">
              <el-select
                size="medium"
                style="width: 150px"
                filterable
                clearable
                v-model="termForm.diagnosisLevel"
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
                @click="diagnosisAbnormalSearch()"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          :data="diagndosisAbnormal"
          border
          height="83%"
          style="width: 100%"
          :row-style="{ height: '2px' }"
          :cell-style="{ padding: '5px' }"
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
            prop="acquisitionTime"
            label="采集时间"
            width="180"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="stroke"
            label="冲程(M)"
            width="60"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="frequency"
            label="冲次"
            width="60"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="maxLoad"
            label="最大载荷(KN)"
            width="70"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="minLoad"
            label="最小载荷(KN)"
            width="70"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="space"
            label="时间间隔(MS)"
            width="80"
            align="center"
          ></el-table-column>
          <!-- <el-table-column
            prop="pointNum"
            label="位移点数"
            width="80"
            align="center"
          ></el-table-column> -->
          <el-table-column
            prop="liquidProd"
            label="小时产液量(M3)"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="diagnosisResult"
            label="工况结果"
            max-width="280"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop=""
            label="小时含水(%)"
            width="80"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop=""
            label="人工确认"
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
    diagnosisAbnormalVisible: {
      type: Boolean,
    },
    diagndosisData: {
      type: Object,
    },
    nowTime: {
      type: String,
    },
  },
  data() {
    return {
      termForm: {
        oilStationId: "",
        acquisitionTime: "",
        diagnosisLevel: "",
      },
      orgNameData: [],
      loading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      diagndosisAbnormal: [],
      options: [
        {
          value: "0",
          label: "一级",
        },
        {
          value: "1",
          label: "二级",
        },
        {
          value: "2",
          label: "三级",
        },
      ],
    };
  },
  methods: {
    opened() {
      //初始化表格数据
      this.diagnosisAbnormalInit();
      this.orgNameInit();
    },
    // 对话框父子组件传值
    diagnosidsAbnormalClose() {
      this.$emit("diagnosidsRowClose");
    },
    //表格数据
    diagnosisAbnormalInit() {
      this.termForm.oilStationId = this.diagndosisData.oilStationId;
      if (this.termForm.acquisitionTime === "") {
        this.termForm.acquisitionTime = this.nowTime;
      }
      this.getRequest(
        "/diagnosis/abnormal/queryDiagramSourceByStationId?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize +
          "&acquisitionTime=" +
          this.termForm.acquisitionTime +
          "&oilStationId=" +
          this.termForm.oilStationId
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.diagndosisAbnormal = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    //查询数据
    diagnosisAbnormalSearch() {
      console.log(this.termForm);
      this.getRequest(
        "/diagnosis/abnormal/queryDiagramSourceByStationId?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize +
          "&acquisitionTime=" +
          this.termForm.acquisitionTime +
          "&oilStationId=" +
          this.termForm.oilStationId +
          "&diagnosisLevel=" +
          this.termForm.diagnosisLevel
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.diagndosisAbnormal = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    //采油站下拉框初始化
    orgNameInit() {
      this.getRequest("/basOilStationInfor/oilStationOptions").then((resp) => {
        this.loading = false;
        if (resp) {
          this.orgNameData = resp.data;
        }
      });
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.diagnosisAbnormalInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.diagnosisAbnormalInit();
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
