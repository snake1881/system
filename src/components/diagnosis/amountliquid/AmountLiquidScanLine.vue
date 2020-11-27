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
    <!-- <el-form>
      <el-form-item label="选择日期" size="120px">
        <el-date-picker
          v-model="value2"
          type="daterange"
          size="small"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          @change="gtDataInit()"
        >
        </el-date-picker>
      </el-form-item>
    </el-form> -->
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
      // pickerOptions: {
      //   shortcuts: [
      //     {
      //       text: "最近一周",
      //       onClick(picker) {
      //         const end = new Date();
      //         const start = new Date();
      //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      //         picker.$emit("pick", [start, end]);
      //       },
      //     },
      //     {
      //       text: "最近一个月",
      //       onClick(picker) {
      //         const end = new Date();
      //         const start = new Date();
      //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      //         picker.$emit("pick", [start, end]);
      //       },
      //     },
      //     {
      //       text: "最近三个月",
      //       onClick(picker) {
      //         const end = new Date();
      //         const start = new Date();
      //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      //         picker.$emit("pick", [start, end]);
      //       },
      //     },
      //   ],
      // },
      value2: [],
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
          "/mountLiquid/liquidList?endTime="+
          this.previewData.acquisitionTime+
          "&wellId=" +
          this.previewData.wellId
        ).then((resp) => {
          // this.loading = false;
          if (resp) {
            this.tableData = [];
            this.tableData = resp.data;
            this.coordinate();
            this.$nextTick(()=>{
              this.drawLine();
            });
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
          text:
            this.previewData.wellName +
            "号井  至" +this.previewData.acquisitionTime+
            "  24小时内" +
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
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
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
              width: 1,
            },
            data: this.data,
            // type: "line",
            // smooth: true,
            // lineStyle: {
            //   width: 1.5
            // }
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
        this.data[i][1] = this.tableData[i].maxLoad;
      }
      return this.data;
    },
    //初始化时间
    // dateInit() {
    //   console.log(this.value2);
    //   if (this.value2.length == 0) {
    //     var date = new Date();
    //     var year = date.getFullYear();
    //     var mouth = date.getMonth();
    //     var day = date.getDate();
    //     var endDate = year + "-" + mouth + "-" + day;
    //     this.value2[1] = endDate;
    //     var date1 = new Date();
    //     date1.setTime(date.getTime() - 7 * 24 * 60 * 60 * 1000);
    //     var year1 = date1.getFullYear();
    //     var mouth1 = date1.getMonth();
    //     var day1 = date1.getDate();
    //     var beginDate = year1 + "-" + mouth1 + "-" + day1;
    //     this.value2[0] = beginDate;
    //   }
    //   console.log(this.value2);
    // },
    opens() {
      // this.value2=[];
      // this.dateInit();
      // console.log(this.value2);
      this.gtDataInit();
    },
  },
  watch: {
    value2() {
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
</style>
<style lang="less" scoped>
.el-input {
  width: 700px;
}
</style>
