<template>
<div class="singleWell">
  <div class="unattended_singleWell_top">
    <div class="unattended_singleWell_top_information">
      <span class="unattended_singleWell_top_information_span">基础数据</span>
      <div class="unattended_singleWell_top_information_container">
        <div class="unattended_singleWell_top_information_container_dec">
          <p>井号：A-1005</p>
          <p>采油站：XXX采油站</p>
          <p>所属井场：XXX井场</p>
          <p>投产日期：2020-05-15</p>
          <p>泵径：1 m</p>
          <p>泵深：20 m</p>
        </div>
        <div class="unattended_singleWell_top_information_container_video">
          <img src="../../assets/images/video.jpg" style="width:100%;height:100%" />
        </div>
      </div>
    </div>
    <div class="unattended_singleWell_top_data">
      <span class="unattended_singleWell_top_information_span">生产数据</span>
      <div class="unattended_singleWell_container_proDaily">
        <span class="unattended_singleWell_container_proDaily_title">当日数据</span>
        <div class="unattended_singleWell_container_proDaily_dec">
          <el-row>
            <el-col :span="8">
              <p>产液：****</p>
            </el-col>
            <el-col :span="8">
              <p>含水：****</p>
            </el-col>
            <el-col :span="8">
              <p>产油：****</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <p>油压：****</p>
            </el-col>
            <el-col :span="8">
              <p>套压：****</p>
            </el-col>
            <el-col :span="8">
              <p>泵效：****</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <p>动液面：****</p>
            </el-col>
            <el-col :span="8">
              <p>生产时间：****</p>
            </el-col>
            <el-col :span="8">
              <p>单井状态：****</p>
            </el-col>
          </el-row>

        </div>
      </div>
      <div class="unattended_singleWell_container_proMonth">
        <span class="unattended_singleWell_container_proDaily_title">当月数据</span>
        <div class="unattended_singleWell_container_proDaily_dec">
          <el-row>
            <el-col :span="8">
              <p>累计产液: ****</p>
            </el-col>
            <el-col :span="8">
              <p>累计产油: ****</p>
            </el-col>
          </el-row>
        </div>

      </div>
    </div>
    <div class="unattended_singleWell_top_line">
      <span class="unattended_singleWell_top_information_span">生产曲线</span>
      <el-date-picker v-model="proDate1" type="date" placeholder="选择日期" size="mini" style="width:120px;margin-right:10px" />
      至
      <el-date-picker v-model="proDate2" type="date" placeholder="选择日期" size="mini" style="width:120px;margin-left:10px" />
      <div class="unattended_singleWell_container_proLine">
        <div id="proLiquidLine" class="proLine" />
        <div id="proWaterLine" class="proLine" />
        <div id="proFluidLine" class="proLine" />
      </div>

    </div>
  </div>
  <div class="unattended_singleWell_container">
    <div class="unattended_singleWell_container_left">
      <div class="unattended_singleWell_container_left_zh">
        <span class="unattended_singleWell_top_information_span">载荷曲线</span>
        <el-date-picker v-model="zhDate1" type="date" placeholder="选择日期" size="mini" style="width:120px;margin-right:10px" />
        至
        <el-date-picker v-model="zhDate2" type="date" placeholder="选择日期" size="mini" style="width:120px;margin-left:10px" />
        <div style="width:100%;height:100%">
          <div id="zh" class="zhLine" />
        </div>
      </div>
      <div class="unattended_singleWell_container_left_gt">
        <span class="unattended_singleWell_top_information_span">功图曲线</span>
        <el-date-picker v-model="gtDate1" type="date" placeholder="选择日期" size="mini" style="width:120px;margin-right:10px" />
        至
        <el-date-picker v-model="gtDate2" type="date" placeholder="选择日期" size="mini" style="width:120px;margin-left:10px" />
        <div id="gt" />
      </div>
    </div>
    <div class="unattended_singleWell_top_line">
      <span class="unattended_singleWell_top_information_span">措施作业</span>
      <el-table :data="measureData" style="width: 96%;height:90%;margin:2% 2%" border>
      <el-table-column  prop="number" label="序号"  width="50" />
      <el-table-column  prop="date" label="措施日期"  width="100" />
      <el-table-column  prop="result" label="诊断结果"  width="100" />
      <el-table-column  prop="container" label="措施内容"  width="140" />
      <el-table-column  prop="team" label="措施队伍"  width="100" />
      <el-table-column  prop="measureData" label="措施结果"  width="90" />
     
    </el-table>
    </div>
  </div>
