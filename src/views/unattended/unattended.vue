<template>
  <div class="unattended">
    <el-tabs type="border-card">
      <el-tab-pane label="采油队信息">
        <div class="unattended_station">
          <div class="unattended-station_top">
            <div class="unattended-station_top_title">东仁沟采油队生产监控</div>
              <table align="right" class="unattended-station_top_table">
              <tr>
                <td rowspan="2">油井</td>
                <td colspan="3">
                  总***口 
                  开***口 
                  异常<span style="color:red">**</span>口
                </td>
              </tr>
              <tr>
                <td  colspan="3">
                  产液**m<sup>3</sup>
                  产油**m<sup>3</sup>
                  较昨日**m<sup>3</sup>
                </td>
              </tr>
              <tr>
                <td rowspan="2">水井</td>
                <td colspan="3">
                  总***口 
                  开***口 
                  异常<span style="color:red">**</span>口
                </td>
              </tr>
              <tr>
                <td  colspan="3">
                  产液**m<sup>3</sup>
                  产油**m<sup>3</sup>
                  较昨日**m<sup>3</sup>
                </td>
              </tr>
              <tr>
                <td>视频</td>
                <td colspan="3">
                  正常**处
                  损坏<span style="color:#f90">**</span>处
                  预警<span style="color:red">**</span>处
                </td>
              </tr>
            </table>
          </div>
          <div class="unattended-station_container">
            <div v-for="(item,index) in 4" :key="index" class="unattended_wellTeam">
              <div class="unattended_wellTeam_left">
                <span class="unattended_wellTeam_left_span">****采油站</span>
                <img src="../../assets/images/teamStation.png" class="unattended_wellTeam_left_img"> 
                </div>
              <table align="right" class="unattended-station_top_table">
                <tr>
                  <td rowspan="2">油井</td>
                  <td colspan="3">
                    总***口 
                    开***口 
                    异常<span style="color:red">**</span>口
                  </td>
                </tr>
                <tr>
                  <td  colspan="3">
                    产液**m<sup>3</sup>
                    产油**m<sup>3</sup>
                    较昨日**m<sup>3</sup>
                  </td>
                </tr>
                <tr>
                  <td rowspan="2">水井</td>
                  <td colspan="3">
                    总***口 
                    开***口 
                    异常<span style="color:red">**</span>口
                  </td>
                </tr>
                <tr>
                  <td  colspan="3">
                    产液**m<sup>3</sup>
                    产油**m<sup>3</sup>
                    较昨日**m<sup>3</sup>
                  </td>
                </tr>
                <tr>
                  <td>视频</td>
                  <td colspan="3">
                    正常**处
                    损坏<span style="color:#f90">**</span>处
                    预警<span style="color:red">**</span>处
                  </td>
                </tr>
            </table>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="采油站信息">
        <div class="unattended_station">
          <div class="unattended-station_top">
            <div class="unattended-station_top_title">XX采油站生产监控</div>
            <table align="right" class="unattended-station_top_table">
              <tr>
                <td rowspan="2">油井</td>
                <td colspan="3">
                  总***口 
                  开***口 
                  异常<span style="color:red">**</span>口
                </td>
              </tr>
              <tr>
                <td  colspan="3">
                  产液**m<sup>3</sup>
                  产油**m<sup>3</sup>
                  较昨日**m<sup>3</sup>
                </td>
              </tr>
              <tr>
                <td rowspan="2">水井</td>
                <td colspan="3">
                  总***口 
                  开***口 
                  异常<span style="color:red">**</span>口
                </td>
              </tr>
              <tr>
                <td  colspan="3">
                  产液**m<sup>3</sup>
                  产油**m<sup>3</sup>
                  较昨日**m<sup>3</sup>
                </td>
              </tr>
              <tr>
                <td>视频</td>
                <td colspan="3">
                  正常**处
                  损坏<span style="color:#f90">**</span>处
                  预警<span style="color:red">**</span>处
                </td>
              </tr>
            </table>
          </div>
          <div class="unattended-station_container">
            <div class="unattended-station_container_wellStation" v-for="(item,index) in 10" :key="index">
              <div class="unattended-station_container_wellStation_title">XXX井场</div>
              <img src="../../assets/images/station.png" class="unattended-station_container_wellStation_img">
              <div class="unattended-station_container_wellStation_dec">
                <el-row>
                  <el-col :span="12">
                    <span>开: <span style="color:#06c">134</span> 口 </span>
                  </el-col>
                  <el-col :span="12">
                    <span>停: <span style="color:#06c">1</span> 口 </span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <span> 产油: <span style="color:#06c">10234</span> m<sup>3</sup></span>
                  </el-col>
                  <el-col :span="12">
                   <span> 产液: <span style="color:#06c">17304</span> m<sup>3</sup></span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <span>异常: <span style="color:#06c">1</span> 口</span>
                  </el-col>
                  <el-col :span="12">
                    <span>视频预警: <span style="color:#06c">1345</span>次</span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="井场信息">
        <div style="width:100%;height:100%;margin:0">
          <div class="unattended-wellsite_bac">
            <div class="unattended-wellsite_bac_condition">
              <!-- 井场信息 -->
              <div class="unattended-wellsite_bac_condition_left">
                <p>井场: <span style="color:#06c">XXXX</span></p>
                <p>日产液量: <span style="color:#06c">6543</span> m<sup>3</sup></p>
                <p>日注水量: <span style="color:#06c">1341</span> m<sup>3</sup></p>
                <p>电子巡检次数: <span style="color:#06c">15</span> 次</p>
              </div>
              <!-- 工况预警 -->
              <div class="unattended-wellsite_bac_condition_right">
                <span class="unattended-wellsite_bac_condition_right_title">
                  <i class="iconfont icon-yujing_gaoliang" style="color:rgb(214, 117, 117)"/>
                工况预警</span>
                <div class="unattended-wellsite_bac_condition_right_detils">
                 <ul :style="{'marginTop':marginTop+'px'}" >
                    <li 
                    v-for="(item,index) in conditionData" 
                    :key='index' 
                    style="list-style-type:none;font-size:17px;color:#666;height:32px;"
                  >{{item.name}}</li>
                </ul>
                </div>

              </div>
            </div>
            <div class="unattended-wellsite_bac_monitor">
              <div class="unattended-wellsite_bac_monitor_left">
                 <span class="unattended-wellsite_bac_monitor_left_title">
                   <i class="iconfont icon-yujing_gaoliang" style="color:rgb(214, 117, 117)"/>
                   监控预警</span>
                 <div class="unattended-wellsite_bac_monitor_left_details">
                  <ul :style="{'marginTop':marginTop+'px'}" >
                    <li 
                      v-for="(item,index) in conditionData" 
                      :key='index' 
                      style="list-style-type:none;font-size:17px;color:#666;height:32px;"
                    >{{item.name}}</li>
                  </ul>
                 </div>
                 <div class="unattended-wellsite_bac_monitor_left_video">
                   <div class="unattended-wellsite_bac_monitor_left_video_container" v-for="(item,index) in 3" :key="index">
                     <div><i class="iconfont icon-shexiangtou" style="color:green;font-size:30px" />正常</div>
                   </div>
                   <div class="unattended-wellsite_bac_monitor_left_video_container" v-for="(item,index) in 2" :key="index">
                     <div><i class="iconfont icon-shexiangtou" style="color:red;font-size:30px" />异常</div>
                   </div>
                   <div class="unattended-wellsite_bac_monitor_left_video_container" v-for="(item,index) in 3" :key="index">
                     <div><i class="iconfont icon-shexiangtou" style="color:#f90;font-size:30px" />警告</div>
                   </div>
                 </div>
              </div>
              <div class="unattended-wellsite_bac_monitor_right">
                <img src="../../assets/images/monitor.jpg" style="height:210px;width:190px;margin-top:2%" />
              </div>
            </div>
          </div>
          <div class="unattended-wellsite_well">
            <div class="unattended-wellsite_well_oilWell">
              <div class="unattended-wellsite_well_oilWell_details" v-for="(item,index) in 12" :key="index">
                <div class="unattended-wellsite_well_oilWell_details_title">XX采油井</div>
                <img src="../../assets/images/oilWell.gif" class="unattended-wellsite_well_oilWell_details_img">
                <div class="unattended-wellsite_well_oilWell_details_dec">
                  <span>当日产液: <span style="color:#06c">134</span> m<sup>3</sup></span>
                  <span>动液面: <span style="color:#06c">134</span> m<sup>3</sup></span>
                  <span>工况诊断: <span style="color:#06c">134</span> m<sup>3</sup></span>
                </div>
                <div class="unattended-wellsite_well_oilWell_details_bottom">异常情况: <span style="color:red">供液不足</span></div>
              </div>
            </div>
            <div class="unattended-wellsite_well_waterWell">
              <div class="unattended-wellsite_well_waterWell_details" v-for="(item,index) in 4" :key="index">
                <div class="unattended-wellsite_well_waterWell_details_title">XX注水井</div>
                <img src="../../assets/images/waterWell.png" class="unattended-wellsite_well_waterWell_details_img">
                <div class="unattended-wellsite_well_waterWell_details_dec">
                  <span>当日产液: <span style="color:#06c">134</span> m<sup>3</sup></span>
                  <span>动液面: <span style="color:#06c">134</span> m<sup>3</sup></span>
                  <span>工况诊断: <span style="color:#06c">134</span> m<sup>3</sup></span>
                </div>
                <div class="unattended-wellsite_well_waterWell_details_bottom">异常情况: <span style="color:red">超注</span></div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="单井信息"> 
        <div class="unattended_singleWell">
          <div class="unattended_singleWell_top">
            <div class="unattended_singleWell_top_information">
              <span class="unattended_singleWell_top_information_span">视频信息</span>
              <div class="unattended_singleWell_top_information_container">
                <div class="unattended_singleWell_top_information_container_video">
                  <img src="../../assets/images/video.jpg" style="width:376px;height:227px"/>
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
              <el-date-picker v-model="gtDate1" type="date" placeholder="选择日期" size="mini" style="width:120px;margin-right:10px"/>
              至
              <el-date-picker v-model="gtDate2" type="date" placeholder="选择日期" size="mini" style="width:120px;margin-left:10px"/>
              <div id="gt" />
            </div>
          </div>
          <div class="unattended_singleWell_container">
            <div class="unattended_singleWell_top_information">
              <span class="unattended_singleWell_top_information_span">载荷曲线</span>
                <el-date-picker v-model="zhDate1" type="date" placeholder="选择日期" size="mini" style="width:120px;margin-right:10px"/>
                 至
                <el-date-picker v-model="zhDate2" type="date" placeholder="选择日期" size="mini" style="width:120px;margin-left:10px"/>
                <div style="width:100%;height:100%"><div id="zh" class="zhLine"/></div>
                
            </div>
            <div class="unattended_singleWell_top_data">
              <span class="unattended_singleWell_top_information_span">生产数据</span>  
              <div class="unattended_singleWell_container_proDaily">
                <span class="unattended_singleWell_container_proDaily_title">当日数据</span>
                <div class="unattended_singleWell_container_proDaily_dec">
                  <el-row>
                    <el-col :span="12"><p>产液：****</p> </el-col>
                    <el-col :span="12"><p>含水：****</p></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12"><p>产油：****</p> </el-col>
                    <el-col :span="12"><p>油压：****</p></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12"><p>套压：****</p> </el-col>
                    <el-col :span="12"><p>泵效：****</p></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12"><p>动液面：****</p> </el-col>
                    <el-col :span="12"><p>生产时间：****</p></el-col>
                  </el-row>
                   <el-row>
                    <el-col :span="12"><p>单井状态：****</p> </el-col>
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
              <el-date-picker v-model="proDate1" type="date" placeholder="选择日期" size="mini" style="width:120px;margin-right:10px"/>
               至
              <el-date-picker v-model="proDate2" type="date" placeholder="选择日期" size="mini" style="width:120px;margin-left:10px"/>
              <div class="unattended_singleWell_container_proLine" >
                <div id="proLiquidLine" class="proLine" />
                <div id="proWaterLine" class="proLine" />
                <div id="proFluidLine" class="proLine" />
              </div>
             </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
