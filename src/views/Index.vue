<template>
  <div class="main">
    <div class="main_between">
      <el-card class="main_between_1" shadow="hover">
        <div class="main_between_1_item">
          <div class="main_between_1_item_span">油井情况</div>
          <div :style="{ width: '100%', height: '6px' }"></div>
          <div class="main_between_1_item_well">
            <div class="block">
              <el-date-picker
                v-model="wellDate"
                type="date"
                editable
                clearable
                size="small"
                align="center"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="wellInit()"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
            <div class="main_between_1_item_well_line">
              <div id="well1" class="main_between_1_item_water1" />
              <div id="well2" class="main_between_1_item_water2" />
            </div>
            <div class="main_between_1_item_well_dec">
              <div class="main_between_1_item_well_dec_container3" />
              <div class="main_between_1_item_well_dec_container1">
                <span class="main_between_1_item_water1_span"
                  >总井数(口<sup></sup>):
                  <span style="color: #e65a40">{{ this.wellTotal }}</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >开井数(口<sup></sup>):
                  <span style="color: #e65a40">{{ this.wellOpen }}</span></span
                >
              </div>
              <div class="main_between_1_item_well_dec_container3" />
              <div class="main_between_1_item_well_dec_container2">
                <span class="main_between_1_item_water1_span"
                  >日产液(m<sup>3</sup>):
                  <span style="color: #e65a40">{{
                    this.dilyLiquid
                  }}</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >日产油(m<sup>3</sup>):
                  <span style="color: #e65a40">{{ this.dailyOil }}</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >综合含水(%):
                  <span style="color: #e65a40">{{
                    this.drWaterContent
                  }}</span></span
                >
                <!-- <span class="main_between_1_item_water1_span"
                  >月产液(m<sup>3</sup>):
                  <span style="color: #e65a40">{{
                    this.monthLiquid
                  }}</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >年产液(m<sup>3</sup>):
                  <span style="color: #e65a40">{{
                    this.yearLiquid
                  }}</span></span
                > -->
              </div>
              <!-- <div class="main_between_1_item_well_dec_container3"> -->

              <!-- <span class="main_between_1_item_water1_span"
                  >月产油(m<sup>3</sup>):
                  <span style="color: #e65a40">{{ this.monthOil }}</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >年产油(m<sup>3</sup>):
                  <span style="color: #e65a40">{{ this.yearOil }}</span></span
                > -->
              <!-- </div> -->
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="main_between_2" shadow="hover">
        <div class="main_between_2_item">
          <div class="main_between_1_item_span">油井异常情况</div>
          <div :style="{ width: '100%', height: '6px' }"></div>
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
          <!-- <el-amap
            ref="map"
            vid="amapDemo"
            :amap-manager="amapManager"
            :zoom="zoom"
            :center="center"
            :plugin="plugin"
            class="amap-demo"
          /> -->
          <img
            src="../assets/images/index_gis.jpg"
            style="height: 100%; width: 100%"
          />
        </div>
      </el-card>
      <el-card class="main_middle_2" shadow="hover">
        <div class="main_middle_2_item">
          <div class="main_middle_1_item_span">
            排采曲线
            <el-date-picker
              v-model="collectDatePicker"
              type="daterange"
              editable
              clearable
              size="small"
              height="3%"
              padding="2% 2%"
              align="center"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @change="collectInit()"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
            <el-select
              v-model="collectLayerName"
              clearable
              filterable
              placeholder="层位"
              size="small"
              height="3%"
              padding="2% 2%"
              @change="collectInit"
            >
              <el-option
                v-for="item in collectLayerNameSelect"
                :key="item.layerName"
                :label="item.layerName"
                :value="item.layerName"
              />
            </el-select>
            <el-tooltip effect="dark" content="是否展示时间轴" placement="top">
              <el-switch
                v-model="collectXAxisIsShow"
                active-color="#6772dd"
                inactive-color="#ff4949"
                @change="isShowChange()"
              >
              </el-switch>
            </el-tooltip>
          </div>
          <div :style="{ width: '100%', height: '6px' }"></div>

          <div class="main_middle_2_item_content">
            <div
              id="paicai"
              ref="Echart"
              class="main_middle_2_item_content_collect"
            />
          </div>
        </div>
      </el-card>
    </div>
    <div class="main_between">
      <el-card class="main_between_1" shadow="hover">
        <div class="main_between_1_item">
          <div class="main_between_1_item_span">水井情况</div>
          <div :style="{ width: '100%', height: '6px' }"></div>
          <div class="main_between_1_item_well">
            <div class="main_between_1_item_well_line">
              <div id="water1" class="main_between_1_item_water1" />
              <div id="water2" class="main_between_1_item_water2" />
            </div>
            <div class="main_between_1_item_well_dec">
              <div class="main_between_1_item_well_dec_container">
                <span class="main_between_1_item_water1_span"
                  >总井数(口<sup></sup>):
                  <span style="color: #e65a40">{{
                    this.waterTotal
                  }}</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >开井数(口<sup></sup>):
                  <span style="color: #e65a40">{{ this.waterOpen }}</span></span
                >
              </div>
              <div class="main_between_1_item_well_dec_container">
                <span class="main_between_1_item_water1_span"
                  >正常井数(口<sup></sup>):
                  <router-link to="/diagnosis/diagnosis">
                    <span style="color: #e65a40">{{ this.waterNormal }}</span>
                  </router-link>
                </span>
                <span class="main_between_1_item_water1_span"
                  >超注井数(口<sup></sup>):
                  <router-link to="/diagnosis/diagnosis">
                    <span style="color: #e65a40">{{ this.waterOver }}</span>
                  </router-link></span
                >
                <span class="main_between_1_item_water1_span"
                  >欠注井数(口<sup></sup>):
                  <router-link to="/diagnosis/diagnosis">
                    <span style="color: #e65a40">{{
                      this.waterUnder
                    }}</span></router-link
                  >
                </span>
              </div>
              <div class="main_between_1_item_well_dec_container2">
                <span class="main_between_1_item_water1_span"
                  >日注水(m<sup>3</sup>):
                  <span style="color: #e65a40">{{ this.dilyWater }}</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >日配注(m<sup>3</sup>):
                  <span style="color: #e65a40">{{
                    this.drInjectionAllocation
                  }}</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >月注水(m<sup>3</sup>):
                  <span style="color: #e65a40">{{
                    this.monthWater
                  }}</span></span
                >
                <span class="main_between_1_item_water1_span"
                  >年注水(m<sup>3</sup>):
                  <span style="color: #e65a40">{{ this.yearWater }}</span></span
                >
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="main_between_2" shadow="hover">
        <div class="main_between_2_item">
          <div class="main_between_1_item_span">措施情况</div>
          <div :style="{ width: '100%', height: '6px' }"></div>
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
      zoom: 14,
      center: [107.596401, 37.574277],
      plugin: [
        "ToolBar",
        {
          pName: "MapType",
          defaultType: 0,
        },
      ],
      //当天时间
      sysDate: "",
      //油井选择时间
      wellDate: "",
      // 油井总井数
      wellTotal: "",
      // 油井开井数
      wellOpen: "",
      // 日产液
      dilyLiquid: "",
      // 月产液
      monthLiquid: "",
      // 年产液
      yearLiquid: "",
      // 日产油
      dailyOil: "",
      // 月产油
      monthOil: "",
      // 年产油
      yearOil: "",
      // 日含水
      drWaterContent: "",
      // 水井总井数
      waterTotal: "",
      // 水井开井数
      waterOpen: "",
      // 日注水
      dilyWater: "",
      //日配注
      drInjectionAllocation: "",
      // 月注水
      monthWater: "",
      // 年注水
      yearWater: "",
      // 正常井数
      waterNormal: "",
      // 欠注井数
      waterUnder: "",
      // 超注井数
      waterOver: "",
      // 措施站
      measureStationName: [],
      // 措施井
      measureOperation: [],
      // 措施完成井
      measureOperationFinish: [],
      // 措施中井
      measureOperationNotFinish: [],
      // 排采曲线日期
      collectDate: [],
      // 排采曲线油井开井
      collectOil: [],
      // 排采曲线水井开井
      collectWater: [],
      // 排采曲线日产液
      collectDailyLiquid: [],
      // 排采曲线日产油
      collectDailyOil: [],
      // 排采曲线日实注量
      collectDailyWater: [],
      // 排采曲线日配注量
      collectDailyWaterAllocation: [],
      //排采曲线层位选择下拉框数据
      collectLayerNameSelect: [],
      //排采曲线时间段选择数据
      collectDatePicker: [],
      //排采曲线层位数据
      collectLayerName: "",
      //
      collectXAxisIsShow: true,
    };
  },
  mounted() {
    this.getdate();
    // 油井情况
    this.wellInit();
    // 排采曲线层位下拉框初始化
    this.collectLayerNameInit();
    // 排采曲线
    this.collectInit();
    // 油水井异常情况
    this.wellAbnormalInit();
    // 水井情况
    this.waterWllInit();
    // 措施情况
    this.measureInit();
  },
  methods: {
    //
    hreftwo() {
      this.$router.push({ path: "/Login" });
    },
    // 排采曲线层位选择下拉框数据初始化
    collectLayerNameInit() {
      this.getRequest("/basWellInfor/selectWaterLayerName").then((resp) => {
        if (resp) {
          this.collectLayerNameSelect = resp.data;
        }
      });
    },
    // 排采曲线
    collectInit() {
      console.log(this.collectDatePicker[0]);
      console.log(this.collectDatePicker[1]);
      console.log(this.collectLayerName);
      this.getRequest(
        "/homePage/drainageMining/selectDrainageMining?beginDate=" +
          this.collectDatePicker[0] +
          "&endDate=" +
          this.collectDatePicker[1] +
          "&layerName=" +
          this.collectLayerName
      ).then((resp) => {
        if (resp) {
          this.colletcData(resp.data);
          let dom = document.getElementById("paicai");
          let myChart = echarts.init(dom);
          myChart.setOption({
            tooltip: {
              trigger: "axis",
            },
            toolbox: {
              show: true,
              feature: {
                // dataZoom: {
                //     yAxisIndex: 'none'
                // },
                // dataView: {readOnly: false},
                magicType: { type: ["line", "bar"] },
                // restore: {},
                saveAsImage: {},
              },
            },
            // 折线颜色
            color: [
              "#FF8888",
              "#33FFFF",
              "#FF33FF",
              "red",
              "#0000FF",
              "#ABABAB",
            ],
            legend: {
              data: [
                "油井开井",
                "水井开井",
                "日产液",
                "日产油",
                "日注水量",
                "日配注量",
              ],
              textStyle: {
                color: "#333333",
                fontSize: 12,
              },
            },
            xAxis: {
              // type:'time',
              boundaryGap: false,
              data: this.collectDate,
              // 文字大小与颜色
              axisLabel: {
                show: this.collectXAxisIsShow,
                textStyle: {
                  color: "#333333", //更改坐标轴文字颜色
                  fontSize: 12, //更改坐标轴文字大小
                },
              },
              // 轴线颜色
              axisLine: {
                lineStyle: { color: "#333333" },
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
                    color: "#333333", //更改坐标轴文字颜色
                    fontSize: 12, //更改坐标轴文字大小
                  },
                },
                splitNumber: 3,
                // 轴线颜色
                axisLine: {
                  lineStyle: { color: "#333333" },
                },
                // 网格线
                splitLine: { show: false },
              },
              // 开井情况
              {
                name: "吨(m)",
                type: "value",
                // 文字大小与颜色
                axisLabel: {
                  textStyle: {
                    color: "#333333", //更改坐标轴文字颜色
                    fontSize: 12, //更改坐标轴文字大小
                  },
                },
                splitNumber: 3,
                // 轴线颜色
                axisLine: {
                  lineStyle: { color: "#333333" },
                },
                // 网格线
                splitLine: { show: false },
              },
            ],
            grid: {
              width: "90%",
              height: "68%",
              left: "5%",
              top: "20%",
            },
            series: [
              {
                name: "油井开井",
                type: "line",
                data: this.collectOil,
                yAxisIndex: 0,
              },
              {
                name: "水井开井",
                type: "line",
                data: this.collectWater,
                yAxisIndex: 0,
              },
              {
                name: "日产液",
                type: "line",
                data: this.collectDailyLiquid,
                yAxisIndex: 1,
              },
              {
                name: "日产油",
                type: "line",
                data: this.collectDailyOil,
                yAxisIndex: 1,
              },
              {
                name: "日注水",
                type: "line",
                data: this.collectDailyWater,
                yAxisIndex: 1,
              },
              {
                name: "日配注量",
                type: "line",
                data: this.collectDailyWaterAllocation,
                yAxisIndex: 1,
              },
            ],
          });
        }
      });
    },
    isShowChange() {
      console.log(this.collectXAxisIsShow);
      let dom = document.getElementById("paicai");
      let myChart = echarts.init(dom);
      myChart.setOption({
        tooltip: {
          trigger: "axis",
        },
        toolbox: {
          show: true,
          feature: {
            // dataZoom: {
            //     yAxisIndex: 'none'
            // },
            // dataView: {readOnly: false},
            magicType: { type: ["line", "bar"] },
            // restore: {},
            saveAsImage: {},
          },
        },
        // 折线颜色
        color: ["#FF8888", "#33FFFF", "#FF33FF", "red", "#0000FF", "ABABAB"],
        legend: {
          data: [
            "油井开井",
            "水井开井",
            "日产液",
            "日产油",
            "日实注量",
            "日配注量",
          ],
          textStyle: {
            color: "#333333",
            fontSize: 12,
          },
        },
        xAxis: {
          // type:'time',
          boundaryGap: false,
          data: this.collectDate,
          // 文字大小与颜色
          axisLabel: {
            show: this.collectXAxisIsShow,
            textStyle: {
              color: "#333333", //更改坐标轴文字颜色
              fontSize: 12, //更改坐标轴文字大小
            },
          },
          // 轴线颜色
          axisLine: {
            lineStyle: { color: "#333333" },
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
                color: "#333333", //更改坐标轴文字颜色
                fontSize: 12, //更改坐标轴文字大小
              },
            },
            splitNumber: 3,
            // 轴线颜色
            axisLine: {
              lineStyle: { color: "#333333" },
            },
            // 网格线
            splitLine: { show: false },
          },
          // 开井情况
          {
            name: "吨(m)",
            type: "value",
            // 文字大小与颜色
            axisLabel: {
              textStyle: {
                color: "#333333", //更改坐标轴文字颜色
                fontSize: 12, //更改坐标轴文字大小
              },
            },
            splitNumber: 3,
            // 轴线颜色
            axisLine: {
              lineStyle: { color: "#333333" },
            },
            // 网格线
            splitLine: { show: false },
          },
        ],
        grid: {
          width: "90%",
          height: "68%",
          left: "5%",
          top: "20%",
        },
        series: [
          {
            name: "油井开井",
            type: "line",
            data: this.collectOil,
            yAxisIndex: 0,
          },
          {
            name: "水井开井",
            type: "line",
            data: this.collectWater,
            yAxisIndex: 0,
          },
          {
            name: "日产液",
            type: "line",
            data: this.collectDailyLiquid,
            yAxisIndex: 1,
          },
          {
            name: "日产油",
            type: "line",
            data: this.collectDailyOil,
            yAxisIndex: 1,
          },
          {
            name: "日实注量",
            type: "line",
            data: this.collectDailyWater,
            yAxisIndex: 1,
          },
          {
            name: "日配注量",
            type: "line",
            data: this.collectDailyWaterAllocation,
            yAxisIndex: 1,
          },
        ],
      });
      console.log(myChart);
    },
    // 排采曲线数据
    colletcData(val) {
      this.collectDate = [];
      this.collectOil = [];
      this.collectWater = [];
      this.collectDailyLiquid = [];
      this.collectDailyOil = [];
      this.collectDailyWater = [];
      this.collectDailyWaterAllocation = [];
      for (var i = 0; i < val.length; i++) {
        this.collectDate[i] = val[i].prodDate;
        this.collectOil[i] = val[i].oilWellOpen;
        this.collectWater[i] = val[i].waterWellOpen;
        this.collectDailyLiquid[i] = val[i].liquidProd;
        this.collectDailyOil[i] = val[i].oilProd;
        this.collectDailyWater[i] = val[i].waterInjection;
        this.collectDailyWaterAllocation[i] = val[i].waterAllocation;
      }
    },
    // 油井情况初始化
    wellInit() {
      this.getRequest(
        "/homePage/wellSituation/selectWell?date=" + this.wellDate
      ).then((resp) => {
        if (resp) {
          this.wellTotal = resp.data.wellTotal;
          this.wellOpen = resp.data.wellOpen;
          this.dilyLiquid = resp.data.drLiquidProd;
          this.monthLiquid = resp.data.drLiquidProdMonth;
          this.yearLiquid = resp.data.drLiquidProdYear;
          this.dailyOil = resp.data.drOilProd;
          this.monthOil = resp.data.drOilProdMonth;
          this.yearOil = resp.data.drOilProdYear;
          this.drWaterContent = resp.data.drWaterContent;
          // 油井情况1
          let dom1 = document.getElementById("well1");
          let myChart1 = echarts.init(dom1);
          myChart1.setOption({
            tooltip: {
              show: false,
              formatter: "{a} <br/>{b} : {c} ({d}%)",
            },
            // 图形颜色
            color: ["#2670f7", "#acabab"],
            series: [
              {
                type: "pie",
                radius: ["40%", "55%"],
                data: [
                  {
                    value: resp.data.timeProgress,
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
                  { value: 100 - resp.data.timeProgress },
                ],
                itemStyle: {
                  normal: {
                    labelLine: {
                      show: false,
                    },
                  },
                },
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
            color: ["#57c5d9", "#acabab"],
            series: [
              {
                type: "pie",
                radius: ["40%", "55%"],
                data: [
                  {
                    value: resp.data.prodProgress,
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
                  { value: 100 - resp.data.prodProgress },
                ],
                itemStyle: {
                  normal: {
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
            ],
          });
        }
      });
    },
    // 油水井异常情况
    wellAbnormalInit() {
      this.getRequest("/homePage/WellAbnormal/selectWellAbnormal").then(
        (resp) => {
          if (resp) {
            let dom = document.getElementById("wellAbnormal");
            let myChart = echarts.init(dom);
            myChart.setOption({
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "shadow",
                },
              },
              grid: {
                width: "90%",
                height: "91%",
                left: "2%",
                top: "5%",
                containLabel: true,
              },
              xAxis: {
                type: "value",
                // 文字大小与颜色
                axisLabel: {
                  textStyle: {
                    color: "#333333", //更改坐标轴文字颜色
                    fontSize: 13, //更改坐标轴文字大小
                  },
                },
                // 轴线颜色
                axisLine: {
                  lineStyle: { color: "#333333" },
                },
                // 网格线
                splitLine: { show: false },
              },
              yAxis: {
                type: "category",
                data: [
                  "动液面异常",
                  "液量异常",
                  "含水异常",
                  "工况异常",
                  "正常井",
                ],
                // 文字大小与颜色
                axisLabel: {
                  textStyle: {
                    color: "#333333", //更改坐标轴文字颜色
                    fontSize: 12, //更改坐标轴文字大小
                  },
                },
                // 轴线颜色
                axisLine: {
                  lineStyle: { color: "#333333" },
                },
                // 网格线
                splitLine: { show: false },
              },
              dataset: {
                source: [
                  ["score", "number", "wellName"],
                  [1, resp.data.wellNormal, "正常井"],
                  [31, resp.data.wellLiquid, "液量异常"],
                  [57, resp.data.waterCut, "含水异常"],
                  [77, resp.data.wellDiagnosis, "工况异常"],
                  [99, resp.data.fluidLevel, "动液面异常"],
                ],
              },
              visualMap: {
                orient: "horizontal",
                show: false,
                left: "center",
                min: 10,
                max: 100,
                dimension: 0,
                inRange: {
                  color: [
                    "#0fc75c",
                    "#ed6741",
                    "#fbe268",
                    "#57c5d9",
                    "#cabbe9",
                  ],
                },
              },
              series: [
                {
                  type: "bar",
                  encode: {
                    x: "number",
                    y: "wellName",
                  },
                  barWidth: 25,
                  itemStyle: {
                    //上方显示数值
                    normal: {
                      label: {
                        show: true, //开启显示
                        position: "top", //在右方显示
                        textStyle: {
                          //数值样式
                          color: "#333333",
                          fontSize: 12,
                        },
                      },
                    },
                  },
                },
              ],
            });
          }
        }
      );
    },
    // 水井情况
    waterWllInit() {
      this.getRequest("/homePage/waterSituation/selectWater").then((resp) => {
        if (resp) {
          this.waterTotal = resp.data.wellTotal;
          this.waterOpen = resp.data.wellOpen;
          this.dilyWater = resp.data.drWaterInjection;
          this.drInjectionAllocation = resp.data.drInjectionAllocation;
          this.monthWater = resp.data.drWaterInjectionMonth;
          this.yearWater = resp.data.drWaterInjectionYear;
          this.waterNormal = resp.data.normalNum;
          this.waterUnder = resp.data.underNum;
          this.waterOver = resp.data.overNum;
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
                color: "#333333",
                fontFamily: "Microsoft Yahei",
              },
            },
            // 图形颜色
            color: ["#0fc75c", "#acabab"],
            series: [
              {
                type: "pie",
                radius: ["40%", "55%"],
                data: [
                  {
                    value: resp.data.wellOpen,
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
                  { value: resp.data.wellTotal - resp.data.wellOpen },
                ],
                itemStyle: {
                  normal: {
                    labelLine: {
                      show: false,
                    },
                  },
                },
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
                color: "#333333",
                fontSize: 10,
              },
              itemWidth: 12,
            },
            // 颜色
            color: ["#2670f7", "#57c5d9", "#ed6741"],
            series: [
              {
                name: "所占比例",
                type: "pie",
                radius: ["40%", "65%"],
                data: [
                  { value: resp.data.normalNum, name: "正常" },
                  { value: resp.data.overNum, name: "超注" },
                  { value: resp.data.underNum, name: "欠注" },
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
        }
      });
    },
    // 措施情况
    measureInit() {
      this.getRequest("/homePage/measureCondition/selectMeasureCondition").then(
        (resp) => {
          if (resp) {
            this.measureData(resp.data);
            let dom = document.getElementById("measure");
            let myChart = echarts.init(dom);
            myChart.setOption({
              tooltip: { trigger: "axis" },
              grid: {
                width: "94%",
                height: "70%",
                left: "5%",
                top: "8%",
              },
              color: ["#57c5d9", "#0fc75c", "#ed6741"],
              legend: {
                data: ["措施井", "措施完成井", "措施中井"],
                textStyle: {
                  color: "#333333",
                  fontSize: 12,
                },
              },
              xAxis: {
                data: this.measureStationName,
                splitLine: { show: false },
                // 文字大小与颜色
                axisLabel: {
                  show: true,
                  interval: 0, //这个一定要有，别忘记了
                  rotate: 55,
                  textStyle: {
                    color: "#333333", //更改坐标轴文字颜色
                    fontSize: 9, //更改坐标轴文字大小
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
                    color: "#333333", //更改坐标轴文字颜色
                    fontSize: 12, //更改坐标轴文字大小
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
                  data: this.measureOperation,
                },
                {
                  name: "措施完成井",
                  type: "bar",
                  stack: "使用情况",
                  barWidth: 20,
                  data: this.measureOperationFinish,
                },
                {
                  name: "措施中井",
                  type: "bar",
                  stack: "使用情况",
                  barWidth: 20,
                  data: this.measureOperationNotFinish,
                },
              ],
            });
          }
        }
      );
    },
    // 处理措施数据
    measureData(val) {
      for (var i = 0; i < val.length; i++) {
        this.measureStationName[i] = val[i].oilStationName;
        this.measureOperation[i] = val[i].wellOperation;
        this.measureOperationFinish[i] = val[i].operationFinish;
        this.measureOperationNotFinish[i] = val[i].operationNotFinish;
      }
    },
    //日期初始化
    getdate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();

      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      //计算一年前日期
      var lastYearDate = new Date();
      lastYearDate.setTime(date.getTime() - 1000 * 60 * 60 * 24 * 365);
      var lastYear = lastYearDate.getFullYear();
      var lastYearMonth = lastYearDate.getMonth() + 1;
      var lastYearCurDate = lastYearDate.getDate();

      if (lastYearMonth >= 1 && lastYearMonth <= 9) {
        lastYearMonth = "0" + lastYearMonth;
      }
      if (lastYearCurDate >= 0 && lastYearCurDate <= 9) {
        lastYearCurDate = "0" + lastYearCurDate;
      }
      var lastYeatCurrrentDate =
        lastYear + "-" + lastYearMonth + "-" + lastYearCurDate;
      var currentdate = year + "-" + month + "-" + strDate;
      this.sysDate = currentdate;
      this.wellDate = currentdate;
      //排采曲线时间段选择初始化
      this.collectDatePicker[0] = lastYeatCurrrentDate;
      this.collectDatePicker[1] = currentdate;
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
