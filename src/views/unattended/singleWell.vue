<template>
  <div class="singleWell">
    <div class="unattended_singleWell_top">
      <div class="unattended_singleWell_top_information">
        <span class="unattended_singleWell_top_information_span">基础数据</span>
        <div class="unattended_singleWell_top_information_container">
          <div class="unattended_singleWell_top_information_container_dec">
            <p>井号： {{ this.$route.query.name }}</p>
            <p>采油站： {{ this.basicData.oilStationName }}</p>
            <p>所属井场：{{ this.basicData.wellSiteName }}井场</p>
            <p>投产日期：{{ this.basicData.productionDate }}</p>
            <p>泵径：0 m</p>
            <p>泵深：0 m</p>
          </div>
          <div class="unattended_singleWell_top_information_container_video">
            <!--视频监控-->
            <iframe
              id="show-iframe"
              :src="this.videoLink"
              frameborder="0"
              allow="autoplay;encrypted-media"
              allowfullscreen
              style="height: 100%; width: 100%; margin-top: 1%"
            />
          </div>
        </div>
      </div>
      <div class="unattended_singleWell_top_data">
        <span class="unattended_singleWell_top_information_span">生产数据</span>
        <div class="unattended_singleWell_container_proDaily">
          <span class="unattended_singleWell_container_proDaily_title"
            >当日数据</span
          >
          <div class="unattended_singleWell_container_proDaily_dec">
            <el-row>
              <el-col :span="8">
                <p>产液：{{ this.basicData.drLiquidProd }}</p>
              </el-col>
              <el-col :span="8">
                <p>含水：{{ this.basicData.drWaterCut }}</p>
              </el-col>
              <el-col :span="8">
                <p>产油：{{ this.basicData.drOilProd }}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <span>油压：{{ this.basicData.drOilPressure }}</span>
              </el-col>
              <el-col :span="8">
                <span>套压：{{ this.basicData.casingPressure }}</span>
              </el-col>
              <el-col :span="8">
                <span>泵效：0</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <p>动液面：{{ this.basicData.fluidLevel }}</p>
              </el-col>
              <el-col :span="8">
                <p>单井状态：{{ this.basicData.drWorkState }}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span>生产时间：{{ this.basicData.oilProdDate }}</span>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="unattended_singleWell_container_proMonth">
          <div class="unattended_singleWell_container_proMonth_search">
            当月数据
            <el-date-picker
              v-model="proMonthDate"
              type="month"
              placeholder="选择日期"
              value-format="yyyy-MM"
              size="mini"
              style="width: 120px; margin: 0 8px"
            />
            <el-button
              size="mini"
              type="primary"
              plain
              @click="searchProMonth()"
              >查询</el-button
            >
          </div>
          <div class="unattended_singleWell_container_proDaily_dec">
            <el-row>
              <el-col :span="12">
                <p>
                  累计产液: {{ this.basicData.drLiquidProdMonth }}m<sup>3</sup>
                </p>
              </el-col>
              <el-col :span="12">
                <p>
                  累计产油: {{ this.basicData.drOilProdMonth }}m<sup>3</sup>
                </p>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="unattended_singleWell_top_line">
        <span class="unattended_singleWell_top_information_span">措施作业</span>
        <el-table
          :data="measureData"
          style="width: 96%; height: 85%; margin: 2% 2%"
          :row-class-name="rowClassName"
        >
          <el-table-column prop="number" label="序号" width="50" />
          <el-table-column
            prop="initiateDate"
            label="措施日期"
            show-overflow-tooltip
          />
          <el-table-column prop="diagnosisResult" label="诊断结果" />
          <el-table-column prop="measureContent" label="措施内容" />
          <el-table-column prop="teamName" label="措施队伍" />
          <el-table-column prop="evaluationResult" label="措施结果">
            <template slot-scope="scope">
              <p v-if="scope.row.evaluationResult == '0'">失败</p>
              <p v-if="scope.row.evaluationResult == '1'">正常</p>
              <p v-if="scope.row.evaluationResult == '2'">较差</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="unattended_singleWell_container">
      <div class="unattended_singleWell_container_left">
        <div class="unattended_singleWell_container_left_gt">
          <span class="unattended_singleWell_top_information_span"
            >功图数据</span
          >
          <el-date-picker
            v-model="gtDate1"
            placeholder="选择日期"
            size="mini"
            value-format="yyyy-MM-dd"
            style="width: 120px; margin-right: 10px"
          />
          至
          <el-date-picker
            v-model="gtDate2"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            size="mini"
            style="width: 120px; margin: 0 10px"
          />
          <el-button size="mini" type="primary" plain @click="gtInit()"
            >查询</el-button
          >
          <!-- <el-button size="mini" type="primary" plain>导出</el-button> -->
          <div class="unattended_singleWell_container_left_gt_container">
            <div
              v-for="item in tableData"
              :key="item.inddsId"
              class="unattended_singleWell_container_left_gt_container_frame"
            >
              <div
                class="unattended_singleWell_container_left_gt_container_frame_item"
                :key="item.inddsId"
                :id="item.inddsId"
              />
              <div
                class="unattended_singleWell_container_left_gt_container_frame_dec"
              >
                <span
                  class="unattended_singleWell_container_left_gt_container_frame_dec_span"
                  >时间: {{ item.acquisitionTime }}</span
                >
                <span
                  class="unattended_singleWell_container_left_gt_container_frame_dec_span"
                  >工况: {{ item.diagnosisResult }}</span
                >

                <span
                  class="unattended_singleWell_container_left_gt_container_frame_dec_span"
                  >最大载荷: {{ item.maxLoad }} 最小载荷:
                  {{ item.minLoad }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="unattended_singleWell_container_left_zh">
          <span class="unattended_singleWell_top_information_span"
            >载荷曲线</span
          >
          <el-date-picker
            v-model="zhDate1"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            size="mini"
            style="width: 120px; margin-right: 10px"
          />
          至
          <el-date-picker
            v-model="zhDate2"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            size="mini"
            style="width: 120px; margin: 0 10px"
          />
          <el-button size="mini" type="primary" plain @click="zhLineInit()"
            >查询</el-button
          >
          <div style="width: 100%; height: 100%">
            <div id="zh" class="zhLine" />
          </div>
        </div>
      </div>
      <div class="unattended_singleWell_container_right">
        <span class="unattended_singleWell_top_information_span">生产曲线</span>
        <el-date-picker
          v-model="proDate1"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          size="mini"
          style="width: 120px; margin-right: 10px"
        />
        至
        <el-date-picker
          v-model="proDate2"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          size="mini"
          style="width: 120px; margin: 0 10px"
        />
        <el-button
          size="mini"
          type="primary"
          plain
          @click="proLineInit(), fluidLevelInit()"
          >查询</el-button
        >
        <div class="unattended_singleWell_container_proLine">
          <div id="proLiquidLine" class="proLine" />
          <div id="proWaterLine" class="proLine" />
          <div id="proFluidLine" class="proLine" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
export default {
  data() {
    return {
      // 基础数据
      basicData: {
        drLiquidProdMonth: "",
        drOilProdMonth: "",
      },
      // 措施作业
      measureData: [],
      // 油井
      oilWell: [],
      // 功图
      gtDate1: "2020-01-01",
      gtDate2: "",
      coordinates: [[]],
      tableData: [],
      // 载荷
      zhDate1: "2020-01-01",
      zhDate2: "",
      // 载荷曲线日期
      zhLineDate: [],
      // 载荷曲线中最小载荷
      zhLineMinLoad: [],
      // 载荷曲线中最大载荷
      zhLineMaxLoad: [],
      // 生产
      proDate1: "2020-01-01",
      proDate2: "",
      //生产曲线日期
      productProdDate: [],
      //生产曲线产油
      productOilProd: [],
      //生产曲线产液
      productLiquidProd: [],
      // 生产曲线含水
      productWaterCut: [],
      // 生产曲线动液面时间
      fluidLevelDate: [],
      // 生产曲线动液面
      productFluidLevel: [],
      //视频信息
      videoLink: "",
      // 生产数据
      proMonthDate: "",
    };
  },
  mounted() {
    // 基础数据
    this.singleWellInit();
    // 措施作业
    this.measureInit();
    //功图曲线
    this.gtInit();
    // 生产曲线
    this.proLineInit();
    // 动液面曲线
    this.fluidLevelInit();
    //载荷曲线
    this.zhLineInit();
    //视频数据
    this.wellSiteVideoInit();
  },
  methods: {
    // 单井基础信息
    singleWellInit() {
      var yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
      var year = yesterday.getFullYear();
      var month =
        yesterday.getMonth() + 1 > 9
          ? yesterday.getMonth() + 1
          : "0" + (yesterday.getMonth() + 1);
      var day =
        yesterday.getDate() > 9
          ? yesterday.getDate()
          : "0" + yesterday.getDate();
      yesterday = year + "-" + month + "-" + day;
      this.getRequest(
        "/wells/well/selectWell?sTime=" +
          yesterday +
          "&wellId=" +
          this.$route.query.id
        // "/wells/well/selectWell?sTime=2021-01-03" +
        //   "&wellId=" +
        //   this.$route.query.id
      ).then((resp) => {
        if (resp) {
          this.basicData = resp.data.wellInfo;
        }
      });
    },
    // 措施作业数据
    measureInit() {
      this.getRequest(
        "/wells/well/setWellInfoMeasures?sTime=2020-08-31&sTime1=2020-12-30&wellId=" +
          this.$route.query.id
      ).then((resp) => {
        if (resp) {
          this.measureData = resp.data.wellInfoMeasures;
        }
      });
    },
    rowClassName({ row, rowIndex }) {
      row.number = rowIndex + 1;
    },
    // 功图请求接口
    gtInit() {
      var aData = new Date();
      this.gtDate2 =
        aData.getFullYear() +
        "-" +
        (aData.getMonth() + 1) +
        "-" +
        aData.getDate();
      this.getRequest(
        "/wells/well/selectWellGt?sTime=" +
          this.gtDate1 +
          "&sTime1=" +
          this.gtDate2 +
          "&wellId=" +
          this.$route.query.id
      ).then((resp) => {
        if (resp) {
          this.tableData = resp.data.wellInfoGtVos;
          this.tableData.forEach((element) => {
            //延迟到DOM更新之后再执行绘制图形
            this.$nextTick(function () {
              //处理数据为坐标
              this.coordinate(element);
              //将处理后的坐标添加到对象中
              this.$set(element, "coordinates", this.coordinates);
              //实例化echarts
              this.gtLine(element);
            });
          });
        }
      });
    },
    //实例化图表
    gtLine(val) {
      // 基于准备好的dom，初始化echarts实例
      let dom = document.getElementById(val.inddsId);
      let myChart = echarts.init(dom);
      // 绘制图表
      myChart.setOption({
        title: {
          x: "center",
          text: val.wellName,
          textStyle: {
            fontSize: 10,
          },
        },
        toolbox: {
          top: -10,
          show: true,
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ["toolbox"],
            },
          },
        },
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
          width: "93%",
          height: "84%",
          top: "12%",
          left: "6%",
          containLabel: true,
        },
        xAxis: {
          min: 0,
          max: 4,
          type: "value",
        },
        yAxis: {
          name: "载荷(KN)",
          nameLocation: "middle",
          type: "value",
          max: 80,
          min: 0,
          splitNumber: 3,
          nameTextStyle: {
            padding: [0, 0, 7, 0],
            fontSize: 10,
          },
        },
        series: [
          {
            symbol: "none",
            data: val.coordinates,
            type: "line",
            smooth: true,
            lineStyle: {
              width: 1.5,
            },
          },
        ],
      });
    },
    // 功图处理坐标
    coordinate(val) {
      //每次处理之前保证坐标数组集合为空
      this.coordinates = [[]];
      var displacementArray = val.displacementSet.split(";");
      var disploadArray = val.loadSet.split(";");
      for (var i = 0; i < displacementArray.length; i++) {
        this.coordinates[i] = [];
        this.coordinates[i][0] = parseFloat(displacementArray[i]);
        this.coordinates[i][1] = parseFloat(disploadArray[i]);
      }
      return this.coordinates;
    },
    // 生产曲线
    proLineInit() {
      this.productProdDate = [];
      var aData = new Date();
      this.proDate2 =
        aData.getFullYear() +
        "-" +
        (aData.getMonth() + 1) +
        "-" +
        aData.getDate();
      this.getRequest(
        "/wells/well/setWellInfoProducts?sTime=" +
          this.proDate1 +
          "&sTime1=" +
          this.proDate2 +
          "&wellId=" +
          this.$route.query.id
      ).then((resp) => {
        if (resp) {
          this.productLineData(resp.data.wellInfoProducts);
          // 产液产油曲线
          let dom1 = document.getElementById("proLiquidLine");
          let myChart1 = echarts.init(dom1);
          myChart1.setOption({
            legend: {
              data: ["产油", "产液"],
              textStyle: {
                fontSize: 9,
                color: "#666",
              },
              x: "right",
            },
            color: ["#FF00FF", "#FF0000"],
            grid: {
              width: "92%",
              height: "63%",
              top: 16,
              left: 40,
            },
            tooltip: {
              trigger: "axis",
            },
            xAxis: {
              data: this.productProdDate,
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                textStyle: {
                  color: "#666",
                  fontSize: 10,
                },
              },
            },
            yAxis: {
              name: "产油产液曲线",
              nameLocation: "middle",
              nameTextStyle: {
                padding: [0, 0, 10, 0],
                fontSize: 12,
                color: "#666",
              },
              type: "value",
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitNumber: 3,
              axisLabel: {
                textStyle: {
                  color: "#666",
                  fontSize: 10,
                },
              },
            },
            series: [
              {
                name: "产液",
                type: "line",
                data: this.productLiquidProd,
              },
              {
                name: "产油",
                type: "line",
                data: this.productOilProd,
              },
            ],
          });
          // 含水曲线
          let dom2 = document.getElementById("proWaterLine");
          let myChart2 = echarts.init(dom2);
          myChart2.setOption({
            tooltip: {
              trigger: "axis",
            },
            legend: {
              data: ["含水"],
              textStyle: {
                fontSize: 9,
                color: "#666",
              },
              x: "right",
            },
            color: ["#00FF00"],
            grid: {
              width: "92%",
              height: "63%",
              top: 20,
              left: 40,
            },
            xAxis: {
              data: this.productProdDate,
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                textStyle: {
                  color: "#666",
                  fontSize: 10,
                },
              },
            },
            yAxis: {
              name: "含水曲线",
              nameLocation: "middle",
              nameTextStyle: {
                padding: [0, 0, 10, 0],
                fontSize: 12,
                color: "#666",
              },
              type: "value",
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitNumber: 4,
              axisLabel: {
                textStyle: {
                  color: "#666",
                  fontSize: 10,
                },
              },
            },
            series: [
              {
                name: "含水",
                type: "line",
                data: this.productWaterCut,
              },
            ],
          });
        }
      });
    },
    //获取生产曲线数据
    productLineData(val) {
      for (var i = 0; i < val.length; i++) {
        this.productProdDate[i] = val[i].oilProdDate;
        this.productOilProd[i] = val[i].drOilProd;
        this.productLiquidProd[i] = val[i].drLiquidProd;
        this.productWaterCut[i] = val[i].drWaterCut;
      }
    },
    // 动液面曲线
    fluidLevelInit() {
      this.fluidLevelDate = [];
      var aData = new Date();
      this.proDate2 =
        aData.getFullYear() +
        "-" +
        (aData.getMonth() + 1) +
        "-" +
        aData.getDate();
      this.getRequest(
        "/wells/well/selectFluids?sTime=" +
          this.proDate1 +
          "&sTime1=" +
          this.proDate2 +
          "&wellId=" +
          this.$route.query.id
      ).then((resp) => {
        if (resp) {
          this.FluidLevelData(resp.data.wellInfoMeasures);
          // 动液面曲线
          let dom3 = document.getElementById("proFluidLine");
          let myChart3 = echarts.init(dom3);
          myChart3.setOption({
            tooltip: {
              trigger: "axis",
            },
            legend: {
              data: ["动液面"],
              textStyle: {
                fontSize: 9,
                color: "#666",
              },
              x: "right",
            },
            color: ["#800080"],
            grid: {
              width: "90%",
              height: "62%",
              top: 23,
              left: 55,
            },
            xAxis: {
              data: this.fluidLevelDate,
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                textStyle: {
                  color: "#666",
                  fontSize: 10,
                },
              },
            },
            yAxis: {
              name: "动液面曲线",
              nameLocation: "middle",
              nameTextStyle: {
                padding: [0, 0, 25, 0],
                fontSize: 12,
                color: "#666",
              },
              type: "value",
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitNumber: 3,
              axisLabel: {
                textStyle: {
                  color: "#666",
                  fontSize: 10,
                },
              },
            },
            series: [
              {
                name: "动液面",
                type: "line",
                data: this.productFluidLevel,
              },
            ],
          });
        }
      });
    },
    // 获取动液面曲线数据
    FluidLevelData(val) {
      for (var i = 0; i < val.length; i++) {
        this.fluidLevelDate[i] = val[i].measureTime;
        this.productFluidLevel[i] = val[i].fluidLevel;
      }
    },
    // 载荷曲线
    zhLineInit() {
      this.zhLineDate = [];
      var aData = new Date();
      this.zhDate2 =
        aData.getFullYear() +
        "-" +
        (aData.getMonth() + 1) +
        "-" +
        aData.getDate();
      this.getRequest(
        "/wells/well/selectZh?sTime=" +
          this.zhDate1 +
          "&sTime1=" +
          this.zhDate2 +
          "&wellId=" +
          this.$route.query.id
      ).then((resp) => {
        if (resp) {
          this.zhLineData(resp.data.wellInfoGtVos);
          let dom = document.getElementById("zh");
          let myChart = echarts.init(dom);
          myChart.setOption({
            legend: {
              data: ["最大载荷", "最小载荷"],
              x: "right",
              fontSize: "7px",
            },
            tooltip: {
              trigger: "axis",
            },
            grid: {
              width: "85%",
              height: "55%",
              top: 20,
              left: 40,
            },
            color: ["#2485e0", "#ec8e25"],
            xAxis: {
              data: this.zhLineDate,
              axisLabel: {
                textStyle: {
                  color: "#666", //更改坐标轴文字颜色
                  fontSize: 9, //更改坐标轴文字大小
                },
              },
            },
            yAxis: {
              type: "value",
              splitNumber: 3,
              axisLabel: {
                textStyle: {
                  color: "#666", //更改坐标轴文字颜色
                  fontSize: 10, //更改坐标轴文字大小
                },
              },
            },
            series: [
              {
                name: "最大载荷",
                type: "line",
                data: this.zhLineMaxLoad,
              },
              {
                name: "最小载荷",
                type: "line",
                data: this.zhLineMinLoad,
              },
            ],
          });
        }
      });
    },
    // 获取载荷曲线数据
    zhLineData(val) {
      for (var i = 0; i < val.length; i++) {
        this.zhLineDate[i] = val[i].acquisitionTime;
        this.zhLineMinLoad[i] = val[i].minLoad;
        this.zhLineMaxLoad[i] = val[i].maxLoad;
      }
    },
    // 视频信息
    wellSiteVideoInit() {
      this.getRequest(
        "/unattended/monitoring/getVideoLink?wellSitName=" +
          this.$route.query.sitName
      ).then((resp) => {
        if (resp) {
          //默认展示第一个视频
          this.videoLink = resp.data[0].videoLink;
        }
      });
    },
    // 生产数据中当月数据查询
    searchProMonth() {
      this.getRequest(
        "/wells/well/monthProduct?wellId=" +
          this.$route.query.id +
          "&month=" +
          this.proMonthDate
      ).then((resp) => {
        if (resp) {
          (this.basicData.drLiquidProdMonth = resp.data.LIQUID),
            (this.basicData.drOilProdMonth = resp.data.OIL);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/unattended/singleWell.css";
</style>

