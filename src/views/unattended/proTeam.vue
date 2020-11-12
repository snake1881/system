<template>
<div class="proTeam">
  <div class="proTeam_left">
    <div class="proTeam_left_title">东仁沟采油队生产监控</div>
    <div class="proTeam_left_oilWell">
      <span class="proTeam_left_oilWell_title ">
        <i class="iconfont icon-ziyuan48ldpi" style="color:rgb(32, 55, 78);font-size:18px;margin:0 2%" />
        油井</span>
      <span class="proTeam_left_oilWell_dec">总井：<span style="color:green"> {{this.oilData.wellCount}}</span> 口</span>
      <span class="proTeam_left_oilWell_dec">开井：<span style="color:green"> {{this.oilData.wellOpenCount}}</span> 口</span>
      <span class="proTeam_left_oilWell_dec">异常：<span style="color:red">0</span> 口</span>
      <span class="proTeam_left_oilWell_dec">产液：<span style="color:green">{{this.oilData.teamInfoList[0].drLiquidProd}}</span> m<sup>3</sup></span>
      <span class="proTeam_left_oilWell_dec">产油：<span style="color:green">{{this.oilData.teamInfoList[0].drOilProd}}</span> m<sup>3</sup></span>
      <span class="proTeam_left_oilWell_dec">产液较昨日： <span style="color:green">{{this.LiquidProdIncrease}}</span> m<sup>3</sup></span>
      <!-- <span class="proTeam_left_oilWell_dec">产油较昨日： <span style="color:green">{{this.oilIncrease}}</span> m<sup>3</sup></span> -->
    </div>
    <div class="proTeam_left_waterWell">
      <span class="proTeam_left_oilWell_title">
        <i class="iconfont icon-ziyuan50ldpi" style="color:rgb(32, 55, 78);font-size:18px;margin:0 2%" />
        水井
      </span>
      <span class="proTeam_left_oilWell_dec">总井：<span style="color:green">{{this.waterData.wellCount}}</span> 口</span>
      <span class="proTeam_left_oilWell_dec">开井：<span style="color:green">{{this.waterData.wellOpenCount}}</span> 口</span>
      <span class="proTeam_left_oilWell_dec">异常：<span style="color:red">0</span> 口</span>
      <span class="proTeam_left_oilWell_dec">配注：<span style="color:green">{{this.waterData.teamWaterList[0].drInjectionAllocation}}</span> m<sup>3</sup></span>
      <span class="proTeam_left_oilWell_dec">注水：<span style="color:green">{{this.waterData.teamWaterList[0].drWaterInjection}}</span> m<sup>3</sup></span>
    </div>
    <div class="proTeam_left_video">
      <span class="proTeam_left_oilWell_title">
        <i class=" iconfont icon-shipin" style="color:rgb(32, 55, 78);font-size:21px;margin:0 2%" />
        视频</span>
      <span class="proTeam_left_oilWell_dec">正常：<span style="color:green">{{this.videoData}}</span> 处</span>
      <span class="proTeam_left_oilWell_dec">异常：<span style="color:orange">0</span> 处</span>
      <span class="proTeam_left_oilWell_dec">损坏：<span style="color:red">0</span> 处</span>
    </div>
  </div>
  <div class="proTeam_container">
    <div v-for="(item,index) in 16" :key="index" class="proTeam_container_details" @mouseenter="enter()" @mouseleave="leave()">
      <div class="proTeam_container_details_left">
        <span class="proTeam_container_details_left_span">****采油站</span>
        <i class="iconfont icon-yujing_gaoliang proTeam_container_details_left_icon" />
        <img src="../../assets/images/teamStation.png" class="proTeam_container_details_left_img">
      </div>
      <div class="proTeam_container_details_right">
        <span class="proTeam_container_details_right_dec">产液：<span style="color:green">462</span> m<sup>3</sup></span>
        <span class="proTeam_container_details_right_dec">注水：<span style="color:green">462</span> m<sup>3</sup></span>
        <span class="proTeam_container_details_right_dec">异常：<span style="color:red">0</span> 处</span>
        <span class="proTeam_container_details_right_dec">预警：<span style="color:orange">0</span> 处</span>
      </div>
      <i class="iconfont icon-icon-- proTeam_container_details_icon" @click="gotoStation()" />
    </div>
    <table class="proTeam_top_table" v-if="tableFlag" :style="positionStyle">
      <tr>
        <td rowspan="2">油井</td>
        <td colspan="3">
          总***口
          开***口
          异常<span style="color:red">**</span>口
        </td>
      </tr>
      <tr>
        <td colspan="3">
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
        <td colspan="3">
          配注**m<sup>3</sup>
          注水**m<sup>3</sup>
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
</template>

<script>
export default {
  data() {
    return {
      tableFlag: false,
      positionStyle: {
        top: '20%',
        left: '20%'
      },
      // 油井汇总
      oilData:{},
      // 产油变化量
      oilIncrease:'',
      // 产液变化量
      LiquidProdIncrease:'',
      // 水井汇总
      waterData:{},
      // 视频
      videoData:""
    }
  },
  created() {
    this.oilInit();
    this.waterInit();
    this.videoInit()
    this.stationInit();
  },
  methods: {
    // 油井汇总
    oilInit(){
      this.getRequest('/teams/team/listPage?productionTeamName=%E4%B8%9C%E4%BB%81%E6%B2%9F%E9%87%87%E6%B2%B9%E9%98%9F&sTime=2020-11-09').then(resp =>{
        if(resp){
          this.oilData = resp.data;
          this.LiquidProdIncrease=(resp.data.teamInfoList[0].drLiquidProd-resp.data.teamInfoList[0].drYesterdayLiquidProd).toFixed(3);
          this.oilIncrease = (resp.data.teamInfoList[0].drOilProd-resp.data.teamInfoList[0].drYesterdayOilProd).toFixed(3);
        }
      });
    },
    // 水井汇总
    waterInit(){
      this.getRequest('/teams/team/waterList?productionTeamName=%E4%B8%9C%E4%BB%81%E6%B2%9F%E9%87%87%E6%B2%B9%E9%98%9F&sTime=2020-11-05').then(resp =>{
        if(resp){
          this.waterData = resp.data;
        }
      });
    },
    // 视频汇总
    videoInit(){
      this.getRequest('/unattended/monitoring/getVideoCount').then(resp =>{
        if(resp){
          this.videoData = resp.data;
        }
      });
    },
    // 所有采油站信息
    stationInit(){

    },
    // 点击跳转到采油站
    gotoStation() {
      this.$router.replace("/unattended/oilStation");
    },
    // 鼠标移入
    enter() {
      this.tableFlag = true;
    },
    // 鼠标移出
    leave() {
      this.tableFlag = false;
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/unattended/proTeam.css";
</style><style lang="less" scoped>
.proTeam_top tr,
td {
  border: 1px solid #8dbeb0;
  border-style: dashed;
  white-space: nowrap;
}
</style>
