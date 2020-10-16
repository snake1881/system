<template>
  <el-dialog
    title="一周内动液面曲线"
    :modal="false"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    size="600px"
    :visible.sync="previewDymVisible"
    @opened="opens"
    :before-close="previewDymClose"
  >
    <div
      class="chart"
      id="myChart"
      :style="{ width: '100%', height: '400px' }"
    ></div>
  </el-dialog>
</template>

<script>
let echarts = require("echarts/lib/echarts");
export default {
  props: {
    previewDymVisible: {
      type: Boolean
    },
    previewData: {
      type: Object
    }
  },
  data() {
    return {
      tableData:[],
      xAxis: [],
      yAxis: [],
      data:[[]],
      isColor: true
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
      this.getRequest(
        "/oilWell/dym/dymDataTerm?prodDate=" +
          this.previewData.prodDate +
          "&wellName=" +
          this.previewData.wellId
      ).then(resp => {
        // this.loading = false;
        if (resp) {
          this.tableData = [];
          this.tableData = resp.data;
          this.coordinate();
          console.log(this.data);
          this.drawLine();
        }
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          x: "center",
          text: this.previewData.wellName+" "+ this.previewData.prodDate,
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
              "<div><p>时间：" +
              params[0].value[0] +
              "</p>" +
              "<p>动液面：" +
              params[0].value[1] +
              "m</p>" +
              "</div>"
            );
          }
        },
        toolbox: {
            left: 'right',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: [{
            startValue: '2014-06-01'
        }, {
            type: 'inside'
        }],
        grid: {
          left: "3%",
          right: "3%",
          bottom: "15%",
          top: "20%",
          containLabel: true
        },
    xAxis: {
         
          nameLocation: "middle",
          type: 'time',
        },
    yAxis: {
          name: "动液面(m)",
          nameLocation: "middle",
          nameGap: 30,
          type: "value",
          axisLine: { onZero: false },
          nameTextStyle: {
            padding: [0, 0, 6, 0],
            fontSize: 10
          }
        },
        series: [
          {
             type: 'line',
            smooth: true,
            lineStyle: {
                color: 'green',
                width: 1
            },
            data: this.data,
            // type: "line",
            // smooth: true,
            // lineStyle: {
            //   width: 1.5
            // }
          }
        ]
      });
    },
    //将坐标数据串处理为坐标点
    coordinate() {
     this.data=[[]];
     for(var i=0;i<this.tableData.length;i++){
       this.data[i]=[];
       this.data[i][0]=this.tableData[i].prodDate;
       this.data[i][1]=this.tableData[i].dym;
     };
     return this.data;
    },
  opens(){
this.gtDataInit();
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
