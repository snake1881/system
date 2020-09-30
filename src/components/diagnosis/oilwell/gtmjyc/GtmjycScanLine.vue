<template>

  <el-dialog
          title="功图面积功图展示"
          :modal="false"
          :close-on-click-modal="false"
          :modal-append-to-body="false"
          size="600px"
          :visible.sync="editPostVisible"
          @opened="opens1"
          :before-close="editPostClose"
  >
    <div  >

    </div>
    <div class="main"  style=" margin:auto; width:85%; height:400px;">
      <div  id="myChart" :style="{ width: '150%', height: '400px' , float:left} "></div>
      <div  id="myChart2" :style="{ width: '150%', height: '400px' ,float:left}"></div>
    </div>
  </el-dialog>
</template>

<script>
  let echarts = require("echarts/lib/echarts");
  export default {
    props: {
      editPostVisible: {
        type: Boolean
      },
      editData: {
        type: Object
      }
    },
    data() {
      return {
        tableData: {
          dynaId: "93c1db5956a948aea677d3a55a53f252",
          wellCommonName: null,
          wellId: "定1155",
          checkDate: "2020-01-31T10:57:28.000+00:00",
          dynaCreateTime: "2020-01-31 18:57:28",
          stroke: 4,
          frequency: 2.61,
          dynaPoints: 153,
          displacement:
            "4.00;4.00;3.99;3.99;3.97;3.96;3.94;3.92;3.90;3.87;3.83;3.80;3.76;3.71;3.67;3.62;3.56;3.51;3.45;3.39;3.33;3.26;3.19;3.12;3.05;2.97;2.90;2.82;2.74;2.66;2.57;2.49;2.41;2.32;2.23;2.14;2.05;1.96;1.87;1.78;1.69;1.60;1.52;1.44;1.35;1.27;1.19;1.11;1.03;0.95;0.88;0.81;0.74;0.67;0.61;0.55;0.49;0.44;0.39;0.34;0.29;0.25;0.21;0.18;0.14;0.11;0.09;0.06;0.04;0.03;0.02;0.01;0.00;0.00;0.00;0.01;0.02;0.03;0.04;0.06;0.08;0.11;0.14;0.17;0.20;0.24;0.28;0.33;0.37;0.42;0.47;0.52;0.58;0.63;0.69;0.75;0.81;0.88;0.94;1.01;1.08;1.15;1.22;1.30;1.37;1.45;1.52;1.60;1.67;1.75;1.82;1.90;1.98;2.05;2.13;2.21;2.28;2.36;2.43;2.51;2.58;2.65;2.72;2.79;2.86;2.93;2.99;3.06;3.12;3.18;3.24;3.30;3.36;3.41;3.47;3.52;3.57;3.61;3.65;3.70;3.74;3.77;3.81;3.84;3.87;3.90;3.92;3.94;3.96;3.97;3.99;3.99;4.00",
          dispLoad:
            "70.91;70.03;69.6;69.06;68.33;68.03;67.69;66.96;67.4;67.44;67.5;67.15;67.26;66.91;66.77;66.62;66.38;66.42;66.47;66.27;66.08;65.1;62.95;60.96;59.34;57.97;57.35;55.25;53.15;50.56;48.85;47.14;45.72;43.68;41.82;41.38;42.16;43.04;44.12;44.41;44.21;43.63;42.95;42.65;42.16;42.16;42.65;43.33;43.82;43.53;43.28;43.04;42.89;43.13;42.99;43.77;43.33;43.57;43.97;43.72;43.13;43.19;43.33;43.28;44.21;44.21;44.41;44.61;44.61;44.12;44.55;44.5;44.65;44.99;46.27;46.46;46.65;46.56;47.53;48.22;49.04;49.58;50.17;51.44;51.68;52.8;53.34;54.12;55.2;56.91;58.95;58.86;60.42;61.64;62.62;64.32;65.16;66.18;67.88;69.3;70.82;72.18;72.33;71.84;71.64;71.11;70.72;70.67;71.31;71.75;71.84;72.08;71.93;71.55;71.35;71.35;71.26;71.75;72.08;72.13;72.23;72.08;71.89;71.75;71.75;71.75;71.99;72.08;72.38;72.33;72.28;71.99;71.93;71.79;71.84;72.13;72.08;72.48;72.13;72.13;72.04;71.26;71.45;71.55;71.6;71.75;71.79;71.75;71.6;71.5;71.2;70.91;70.91",
          dispCurrent: null,
          activePower: null,
          reactivePower: null,
          powerFactor: null,
          suspMaxLoad: 72.48,
          suspMinLoad: 41.38,
          upgoingMaxCurrent: 0,
          downgoingMaxCurrent: 0,
          dyna: null
        },
        xAxis: [],
        yAxis: [],
        coordinates: [[]],
        isColor: true,
      };
    },
    methods: {
      // 对话框父子组件传值
      priviewAbnormalGtClose() {
        this.$emit("postRowClose");
      },
      mounted() {
        this.drawLine();
        this.drawLine2();
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("myChart"));
        // 绘制图表
        myChart.setOption({
          title: {
            x: "center",
            text: this.tableData.dynaCreateTime,
            top: "7%",
            textStyle: {
              fontSize: 13,
              fontStyle: "normal",
              fontWeight: "bolder"
            },
            subtext: ""
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "line" // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {
              return (
                "<div><p>位移：" +
                params[0].value[0] +
                "M</p>" +
                "<p>载荷：" +
                params[0].value[1] +
                "KN</p>" +
                "</div>"
              );
            }
          },
          grid: {
            left: "3%",
            right: "3%",
            bottom: "15%",
            top: "20%",
            containLabel: true
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
              fontSize: 10
            }
          },
          yAxis: {
            name: "载荷(KN)",
            nameLocation: "middle",
            // min: 0,
            // max: 100,
            type: "value",
            axisLine: { onZero: false },
            nameTextStyle: {
              padding: [0, 0, 6, 0],
              fontSize: 10
            }
          },
          series: [
            {
              symbol: "none",
              data: this.coordinates,
              type: "line",
              smooth: true,
              lineStyle: {
                width: 1.5
              }
            }
          ]
        });
      },
      //将坐标数据串处理为坐标点
      coordinate() {
        var displacementArray = this.tableData.displacement.split(";");
        var disploadArray = this.tableData.dispLoad.split(";");
        for (var i = 0; i < displacementArray.length; i++) {
          this.coordinates[i] = [];
          this.coordinates[i][0] = parseFloat(displacementArray[i]);
          this.coordinates[i][1] = parseFloat(disploadArray[i]);
        }
        return this.coordinates;
      },
      drawLine2() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("myChart2"));
        // 绘制图表
        myChart.setOption({
          title: {
            x: "center",
            text: this.tableData.dynaCreateTime,
            top: "7%",
            textStyle: {
              fontSize: 13,
              fontStyle: "normal",
              fontWeight: "bolder"
            },
            subtext: ""
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "line" // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {
              return (
                "<div><p>位移：" +
                params[0].value[0] +
                "M</p>" +
                "<p>载荷：" +
                params[0].value[1] +
                "KN</p>" +
                "</div>"
              );
            }
          },
          grid: {
            left: "3%",
            right: "3%",
            bottom: "15%",
            top: "20%",
            containLabel: true
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
              fontSize: 10
            }
          },
          yAxis: {
            name: "载荷(KN)",
            nameLocation: "middle",
            // min: 0,
            // max: 100,
            type: "value",
            axisLine: { onZero: false },
            nameTextStyle: {
              padding: [0, 0, 6, 0],
              fontSize: 10
            }
          },
          series: [
            {
              symbol: "none",
              data: this.coordinates,
              type: "line",
              smooth: true,
              lineStyle: {
                width: 1.5
              }
            }
          ]
        });
      },
      //将坐标数据串处理为坐标点
      coordinate() {
        var displacementArray = this.tableData.displacement.split(";");
        var disploadArray = this.tableData.dispLoad.split(";");
        for (var i = 0; i < displacementArray.length; i++) {
          this.coordinates[i] = [];
          this.coordinates[i][0] = parseFloat(displacementArray[i]);
          this.coordinates[i][1] = parseFloat(disploadArray[i]);
        }
        return this.coordinates;
      },
      opens1() {
        this.$nextTick(() => {
          this.coordinate();
          this.mounted();
          window.addEventListener("resize", function () {
            myCharts.resize();
            //myCharts是你的初始化echarts图表时取的名字
          });

        });
      }
    }
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
