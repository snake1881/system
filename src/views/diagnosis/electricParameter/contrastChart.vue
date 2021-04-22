<template>
  <div class="contrastChart">
    <el-form
      class="contrastChart_form"
      :inline="true"
      :model="contrastChartForm"
    >
      <el-form-item>
        <el-select
          placeholder="采油站"
          v-model="contrastChartForm.oilStationId"
          size="medium"
        >
          <el-option
            v-for="item in oilStationOptions"
            :key="item.oilStationId"
            :label="item.oilStationName"
            :value="item.oilStationId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          type="date"
          placeholder="时间"
          v-model="contrastChartForm.testTime"
          value-format="yyyy-MM-dd"
          size="medium"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="searchContrastChart()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :data="contrastChartTable"
      height="85%"
      border
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center', padding: 6 + 'px' }"
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column label="井号" prop="wellName" width="100" />
      <el-table-column label="测试时间" prop="testTime" width="180" />
      <el-table-column label="冲程" prop="stroke" />
      <el-table-column label="冲次" prop="frequency" width="100" />
      <el-table-column label="示功图">
        <el-table-column label="最大负荷" prop="maxLoad" />
        <el-table-column label="最小负荷" prop="minLoad" width="100" />
        <el-table-column label="产液量" prop="liquidProd" width="110" />
        <el-table-column label="图形" width="200">
          <template slot-scope="scope">
            <div :id="scope.row.elepaId" style="width: 200px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column
          label="工况诊断结果"
          width="120"
          prop="diagnosisResult"
        />
      </el-table-column>
      <el-table-column label="电流图">
        <el-table-column label="上行最大" prop="maxElectric" />
        <el-table-column label="下行最大" prop="minElectric" />
        <el-table-column
          label="平衡度"
          prop="tphaseEqualizationRatio"
          width="100"
        />
        <el-table-column label="图形" width="200">
          <template slot-scope="scope">
            <div
              :id="scope.row.elepaId + '1'"
              style="width: 200px; height: 100px"
            />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="控制" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="showContrastChart(scope.row)"
            >显示</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 放大显示 -->
    <el-dialog
      title="请选择放大显示的图形"
      center
      width="30%"
      :visible="contrastChartVisible"
      :before-close="contrastChartClose"
    >
      <el-row>
        <el-col :span="9">
          <el-button @click="innerGt()">示功图</el-button>
        </el-col>
        <el-col :span="9">
          <el-button @click="innerDc()">电流图</el-button>
        </el-col>
        <el-col :span="6">
          <el-button @click="contrastChartClose">取消</el-button>
        </el-col>
      </el-row>
      <el-dialog
        width="40%"
        title="示功图图形"
        @open="gtOpen()"
        :visible="innerGtVisible"
        :before-close="innerGtClose"
        append-to-body
      >
        <el-row>
          <el-button
            type="success"
            plain
            size="small"
            style="float: right"
            @click="gtOverlap()"
            >示功图叠加</el-button
          >
          <el-button
            type="success"
            plain
            size="small"
            style="float: right"
            @click="gtEnlarge()"
            >示功图放大</el-button
          >
        </el-row>
        <div class="gtDialog" v-if="gtFlag === 1">
          <div class="gtDialog_left">
            <div id="gt" style="height: 300px; width: 300px" />
          </div>
          <div class="gtDialog_right">
            <span class="gtDialog_right_span"
              >隶属单位：{{ currentData.oilStationName }}</span
            >
            <span class="gtDialog_right_span"
              >井号：{{ currentData.wellName }}</span
            >
            <span class="gtDialog_right_span"
              >冲程：{{ currentData.stroke }}m
            </span>
            <span class="gtDialog_right_span"
              >冲次：{{ currentData.frequency }}/min</span
            >
            <span class="gtDialog_right_span"
              >测试日期：{{ currentData.testTime }}
            </span>
            <span class="gtDialog_right_span"
              >最大负荷：{{ currentData.maxLoad }}KN</span
            >
            <span class="gtDialog_right_span"
              >最小负荷：{{ currentData.minLoad }}KN</span
            >
          </div>
        </div>
        <div v-if="gtFlag === 2">
          <div id="gt2" style="height: 300px; width: 500px" />
        </div>
      </el-dialog>
      <el-dialog
        width="40%"
        title="电流图图形"
        @open="dcOpen()"
        :visible="innerDcVisible"
        :before-close="innerDcClose"
        append-to-body
      >
        <div class="gtDialog">
          <div class="gtDialog_left">
            <div id="dc" style="height: 300px; width: 300px" />
          </div>
          <div class="gtDialog_right">
            <span class="gtDialog_right_span"
              >隶属单位：{{ currentData.oilStationName }}</span
            >
            <span class="gtDialog_right_span"
              >井号：{{ currentData.wellName }}</span
            >
            <span class="gtDialog_right_span"
              >冲程：{{ currentData.stroke }}m
            </span>
            <span class="gtDialog_right_span"
              >冲次：{{ currentData.frequency }}/min</span
            >
            <span class="gtDialog_right_span"
              >测试日期：{{ currentData.testTime }}
            </span>
            <span class="gtDialog_right_span"
              >上行最大：{{ currentData.maxElectric }}A</span
            >
            <span class="gtDialog_right_span"
              >下行最大：{{ currentData.minElectric }}A</span
            >
            <span class="gtDialog_right_span"
              >平衡度：{{ currentData.tphaseEqualizationRatio }}%</span
            >
          </div>
        </div>
      </el-dialog>
    </el-dialog>
    <!-- 分页 -->
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
</template>
<script>
let echarts = require("echarts/lib/echarts");
export default {
  data() {
    return {
      // 搜索
      contrastChartForm: {
        oilStationId: "",
        testTime: "",
      },
      // 表格加载动画
      loading: true,
      contrastChartTable: [],
      // 表格内图形纵坐标
      gtData: [[]],
      dcData: [[]],
      // 所有采油站
      oilStationOptions: [],
      // 放大显示
      contrastChartVisible: false,
      innerGtVisible: false,
      innerDcVisible: false,
      currentData: {},
      gtFlag: 1,

      electricryList: [],
      coordinates: [[]],
      //功图叠加处理后数据
      superpositionCoordinatesData: [[[]]],
      //功图叠加示例数据
      superpositionLegend: [],
      // 分页
      currentPage: 1,
      pageSize: 10,
      total: 0,
      index: 1,
    };
  },
  created() {
    this.queryOrgName();
    this.contrastChartInit();
  },
  methods: {
    //获取所有采油站信息
    queryOrgName() {
      this.getRequest("/basOilStationInfor/oilStationOptions").then((resp) => {
        if (resp) {
          this.oilStationOptions = resp.data;
          let oilAll = {
            oilStationId: "",
            oilStationName: "全站",
          };
          this.oilStationOptions.push(oilAll);
        }
      });
    },
    // 查询
    searchContrastChart() {
      this.getRequest(
        "/contrast/electric/selectElectricContrast?currentPage=" +
          this.currentPage +
          "&oilStationId=" +
          this.contrastChartForm.oilStationId +
          "&pageSize=" +
          this.pageSize +
          "&sTime=" +
          this.contrastChartForm.testTime
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.contrastChartTable = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.contrastChartTable.forEach((element) => {
            //延迟到DOM更新之后再执行绘制图形
            this.$nextTick(function () {
              //处理数据为坐标
              this.coordinate(element);
              //将处理后的坐标添加到对象中
              this.$set(element, "gtData", this.gtData);
              this.$set(element, "dcData", this.dcData);
              //实例化功图/电参echarts
              this.drawLine(element);
            });
          });
        }
      });
    },
    // 页面初始化
    contrastChartInit() {
      var time = this.getTime();
      this.getRequest(
        "/contrast/electric/selectElectricContrast?currentPage=" +
          this.currentPage +
          "&oilStationId=" +
          "" +
          "&pageSize=" +
          this.pageSize +
          "&sTime=" +
          time
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.contrastChartTable = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.contrastChartTable.forEach((element) => {
            this.$nextTick(function () {
              this.coordinate(element);
              this.$set(element, "gtData", this.gtData);
              this.$set(element, "dcData", this.dcData);
              this.drawLine(element);
            });
          });
        }
      });
    },
    // 表单画图
    drawLine(val) {
      // 画功图图形/电参图形
      let domGt = document.getElementById(val.elepaId);
      let domDc = document.getElementById(val.elepaId + "1");
      let myChartGt = echarts.init(domGt);
      let myChartDc = echarts.init(domDc);
      myChartGt.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
          formatter: function (params) {
            return (
              "<div><p>位移：" +
              params[0].value[0] +
              "M</p>" +
              "<p>载荷：" +
              params[0].value[1] +
              "KN</p>" +
              "</div>"
            );
          },
        },
        grid: {
          width: "65%",
          height: "42%",
          top: "26%",
          left: "12%",
        },
        xAxis: {
          name: "位移(M)",
          min: 0,
          max: 4,
          type: "value",
          nameLocation: "middle",
          nameTextStyle: {
            padding: [8, 0, 0, 0],
            fontSize: 10,
          },
        },
        yAxis: {
          name: "载荷(KN)",
          type: "value",
          max: 80,
          min: 0,
          splitNumber: 3,
          nameTextStyle: {
            padding: [0, 0, -10, 0],
            fontSize: 10,
          },
        },
        series: [
          {
            symbol: "none",
            data: val.gtData,
            type: "line",
            smooth: true,
            lineStyle: {
              width: 1.5,
            },
          },
        ],
      });
      myChartDc.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
          formatter: function (params) {
            return (
              "<div><p>位移：" +
              params[0].value[0] +
              "M</p>" +
              "<p>载荷：" +
              params[0].value[1] +
              "KN</p>" +
              "</div>"
            );
          },
        },
        grid: {
          width: "65%",
          height: "42%",
          top: "26%",
          left: "12%",
        },
        xAxis: {
          name: "位移(M)",
          min: 0,
          max: 4,
          type: "value",
          nameLocation: "middle",
          nameTextStyle: {
            padding: [8, 0, 0, 0],
            fontSize: 10,
          },
        },
        yAxis: {
          name: "电流(A)",
          type: "value",
          max: 80,
          min: 0,
          splitNumber: 3,
          nameTextStyle: {
            padding: [0, 0, -10, 0],
            fontSize: 10,
          },
        },
        series: [
          {
            symbol: "none",
            data: val.dcData,
            type: "line",
            smooth: true,
            lineStyle: {
              width: 1.5,
            },
          },
        ],
      });
    },
    //处理功图及电参坐标
    coordinate(val) {
      this.gtData = [[]];
      this.dcData = [[]];
      // 功图坐标
      var displacementArray = val.displacementSet.split(";");
      var disploadArray = val.loadSet.split(";");
      for (var i = 0; i < displacementArray.length; i++) {
        this.gtData[i] = [];
        this.gtData[i][0] = parseFloat(displacementArray[i]);
        this.gtData[i][1] = parseFloat(disploadArray[i]);
      }
      //   电参坐标
      var electricitySet = val.electricitySet.split(";");
      var displacementSetElect = val.displacementSetElect.split(";");
      for (var j = 0; j < displacementSetElect.length; j++) {
        this.dcData[j] = [];
        this.dcData[j][0] = parseFloat(displacementSetElect[j]);
        this.dcData[j][1] = parseFloat(electricitySet[j]);
      }
      return this.gtData, this.dcData;
    },
    // 放大显示
    showContrastChart(val) {
      this.currentData = val;
      this.contrastChartVisible = true;
    },
    // 内部功图对话框
    innerGt() {
      this.innerGtVisible = true;
    },
    innerGtClose() {
      this.innerGtVisible = false;
      this.gtFlag = 1;
    },
    gtChart() {
      var domGt = document.getElementById("gt");
      let myChartGt = echarts.init(domGt);
      myChartGt.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
          formatter: function (params) {
            return (
              "<div><p>位移：" +
              params[0].value[0] +
              "M</p>" +
              "<p>载荷：" +
              params[0].value[1] +
              "KN</p>" +
              "</div>"
            );
          },
        },
        grid: {
          width: "65%",
          height: "42%",
          top: "26%",
          left: "12%",
        },
        xAxis: {
          name: "位移(M)",
          min: 0,
          max: 4,
          type: "value",
          nameLocation: "middle",
          nameTextStyle: {
            padding: [8, 0, 0, 0],
            fontSize: 10,
          },
        },
        yAxis: {
          name: "载荷(KN)",
          type: "value",
          max: 90,
          min: 0,
          splitNumber: 3,
          nameTextStyle: {
            padding: [0, 0, -10, 0],
            fontSize: 10,
          },
        },
        series: [
          {
            symbol: "none",
            data: this.currentData.gtData,
            type: "line",
            smooth: true,
            lineStyle: {
              width: 1.5,
            },
          },
        ],
      });
    },
    gtOpen() {
      const t = this;
      setTimeout(() => {
        t.gtChart();
      }, 0);
    },
    // 内部电流图对话框
    innerDc() {
      this.innerDcVisible = true;
    },
    innerDcClose() {
      this.innerDcVisible = false;
    },
    dcChart() {
      var domGt = document.getElementById("dc");
      let myChartGt = echarts.init(domGt);
      myChartGt.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
          formatter: function (params) {
            return (
              "<div><p>位移：" +
              params[0].value[0] +
              "M</p>" +
              "<p>载荷：" +
              params[0].value[1] +
              "KN</p>" +
              "</div>"
            );
          },
        },
        grid: {
          width: "65%",
          height: "42%",
          top: "26%",
          left: "12%",
        },
        xAxis: {
          name: "位移(M)",
          min: 0,
          max: 4,
          type: "value",
          nameTextStyle: {
            padding: [8, 0, 0, 0],
            fontSize: 10,
          },
        },
        yAxis: {
          name: "电流(A)",
          type: "value",
          max: 80,
          min: 0,
          splitNumber: 3,
          nameTextStyle: {
            fontSize: 10,
          },
        },
        series: [
          {
            symbol: "none",
            data: this.currentData.dcData,
            type: "line",
            smooth: true,
            lineStyle: {
              width: 1.5,
            },
          },
        ],
      });
    },
    dcOpen() {
      const t = this;
      setTimeout(() => {
        t.dcChart();
      }, 0);
    },
    contrastChartClose() {
      this.contrastChartVisible = false;
    },
    // 示功图叠加按钮
    gtOverlap() {
      this.gtFlag = 2;
      let time = this.currentData.testTime.substr(0, 10);
      this.electricryList = [];
      this.coordinates = [[]];
      this.superpositionCoordinatesData = [[[]]];
      this.superpositionLegend = [];
      this.getRequest(
        "/contrast/electric/selectGtLarge?sTime=" +
          time +
          "&wellId=" +
          this.currentData.wellId
      ).then((resp) => {
        if (resp) {
          this.electricryList = resp.data;
          for (var i = 0; i < this.electricryList.length; i++) {
            this.coordinate2(this.electricryList[i]);
            this.superpositionLegend[i] = this.electricryList[
              i
            ].acquisitionTime;
            this.superpositionCoordinatesData[i] = this.coordinates;
          }
          this.drawSuperposition();
        }
      });
    },
    coordinate2(val) {
      //每次处理之前保证坐标数组集合为空
      this.coordinates = [[]];
      var displacementSetElectArray = val.displacementSet.split(";");
      var electricitySetArray = val.loadSet.split(";");
      for (var i = 0; i < displacementSetElectArray.length; i++) {
        this.coordinates[i] = [];
        this.coordinates[i][0] = parseFloat(displacementSetElectArray[i]);
        this.coordinates[i][1] = parseFloat(electricitySetArray[i]);
      }
      return this.coordinates;
    },
    //汇制功图叠加
    drawSuperposition() {
      var dom = "";
      dom = document.getElementById("gt2");
      let myChart = echarts.init(dom);
      myChart.clear();
      let seriesSuperposition = [];
      for (var i = 0; i < this.superpositionCoordinatesData.length; i++) {
        seriesSuperposition[i] = {
          symbol: "none",
          name: this.electricryList[i].acquisitionTime,
          data: this.superpositionCoordinatesData[i],
          type: "line",
          smooth: true,
          lineStyle: {
            width: 1.5,
          },
        };
      }
      myChart.setOption({
        title: {
          x: "center",
          text: "井号：" + this.electricryList[0].wellName + "功图叠加",
          top: "7%",
          textStyle: {
            fontSize: 13,
            fontStyle: "normal",
            fontWeight: "bolder",
          },
        },
        legend: {
          type: "scroll",
          data: this.superpositionLegend,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        grid: {
          left: "6%",
          right: "3%",
          bottom: "15%",
          top: "20%",
          containLabel: true,
        },
        xAxis: {
          name: "位移(M)",
          nameLocation: "middle",
          min: 0,
          max: 4,
          type: "value",
          axisLine: { onZero: false },
          nameTextStyle: {
            padding: [10, 0, 0, 0],
            fontSize: 10,
          },
        },
        yAxis: {
          name: "载荷(KN)",
          nameLocation: "middle",
          // min: 0,
          // max: 100,
          type: "value",
          axisLine: { onZero: false },
          nameTextStyle: {
            padding: [0, 0, 8, 0],
            fontSize: 10,
          },
        },
        series: seriesSuperposition,
      });
    },
    // 示功图放大按钮
    gtEnlarge() {
      this.gtFlag = 1;
      const t = this;
      setTimeout(() => {
        t.gtChart();
      }, 0);
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.contrastChartInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.contrastChartInit();
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/electricParameter/contrastChart.css";
</style>