<template>
  <div class="liquid_volume_abnormal">
    <!-- 条件查询 -->
    <el-form
      class="liquid_volume_abnormal_form"
      :model="termForm"
      :inline="true"
    >
      <!-- 下拉框查询 -->
      <el-form-item label="采油站">
        <el-select
          v-model="termForm.oilStationId"
          clearable
          filterable
          placeholder="全区"
          size="medium"
          @change="queryWellNameByOrgName"
        >
          <el-option
            v-for="item in orgNameData"
            :key="item.oilStationId"
            :label="item.oilStationName"
            :value="item.oilStationId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="单井">
        <el-select
          v-model="termForm.wellId"
          clearable
          filterable
          placeholder="全站"
          size="medium"
        >
          <el-option
            v-for="item in wellOptions"
            :key="item.wellId"
            :label="item.wellName"
            :value="item.wellId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="termForm.oilProdDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          size="medium"
        />
      </el-form-item>
      <el-form-item label="条件">
        <el-select
          v-model="termForm.abnormalType"
          placeholder="全部"
          size="medium"
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
          icon="el-icon-search"
          size="small"
          @click="liquidVolumeInit()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="liquidAbnormal"
      height="83%"
      border
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
      />
      <el-table-column
        prop="wellName"
        label="井号"
        width="120"
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
        width="60"
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
        width="180"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="abnormalType"
        label="异常类型"
        width="80"
        align="center"
        ><template slot-scope="scope">
          <p v-if="scope.row.abnormalType == '0'">液量异常</p>
          <p v-if="scope.row.abnormalType == '1'">含水异常</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="abnormalReason"
        label="异常原因"
        width="80"
        align="center"
      />
      <el-table-column
        prop="remark"
        label="备注"
        width="80"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="操作" fixed="right" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="details(scope.row)"
            >查看曲线</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="dleteByPrimaryId(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="liquid_volume_abnormal_page">
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
      width="70%"
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
<script>
let echarts = require("echarts/lib/echarts");
export default {
  data() {
    return {
      // 液量异常数据
      liquidAbnormal: [],
      // 表单数据
      termForm: {
        oilStationId: "",
        wellId: "",
        oilProdDate: "",
        abnormalType: "0",
      },
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true,
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
      orgNameData: [],
      //单井下拉框数据
      wellOptions: [],
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
      //产油日期
      oilProdDate: [],
      //产液量STANDARD
      liquidProd: [],
      //标准产液量
      liquidProdStandard: [],
      //含水率
      waterCut: [],
      //标准含水率
      waterCutStandard: [],
    };
  },
  created() {
    this.liquidVolumeInit();
    this.orgNameInit();
    this.wellOptionsInit();
  },
  methods: {
    // 数据初始化
    liquidVolumeInit() {
      //如果日期值为空
      if (this.termForm.oilProdDate === "") {
        //默认传递当前日期
        this.termForm.oilProdDate = this.getdate();
      }
      this.getRequest(
        "/diagnosis/abnormal/queryLiquidWaterAbnormalByStationId?abnormalType=" +
          this.termForm.abnormalType +
          "&current=" +
          this.currentPage +
          "&oilProdDate=" +
          this.termForm.oilProdDate +
          "&oilStationId=" +
          this.termForm.oilStationId +
          "&pageSize=" +
          this.pageSize +
          "&wellId=" +
          this.termForm.wellId
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
    // 根据primaryId删除异常数据
    dleteByPrimaryId(val) {
      let primaryId = val.oilpabnId;
      this.deleteRequest(
        "/diagnosis/abnormal/deleteByPrimaryId?primaryId=" + primaryId
      ).then((resp) => {
        if (resp) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.liquidVolumeInit();
        }
      });
    },
    //采油站下拉框初始化
    orgNameInit() {
      this.getRequest("/basOilStationInfor/oilStationOptions").then((resp) => {
        this.loading = false;
        if (resp) {
          this.orgNameData = resp.data;
          let oilAll = {
            oilStationId: "",
            oilStationName: "全站",
          };
          this.orgNameData.push(oilAll);
        }
      });
    },
    //单井下拉框初始化
    wellOptionsInit() {
      this.getRequest("/basWellInfor/selectOil").then((resp) => {
        this.loading = false;
        if (resp) {
          this.wellOptions = resp.data;
        }
      });
    },
    //单井根据采油站变化
    queryWellNameByOrgName(val) {
      if (val === "") {
        this.wellOptionsInit();
      } else {
        this.getRequest("/basWellInfor/selectAllById?oilStationId=" + val).then(
          (resp) => {
            if (resp) {
              this.wellOptions = resp.data;
            }
          }
        );
      }
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.liquidVolumeInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.liquidVolumeInit();
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
    //获取当前日期
    getdate() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var strDate = date.getDate();
      strDate = strDate < 10 ? "0" + strDate : strDate;
      var currentdate = year + "-" + month + "-" + strDate;
      return currentdate;
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/oilWell/liquidVolumeAbnormal.css";
</style>
