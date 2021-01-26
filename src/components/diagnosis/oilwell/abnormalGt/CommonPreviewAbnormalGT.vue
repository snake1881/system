<template>
  <el-dialog
    title="功图展示"
    :modal="false"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    size="42%"
    :visible.sync="previewAbnormalGtVisible"
    @opened="opens"
    :before-close="priviewAbnormalGtClose"
  >
    <el-form>
      <el-form-item v-if="isChart">
        <div
          class="chart"
          id="myChart"
          :style="{ width: '100%', height: '400px' }"
        />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
let echarts = require("echarts/lib/echarts");
export default {
  props: {
    previewAbnormalGtVisible: {
      type: Boolean,
    },
    previewData: {
      type: Object,
    },
  },
  data() {
    return {
      tableData1: {},
      xAxis: [],
      yAxis: [],
      coordinates: [[]],
      coordinates1: [[]],
      isColor: true,
      isChart: {
        type: Boolean,
      },
      isSpan: {
        type: Boolean,
      },
    };
  },
  methods: {
    // 对话框父子组件传值
    priviewAbnormalGtClose() {
      this.$emit("previewAbnormalGtRowClose");
    },
    //初始化chart数据并绘图
    gtDataInit() {
      this.getRequest(
        "/oilWell/abnormalGt/GetGt?checkDate=" +
          this.previewData.checkDate +
          "&wellId=" +
          this.previewData.wellId
      ).then((resp) => {
        if (resp) {
          this.tableData1 = {};
          this.tableData1 = resp.data;
          this.coordinate();
          if (resp.data != null) {
            this.isChart = true;
            this.isSpan = false;
            this.drawLine();
          } else {
            this.isChart = false;
            this.isSpan = true;
          }
        }
      });
    },
    mounted() {
      this.coordinate();
      this.drawLine();
    },
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        title: {
          x: "center",
          text:
            this.tableData1.wellCommonName +
            "号井   " +
            this.tableData1.dynaCreateTime +
            "  功图",
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
    //将坐标数据串处理为坐标点
    coordinate() {
      this.coordinates = [[]];
      var displacementArray = this.tableData1.displacement.split(";");
      var disploadArray = this.tableData1.dispLoad.split(";");
      for (var i = 0; i < displacementArray.length; i++) {
        this.coordinates[i] = [];
        this.coordinates[i][0] = parseFloat(displacementArray[i]);
        this.coordinates[i][1] = parseFloat(disploadArray[i]);
      }
      return this.coordinates;
    },
    opens() {
      this.coordinates = [[]];
      this.tableData1 = {};
      this.gtDataInit();
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
<style>
.el-dialog__header {
  background: #dadee6;
  border-bottom: 2px solid #f2f6fc;
  height: 15px;
}
</style>
