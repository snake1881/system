<template>
  <div class="singleWell">
    <div class="unattended_singleWell_top">
      <div class="unattended_singleWell_top_information">
        <span class="unattended_singleWell_top_information_span">基础数据</span>
        <div class="unattended_singleWell_top_information_container">
          <div class="unattended_singleWell_top_information_container_dec">
            <p>井号：{{ this.$route.query.name }}</p>
            <p>采油站：{{ this.basicData.oilStationName }}</p>
            <p>所属井场：{{ this.basicData.wellSiteName }}井场</p>
            <p>投产日期：{{ this.basicData.productionDate }}</p>
            <p>泵径：0 m</p>
            <p>泵深：0 m</p>
          </div>
          <div class="unattended_singleWell_top_information_container_video">
            <img
              src="../../assets/images/video.jpg"
              style="width: 100%; height: 100%"
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
          <span class="unattended_singleWell_container_proDaily_title"
            >当月数据</span
          >
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
        >
          <el-table-column prop="number" label="序号" width="50" />
          <el-table-column prop="initiateDate" label="措施日期" width="100" />
          <el-table-column
            prop="diagnosisResult"
            label="诊断结果"
            width="100"
          />
          <el-table-column prop="measureContent" label="措施内容" width="180" />
          <el-table-column prop="teamName" label="措施队伍" width="120" />
          <el-table-column
            prop="evaluationResult"
            label="措施结果"
            width="100"
          />
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
            v-model="zhDate1"
            type="date"
            placeholder="选择日期"
            size="mini"
            style="width: 120px; margin-right: 10px"
          />
          至
          <el-date-picker
            v-model="zhDate2"
            type="date"
            placeholder="选择日期"
            size="mini"
            style="width: 120px; margin-left: 10px"
          />
          <div id="gt" />
        </div>
        <div class="unattended_singleWell_container_left_zh">
          <span class="unattended_singleWell_top_information_span"
            >载荷曲线</span
          >
          <el-date-picker
            v-model="gtDate1"
            type="date"
            placeholder="选择日期"
            size="mini"
            style="width: 120px; margin-right: 10px"
          />
          至
          <el-date-picker
            v-model="gtDate2"
            type="date"
            placeholder="选择日期"
            size="mini"
            style="width: 120px; margin-left: 10px"
          />
          <div style="width: 100%; height: 100%">
            <div id="zh" class="zhLine" />
          </div>
        </div>
      </div>
      <div class="unattended_singleWell_container_right">
        <span class="unattended_singleWell_top_information_span">生产曲线</span>
        <el-date-picker
          v-model="proDate1"
          type="date"
          placeholder="选择日期"
          size="mini"
          style="width: 120px; margin-right: 10px"
        />
        至
        <el-date-picker
          v-model="proDate2"
          type="date"
          placeholder="选择日期"
          size="mini"
          style="width: 120px; margin-left: 10px"
        />
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
      basicData: {},
      // 油井
      oilWell: [],
      // 功图
      gtDate1: "",
      gtDate2: "",
      // 载荷
      zhDate1: "",
      zhDate2: "",
      // 生产
      proDate1: "",
      proDate2: "",
      // 措施作业
      measureData: [],
    };
  },
  mounted() {
    this.singleWellInit();
    //功图曲线
    this.gtLineInit();
    // 生产曲线
    this.proLineInit();
    //载荷曲线
    this.zhLineInit();
    console.log(this.$route);
  },
  methods: {
    // 单井信息汇总
    singleWellInit() {
      this.getRequest(
        "/wells/well/listPage?sTime=2020-11-18&sTime1=2020-11-23&wellName=" +
          this.$route.query.name
      ).then((resp) => {
        if (resp) {
          this.basicData = resp.data.wellInfo;
          this.measureData = resp.data.wellInfoMeasures;
        }
      });
    },
    // 功图曲线
    gtLineInit() {
      let dom = document.getElementById("gt");
      let myChart = echarts.init(dom);
      myChart.setOption({});
    },
    // 生产曲线
    proLineInit() {
      // 产液产油曲线
      let dom1 = document.getElementById("proLiquidLine");
      let myChart1 = echarts.init(dom1);
      myChart1.setOption({
        title: {
          text: "产油产液曲线",
          textStyle: {
            fontSize: 10,
            color: "#666",
            fontWeight: 400,
          },
          top: "center",
          left: -5,
        },
        legend: {
          data: ["产油", "产液"],
          textStyle: {
            fontSize: 9,
            color: "#666",
          },
        },
        color: ["#2485e0", "#ec8e25"],
        grid: {
          width: "80%",
          height: "45%",
          top: 30,
          left: 95,
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          data: [
            "2020-10-02",
            "2020-10-04",
            "2020-10-06",
            "2020-10-08",
            "2020-10-10",
            "2020-10-12",
            "2020-10-14",
          ],
          axisLine: {
            //y轴
            show: false,
          },
          axisTick: {
            //y轴刻度线
            show: false,
          },
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: "#666", //更改坐标轴文字颜色
              fontSize: 10, //更改坐标轴文字大小
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            //y轴
            show: false,
          },
          axisTick: {
            //y轴刻度线
            show: false,
          },
          max: 200,
          min: 0,
          splitNumber: 3,
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: "#666", //更改坐标轴文字颜色
              fontSize: 10, //更改坐标轴文字大小
            },
          },
        },
        series: [
          {
            name: "产液",
            type: "line",
            data: [120, 102, 180, 134, 90, 130, 55],
          },
          {
            name: "产油",
            type: "line",
            data: [90, 182, 151, 64, 160, 178, 120],
          },
        ],
      });

      // 含水曲线
      let dom2 = document.getElementById("proWaterLine");
      let myChart2 = echarts.init(dom2);
      myChart2.setOption({
        title: {
          text: "含水曲线",
          textStyle: {
            fontSize: 10,
            color: "#666",
            fontWeight: 400,
          },
          top: 25,
          left: 5,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["含水"],
          textStyle: {
            fontSize: 9,
            color: "#666",
          },
        },
        color: ["#2485e0"],
        grid: {
          width: "80%",
          height: "45%",
          top: 30,
          left: 95,
        },
        xAxis: {
          data: [
            "2020-10-02",
            "2020-10-04",
            "2020-10-06",
            "2020-10-08",
            "2020-10-10",
            "2020-10-12",
            "2020-10-14",
          ],
          axisLine: {
            //y轴
            show: false,
          },
          axisTick: {
            //y轴刻度线
            show: false,
          },
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: "#666", //更改坐标轴文字颜色
              fontSize: 10, //更改坐标轴文字大小
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            //y轴
            show: false,
          },
          axisTick: {
            //y轴刻度线
            show: false,
          },
          max: 200,
          min: 0,
          splitNumber: 3,
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: "#666", //更改坐标轴文字颜色
              fontSize: 10, //更改坐标轴文字大小
            },
          },
        },
        series: [
          {
            name: "含水",
            type: "line",
            data: [120, 132, 101, 134, 190, 130, 110],
          },
        ],
      });

      // 动液面曲线
      let dom3 = document.getElementById("proFluidLine");
      let myChart3 = echarts.init(dom3);
      myChart3.setOption({
        title: {
          text: "动液面曲线",
          textStyle: {
            fontSize: 10,
            color: "#666",
            fontWeight: 400,
          },
          top: 35,
          left: -5,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["动液面"],
          textStyle: {
            fontSize: 9,
            color: "#666",
          },
        },
        color: ["#ec8e25"],
        grid: {
          width: "80%",
          height: "45%",
          top: 30,
          left: 95,
        },
        xAxis: {
          data: [
            "2020-10-02",
            "2020-10-04",
            "2020-10-06",
            "2020-10-08",
            "2020-10-10",
            "2020-10-12",
            "2020-10-14",
          ],
          axisLine: {
            //y轴
            show: false,
          },
          axisTick: {
            //y轴刻度线
            show: false,
          },
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: "#666", //更改坐标轴文字颜色
              fontSize: 10, //更改坐标轴文字大小
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            //y轴
            show: false,
          },
          axisTick: {
            //y轴刻度线
            show: false,
          },
          max: 100,
          min: 0,
          splitNumber: 3,
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: "#666", //更改坐标轴文字颜色
              fontSize: 10, //更改坐标轴文字大小
            },
            formatter: "{value} %",
          },
        },
        series: [
          {
            name: "动液面",
            type: "line",
            data: [20, 64, 86, 34, 91, 46, 58],
          },
        ],
      });
    },
    // 载荷曲线
    zhLineInit() {
      let dom = document.getElementById("zh");
      let myChart = echarts.init(dom);
      myChart.setOption({
        legend: {
          data: ["最大载荷", "最小载荷"],
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          width: "85%",
          height: "55%",
          top: 30,
          left: 70,
        },
        color: ["#2485e0", "#ec8e25"],
        xAxis: {
          data: [
            "2020-10-02",
            "2020-10-04",
            "2020-10-06",
            "2020-10-08",
            "2020-10-10",
            "2020-10-12",
            "2020-10-14",
          ],
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: "#666", //更改坐标轴文字颜色
              fontSize: 10, //更改坐标轴文字大小
            },
          },
        },
        yAxis: {
          type: "value",
          // 文字大小与颜色
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
            data: [170, 190, 179, 185, 182, 179, 186],
          },
          {
            name: "最小载荷",
            type: "line",
            data: [90, 102, 101, 94, 105, 90, 103],
          },
        ],
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/unattended/singleWell.css";
</style>
