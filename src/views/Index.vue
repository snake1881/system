<template>
  <div class="main">
    <div class="main_between">
      <el-card class="main_between_1" shadow="hover">
        <div class="main_between_1_item">
          <div class="main_middle_1_item_span">油井情况</div>
          <div class="main_between_1_item_well">
            <div class="main_between_1_item_well_line">
              <div id="well1" class="main_between_1_item_water1" />
              <div id="well2" class="main_between_1_item_water2" />
            </div>
            <div class="main_between_1_item_well_dec">
              <div class="main_between_1_item_well_dec_container">
                <span class="main_between_1_item_water1_span"
                  >总井数(口<sup></sup>):
                  <span style="color: #e65a40">100</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >开井数(口<sup></sup>):
                  <span style="color: #e65a40">100</span></span
                >
              </div>
              <div class="main_between_1_item_well_dec_container">
                <span class="main_between_1_item_water1_span"
                  >日产液(m<sup>3</sup>):
                  <span style="color: #e65a40">100</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >月产液(m<sup>3</sup>):
                  <span style="color: #e65a40">100</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >年产液(m<sup>3</sup>):
                  <span style="color: #e65a40">100</span></span
                >
              </div>
              <div class="main_between_1_item_well_dec_container">
                <span class="main_between_1_item_water1_span"
                  >日产油(m<sup>3</sup>):
                  <span style="color: #e65a40">100</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >月产油(m<sup>3</sup>):
                  <span style="color: #e65a40">100</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >年产油(m<sup>3</sup>):
                  <span style="color: #e65a40">100</span></span
                >
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="main_between_2" shadow="hover">
        <div class="main_between_2_item">
          <div class="main_middle_1_item_span">油井异常情况</div>
          <div id="wellAbnormal" class="main_between_2_item_wellAbnormal" />
        </div>
      </el-card>
    </div>
    <div class="main_middle">
      <el-card class="main_middle_1" shadow="hover">
        <div class="main_middle_1_item">
          <div class="main_middle_1_item_span">GIS地图</div>
          <!-- 
          amap-manager： 地图管理对象
          vid：地图容器节点的ID
          zooms： 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
          center： 地图中心点坐标值
          plugin：地图使用的插件
          events： 事件
           -->
          <el-amap
            ref="map"
            vid="amapDemo"
            :amap-manager="amapManager"
            :zoom="zoom"
            :center="center"
            :plugin="plugin"
            :events="events"
            class="amap-demo"
          />
        </div>
      </el-card>
      <el-card class="main_middle_2" shadow="hover">
        <div class="main_middle_2_item">
          <div class="main_middle_1_item_span">排采曲线</div>
          <div id="paicai" class="main_between_2_item_measure"></div>
        </div>
      </el-card>
    </div>
    <div class="main_between">
      <el-card class="main_between_1" shadow="hover">
        <div class="main_between_1_item">
          <div class="main_middle_1_item_span">水井情况</div>
          <div class="main_between_1_item_well">
            <div class="main_between_1_item_well_line">
              <div id="water1" class="main_between_1_item_water1" />
              <div id="water2" class="main_between_1_item_water2" />
            </div>
            <div class="main_between_1_item_well_dec">
              <div class="main_between_1_item_well_dec_container">
                <span class="main_between_1_item_water1_span"
                  >总井数(口<sup></sup>):
                  <span style="color: #e65a40">100</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >开井数(口<sup></sup>):
                  <span style="color: #e65a40">100</span></span
                >
              </div>
              <div class="main_between_1_item_well_dec_container">
                <span class="main_between_1_item_water1_span"
                  >日注水(m<sup>3</sup>):
                  <span style="color: #e65a40">100</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >月注水(m<sup>3</sup>):
                  <span style="color: #e65a40">100</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >年注水(m<sup>3</sup>):
                  <span style="color: #e65a40">100</span></span
                >
              </div>
              <div class="main_between_1_item_well_dec_container">
                <span class="main_between_1_item_water1_span"
                  >正常井数(口<sup></sup>):
                  <span style="color: #e65a40">100</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >超注井数(口<sup></sup>):
                  <span style="color: #e65a40">100</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >欠注井数(口<sup></sup>):
                  <span style="color: #e65a40">100</span></span
                >
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="main_between_2" shadow="hover">
        <div class="main_between_2_item">
          <div class="main_middle_1_item_span">措施情况</div>
          <div id="measure" class="main_between_2_item_measure"></div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
