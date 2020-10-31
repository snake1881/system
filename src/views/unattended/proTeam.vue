<template>
  <div class="proTeam">
      <div class="proTeam_top">
          <div class="proTeam_top_title">东仁沟采油队生产监控</div>
            <table align="right" class="proTeam_top_table">
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
      <div class="proTeam_container">
          <div v-for="(item,index) in 4" :key="index" class="proTeam_container_details">
            <div class="proTeam_container_details_left">
              <span class="proTeam_container_details_left_span">****采油站</span>
              <img src="../../assets/images/teamStation.png" class="proTeam_container_details_left_img" @click="gotoStation()"> 
            </div>
            <table align="right" class="proTeam_top_table">
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
    
</template>
<script>
export default {
    data() {
     return{}
    },
    methods:{
        // 点击跳转到采油站
        gotoStation(){
            this.$router.replace("/unattended/oilStation");
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/unattended/proTeam.css";
</style>
<style lang="less" scoped>
.proTeam_top tr,td {
  border: 1px solid #8dbeb0;
  border-style: dashed ; 
  white-space: nowrap;
}
</style>