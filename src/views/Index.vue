<template>
  <div class="main">
    <div class="main_between">
      <el-card class="main_between_1" shadow="hover">
        <div class="main_between_1_item">
          <span class="main_middle_1_item_span"> 油井情况 </span>
          <div class="main_between_1_item_well">
            <!-- 油井描述 -->
            <div class="main_between_1_item_desc">
              <span class="main_between_1_item_desc_span">总井数:<span style="color:#ED7C30">100</span></span>
              <span class="main_between_1_item_desc_span">开井数:<span style="color:#ED7C30">100</span></span>
              <span class="main_between_1_item_desc_span">日产液量:<span style="color:#ED7C30">100</span></span>
              <span class="main_between_1_item_desc_span">当月累计产量:<span style="color:#ED7C30">100</span></span>
              <span class="main_between_1_item_desc_span">当年累计产量:<span style="color:#ED7C30">100</span></span>
            </div>
             <!-- 图形 -->
            <div id="well" class="main_between_1_item_well_line" />
          </div>
          
        </div>
      </el-card>
      <el-card class="main_between_2" shadow="hover">
        <div class="main_between_2_item">
          <span class="main_middle_1_item_span"> 油井异常情况 </span>
          <div id="wellAbnormal" class="main_between_2_item_wellAbnormal" />
        </div>
      </el-card>
    </div>
    <div class="main_middle">
      <el-card class="main_middle_1" shadow="hover">
        <div class="main_middle_1_item">
          <span class="main_middle_1_item_span"> GIS地图 </span>
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
          <span class="main_middle_1_item_span"> 车辆投入 </span>
        </div>
      </el-card>
    </div>
    <div class="main_between">
      <el-card class="main_between_1" shadow="hover">
        <div class="main_between_1_item">
          <span class="main_middle_1_item_span"> 水井情况 </span>
          <div class="main_between_1_item_water">
            <!-- 水井情况1 -->
            <div class="water1">
              <div id="water1" class="main_between_1_item_water1" />
              <span class="main_between_1_item_water1_span">总井数:<span style="color:#ED7C30">100</span></span>
              <span class="main_between_1_item_water1_span">开井数:<span style="color:#ED7C30">100</span></span>
            </div>
           <!-- 水井情况2 -->
           <div class="water2">
              <div id="water2" class="main_between_1_item_water2" />
              <span class="main_between_1_item_water1_span">正常井数:<span style="color:#ED7C30">100</span></span>
              <span class="main_between_1_item_water1_span">超注井数:<span style="color:#ED7C30">100</span></span>
              <span class="main_between_1_item_water1_span">欠注井数:<span style="color:#ED7C30">100</span></span>
           </div>
           
          </div>
        </div>
      </el-card>
      <el-card class="main_between_2" shadow="hover">
        <div class="main_between_2_item">
          <span class="main_middle_1_item_span"> 措施情况 </span>
          <div id="measure" class="main_between_2_item_measure"></div>
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
      }]
    }
  },
  mounted(){
    // 油井情况
    this.wellInit();
    // 油水井异常情况
    this.wellAbnormalInit();
    // 水井情况
    this.waterWllInit(); 
    // 措施情况
    this.measureInit();
  },
  methods:{
    // 油井情况
    wellInit(){
      let dom = document.getElementById("well");
      let myChart = echarts.init(dom);
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        // 折线颜色
        color:['#66CC99','#ED7C30'],
        legend: {
          data: ['产液量', '开井情况'],
          textStyle: {
            color: '#ffffff',
            fontSize: 10
          },
        },
        xAxis: {
          boundaryGap: false,
          data: ['1', '2', '3', '4', '5', '6', '7','8','9','10'],
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: '#c3dbff',  //更改坐标轴文字颜色
              fontSize : 14      //更改坐标轴文字大小
            }
          },
          // 轴线颜色
          axisLine: {
            lineStyle:{color:'#C0C4CC'} 
          },
          // 网格线
          splitLine: { show:false }

        },
        yAxis: [
          // 产液量
          {
            name:'吨',
            type: 'value',
            // 文字大小与颜色
            axisLabel: {
              textStyle: {
                color: '#c3dbff',  //更改坐标轴文字颜色
                fontSize : 10     //更改坐标轴文字大小
              }
            },
            // 轴线颜色
            axisLine:{
              lineStyle:{color:'#C0C4CC'} 
            },
            // 网格线
            splitLine: { show:false } 
          },
          // 开井情况
          {
            name:'比例(%)',
            type: 'value',
            max: 100,
            // 文字大小与颜色
            axisLabel: {
              textStyle: {
                color: '#c3dbff',  //更改坐标轴文字颜色
                fontSize : 10     //更改坐标轴文字大小
              }
            },
            // 轴线颜色
            axisLine: {
              lineStyle:{color:'#C0C4CC'} 
            },
            // 网格线
            splitLine: { show:false }

          }
        ],
        series: [
            {
                name: '产液量',
                type: 'line',
                data: [60, 132, 90, 234, 140, 150, 63, 36, 83, 24, 74],
                yAxisIndex: 0,
            },
            {
                name: '开井情况',
                type: 'line',
                data: [70, 82, 91, 94, 80, 70, 90, 74, 81, 82],
                yAxisIndex: 1,
            },
        ]
      });
    },
    // 油水井异常情况
    wellAbnormalInit(){
      let dom = document.getElementById("wellAbnormal");
      let myChart = echarts.init(dom);
      myChart.setOption({
        tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        // 颜色
        color:['#66CC99','#ED7C30','#FFFF00','#66CCCC','#CC3333','#FF9999','#CC6633'],
        series: [
          {
            name: '比例',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            label: {
                position: 'inner'
            },
            // 指示线
            labelLine: {
                show: false
            },
            data: [
                {value: 335, name: '总井数'},
                {value: 30, name: '开井数'}
            ]
          },
          {   
            name: '所占比例',
            type: 'pie',
            radius: ['40%', '55%'],
            data: [
              {value: 335, name: '正常井'},
              {value: 210, name: '液量异常'},
              {value: 234, name: '含水异常'},
              {value: 335, name: '工况异常'},
              {value: 448, name: '设备异常'}
            ]    
          }
        ]
      });
    },
    // 水井情况
    waterWllInit(){
      // 水井情况1
      let dom1 = document.getElementById("water1");
      let myChart1 = echarts.init(dom1);
      myChart1.setOption({
        tooltip: {
         formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          data: ['总井数', '开井数'],
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          },
        },
        // 图形颜色
        color:['#66CC99','#ED7C30'],
        series: [
          {
            name: '所占比例',
            type: 'pie',
            data: [
              {value: 335, name: '总井数'},
              {value: 100, name: '开井数'},
            ],
            // 指示线
            label:{
              normal:{
                show:false
              }
            }
          }
        ]
      });
      // 水井情况2
      let dom2 = document.getElementById("water2");
      let myChart2 = echarts.init(dom2);
      myChart2.setOption({
         tooltip: {
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          data: ['正常', '超注','欠注'],
          textStyle: {
            color: '#ffffff',
            fontSize: 8
          },
        },
        // 图形颜色
        color:['#66CC99','#ED7C30','#FFFF00'],
        series: [
          {
            name: '所占比例',
            type: 'pie',
            data: [
              {value: 405, name: '正常'},
              {value: 120, name: '超注'},
              {value: 450, name: '欠注'},
            ],
            // 指示线
            label:{
              normal:{
                show:false
              }
            }
          }
        ]
      });
    },
    // 措施情况
    measureInit(){
      let dom = document.getElementById("measure");
      let myChart = echarts.init(dom);
      myChart.setOption({
        tooltip: {
          trigger: "axis",  
        },
        // 图形颜色
        color:['#66CC99','#ED7C30'],
        legend: { 
          data:['待措施井数','措施中井数'],
          textStyle: {
          color: '#ffffff',
          fontSize: 12
          },
        },
        xAxis: {
          data: ["站1","站2","站3","站4","站5","站6"],
          splitLine:{
            show:false,
          },
          // 文字大小与颜色
          axisLabel: {
            show: true,
            textStyle: {
              color: '#c3dbff',  //更改坐标轴文字颜色
              fontSize : 14      //更改坐标轴文字大小
            }
          },
          // 轴线颜色
          axisLine:{
            lineStyle:{color:'#C0C4CC'} 
          },
        },
        yAxis: {
          splitLine:{
            show:false,
          },
          // 文字大小与颜色
          axisLabel: {
            show: true,
            textStyle: {
              color: '#c3dbff',  //更改坐标轴文字颜色
              fontSize : 10     //更改坐标轴文字大小
            }
          },
          // 轴线颜色
          axisLine:{
            lineStyle:{color:'#C0C4CC'} 
          },
        },
        series: [{
          name: '待措施井数',
          type: 'bar',
          stack:'使用情况',
          barWidth : 20,
          data: [5, 20, 36, 10, 10, 20],
        },{
          name: '措施中井数',
          type: 'bar',
          stack:'使用情况',
          barWidth : 20,
          data: [40, 22, 18, 35, 42, 40],
        }]
      });
    }
  }
};
</script>

<style lang="less" scoped>
  @import '../assets/css/home/index.css';
</style>
<style scoped>
.el-vue-amap-container {
  height: 300px;
}
.el-card {
  border: none;
}
</style>
