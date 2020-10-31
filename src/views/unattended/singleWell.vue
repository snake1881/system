<template>
<div class="singleWell">
  <div class="unattended_singleWell_top">
    <div class="unattended_singleWell_top_information">
      <span class="unattended_singleWell_top_information_span">视频信息</span>
      <el-button type="text" @click="gotoWellsite()" class="el-icon-back">返回</el-button>
      <div class="unattended_singleWell_top_information_container">
        <div class="unattended_singleWell_top_information_container_video">
          <img src="../../assets/images/video.jpg" style="width:100%;height:100%" />
        </div>
        <div class="unattended_singleWell_top_information_container_dec">
          <p>井号：****</p>
          <p>所属井场：****</p>
          <p>采油站：****</p>
          <p>投产日期：****</p>
          <p>泵径：****</p>
          <p>泵深：****</p>
        </div>
      </div>
    </div>
    <div class="unattended_singleWell_top_data">
      <span class="unattended_singleWell_top_information_span">措施作业</span>
      <div class="unattended_singleWell_top_data_measure">
        <p>序号: 0000</p>
        <p>日期: 2020-10-02</p>
        <p>诊断结果: ****</p>
        <p>措施内容: 修井</p>
        <p>施工队伍: 队伍1</p>
        <p>措施效果: 修改完成，可正常生产</p>
      </div>
    </div>
    <div class="unattended_singleWell_top_line">
      <span class="unattended_singleWell_top_information_span">功图曲线</span>
      <el-date-picker v-model="gtDate1" type="date" placeholder="选择日期" size="mini" style="width:120px;margin-right:10px" />
      至
      <el-date-picker v-model="gtDate2" type="date" placeholder="选择日期" size="mini" style="width:120px;margin-left:10px" />
      <div id="gt" />
    </div>
  </div>
  <div class="unattended_singleWell_container">
    <div class="unattended_singleWell_top_information">
      <span class="unattended_singleWell_top_information_span">载荷曲线</span>
      <el-date-picker v-model="zhDate1" type="date" placeholder="选择日期" size="mini" style="width:120px;margin-right:10px" />
      至
      <el-date-picker v-model="zhDate2" type="date" placeholder="选择日期" size="mini" style="width:120px;margin-left:10px" />
      <div style="width:100%;height:100%">
        <div id="zh" class="zhLine" />
      </div>

    </div>
    <div class="unattended_singleWell_top_data">
      <span class="unattended_singleWell_top_information_span">生产数据</span>
      <div class="unattended_singleWell_container_proDaily">
        <span class="unattended_singleWell_container_proDaily_title">当日数据</span>
        <div class="unattended_singleWell_container_proDaily_dec">
          <el-row>
            <el-col :span="12">
              <p>产液：****</p>
            </el-col>
            <el-col :span="12">
              <p>含水：****</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>产油：****</p>
            </el-col>
            <el-col :span="12">
              <p>油压：****</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>套压：****</p>
            </el-col>
            <el-col :span="12">
              <p>泵效：****</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>动液面：****</p>
            </el-col>
            <el-col :span="12">
              <p>生产时间：****</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>单井状态：****</p>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="unattended_singleWell_container_proMonth">
        <span class="unattended_singleWell_container_proMonth_title">当月数据</span>
        <div class="unattended_singleWell_container_proMonth_dec">
          <p>累计产液: ****</p>
          <p>累计产油: ****</p>
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
      proDate2: ""
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
            top: 25
          },
          grid:{
            width:'80%',
            height:'50%',
            top:25,
            left:90
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
            top: 40
          },
          grid:{
            width:'80%',
            height:'50%',
            top:25,
            left:90
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
            top: 40
          },
          grid:{
            width:'80%',
            height:'50%',
            top:25,
            left:90
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
            splitNumber: 5,
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
              data: [170, 180, 179, 185, 182, 179, 186]
            },
            {
              name: '最小载荷',
              type: 'line',
              data: [60, 72, 71, 74, 65, 70, 73]
            }
          ]
        });
    },
    // 返回井场页面
    gotoWellsite() {
      this.$router.replace("/unattended/wellsite");
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/unattended/singleWell.css";
</style>

