<template>
  <el-dialog
    title="液量含水异常数据详情"
    height="5%"
    :visible.sync="liquidAbnormalVisible"
    width="90%"
    :before-close="liquidAbnormalClose"
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
                />
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
              />
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
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-search"
                @click="liquidAbnormalSearch()"
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
            width="50"
            align="center"
            type="index"
            :index="
              (index) => {
                return index + 1 + (this.currentPage - 1) * this.pageSize;
              }
            "
          />
          <el-table-column
            prop="wellName"
            label="井号"
            width="110"
            align="center"
          />
          <el-table-column
            prop="oilStationName"
            label="采油站"
            width="120"
            align="center"
          />
          <el-table-column
            prop="oilProdDate"
            label="产油日期"
            width="180"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="prodTime"
            label="生产时间"
            width="80"
            align="center"
          />
          <el-table-column
            prop="liquidProd"
            label="产液量"
            width="80"
            align="center"
          />
          <el-table-column
            prop="waterCut"
            label="含水率(%)"
            width="80"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="liquidProdStandard"
            label="标准产液量(M3)"
            width="80"
            align="center"
          />
          <el-table-column
            prop="waterCutStandard"
            label="标准含水率(%)"
            width="80"
            align="center"
          />
          <el-table-column
            prop="abnormalResult"
            label="异常结论"
            width="280"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="abnormalType"
            label="异常类型"
            width="100"
            align="center"
            ><template slot-scope="scope">
              <a v-if="scope.row.abnormalType == '0'">液量异常</a>
              <a v-if="scope.row.abnormalType == '1'">含水异常</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="abnormalReason"
            label="异常原因"
            min-width="100"
            align="center"
          />
          <el-table-column
            prop="remark"
            label="备注"
            width="80"
            align="center"
          />
          <el-table-column label="操作" fixed="right" width="80" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="details(scope.row)"
                >查看曲线</el-button
              >
            </template>
          </el-table-column>
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
        <el-dialog
          title="液量曲线"
          width="62%"
          :modal-append-to-body="false"
          :visible.sync="dialogTableVisible"
          class="liquid_volume_abnormal_dialog"
        >
          <!-- 搜索框 -->
          <el-form
            :model="dialogForm"
            :inline="true"
            class="liquid_volume_abnormal_dialog_form"
          >
            <el-form-item>
              <el-input
                v-model="dialogForm.orgName"
                size="medium"
                :disabled="true"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="dialogForm.wellName"
                size="medium"
                :disabled="true"
              />
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="dialogForm.startDate"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-button type="primary" size="medium" @click="lineChart()"
              >查询</el-button
            >
          </el-form>
          <!-- 折线图 -->
          <div
            id="line"
            ref="dom"
            class="liquid_volume_abnormal_dialog_liq"
            v-loading="dialogLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
          >
            <span class="liquid_volume_abnormal_dialog_liq_text">{{
              this.dialogLiq
            }}</span>
          </div>
        </el-dialog>
      </div>
    </template>
  </el-dialog>
