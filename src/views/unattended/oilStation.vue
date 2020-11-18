<template>
<div class="proTeam">
  <div class="proTeam_left">
    <div class="proTeam_left_title">XXXXX采油站生产监控</div>
    <div class="proTeam_left_oilWell">
      <span class="proTeam_left_oilWell_title ">
        <i class="iconfont icon-ziyuan48ldpi" style="color:rgb(32, 55, 78);font-size:18px;margin:0 2%" />
        油井</span>
      <span class="proTeam_left_oilWell_dec">总井：<span style="color:green">462</span> 口</span>
      <span class="proTeam_left_oilWell_dec">开井：<span style="color:green">462</span> 口</span>
      <span class="proTeam_left_oilWell_dec">异常：<span style="color:red">0</span> 口</span>
      <span class="proTeam_left_oilWell_dec">产液：<span style="color:green">462</span> m<sup>3</sup></span>
      <span class="proTeam_left_oilWell_dec">产油：<span style="color:green">462</span> m<sup>3</sup></span>
      <span class="proTeam_left_oilWell_dec">较昨日增加 <span style="color:green">462</span> m<sup>3</sup></span>
    </div>
    <div class="proTeam_left_waterWell">
      <span class="proTeam_left_oilWell_title">
        <i class="iconfont icon-ziyuan50ldpi" style="color:rgb(32, 55, 78);font-size:18px;margin:0 2%" />
        水井
      </span>
      <span class="proTeam_left_oilWell_dec">总井：<span style="color:green">462</span> 口</span>
      <span class="proTeam_left_oilWell_dec">开井：<span style="color:green">462</span> 口</span>
      <span class="proTeam_left_oilWell_dec">异常：<span style="color:red">0</span> 口</span>
      <span class="proTeam_left_oilWell_dec">配注：<span style="color:green">462</span> m<sup>3</sup></span>
      <span class="proTeam_left_oilWell_dec">注水：<span style="color:green">462</span> m<sup>3</sup></span>
    </div>
    <div class="proTeam_left_video">
      <span class="proTeam_left_oilWell_title">
        <i class=" iconfont icon-shipin" style="color:rgb(32, 55, 78);font-size:21px;margin:0 2%" />
        视频</span>
      <span class="proTeam_left_oilWell_dec">正常：<span style="color:green">462</span> 处</span>
      <span class="proTeam_left_oilWell_dec">异常：<span style="color:orange">0</span> 处</span>
      <span class="proTeam_left_oilWell_dec">损坏：<span style="color:red">0</span> 处</span>
    </div>
  </div>
  <div class="proTeam_container">
    <div v-for="(item,index) in 16" :key="index" class="oilStation_container_details">
      <div class="proTeam_container_details_top ">
        <span class="proTeam_container_details_top_span">******井场</span>
        <img src="../../assets/images/station.png" class="proTeam_container_details_top_img"  @click="gotoWellsite()"/>
      </div>
      <div class="proTeam_container_details_container">
        <span class="proTeam_container_details_container_dec">开井：<span style="color:green">462</span> 口 </span>
        <span class="proTeam_container_details_container_dec">停井：<span style="color:red">462</span> 口 </span><br>
        <span class="proTeam_container_details_container_dec">产液：<span style="color:green">462</span>m<sup>3</sup></span>
        <span class="proTeam_container_details_container_dec">产液：<span style="color:green">462</span> m<sup>3</sup></span><br>
        <span class="proTeam_container_details_container_dec">异常：<span style="color:red">462</span> 口 </span>
        <span class="proTeam_container_details_container_dec">预警：<span style="color:orange">462</span> 处 </span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created(){
    console.log(this.$route.params.name);
  },
  methods: {
    // 点击跳转到采油站
    gotoWellsite() {
      this.$router.replace("/unattended/wellsite");
    }
   
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/unattended/oilStation.css";
</style>
