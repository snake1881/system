<template>
  <div class="oil_abnormal">
    <!-- 条件查询 -->
    <el-form class="oil_abnormal_form" :model="postForm" :inline="true">
      <el-form-item>
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="postForm.date1"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="searchPost()">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="postData"
      height="84%"
      border
      style="width:100%;"
    >
      <el-table-column prop="cyz" label="采油站" min-width="15%" />
      <el-table-column prop="zjs" label="总井数" min-width="10%" />
      <el-table-column prop="kjs" label="开井数" min-width="10%" />
      <el-table-column prop="zcyl" label="总产液量" min-width="13%" />
      <el-table-column prop="zcylz" label="总产液量(昨)" min-width="13%" />
      <el-table-column prop="ylycs" label="液量异常数" min-width="10%" />
      <el-table-column prop="hsycs" label="含水异常数" min-width="10%" />
      <el-table-column prop="gkycs" label="工况异常数" min-width="10%" />
      <el-table-column prop="sbycs" label="设备异常数" min-width="10%" />
    </el-table>
    <div id="wellChart" :style="{width: '98%', height: '300px'}"></div>
    <div id="waterWellChart" :style="{width: '98%', height: '300px'}"></div>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
export default {
  data() {
    return {
      //搜索框
      postForm: {
        positionName: "",
        data1: ""
      },
      // 表格数据
      postData: [
        {
          cyz: "1766采油站",
          zjs: "42",
          kjs: "28",
          zcyl: "235.43",
          zcylz: "234.4",
          ylycs: "0",
          hsycs: "0",
          gkycs: "1",
          sbycs: "2"
        },
        {
          cyz: "一号采油站",
          zjs: "63",
          kjs: "35",
          zcyl: "278.55",
          zcylz: "276.89",
          ylycs: "0",
          hsycs: "0",
          gkycs: "23",
          sbycs: "3"
        },
        {
          cyz: "上菜渠采油站",
          zjs: "54",
          kjs: "11",
          zcyl: "259.43",
          zcylz: "231.4",
          ylycs: "14",
          hsycs: "0",
          gkycs: "0",
          sbycs: "1"
        },
        {
          cyz: "下菜渠采油站",
          zjs: "54",
          kjs: "11",
          zcyl: "259.43",
          zcylz: "231.4",
          ylycs: "14",
          hsycs: "0",
          gkycs: "0",
          sbycs: "1"
        },
        {
          cyz: "东关增压站",
          zjs: "64",
          kjs: "35",
          zcyl: "259.43",
          zcylz: "208.4",
          ylycs: "11",
          hsycs: "0",
          gkycs: "0",
          sbycs: "2"
        },
        {
          cyz: "东关采油站",
          zjs: "54",
          kjs: "11",
          zcyl: "253.43",
          zcylz: "281.4",
          ylycs: "18",
          hsycs: "3",
          gkycs: "0",
          sbycs: "1"
        },
        {
          cyz: "庙沟采油站",
          zjs: "54",
          kjs: "11",
          zcyl: "229.43",
          zcylz: "271.4",
          ylycs: "17",
          hsycs: "0",
          gkycs: "0",
          sbycs: "1"
        },
        {
          cyz: "张天渠采油站",
          zjs: "54",
          kjs: "11",
          zcyl: "259.43",
          zcylz: "231.4",
          ylycs: "14",
          hsycs: "0",
          gkycs: "0",
          sbycs: "1"
        }
      ]
    };
  },
  mounted() {
    //实例化echarts
    this.drawLine();
  },
  created() {},
  methods: {
    // 画图
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let dom = document.getElementById("wellChart");
      let dom2 = document.getElementById("waterWellChart");
      let myChart = echarts.init(dom);
      let myChart2 = echarts.init(dom2);
      // 绘制图表
      myChart.setOption({
        title: {
          x: "center",
          text: "采油井异常信息汇总"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "{c}"
        },
        legend: {
          top: "10%"
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "15%",
          top: "20%",
          containLabel: true
        },
        dataset: {
          source: [
            [
              "carType",
              "总井数",
              "开井数",
              "总产液量",
              "总产液量(昨)",
              "液量异常数",
              "含水异常数",
              "工况异常数",
              "设备异常数"
            ],
            ["1766采油站", 23, 28, 168.5, 175.5, 0, 0, 1, 2],
            ["一号采油站", 15, 11, 99.5, 109.9, 12, 7, 0, 1],
            ["上菜渠采油站", 20, 16, 154.5, 198.8, 19, 0, 0, 1],
            ["下菜渠采油站", 13, 8, 202.5, 217.8, 16, 0, 2, 1],
            ["庙沟采油站", 53, 11, 162.5, 165.4, 17, 0, 0, 1],
            ["张天渠采油站", 54, 11, 134.5, 145.43, 14, 0, 0, 1]
          ]
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false //隐藏x坐标轴刻度
          },
          //x轴字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#42436A",
              fontSize: "12"
            },
            rotate: "30" //字体倾斜角度
          },
          //x轴颜色
          axisLine: {
            lineStyle: {
              color: "#e4e4e4"
            }
          }
        },
        yAxis: {
          type: "value",
          minInterval: 0, //只显示整数
          axisLine: {
            show: false //隐藏y坐标轴
          },
          //y轴字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#9495ab",
              fontSize: "12"
            }
          },
          //网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: "#e4e4e4",
              width: 1,
              type: "solid"
            }
          },
          axisTick: {
            show: false //隐藏y坐标轴刻度
          }
        },
        series: [
          {
            name: "总井数",
            type: "bar",
            barWidth: 6, //柱体宽带
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          },
          {
            name: "开井数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          },
          ,
          {
            name: "总产液量",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          },
          ,
          {
            name: "总产液量(昨)",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          },
          {
            name: "液量异常数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          },
          {
            name: "含水异常数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          },
          {
            name: "工况异常数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          },
          {
            name: "设备异常数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          }
        ]
      });
      // 绘制图表
      myChart2.setOption({
        title: {
          x: "center",
          text: "注水井异常信息汇总"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "{c}"
        },
        legend: {
          top: "10%"
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "15%",
          top: "20%",
          containLabel: true
        },
        dataset: {
          source: [
            [
              "carType",
              "总井数",
              "开井数",
              "总产液量",
              "总产液量(昨)",
              "液量异常数",
              "含水异常数",
              "工况异常数",
              "设备异常数"
            ],
            ["1766采油站", 23, 28, 168.5, 175.5, 0, 0, 1, 2],
            ["一号采油站", 15, 11, 99.5, 109.9, 12, 7, 0, 1],
            ["上菜渠采油站", 20, 16, 154.5, 198.8, 19, 0, 0, 1],
            ["下菜渠采油站", 13, 8, 202.5, 217.8, 16, 0, 2, 1],
            ["庙沟采油站", 53, 11, 162.5, 165.4, 17, 0, 0, 1],
            ["张天渠采油站", 54, 11, 134.5, 145.43, 14, 0, 0, 1]
          ]
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false //隐藏x坐标轴刻度
          },
          //x轴字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#42436A",
              fontSize: "12"
            },
            rotate: "30" //字体倾斜角度
          },
          //x轴颜色
          axisLine: {
            lineStyle: {
              color: "#e4e4e4"
            }
          }
        },
        yAxis: {
          type: "value",
          minInterval: 0, //只显示整数
          axisLine: {
            show: false //隐藏y坐标轴
          },
          //y轴字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#9495ab",
              fontSize: "12"
            }
          },
          //网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: "#e4e4e4",
              width: 1,
              type: "solid"
            }
          },
          axisTick: {
            show: false //隐藏y坐标轴刻度
          }
        },
        series: [
          {
            name: "总井数",
            type: "bar",
            barWidth: 6, //柱体宽带
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          },
          {
            name: "开井数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          },
          ,
          {
            name: "总产液量",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          },
          ,
          {
            name: "总产液量(昨)",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          },
          {
            name: "液量异常数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          },
          {
            name: "含水异常数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          },
          {
            name: "工况异常数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          },
          {
            name: "设备异常数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0]
              }
            }
          }
        ]
      });
    },
    // 根据输入信息查询
    searchPost() {},
    //表格数据初始化
    postInit() {}
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/abnormal/oilAbnormal.css";
</style>