import { AMapManager } from "vue-amap";
let amapManager = new AMapManager();
export default {
  data() {
    return {
      // 地图数据
      amapManager,
      zoom: 12,
      center: [107.596401, 37.574277],
      events: {
        init: (o) => {
          o.setMapStyle("amap://styles/macaron");
        },
        moveend: () => {},
        zoomchange: () => {},
        click: () => {},
      },
      plugin: [
        "ToolBar",
        {
          pName: "MapType",
          defaultType: 0,
          events: {
            init() {},
          },
        },
      ],
    };
  },
  mounted() {
    // 油井情况
    this.wellInit();
    this.wellInit1();
    // 油水井异常情况
    this.wellAbnormalInit();
    // 水井情况
    this.waterWllInit();
    // 措施情况
    this.measureInit();
  },
  methods: {
    // 油井情况
    wellInit1() {
      let dom = document.getElementById("paicai");
      let myChart = echarts.init(dom);
      myChart.setOption({
        tooltip: {
          trigger: "axis",
        },
        // 折线颜色
        color: ["#2670f7", "#ed6741", "#57c5d9", "#fbe268"],
        legend: {
          data: ["AAAAA", "FFFFF", "BBBBB", "CCCCC"],
          textStyle: {
            color: "#ffffff",
            fontSize: 10,
          },
        },
        xAxis: {
          boundaryGap: false,
          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: "#c3dbff", //更改坐标轴文字颜色
              fontSize: 14, //更改坐标轴文字大小
            },
          },
          // 轴线颜色
          axisLine: {
            lineStyle: { color: "#C0C4CC" },
          },
          // 网格线
          splitLine: { show: false },
        },
        yAxis: [
          // 产液量
          {
            name: "井口",
            type: "value",
            // 文字大小与颜色
            axisLabel: {
              textStyle: {
                color: "#c3dbff", //更改坐标轴文字颜色
                fontSize: 10, //更改坐标轴文字大小
              },
            },
            // 轴线颜色
            axisLine: {
              lineStyle: { color: "#C0C4CC" },
            },
            // 网格线
            splitLine: { show: false },
          },
          // 开井情况
          {
            name: "产液(m)",
            type: "value",
            max: 100,
            // 文字大小与颜色
            axisLabel: {
              textStyle: {
                color: "#c3dbff", //更改坐标轴文字颜色
                fontSize: 10, //更改坐标轴文字大小
              },
            },
            // 轴线颜色
            axisLine: {
              lineStyle: { color: "#C0C4CC" },
            },
            // 网格线
            splitLine: { show: false },
          },
        ],
        grid: {
          width: "80%",
          height: "45%",
          top: 55,
          left: 70,
        },
        series: [
          {
            name: "AAAAA",
            type: "line",
            data: [50, 102, 75, 104, 80, 100, 43, 56, 104, 74, 94],
            yAxisIndex: 0,
          },
          {
            name: "FFFFF",
            type: "line",
            data: [60, 82, 86, 74, 86, 90, 63, 76, 83, 74, 84],
            yAxisIndex: 1,
          },
          {
            name: "BBBBB",
            type: "line",
            data: [65, 102, 88, 104, 102, 170, 88, 56, 104, 30, 76],
            yAxisIndex: 0,
          },
          {
            name: "CCCCC",
            type: "line",
            data: [70, 90, 70, 94, 80, 70, 90, 74, 81, 82],
            yAxisIndex: 1,
          },
        ],
      });
    },
    // 油井情况
    wellInit() {
      // 油井情况1
      let dom1 = document.getElementById("well1");
      let myChart1 = echarts.init(dom1);
      myChart1.setOption({
        tooltip: {
          show: false,
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        // 图形颜色
        color: ["#ed6741", "#0a2146"],
        series: [
          {
            type: "pie",
            radius: ["40%", "55%"],
            data: [
              {
                value: 80,
                name: "时间进度",
                selected: false,
                label: {
                  normal: {
                    show: true,
                    position: "center",
                    fontSize: 12,
                    formatter: "{b}\n{d}%",
                  },
                },
              },
              { value: 18 },
            ],
          },
        ],
      });
      // 油井情况2
      let dom2 = document.getElementById("well2");
      let myChart2 = echarts.init(dom2);
      myChart2.setOption({
        tooltip: {
          show: false,
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        // 图形颜色
        color: ["#5dc5d9", "#0a2146"],
        series: [
          {
            type: "pie",
            radius: ["40%", "55%"],
            data: [
              {
                value: 80,
                name: "产量完成",
                selected: false,
                label: {
                  normal: {
                    show: true,
                    position: "center",
                    fontSize: 12,
                    formatter: "{b}\n{d}%",
                  },
                },
              },
              { value: 18 },
            ],
          },
        ],
      });
    },
    // 油水井异常情况
    wellAbnormalInit() {
      let dom = document.getElementById("wellAbnormal");
      let myChart = echarts.init(dom);
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        // 颜色
        color: ["#2670f7", "#57c5d9", "#ed6741", "#Fbe268", "#Cabbe9"],
        series: [
          {
            name: "所占比例",
            type: "pie",
            radius: ["40%", "55%"],
            labelLine: {
              normal: {
                length: 25,
              },
            },
            data: [
              { value: 335, name: "正常井" },
              { value: 210, name: "液量异常" },
              { value: 234, name: "含水异常" },
              { value: 335, name: "工况异常" },
              { value: 448, name: "设备异常" },
            ],
          },
        ],
      });
    },
    // 水井情况
    waterWllInit() {
      // 水井情况1
      let dom1 = document.getElementById("water1");
      let myChart1 = echarts.init(dom1);
      myChart1.setOption({
        tooltip: {
          show: false,
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        title: {
          show: true,
          text: "总井数、开井数",
          x: "center",
          textStyle: {
            fontSize: "12",
            color: "#e6e6e6",
            fontFamily: "Microsoft Yahei",
          },
        },
        // 图形颜色
        color: ["#5dc5d9", "#0a2146"],
        series: [
          {
            type: "pie",
            radius: ["40%", "55%"],
            data: [
              {
                value: 80,
                name: "所占比例",
                selected: false,
                label: {
                  normal: {
                    show: true,
                    position: "center",
                    fontSize: 12,
                    formatter: "{b}\n{d}%",
                  },
                },
              },
              { value: 18 },
            ],
          },
        ],
      });
      // 水井情况2
      let dom2 = document.getElementById("water2");
      let myChart2 = echarts.init(dom2);
      myChart2.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          data: ["正常", "超注", "欠注"],
          textStyle: {
            color: "#e6e6e6",
            fontSize: 10,
          },
          itemWidth: 19,
        },
        // 颜色
        color: ["#2670f7", "#57c5d9", "#ed6741"],
        series: [
          {
            name: "所占比例",
            type: "pie",
            radius: ["40%", "65%"],
            data: [
              { value: 335, name: "正常" },
              { value: 210, name: "超注" },
              { value: 234, name: "欠注" },
            ],
            label: {
              normal: {
                position: "inner",
                show: false,
              },
            },
          },
        ],
      });
    },
    // 措施情况
    measureInit() {
      let dom = document.getElementById("measure");
      let myChart = echarts.init(dom);
      myChart.setOption({
        tooltip: { trigger: "axis" },
        color: ["#2670f7", "#57c5d9", "#cabbe9"],
        legend: {
          data: ["措施井", "措施完成井", "措施成功井"],
          textStyle: {
            color: "#e6e6e6",
            fontSize: 12,
          },
        },
        xAxis: {
          data: ["站1", "站2", "站3", "站4", "站5", "站6"],
          splitLine: { show: false },
          // 文字大小与颜色
          axisLabel: {
            show: true,
            textStyle: {
              color: "#c3dbff", //更改坐标轴文字颜色
              fontSize: 14, //更改坐标轴文字大小
            },
          },
          // 轴线颜色
          axisLine: {
            lineStyle: { color: "#C0C4CC" },
          },
        },
        yAxis: {
          splitLine: { show: false },
          // 文字大小与颜色
          axisLabel: {
            show: true,
            textStyle: {
              color: "#c3dbff", //更改坐标轴文字颜色
              fontSize: 10, //更改坐标轴文字大小
            },
          },
          // 轴线颜色
          axisLine: {
            lineStyle: { color: "#C0C4CC" },
          },
        },
        series: [
          {
            name: "措施井",
            type: "bar",
            stack: "使用情况",
            barWidth: 20,
            data: [5, 20, 36, 10, 10, 20],
          },
          {
            name: "措施完成井",
            type: "bar",
            stack: "使用情况",
            barWidth: 20,
            data: [40, 22, 18, 35, 42, 40],
          },
          {
            name: "措施成功井",
            type: "bar",
            stack: "使用情况",
            barWidth: 20,
            data: [10, 32, 16, 13, 22, 30],
          },
        ],
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/home/index.css";
</style>
<style>
.el-main .el-vue-amap-container {
  height: 340px;
}
.main .el-card__body {
  padding: 0;
}
</style>
