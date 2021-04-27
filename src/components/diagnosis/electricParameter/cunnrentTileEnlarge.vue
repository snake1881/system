<template>
  <el-dialog
    title="电流图形"
    width="45%"
    center
    @opened="opens"
    :visible.sync="currentTileVisible"
    :before-close="showCurrentTileClose"
  >
    <el-row>
      <el-button
        @click="enlargeShow"
        type="success"
        plain
        size="small"
        style="float: right"
        >电流图放大</el-button
      >
      <el-button
        @click="superpositionShow"
        type="success"
        plain
        size="small"
        style="float: right"
        >电流图叠加</el-button
      >
    </el-row>
    <div
      v-if="showCurrent == 2"
      class="chart"
      id="mychart2"
      :style="{ width: '100%', height: '400px' }"
    ></div>
    <div
      v-if="showCurrent == 1"
      ref="mychart"
      class="mychart"
      id="mychart"
      :style="{ width: '100%', height: '200px' }"
    ></div>
    <div v-if="showCurrent == 1">
      <div>
        <span class="currentTileDidlog_charts_content_right_span"
          >测试日期： {{ currentElectricryData.testTime }}</span
        >
        <span class="currentTileDidlog_charts_content_right_span"
          >上行最大：{{ currentElectricryData.maxElectric }}</span
        >
        <span class="currentTileDidlog_charts_content_right_span"
          >下行最大：{{ currentElectricryData.minElectric }}</span
        >
        <span class="currentTileDidlog_charts_content_right_span"
          >平衡度：{{ currentElectricryData.tphaseEqualizationRatio }}</span
        >
      </div>
      <div>
        <span class="currentTileDidlog_charts_content_right_span"
          >隶属单位：{{ currentElectricryData.oilStationName }}
        </span>
        <span class="currentTileDidlog_charts_content_right_span"
          >井号：{{ currentElectricryData.wellName }}</span
        >
        <span class="currentTileDidlog_charts_content_right_span"
          >冲程： {{ currentElectricryData.stroke }}</span
        >
        <span class="currentTileDidlog_charts_content_right_span"
          >冲次：{{ currentElectricryData.frequency }}</span
        >
      </div>
    </div>
  </el-dialog>
</template>
<script>
let echarts = require("echarts/lib/echarts");
export default {
  props: {
    currentTileVisible: {
      type: Boolean,
    },
    currentElectricryData: {
      type: Object,
    },
  },
  data() {
    return {
      showCurrent: 1,
      electricryList: [],
      coordinates: [[]],
      //功图叠加处理后数据
      superpositionCoordinatesData: [[[]]],
      //功图叠加示例数据
      superpositionLegend: [],
      //
      myChart: {},
    };
  },
  methods: {
    //功图叠加
    selectList() {
      this.showCurrent = 2;
      var time = this.currentElectricryData.testTime;
      time = time.substring(0, 10);
      this.electricryList = [];
      this.coordinates = [[]];
      this.superpositionCoordinatesData = [[[]]];
      this.superpositionLegend = [];
      this.getRequest(
        "/tile/electric/selectElectInWeek?testTime=" +
          time +
          "&wellId=" +
          this.currentElectricryData.wellId
      ).then((resp) => {
        if (resp) {
          this.electricryList = resp.data;
          for (var i = 0; i < this.electricryList.length; i++) {
            this.coordinate(this.electricryList[i]);
            this.superpositionLegend[i] = this.electricryList[i].testTime;
            this.superpositionCoordinatesData[i] = this.coordinates;
          }
          this.drawSuperposition();
        }
      });
    },
    //功图放大
    selectEnlarge() {
      this.showCurrent = 1;
      this.electricryList = [];
      this.coordinates = [[]];
      this.superpositionCoordinatesData = [[[]]];
      this.superpositionLegend = [];
      this.getRequest(
        "/tile/electric/selectByWellIdTime?testTime=" +
          this.currentElectricryData.testTime +
          "&wellId=" +
          this.currentElectricryData.wellId
      ).then((resp) => {
        if (resp) {
          this.electricryList = resp.data;
          console.log(this.electricryList);
          this.coordinate(this.electricryList);
          this.$set(this.electricryList, "coordinates", this.coordinates);
          // for (var i = 0; i < this.electricryList.length; i++) {
          //   this.coordinate(this.electricryList[i]);
          //   this.superpositionLegend[i] = this.electricryList[i].testTime;
          //   this.superpositionCoordinatesData[i] = this.coordinates;
          // }
          this.currentDrawLine();
        }
      });
    },
    // 对话框父子组件传值
    showCurrentTileClose() {
      this.$emit("showCurrentTileClose");
    },
    //放大绘图
    currentDrawLine() {
      let _self = this;
      var dom = document.getElementById("mychart");
      let myChart = echarts.init(dom);
      myChart.clear();
      myChart.setOption({
        title: {
          x: "center",
          text: "电流(A)/位移(M)",
          top: "7%",
          textStyle: {
            fontSize: 13,
            fontStyle: "normal",
            fontWeight: "bolder",
          },
        },
        legend: {
          show: false,
        },
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
              "<p>电流：" +
              params[0].value[1] +
              "</p>" +
              "</div>"
            );
          },
        },
        grid: {
          left: "3%",
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
            padding: [10, 250, 0, 0],
            fontSize: 10,
          },
        },
        yAxis: {
          nameLocation: "middle",
          type: "value",
           min: function (value) {
            return Math.round(value.min - 5);
          },
          max: function (value) {
            return Math.round(value.max + 5);
          },
          axisLine: { onZero: false },
          nameTextStyle: {
            padding: [0, 0, 3, 0],
            fontSize: 8,
          },
        },
        series: [
          {
            symbol: "none",
            data: this.electricryList.coordinates,
            type: "line",
            smooth: true,
            lineStyle: {
              width: 1.5,
            },
          },
        ],
      });
      console.log(myChart);
    },
    //详情页面将坐标数据串处理为坐标点
    coordinate(val) {
      //每次处理之前保证坐标数组集合为空
      this.coordinates = [[]];
      var displacementSetElectArray = val.displacementSetElect.split(";");
      var electricitySetArray = val.electricitySet.split(";");
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
      dom = document.getElementById("mychart2");
      let myChart = echarts.init(dom);
      myChart.clear();
      let seriesSuperposition = [];
      console.log(this.superpositionData);
      for (var i = 0; i < this.superpositionCoordinatesData.length; i++) {
        seriesSuperposition[i] = {
          symbol: "none",
          name: this.electricryList[i].testTime,
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
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            // console.log(params);
            // return (
            //   "<div><p>位移：" +
            //   params[0].value[0] +
            //   "M</p>" +
            //   "<p>载荷：" +
            //   params[0].value[1] +
            //   "KN</p>" +
            //   "</div>"
            // );
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
           min: function (value) {
            return Math.round(value.min - 5);
          },
          max: function (value) {
            return Math.round(value.max + 5);
          },
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
    //电流图放大按钮
    enlargeShow() {
      this.showCurrent = 1;
      this.selectEnlarge();
      // this.currentDrawLine();
    },
    //电流图叠加按钮
    superpositionShow() {
      this.showCurrent = 2;
      this.selectList();
    },
    //初始化调用方法
    opens() {
      this.showCurrent = 1;
      this.selectEnlarge();
    },
  },
};
</script>

<style lang="less" scoped>
</style>
