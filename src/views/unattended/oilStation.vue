<template>
<div class="oilStation">
  <div class="oilStation_top">
    <el-button type="text" @click="gotoProTeam()" class="el-icon-back oilStation_top_button">返回</el-button>
    <div class="oilStation_top_title">XX采油站生产监控</div>
    <table align="right" class="oilStation_top_table">
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
  <div class="oilStation_container">
    <div class="oilStation_container_wellStation" v-for="(item,index) in 10" :key="index">
      <div class="oilStation_container_wellStation_title">XXX井场</div>
      <img src="../../assets/images/station.png" class="oilStation_container_wellStation_img" @click="gotoWellsite()">
      <div class="oilStation_container_wellStation_dec">
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
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    // 返回采油队页面
    gotoProTeam() {
      this.$router.replace("/unattended/unattended");
    },
    // 跳转到井场页面
    gotoWellsite() {
      this.$router.replace("/unattended/wellsite");
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/unattended/oilStation.css";
</style><style lang="less" scoped>
.oilStation_top tr,
td {
  border: 1px solid #8dbeb0;
  border-style: dashed;
  white-space: nowrap;
}
</style>
