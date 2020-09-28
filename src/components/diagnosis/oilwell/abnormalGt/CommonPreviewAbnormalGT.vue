<template>
  <el-dialog
  title="功图诊断参数编辑"
    :visible.sync="previewAbnormalGtVisible"
    width="60%"
    :before-close="priviewAbnormalGtClose">
    <div class="abnormalGt">
      <el-form :model="previewAbnormalGtData" label-width="300px" label-position="right">
        <el-form-item label="井号:" >
          <el-input v-model="previewAbnormalGtData.wellId" style="width: 300px" />
        </el-form-item>
        <el-form-item label="检查日期(格式：yyyy-mm-dd):" >
          <el-input v-model="previewAbnormalGtData.checkDate" style="width: 300px"/>
        </el-form-item>
      </el-form>
      <div class="abnormalGt_echart">
        <div class="abnormalGt_echart_one" 
        v-for="item in tableData"
        :key="item.dynaId"
        :id="item.dynaId"
        :style="{ width: '24%', height: '250px' }">
        </div>
      </div>
    </div>
  </el-dialog>

</template>

<script>
let echarts = require("echarts/lib/echarts");
export default {
   props: {
    previewAbnormalGtVisible: {
      type: Boolean
    },
    previewAbnormalGtData:{
      dyna:"",
      type: Object
    }
    
  },
  data() {
    return {
    tableData:{}
    };
  },
  methods: {
    // 对话框父子组件传值
    priviewAbnormalGtClose() {
      this.$emit("previewAbnormalGtRowClose");
    },
    drawAll(val){
      this.tableDate=val;
      this.coordinate(tableDate);
      this.$set(tableDate, "coordinates", this.coordinates);
      this.$nextTick(function() {
              //实例化echarts
              this.drawLine(tableDate);
            });
    },
     //实例化图表
    drawLine(val) {
      // 基于准备好的dom，初始化echarts实例
      let dom = document.getElementById(val.dynaId);
      let myChart = echarts.init(dom);
      // 绘制图表
      myChart.setOption({
        title: {
          x: "center",
          text: val.dynaCreateTime,
          top: "7%",
          textStyle: {
            fontSize: 13,
            fontStyle: "normal",
            fontWeight: "bolder"
          }
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
            data: val.coordinates,
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
    coordinate(val) {
      var displacementArray = val.displacement.split(";");
      var disploadArray = val.dispLoad.split(";");
      for (var i = 0; i < displacementArray.length; i++) {
        this.coordinates[i] = [];
        this.coordinates[i][0] = parseFloat(displacementArray[i]);
        this.coordinates[i][1] = parseFloat(disploadArray[i]);
      }
      return this.coordinates;
    },
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
