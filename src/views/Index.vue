<template>
  <div class="main">
    <div class="main_between">
      <el-card class="main_between_1" shadow="hover">
        <div class="main_between_1_item">
          <span style="text-align: left;font-size: 14px">采油站基本信息</span>
          <div class="main_between_1_item_basicInformation">
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column  prop="date" label="采油站" width="100" />
              <el-table-column  prop="name" label="总井数" width="80" />
              <el-table-column  prop="address" label="开井数" width="70" />
              <el-table-column  prop="oil" label="产油量" width="70" />
            </el-table>
          </div>
        </div>
      </el-card>
      <el-card class="main_between_2" shadow="hover">
        <div class="main_between_2_item">
          <!-- <i class="el-icon-pie-chart" />
          <span> 数据统计 </span> -->
          <div id="statistics" class="main_between_2_item_statistics"></div>
        </div>
      </el-card>
    </div>
    <div class="main_middle">
      <el-card class="main_middle_1" shadow="hover">
        <div class="main_middle_1_item">
          <i class="el-icon-map-location" />
          <span> GIS地图 </span>
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
          <!-- <i class="el-icon-truck" />
          <span> 车辆投入 </span> -->
          <div id="car" class="main_middle_2_item_car"/>
        </div>
      </el-card>
    </div>
    <div class="main_between">
      <el-card class="main_between_1" shadow="hover">
        <div class="main_between_1_item">
          <div class="main_between_1_item__announce">
            <!-- <i class="el-icon-chat-line-square" /> -->
            <span> 企业要闻 </span>
            <el-button type="text" class="el-icon-plus main_between_1_item__announce_button">更多</el-button>
          </div>
         <!-- 消息详情 -->
          <div class="main_between_1_item_notice">
            <span class="main_between_1_item_notice_span">.公司党委会集体学习习近平总书记在科学家座谈会上的重要讲话精神</span>
            <span class="main_between_1_item_notice_span">.油田迈进智能化安全管理新时代</span>
            <span class="main_between_1_item_notice_span">.公司党委召开理论学习中心组学习扩大会议</span>
            <span class="main_between_1_item_notice_span">.公司召开审计工作推进会议</span>
            <span class="main_between_1_item_notice_span">.公司六大举措推进工程项目建设</span>
            <span class="main_between_1_item_notice_span">.高振东督导南泥湾采油厂以案促改专题民主生活会</span>
            <span class="main_between_1_item_notice_span">.油田公司党委召开理论学习中心组学习扩大会议</span>
          </div>
        </div>
      </el-card>
      <el-card class="main_between_2" shadow="hover">
        <div class="main_between_2_item">
          <i class="el-icon-document" />
          <span> 生产进度 </span>
          <div class="main_between_2_progress">
            <span class="main_between_2_progress_span">东仁沟水井治理下达150项，已完成52项</span>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="35" style="margin-top:10px"/>
            <span class="main_between_2_progress_span">东关采油站硬件设备维护下达80项，已完成56项</span>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="70" status="success" style="margin-top:10px"/>
            <span class="main_between_2_progress_span">王圈油井治理下达240项，已完成112项</span>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="47" status="warning" style="margin-top:10px"/>
            <span class="main_between_2_progress_span">初步地质勘探下达580项，已完成487项</span>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="84" status="exception" style="margin-top:10px"/>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
 let echarts = require('echarts/lib/echarts')
import { AMapManager } from "vue-amap";
let amapManager = new AMapManager()
export default {
  data() {
    return {
      // 地图数据
      amapManager,
      zoom: 12,
      center: [107.596401, 37.574277],
      events: {
        init: () => {},
        'moveend': () => {},
        'zoomchange': () => {},
        'click': () => {}
      },
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init() {}
        }
      }],
      // 表格数据
      tableData: [{
          date: '1766采油站',
          name: '1564',
          address: '987',
          oil: 564
        }, {
          date: '东关采油站',
          name: '4526',
          address: '573',
          oil: 759
        }, {
          date: '一号采油站',
          name: '3421',
          address: '864',
          oil: 948
        }, {
          date: '庙沟采油站',
          name: '87089',
          address: '2452',
          oil: 853
        }
      ]
      }
  },
  mounted(){
    // 车辆投入
    this.carInit();
    // 数据统计
    this.statisticsInit();
   
  },
  methods:{
    // 车辆投入
    carInit(){
      let dom = document.getElementById("car");
      let myChart = echarts.init(dom);
      myChart.setOption({
        title : {
          text: '车辆投入',
          x:'left',
        },
       legend: {},
       tooltip: {},
       grid: {},
       dataset: {
          source: [
            ['carType', '货车', '汽车', '卡车'],
            ['外检测工程部', 43.3, 85.8, 93.7],
            ['运维部', 83.1, 73.4, 55.1],
            ['内检测工程部', 86.4, 65.2, 82.5],
            ['无损检测部', 72.4, 53.9, 39.1],
            ['综合检测部', 22.6, 80.2, 50.7],
          ]
       },
       xAxis: {type: 'category'},
       yAxis: {},
       series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'}
        ]
      });
    },
    // 数据统计
    statisticsInit(){
      let dom = document.getElementById("statistics");
      let myChart = echarts.init(dom);
      myChart.setOption({
        title: {
          text: '数据统计',
          left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['临时用工', '技术分包', '派遣人员', '合同化员工', '市场化员工']
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 335, name: '临时用工'},
                {value: 310, name: '技术分包'},
                {value: 234, name: '派遣人员'},
                {value: 135, name: '合同化员工'},
                {value: 548, name: '市场化员工'}
            ]
          }
        ]
      });
    },
  }
};
</script>

<style lang="less" scoped>
  @import '../assets/css/home/index.css';
</style>
<style scoped>
.el-vue-amap-container{
  height: 300px;
}
</style>