</template>
<script>
let echarts = require("echarts/lib/echarts");
export default {
  props: {
    liquidAbnormalVisible: {
      type: Boolean,
    },
    liquidData: {
      type: Object,
    },
    abnormalType: {
      type: String,
    },
    nowTime: {
      type: String,
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
      ],
      // 液量曲线加载动画
      dialogLoading: false,
      // 液量曲线对话框标记
      dialogTableVisible: false,
      // 液量曲线对话框默认内容
      dialogLiq: "暂无数据",
      // 液量曲线对话框搜索框
      dialogForm: {
        // 采油站
        orgName: "",
        // 井id
        wellId: "",
        // 井号
        wellName: "",
        // 异常类型
        abnormalType: "",
        // 日期段
        startDate: [],
      },
      //产油日期
      oilProdDate: [],
      //产液量STANDARD
      liquidProd: [],
      //含水率
      waterCut: [],
    };
  },
  methods: {
    opened() {
      //初始化表格数据
      this.liquidAbnormalInit();
      this.orgNameInit();
    },
    // 对话框父子组件传值
    liquidAbnormalClose() {
      this.$emit("liquidRowlClose");
      Object.assign(this.$data, this.$options.data());
    },
    liquidAbnormalInit() {
      //传递参数值
      this.termForm.oilStationId = this.liquidData.oilStationId;
      this.termForm.abnormalType = this.abnormalType;
      if (this.termForm.oilProdDate === "") {
        this.termForm.oilProdDate = this.nowTime;
      }
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
    liquidAbnormalSearch() {
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
      this.liquidAbnormalInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.liquidAbnormalInit();
    },
    // 查看曲线
    details(val) {
      this.dialogTableVisible = true;
      this.dialogForm.orgName = val.oilStationName;
      this.dialogForm.wellName = val.wellName;
      this.dialogForm.abnormalType = val.abnormalType;
      this.dialogForm.wellId = val.wellId;
      //调用当前时间
      this.dateInit();
      //调用绘图方法
      this.lineChart();
    },
    // 画图(液量曲线)
    lineChart() {
      if (
        this.dialogForm.startDate !== null &&
        this.dialogForm.startDate !== ""
      ) {
        this.dialogLoading = true;
        this.getRequest(
          "/OilDaily/getDailyList?wellId=" +
            this.dialogForm.wellId +
            "&startTime=" +
            this.dialogForm.startDate[0] +
            "&endTime=" +
            this.dialogForm.startDate[1]
        ).then((resp) => {
          //处理数据为坐标
          this.coordinate(resp.data);
          this.dialogLoading = false;
          if (resp) {
            this.dialogLiq = "";
            let myChart = echarts.init(
              document.getElementById(this.$refs.dom.id)
            );
            myChart.setOption(
              {
                title: {
                  subtext: this.dialogForm.wellName,
                  x: "center",
                  top: "4%",
                },
                legend: {
                  data: ["产液量(M)", "含水率(%)"],
                },
                grid: {
                  bottom: 80,
                },
                tooltip: {
                  trigger: "axis",
                  axisPointer: {
                    type: "cross",
                    animation: false,
                    label: {
                      backgroundColor: "#505765",
                    },
                  },
                },
                xAxis: [
                  {
                    type: "category",
                    boundaryGap: false,
                    data: this.oilProdDate,
                  },
                ],
                yAxis: [
                  {
                    name: "产液量(方)",
                    type: "value",
                    // max: 10,
                  },
                  {
                    name: "含水率(%)",
                    max: 100,
                    type: "value",
                  },
                ],
                series: [
                  {
                    name: "产液量(M)",
                    type: "line",
                    smooth: true,
                    yAxisIndex: 0,
                    data: this.liquidProd,
                  },
                  {
                    name: "含水率(%)",
                    type: "line",
                    smooth: true,
                    yAxisIndex: 1,
                    data: this.waterCut,
                  },
                ],
              },
              true
            );
          }
        });
      } else {
        this.$message({
          message: "请先输入开始-结束日期再查询",
          type: "warning",
        });
      }
    },
    //初始化时间
    dateInit() {
      if (this.dialogForm.startDate.length == 0) {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        var day = date.getDate();
        day = day < 10 ? "0" + day : day;
        var endDate = year + "-" + month + "-" + day;
        this.dialogForm.startDate[1] = endDate;
        var date1 = new Date();
        date1.setTime(date.getTime() - 7 * 24 * 60 * 60 * 1000);
        var year1 = date1.getFullYear();
        var month1 = date1.getMonth() + 1;
        month1 = month1 < 10 ? "0" + month1 : month1;
        var day1 = date1.getDate();
        day1 = day1 < 10 ? "0" + day1 : day1;
        var beginDate = year1 + "-" + month1 + "-" + day1;
        this.dialogForm.startDate[0] = beginDate;
      }
    },
    //处理坐标
    coordinate(val) {
      //产油日期
      this.oilProdDate = [];
      //产液量
      this.liquidProd = [];
      //含水率
      this.waterCut = [];
      for (var i = 0; i < val.length; i++) {
        this.oilProdDate[i] = val[i].oilProdDate;
        this.liquidProd[i] = val[i].drLiquidProd;
        this.waterCut[i] = val[i].drWaterCut;
      }
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
.liquid_volume_abnormal_dialog {
  width: 100%;
}

.liquid_volume_abnormal_dialog_form {
  width: 100%;
}

.liquid_volume_abnormal_dialog_liq {
  height: 430px;
  width: 100%;
}

.liquid_volume_abnormal_dialog_liq_text {
  line-height: 430px;
  margin-left: 42%;
  font-size: 26px;
}
.liquid_volume_abnormal_dialog .el-dialog__header {
  height: 4%;
}
</style>
