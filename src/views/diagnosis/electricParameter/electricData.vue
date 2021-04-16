<template>
  <!-- 电流统计 -->
  <div class="contrastChart">
    <el-form
      class="contrastChart_form"
      :inline="true"
      :model="electricDataForm"
    >
      <el-form-item>
        <el-select
          placeholder="采油站"
          v-model="electricDataForm.oilStationId"
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
          v-model="electricDataForm.testTime"
          value-format="yyyy-MM-dd"
          size="medium"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="searchElectricData()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :data="electricDataTable"
      height="85%"
      border
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :header-cell-style="{
        background: '#eef1f6',
        color: '#606266',
        'text-align': 'center',
      }"
      :cell-style="{ 'text-align': 'center', padding: 6 + 'px' }"
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column label="站名" prop="oilStationName" />
      <el-table-column label="油井" prop="wellName" />
      <el-table-column label="时间" prop="testTime" width="180" />
      <el-table-column label="油压" prop="oilPressure" />
      <el-table-column label="电压" prop="electricVoltage" width="100" />
      <el-table-column label="上行最大" prop="maxElectric" />
      <el-table-column label="下行最大" prop="minElectric" />
      <el-table-column
        label="平衡度"
        prop="tphaseEqualizationRatio"
        width="100"
      />
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="detailsElectricData(scope.row)"
            >单井详情</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="checkElectricData(scope.row)"
            >查看曲线</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 单井详情 -->
    <el-dialog
      title="单井详细信息"
      center
      width="70%"
      :visible="detailsElectricDataVisible"
      :before-close="detailsElectricDataClose"
    >
      <el-table
        :data="detailsElectricDataTable"
        border
        :header-cell-style="{
          background: '#eef1f6',
          color: '#606266',
          'text-align': 'center',
        }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column label="电压" prop="electricVoltage" />
        <el-table-column label="A项电流" prop="aphaseCurrent" />
        <el-table-column label="B项电流" prop="bphaseCurrent" />
        <el-table-column label="c项电流" prop="cphaseCurrent" />
        <el-table-column label="瞬时负荷" prop="instantaneousLoad" />
        <el-table-column label="冲次" prop="frequency" />
        <el-table-column label="产液量/24H" prop="liquidProd" width="100" />
        <el-table-column label="油井压力" prop="oilPressure" />
        <el-table-column
          label="三相均衡率"
          prop="tphaseEqualizationRatio"
          width="100"
        />
        <el-table-column label="时间" prop="testTime" width="180" />
      </el-table>
    </el-dialog>
    <!-- 查看曲线 -->
    <el-dialog
      title="查看曲线"
      center
      width="95%"
      @open="open()"
      :visible="checkElectricDataVisible"
      :before-close="checkElectricDataClose"
    >
      <el-row>
        <el-col :span="8">
          <div id="electricVoltageChart" style="width: 460px; height: 180px" />
        </el-col>
        <el-col :span="8">
          <div id="aphaseCurrentChart" style="width: 460px; height: 180px" />
        </el-col>
        <el-col :span="8">
          <div id="bphaseCurrentChart" style="width: 460px; height: 180px" />
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <div id="cphaseCurrentChart" style="width: 460px; height: 180px" />
        </el-col>
        <el-col :span="8">
          <div
            id="instantaneousLoadChart"
            style="width: 460px; height: 180px"
          />
        </el-col>
        <el-col :span="8">
          <div id="frequencyChart" style="width: 460px; height: 180px" />
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <div id="oilPressureChart" style="width: 460px; height: 180px" />
        </el-col>
        <el-col :span="8">
          <div id="liquidProdChart" style="width: 460px; height: 180px" />
        </el-col>
        <el-col :span="8">
          <div
            id="tphaseEqualizationRatioChart"
            style="width: 460px; height: 180px"
          />
        </el-col>
      </el-row>
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
      electricDataForm: {
        oilStationId: "",
        testTime: "",
      },
      // 表格信息
      electricDataTable: [],
      // 加载动画
      loading: true,
      // 分页
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 所有采油站
      oilStationOptions: [],
      // 单井详情
      detailsElectricDataVisible: false,
      detailsElectricDataTable: [],
      // 查看曲线
      checkElectricDataVisible: false,
      electricDataTime: [], //时间
      electricVoltageChart: [], //电压数据曲线
      aphaseCurrentChart: [], //A相电流数据曲线
      bphaseCurrentChart: [], //B相电流数据曲线
      cphaseCurrentChart: [], //C相电流数据曲线
      instantaneousLoadChart: [], //瞬时负荷数据曲线
      frequencyChart: [], //冲次曲线
      oilPressureChart: [], // 油井压力曲线
      liquidProdChart: [], //产液量曲线
      tphaseEqualizationRatioChart: [], // 三相均衡率曲线
    };
  },
  created() {
    this.electricDataInit();
    this.queryOrgName();
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
    searchElectricData() {
      this.getRequest(
        "/statistics/electric/selectElectricStatistics?currentPage=" +
          this.currentPage +
          "&oilStationId=" +
          this.electricDataForm.oilStationId +
          "&pageSize=" +
          this.pageSize +
          "&sTime=" +
          this.electricDataForm.testTime
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.electricDataTable = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 页面初始化
    electricDataInit() {
      var time = this.getTime();
      this.getRequest(
        "/statistics/electric/selectElectricStatistics?currentPage=" +
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
          this.electricDataTable = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 单井详情
    detailsElectricData(val) {
      let testTime = val.testTime.substr(0, 10);
      this.getRequest(
        "/statistics/electric/selectElectricStatistic?sTime=" +
          testTime +
          "&wellId=" +
          val.wellId
      ).then((resp) => {
        if (resp) {
          this.detailsElectricDataVisible = true;
          this.detailsElectricDataTable = resp.data;
        }
      });
    },
    detailsElectricDataClose() {
      this.detailsElectricDataVisible = false;
    },
    // 查看曲线
    checkElectricData(val) {
      let testTime = val.testTime.substr(0, 10);
      this.getRequest(
        "/statistics/electric/selectElectricStatistic?sTime=" +
          testTime +
          "&wellId=" +
          val.wellId
      ).then((resp) => {
        if (resp) {
          this.checkElectricDataVisible = true;
          this.electricData(resp.data);
          this.chart();
        }
      });
    },
    // 具体图形
    chart() {
      // 电压数据曲线
      let dom1 = document.getElementById("electricVoltageChart");
      let myChart1 = echarts.init(dom1);
      myChart1.setOption({
        tooltip: {
          trigger: "axis",
        },
        color: ["#2485e0"],
        xAxis: {
          data: this.electricDataTime,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#666",
              fontSize: 10,
            },
          },
        },
        yAxis: {
          name: "电压数据曲线",
          nameTextStyle: {
            fontSize: 12,
            color: "#666",
          },
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitNumber: 4,
          axisLabel: {
            textStyle: {
              color: "#666",
              fontSize: 10,
            },
            formatter: "{value} v",
          },
        },
        series: [
          {
            name: "电压数据",
            type: "line",
            data: this.electricVoltageChart,
          },
        ],
      });
      // A相电流数据曲线
      let dom2 = document.getElementById("aphaseCurrentChart");
      let myChart2 = echarts.init(dom2);
      myChart2.setOption({
        tooltip: {
          trigger: "axis",
        },
        color: ["#2485e0"],
        xAxis: {
          data: this.electricDataTime,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#666",
              fontSize: 10,
            },
          },
        },
        yAxis: {
          name: "A相电流数据曲线",
          nameTextStyle: {
            fontSize: 12,
            color: "#666",
          },
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitNumber: 4,
          axisLabel: {
            textStyle: {
              color: "#666",
              fontSize: 10,
            },
            formatter: "{value} A",
          },
        },
        series: [
          {
            name: "A相电流数据",
            type: "line",
            data: this.aphaseCurrentChart,
          },
        ],
      });
      // B相电流数据曲线
      let dom3 = document.getElementById("bphaseCurrentChart");
      let myChart3 = echarts.init(dom3);
      myChart3.setOption({
        tooltip: {
          trigger: "axis",
        },
        color: ["#2485e0"],
        xAxis: {
          data: this.electricDataTime,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#666",
              fontSize: 10,
            },
          },
        },
        yAxis: {
          name: "B相电流数据曲线",
          nameTextStyle: {
            fontSize: 12,
            color: "#666",
          },
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitNumber: 4,
          axisLabel: {
            textStyle: {
              color: "#666",
              fontSize: 10,
            },
            formatter: "{value} A",
          },
        },
        series: [
          {
            name: "B相电流数据",
            type: "line",
            data: this.bphaseCurrentChart,
          },
        ],
      });
      // C相电流数据曲线
      let dom4 = document.getElementById("cphaseCurrentChart");
      let myChart4 = echarts.init(dom4);
      myChart4.setOption({
        tooltip: {
          trigger: "axis",
        },
        color: ["#2485e0"],
        xAxis: {
          data: this.electricDataTime,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#666",
              fontSize: 10,
            },
          },
        },
        yAxis: {
          name: "C相电流数据曲线",
          nameTextStyle: {
            fontSize: 12,
            color: "#666",
          },
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitNumber: 4,
          axisLabel: {
            textStyle: {
              color: "#666",
              fontSize: 10,
            },
            formatter: "{value} A",
          },
        },
        series: [
          {
            name: "C相电流数据",
            type: "line",
            data: this.cphaseCurrentChart,
          },
        ],
      });
      // 瞬时负荷数据曲线
      let dom5 = document.getElementById("instantaneousLoadChart");
      let myChart5 = echarts.init(dom5);
      myChart5.setOption({
        tooltip: {
          trigger: "axis",
        },
        color: ["#2485e0"],
        xAxis: {
          data: this.electricDataTime,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#666",
              fontSize: 10,
            },
          },
        },
        yAxis: {
          name: "瞬时负荷数据曲线",
          nameTextStyle: {
            fontSize: 12,
            color: "#666",
          },
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitNumber: 4,
          axisLabel: {
            textStyle: {
              color: "#666",
              fontSize: 10,
            },
            formatter: "{value} N",
          },
        },
        series: [
          {
            name: "瞬时负荷数据",
            type: "line",
            data: this.instantaneousLoadChart,
          },
        ],
      });
      // 冲次曲线
      let dom6 = document.getElementById("frequencyChart");
      let myChart6 = echarts.init(dom6);
      myChart6.setOption({
        tooltip: {
          trigger: "axis",
        },
        color: ["#2485e0"],
        xAxis: {
          data: this.electricDataTime,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#666",
              fontSize: 10,
            },
          },
        },
        yAxis: {
          name: "冲次曲线",
          nameTextStyle: {
            fontSize: 12,
            color: "#666",
          },
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitNumber: 4,
          axisLabel: {
            textStyle: {
              color: "#666",
              fontSize: 10,
            },
            formatter: "{value} 次",
          },
        },
        series: [
          {
            name: "冲次数据",
            type: "line",
            data: this.frequencyChart,
          },
        ],
      });
      // 油井压力曲线
      let dom7 = document.getElementById("oilPressureChart");
      let myChart7 = echarts.init(dom7);
      myChart7.setOption({
        tooltip: {
          trigger: "axis",
        },
        color: ["#2485e0"],
        xAxis: {
          data: this.electricDataTime,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#666",
              fontSize: 10,
            },
          },
        },
        yAxis: {
          name: "油井压力曲线",
          nameTextStyle: {
            fontSize: 12,
            color: "#666",
          },
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitNumber: 4,
          axisLabel: {
            textStyle: {
              color: "#666",
              fontSize: 10,
            },
            formatter: "{value} Pa",
          },
        },
        series: [
          {
            name: "油井压力数据",
            type: "line",
            data: this.oilPressureChart,
          },
        ],
      });
      // 产液量曲线
      let dom8 = document.getElementById("liquidProdChart");
      let myChart8 = echarts.init(dom8);
      myChart8.setOption({
        tooltip: {
          trigger: "axis",
        },
        color: ["#2485e0"],
        xAxis: {
          data: this.electricDataTime,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#666",
              fontSize: 10,
            },
          },
        },
        yAxis: {
          name: "产液量曲线",
          nameTextStyle: {
            fontSize: 12,
            color: "#666",
          },
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitNumber: 4,
          axisLabel: {
            textStyle: {
              color: "#666",
              fontSize: 10,
            },
            formatter: "{value} T",
          },
        },
        series: [
          {
            name: "产液量数据",
            type: "line",
            data: this.liquidProdChart,
          },
        ],
      });
      //  三相均衡率曲线
      let dom9 = document.getElementById("tphaseEqualizationRatioChart");
      let myChart9 = echarts.init(dom9);
      myChart9.setOption({
        tooltip: {
          trigger: "axis",
        },
        color: ["#2485e0"],
        xAxis: {
          data: this.electricDataTime,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#666",
              fontSize: 10,
            },
          },
        },
        yAxis: {
          name: "三相均衡率曲线",
          nameTextStyle: {
            fontSize: 12,
            color: "#666",
          },
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitNumber: 4,
          axisLabel: {
            textStyle: {
              color: "#666",
              fontSize: 10,
            },
            formatter: "{value} %",
          },
        },
        series: [
          {
            name: "三相均衡率数据",
            type: "line",
            data: this.tphaseEqualizationRatioChart,
          },
        ],
      });
    },
    checkElectricDataClose() {
      this.checkElectricDataVisible = false;
    },
    // 对话框延迟
    open() {
      const t = this;
      setTimeout(() => {
        t.chart();
      }, 0);
    },
    //获取电参曲线数据
    electricData(val) {
      for (var i = 0; i < val.length; i++) {
        this.electricDataTime[i] = val[i].testTime;
        this.electricVoltageChart[i] = val[i].electricVoltage;
        this.aphaseCurrentChart[i] = val[i].aphaseCurrent;
        this.bphaseCurrentChart[i] = val[i].bphaseCurrent;
        this.cphaseCurrentChart[i] = val[i].cphaseCurrent;
        this.instantaneousLoadChart[i] = val[i].instantaneousLoad;
        this.frequencyChart[i] = val[i].frequency;
        this.oilPressureChart[i] = val[i].oilPressure;
        this.liquidProdChart[i] = val[i].liquidProd;
        this.tphaseEqualizationRatioChart[i] = val[i].tphaseEqualizationRatio;
      }
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.electricDataInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchElectricData();
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/electricParameter/contrastChart.css";
</style>