</div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
export default {
  data() {
    return {
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
      measureData:[
        {
          number: 1,
          date:'2020-05-13',
          result:'供液不足',
          container:'措施内容措施内容',
          team:'第一施工队',
          measureData:'好'
        },
        {
          number: 1,
          date:'2020-05-13',
          result:'供液不足',
          container:'措施内容措施内容',
          team:'第一施工队',
          measureData:'好'
        },
        {
          number: 1,
          date:'2020-05-13',
          result:'供液不足',
          container:'措施内容措施内容',
          team:'第一施工队',
          measureData:'好'
        }
      ]
    }
  },
  mounted() {
    //功图曲线
    this.gtLineInit();
    // 生产曲线
    this.proLineInit();
    //载荷曲线
    this.zhLineInit();
  },
  methods: {
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
        legend: {
          data: ['产油', '产液'],
          orient: 'vertical',
          textStyle: {
            fontSize: 10,
            color: '#666'
          },
          left: 0,
          top: 20
        },
        grid: {
          width: '80%',
          height: '45%',
          top: 20,
          left: 90
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: ['2020-10-02', '2020-10-04', '2020-10-06', '2020-10-08', '2020-10-10', '2020-10-12', '2020-10-14'],
          "axisLine": { //y轴
            "show": false
          },
          "axisTick": { //y轴刻度线
            "show": false
          },
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: '#666', //更改坐标轴文字颜色
              fontSize: 10 //更改坐标轴文字大小
            }
          },

        },
        yAxis: {
          type: 'value',
          "axisLine": { //y轴
            "show": false
          },
          "axisTick": { //y轴刻度线
            "show": false
          },
          max: 200,
          min: 0,
          splitNumber: 4,
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: '#666', //更改坐标轴文字颜色
              fontSize: 10 //更改坐标轴文字大小
            }
          },
        },
        series: [{
            name: '产液',
            type: 'line',
            data: [120, 132, 101, 134, 190, 130, 110]
          },
          {
            name: '产油',
            type: 'line',
            data: [160, 182, 191, 134, 190, 150, 140]
          }
        ]
      });

      // 含水曲线
      let dom2 = document.getElementById("proWaterLine");
      let myChart2 = echarts.init(dom2);
      myChart2.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['含水'],
          orient: 'vertical',
          textStyle: {
            fontSize: 10,
            color: '#666'
          },
          left: 0,
          top: 30
        },
        grid: {
          width: '80%',
          height: '45%',
          top: 20,
          left: 90
        },
        xAxis: {
          data: ['2020-10-02', '2020-10-04', '2020-10-06', '2020-10-08', '2020-10-10', '2020-10-12', '2020-10-14'],
          "axisLine": { //y轴
            "show": false
          },
          "axisTick": { //y轴刻度线
            "show": false
          },
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: '#666', //更改坐标轴文字颜色
              fontSize: 10 //更改坐标轴文字大小
            }
          },

        },
        yAxis: {
          type: 'value',
          "axisLine": { //y轴
            "show": false
          },
          "axisTick": { //y轴刻度线
            "show": false
          },
          max: 200,
          min: 0,
          splitNumber: 4,
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: '#666', //更改坐标轴文字颜色
              fontSize: 10 //更改坐标轴文字大小
            }
          },
        },
        series: [{
          name: '含水',
          type: 'line',
          data: [120, 132, 101, 134, 190, 130, 110]
        }]
      });
      // 动液面曲线
      let dom3 = document.getElementById("proFluidLine");
      let myChart3 = echarts.init(dom3);
      myChart3.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['动液面'],
          orient: 'vertical',
          textStyle: {
            fontSize: 10,
            color: '#666'
          },
          left: -8,
          top: 30
        },
        grid: {
          width: '80%',
          height: '45%',
          top: 20,
          left: 90
        },
        xAxis: {
          data: ['2020-10-02', '2020-10-04', '2020-10-06', '2020-10-08', '2020-10-10', '2020-10-12', '2020-10-14'],
          "axisLine": { //y轴
            "show": false
          },
          "axisTick": { //y轴刻度线
            "show": false
          },
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: '#666', //更改坐标轴文字颜色
              fontSize: 10 //更改坐标轴文字大小
            }
          },
        },
        yAxis: {
          type: 'value',
          "axisLine": { //y轴
            "show": false
          },
          "axisTick": { //y轴刻度线
            "show": false
          },
          max: 100,
          min: 0,
          splitNumber: 4,
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: '#666', //更改坐标轴文字颜色
              fontSize: 10 //更改坐标轴文字大小
            },
            formatter: '{value} %'
          },
        },
        series: [{
          name: '动液面',
          type: 'line',
          data: [20, 82, 91, 34, 90, 30, 78]
        }]
      });
    },
    // 载荷曲线
    zhLineInit() {
      let dom = document.getElementById("zh");
      let myChart = echarts.init(dom);
      myChart.setOption({
        legend: {
          data: ['最大载荷', '最小载荷'],
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: ['2020-10-02', '2020-10-04', '2020-10-06', '2020-10-08', '2020-10-10', '2020-10-12', '2020-10-14'],
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: '#666', //更改坐标轴文字颜色
              fontSize: 10 //更改坐标轴文字大小
            }
          },
        },
        yAxis: {
          type: 'value',
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: '#666', //更改坐标轴文字颜色
              fontSize: 10 //更改坐标轴文字大小
            }
          },
        },
        series: [{
            name: '最大载荷',
            type: 'line',
            data: [170, 190, 179, 185, 182, 179, 186]
          },
          {
            name: '最小载荷',
            type: 'line',
            data: [90, 102, 101, 94, 105, 90, 103]
          }
        ]
      });
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/unattended/singleWell.css";
</style>
