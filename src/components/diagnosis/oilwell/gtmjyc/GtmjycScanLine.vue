<template>
  <el-dialog
    title="功图面积功图展示"
    :modal="false"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    size="600px"
    :visible.sync="previewGtmjVisible"
    @opened="opens"
    :before-close="previewGtmjClose"
  >
    <div class="main" style="margin: auto; width: 85%; height: 450px">
      <div
        class="chart"
        id="myChart"
        :style="{ width: '50%', height: '400px' }"
      ></div>
      <div
        class="chart"
        id="myChart2"
        :style="{ width: '50%', height: '400px' }"
      ></div>
    </div>
  </el-dialog>
</template>

<script>
let echarts = require("echarts/lib/echarts");
export default {
  props: {
    previewGtmjVisible: {
      type: Boolean,
    },
    previewData: {
      type: Object,
    },
  },
  data() {
    return {
      tableData: {},
      tableData1: {},
      xAxis: [],
      yAxis: [],
      coordinates: [[]],
      coordinates1: [[]],
      isColor: true,
    };
  },
  methods: {
    // 对话框父子组件传值
    previewGtmjClose() {
      this.$emit("previewGtmjRowClose");
    },
    //初始化chart数据并绘图
    gtDataInit() {
      this.getRequest(
        "/oilWell/abnormalGt/GetGt?checkDate=" +
          this.previewData.checkDate +
          "&wellId=" +
          this.previewData.wellCommonName
      ).then((resp) => {
        // this.loading = false;
        if (resp) {
          this.tableData = {};
          this.tableData = resp.data;
          this.coordinate();
          this.drawLine();
        }
      });
    },
    gtmjChartInit() {
      this.getRequest(
        "/oilWell/abnormalGtmj/standardGt?checkDate=" +
          this.previewData.checkDate +
          "&wellCommonName=" +
          this.previewData.wellCommonName
      ).then((resp) => {
        // this.loading = false;
        if (resp) {
          this.tableData1 = {};
          this.tableData1 = resp.data;
          this.coordinate1();
          this.drawLine1();
        }
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));

      // 绘制图表
      myChart.setOption({
        title: [
          {
            x: "center",
            text:
              this.tableData.wellCommonName +
              "号井 " +
              this.tableData.dynaCreateTime,
            subtext:
              "最大载荷" +
              this.tableData.suspMaxLoad +
              " " +
              "最小载荷" +
              this.tableData.suspMinLoad,
            top: "7%",
            textStyle: {
              fontSize: 13,
              fontStyle: "normal",
              fontWeight: "bolder",
            },
          },
          {
            text: "当前功图",
            top: "bottom",
            left: "center",
            textStyle: {
              fontSize: 13,
              fontStyle: "normal",
              fontWeight: "bolder",
            },
          },
        ],

        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
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
          left: "3%",
          right: "3%",
          bottom: "15%",
          top: "20%",
          containLabel: true,
        },
        xAxis: {
          name: "位移",
          nameLocation: "middle",
          min: 0,
          max: 4,
          type: "value",
          axisLine: { onZero: false },
          nameTextStyle: {
            padding: [8, 0, 0, 0],
            fontSize: 10,
          },
        },
        yAxis: {
          name: "载荷(KN)",
          nameLocation: "middle",

          type: "value",
          axisLine: { onZero: false },
          nameTextStyle: {
            padding: [0, 0, 6, 0],
            fontSize: 10,
          },
        },
        series: [
          {
            symbol: "none",
            data: this.coordinates,
            type: "line",
            smooth: true,
            lineStyle: {
              width: 1.5,
            },
          },
        ],
      });
    },
    drawLine1() {
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      myChart2.setOption({
        title: [
          {
            x: "center",
            text:
              this.tableData1.wellCommonName +
              "号井 " +
              this.tableData1.dynaCreateTime,
            subtext:
              "最大载荷" +
              this.tableData1.suspMaxLoad +
              "最小载荷" +
              this.tableData1.suspMinLoad,
            top: "7%",
            textStyle: {
              fontSize: 13,
              fontStyle: "normal",
              fontWeight: "bolder",
            },
          },
          {
            text: "标准功图",
            top: "bottom",
            left: "center",
            textStyle: {
              fontSize: 13,
              fontStyle: "normal",
              fontWeight: "bolder",
            },
          },
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
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
          left: "3%",
          right: "3%",
          bottom: "15%",
          top: "20%",
          containLabel: true,
        },
        xAxis: {
          name: "位移",
          nameLocation: "middle",
          min: 0,
          max: 4,
          type: "value",
          axisLine: { onZero: false },
          nameTextStyle: {
            padding: [8, 0, 0, 0],
            fontSize: 10,
          },
        },
        yAxis: {
          name: "载荷(KN)",
          nameLocation: "middle",

          type: "value",
          axisLine: { onZero: false },
          nameTextStyle: {
            padding: [0, 0, 6, 0],
            fontSize: 10,
          },
        },
        series: [
          {
            symbol: "none",
            data: this.coordinates1,
            type: "line",
            smooth: true,
            lineStyle: {
              width: 1.5,
            },
          },
        ],
      });
    },
    //将坐标数据串处理为坐标点
    coordinate() {
      this.coordinates = [[]];
      var displacementArray = this.tableData.displacement.split(";");
      var disploadArray = this.tableData.dispLoad.split(";");
      for (var i = 0; i < displacementArray.length; i++) {
        this.coordinates[i] = [];
        this.coordinates[i][0] = parseFloat(displacementArray[i]);
        this.coordinates[i][1] = parseFloat(disploadArray[i]);
      }
      return this.coordinates;
    },
    coordinate1() {
      this.coordinates1 = [[]];
      var displacementArray1 = this.tableData1.displacement.split(";");
      var disploadArray1 = this.tableData1.dispLoad.split(";");
      for (var i = 0; i < displacementArray1.length; i++) {
        this.coordinates1[i] = [];
        this.coordinates1[i][0] = parseFloat(displacementArray1[i]);
        this.coordinates1[i][1] = parseFloat(disploadArray1[i]);
      }
      return this.coordinates1;
    },
    opens() {
      this.gtDataInit();
      this.gtmjChartInit();
    },
  },
};
</script>

<style lang="less" scoped>
.dialogDiv {
  height: 400px;
  overflow: auto;
}
</style>
<style lang="less" scoped>
.el-input {
  width: 700px;
}
</style>
