<template>
  <el-dialog
    title="产液量曲线"
    :modal="false"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    size="42%"
    :visible.sync="previewDymVisible"
    @opened="opens"
    :before-close="previewDymClose"
  >
    <el-form :inline="true">
      <el-form-item width="80">
        <el-select
          v-model="termForm.oilStationId"
          clearable
          filterable
          placeholder="采油站"
          size="mini"
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
      <el-form-item>
        <el-select
          v-model="termForm.wellId"
          clearable
          filterable
          placeholder="单井"
          size="mini"
        >
          <el-option
            v-for="item in wellOptions"
            :key="item.wellId"
            :label="item.wellName"
            :value="item.wellId"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item>
        <el-date-picker
          type="date"
          filterable
          clearable
          placeholder="开始时间"
          v-model="termForm.beginTime"
          value-format="yyyy-MM-dd hh:mm:ss"
          size="mini"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          type="date"
          filterable
          clearable
          placeholder="结束时间"
          v-model="termForm.endTime"
          value-format="yyyy-MM-dd hh:mm:ss"
          size="mini"
        />
      </el-form-item> -->
      <el-form-item>
        <el-date-picker
      v-model="value1"
      type="datetimerange"
      size="mini"
       value-format="yyyy-MM-dd HH:mm:ss"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="lineListSearch()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <div
      class="chart"
      id="myChart"
      :style="{ width: '100%', height: '400px' }"
    />
  </el-dialog>
</template>

<script>
let echarts = require("echarts/lib/echarts");
export default {
  props: {
    previewDymVisible: {
      type: Boolean,
    },
    previewData: {
      type: Object,
    },
  },
  data() {
    return {
      tableData: [],
      xAxis: [],
      yAxis: [],
      data: [[]],
      isColor: true,
      wellOptions:[],
      orgNameData:[],
      termForm: {
        beginTime: "",
        endTime: "",
        oilStationId: "",
        wellId: "",
      },
      value1: [],
      wellName:"",
    };
  },
  methods: {
    // 对话框父子组件传值
    previewDymClose() {
      this.$emit("previewDymRowClose");
    },
    mounted() {
      this.drawLine();
    },
    gtDataInit() {
      this.termForm.endTime = this.previewData.acquisitionTime;
      this.termForm.beginTime = this.previewData.acquisitionTime;
      this.termForm.beginTime = this.termForm.beginTime.substring(0,10)+" 00:00:00";
       this.value1[0] = this.termForm.beginTime;
      this.value1[1] = this.termForm.endTime;
      this.termForm.wellId  = this.previewData.wellId;
      console.log(this.termForm.beginTime);
      this.getRequest(
        "/mountLiquid/liquidList?endTime=" +
          this.termForm.endTime +
          "&beginTime=" +
          this.termForm.beginTime +
          "&wellId=" +
          this.termForm.wellId
      ).then((resp) => {
        if (resp) {
          this.tableData = [];
          this.tableData = resp.data;
          this.wellName = resp.data[0].wellName;
          // this.termForm.oilStationId = resp.data[0].oilStationId;
          this.coordinate();
          this.$nextTick(() => {
            this.drawLine();
          });
        }
      });
    },
    lineListSearch(){
      this.getRequest(
        "/mountLiquid/liquidList?endTime=" +
          this.termForm.endTime +
          "&beginTime=" +
          this.termForm.beginTime +
          "&wellId=" +
          this.termForm.wellId
      ).then((resp) => {
        if (resp) {
          this.tableData = [];
          this.tableData = resp.data;
          this.wellName = resp.data[0].wellName;
          // this.termForm.oilStationId = resp.data[0].oilStationId;
          this.coordinate();
          this.$nextTick(() => {
            this.drawLine();
          });
        }
      });
    },
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.clear();
      myChart.setOption({
        title: {
          x: "center",
          text:
            this.wellName +
            "号井  " +
            this.termForm.beginTime +
            " 至 " +
            this.termForm.endTime+
            "产液量曲线",
          top: "7%",
          textStyle: {
            fontSize: 13,
            fontStyle: "normal",
            fontWeight: "bolder",
          },
          subtext: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
          formatter: function (params) {
            return (
              "<div><p>时间：" +
              params[0].value[0] +
              "</p>" +
              "<p>产液量：" +
              params[0].value[1] +
              "m</p>" +
              "</div>"
            );
          },
        },
        toolbox: {
          left: "right",
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        dataZoom: [
          {
            startValue: "2014-06-01",
          },
          {
            type: "inside",
          },
        ],
        grid: {
          left: "3%",
          right: "3%",
          bottom: "15%",
          top: "20%",
          containLabel: true,
        },
        xAxis: {
          nameLocation: "middle",
          type: "time",
        },
        yAxis: {
          name: "产液量(m)",
          nameLocation: "middle",
          nameGap: 30,
          type: "value",
          axisLine: { onZero: false },
          nameTextStyle: {
            padding: [0, 0, 6, 0],
            fontSize: 10,
          },
        },
        series: [
          {
            type: "line",
            smooth: true,
            lineStyle: {
              color: "green",
              width: 2,
            },
            data: this.data,
          },
        ],
      });
    },
    //将坐标数据串处理为坐标点
    coordinate() {
      this.data = [[]];
      for (var i = 0; i < this.tableData.length; i++) {
        this.data[i] = [];
        this.data[i][0] = this.tableData[i].acquisitionTime;
        this.data[i][1] = this.tableData[i].hourProd;
      }
      return this.data;
    },
    //采油站下拉框初始化
    orgNameInit() {
      this.getRequest("/basOilStationInfor/selectWater").then((resp) => {
        this.loading = false;
        if (resp) {
          this.orgNameData = resp.data;
        }
      });
    },
    //单井下拉框初始化
    wellOptionsInit() {
      this.getRequest("/basWellInfor/selectAmountLiquid").then((resp) => {
        this.loading = false;
        if (resp) {
          this.wellOptions = resp.data;
        }
      });
    },
    //单井根据采油站变化
    queryWellNameByOrgName(val) {
      this.getRequest(
        "/basWellInfor/selectAmountLiquidById?oilStationId=" + val
      ).then((resp) => {
        if (resp) {
          this.wellOptions = resp.data;
        }
      });
    },
    opens() {
      this.termForm.oilStationId = this.previewData.oilStationId;
      this.termForm.wellId = this.previewData.wellId;
      this.gtDataInit();
      this.orgNameInit();
      this.wellOptionsInit();

    },
  },
  watch: {
    value1() {
      this.termForm.beginTime = this.value1[0];
       this.termForm.endTime = this.value1[1];
       console.log(this.value1);
       console.log(this.termForm);
      this.lineListSearch();
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
  width: 700px;
}
</style>