export default {
  data() {
    return {
      // 工况预警
      conditionData:[
        {name: "XXXX出现XXXX预警情况" },
        {name: "XXXX出现XXXX预警情况" },
        {name: "XXXX出现XXXX预警情况" },
        {name: "XXXX出现XXXX预警情况" },
        {name: "XXXX出现XXXX预警情况" },
        {name: "XXXX出现XXXX预警情况" },
        {name: "XXXX出现XXXX预警情况" },
      ],
      // 油井
      oilWell:[],
      marginTop:0,
      timer:'',     // 定时器
      // 功图
      gtDate1: "",
      gtDate2: "",
      // 载荷
      zhDate1:"",
      zhDate2:"",
      // 生产
      proDate1:"",
      proDate2:""
    };
  },
  mounted() {
    //功图曲线
    this.gtLineInit();
    // 生产曲线
    this.proLineInit();
    //载荷曲线
    this.zhLineInit();
  },
  created(){
  	this.timer= setInterval(this.showNotice, 200)   //100表示间隔时间，数字越大滚得越快
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
      setTimeout(() => {
       let myChart1 = echarts.init(dom1);
       myChart1.setOption({
        title: {
          text: '产液产油曲线',
          textStyle:{
            fontSize:10,
            color:'#666'
          }
        },
        tooltip: { trigger: 'axis' },
        xAxis: {
          data: ['2020-10-02', '2020-10-04', '2020-10-06', '2020-10-08', '2020-10-10', '2020-10-12', '2020-10-14'],
          "axisLine":{       //y轴
            "show":false
          },
          "axisTick":{       //y轴刻度线
            "show":false
          },
           // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: '#666',  //更改坐标轴文字颜色
              fontSize : 10   //更改坐标轴文字大小
            }
          },

        },
        yAxis: {  
          type: 'value',
          "axisLine":{       //y轴
            "show":false
          },
          "axisTick":{       //y轴刻度线
            "show":false
          },
          max : 200,
          min : 0,
          splitNumber : 2,
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: '#666',  //更改坐标轴文字颜色
              fontSize : 10   //更改坐标轴文字大小
            }
          },
        },
        series: [
          {
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
      },2000);
      // 含水曲线
      let dom2 = document.getElementById("proWaterLine");
      setTimeout(() => {
        let myChart2 = echarts.init(dom2);
        myChart2.setOption({
          title: {
            text: '含水曲线',
            textStyle:{
              fontSize:10,
              color:'#666'
            }
          },
          tooltip: { trigger: 'axis' },
          xAxis: {
            data: ['2020-10-02', '2020-10-04', '2020-10-06', '2020-10-08', '2020-10-10', '2020-10-12', '2020-10-14'],
            "axisLine":{       //y轴
              "show":false
            },
            "axisTick":{       //y轴刻度线
              "show":false
            },
            // 文字大小与颜色
            axisLabel: {
              textStyle: {
                color: '#666',  //更改坐标轴文字颜色
                fontSize : 10   //更改坐标轴文字大小
              }
            },

          },
          yAxis: {  
            type: 'value',
            "axisLine":{       //y轴
              "show":false
            },
            "axisTick":{       //y轴刻度线
              "show":false
            },
            max : 200,
            min : 0,
            splitNumber : 2,
            // 文字大小与颜色
            axisLabel: {
              textStyle: {
                color: '#666',  //更改坐标轴文字颜色
                fontSize : 10   //更改坐标轴文字大小
              }
            },
          },
          series: [
            {
              name: '含水',
              type: 'line',
              data: [120, 132, 101, 134, 190, 130, 110]
            }
          ]
        });
      },2000);
      // 动液面曲线
      let dom3 = document.getElementById("proFluidLine");
      setTimeout(() => {
        let myChart3 = echarts.init(dom3);
        myChart3.setOption({
          title: {
            text: '动液面曲线',
            textStyle:{
              fontSize:10,
              color:'#666'
            }
          },
          tooltip: { trigger: 'axis' },
          xAxis: {
            data: ['2020-10-02', '2020-10-04', '2020-10-06', '2020-10-08', '2020-10-10', '2020-10-12', '2020-10-14'],
            "axisLine":{       //y轴
              "show":false
            },
            "axisTick":{       //y轴刻度线
              "show":false
            },
            // 文字大小与颜色
            axisLabel: {
              textStyle: {
                color: '#666',  //更改坐标轴文字颜色
                fontSize : 10   //更改坐标轴文字大小
              }
            },
          },
          yAxis: {  
            type: 'value',
            "axisLine":{       //y轴
              "show":false
            },
            "axisTick":{       //y轴刻度线
              "show":false
            },
            max : 100,
            min : 0,
            splitNumber : 2,
            // 文字大小与颜色
            axisLabel: {
              textStyle: {
                color: '#666',  //更改坐标轴文字颜色
                fontSize : 10   //更改坐标轴文字大小
              },
              formatter: '{value} %'  
            },
          },
          series: [
            {
              name: '动液面',
              type: 'line',
              data: [20, 82, 91, 34, 90, 30, 78]
            }
        ]
        });
      },2000) 
    },
    // 载荷曲线
    zhLineInit() {
      let dom = document.getElementById("zh");
      setTimeout(() => {
       let myChart = echarts.init(dom);
       myChart.setOption({
        legend: {
          data: ['最大载荷','最小载荷'],
        },
        tooltip: { trigger: 'axis' },
        xAxis: {
          data: ['2020-10-02', '2020-10-04', '2020-10-06', '2020-10-08', '2020-10-10', '2020-10-12', '2020-10-14'],
          "axisLine":{       //y轴
            "show":false
          },
          "axisTick":{       //y轴刻度线
            "show":false
          },
           // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: '#666',  //更改坐标轴文字颜色
              fontSize : 10   //更改坐标轴文字大小
            }
          },

        },
        yAxis: {  
          type: 'value',
          "axisLine":{       //y轴
            "show":false
          },
          "axisTick":{       //y轴刻度线
            "show":false
          },
          max : 200,
          min : 0,
          splitNumber : 5,
          // 文字大小与颜色
          axisLabel: {
            textStyle: {
              color: '#666',  //更改坐标轴文字颜色
              fontSize : 10   //更改坐标轴文字大小
            }
          },
        },
        series: [
          {
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
      },2000)
    },
    // 工况预警滚动条
    showNotice(){
      this.marginTop -= 1
      if(this.marginTop < -20){     // 滚上去36px后把前两条数据拉下来
        this.conditionData.push(this.conditionData[0])
        this.conditionData.shift()
        this.marginTop = 0
      }
    },
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/unattended/unattended.css";
</style>
<style>
.el-tabs--border-card,
.el-tab-pane {
  width: 100%;
  height: 100%;
  border: 0;
}
.el-tabs__header {
  width: 100%;
  height: 6%;
}
.el-tabs__content {
  width: 100%;
  height: 93%;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
.unattended-wellsite_bac_condition_right_detils ul li::before,
.unattended-wellsite_bac_monitor_left_details ul li:before {
    display: inline-block;
    content: "●"; /* '\25CF' */
    padding-right: 10px;
    color: rgb(214, 117, 117);
    font-size: 20px;
}
.unattended-station_top tr,td {
  /* border: 1px solid #8dbeb0;
  border-style: dashed ; */
  white-space: nowrap;
}
</style>
