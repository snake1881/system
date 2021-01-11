<template>
  <div class="oilStation">
    <div class="oilStation_left">
      <div class="oilStation_left_title">
        {{ this.$route.query.name }}生产监控
      </div>
      <div class="oilStation_left_oilWell">
        <span class="oilStation_left_oilWell_title">
          <i class="iconfont icon-ziyuan48ldpi" style="color: white; font-size: 16px; margin: 0 1% 0 25%" />
          油井</span>
        <span class="oilStation_left_oilWell_dec">总井：<span style="color: #2cab6f">{{
            this.oilStationData.wellStationCount
          }}</span>
          口</span>
        <span class="oilStation_left_oilWell_dec">开井：<span style="color: #2cab6f">{{
            this.oilStationData.wellStationOpenCount
          }}</span>
          口</span>
        <span class="oilStation_left_oilWell_dec">异常：<span style="color: #e62c2c">{{
            this.oilStationData.abnormalCount
          }}</span>
          口</span>
        <span class="oilStation_left_oilWell_dec">产液：<span style="color: #2cab6f">{{
            this.oilStationData.drLiquidProd
          }}</span>
          m<sup>3</sup></span>
        <span class="oilStation_left_oilWell_dec">产油：<span style="color: #2cab6f">{{
            this.oilStationData.drOilProd
          }}</span>
          m<sup>3</sup></span>
        <span class="oilStation_left_oilWell_dec" v-if="this.LiqStationIncrease > 0">产液较昨日<span style="color: #2cab6f"
            class="el-icon-top">{{
            this.LiqStationIncrease
          }}</span>
          m<sup>3</sup></span>
        <span class="oilStation_left_oilWell_dec" v-if="this.LiqStationIncrease < 0">产液较昨日<span style="color: #e62c2c"
            class="el-icon-bottom">{{
            this.LiqStationIncrease
          }}</span>
          m<sup>3</sup></span>
        <span class="oilStation_left_oilWell_dec" v-if="this.oilStationIncrease > 0">产油较昨日<span style="color: #2cab6f"
            class="el-icon-top">{{
            this.oilStationIncrease
          }}</span>
          m<sup>3</sup></span>
        <span class="oilStation_left_oilWell_dec" v-if="this.oilStationIncrease < 0">产油较昨日<span style="color: #e62c2c"
            class="el-icon-bottom">{{
            this.oilStationIncrease
          }}</span>
          m<sup>3</sup></span>
      </div>
      <div class="oilStation_left_waterWell">
        <span class="oilStation_left_oilWell_title">
          <i class="iconfont icon-ziyuan50ldpi" style="color: white; font-size: 16px; margin: 0 1% 0 25%" />
          水井
        </span>

        <span class="oilStation_left_oilWell_dec">总井：<span style="color: #2cab6f">
            {{
               this.waterStationData.waterStationCount
          }}</span>
          口</span>
        <span class="oilStation_left_oilWell_dec">开井：<span style="color: #2cab6f">{{
          this.waterStationData.waterStationOpenCount
        }}</span>
          口</span>
        <span class="oilStation_left_oilWell_dec">异常：<span style="color: #e62c2c">{{
           this.waterStationData.abnormalWaterCount
          }}</span>
          口</span>
        <span class="oilStation_left_oilWell_dec">配注：<span style="color: #2cab6f">{{
            this.waterStationData.drInjectionAllocation
          }}</span>
          m<sup>3</sup></span>
        <span class="oilStation_left_oilWell_dec">注水：<span style="color: #2cab6f">{{
           this.waterStationData.drWaterInjection
          }}</span>
          m<sup>3</sup></span>
      </div>
      <div class="oilStation_left_video">
        <span class="oilStation_left_oilWell_title">
          <i class="iconfont icon-shipin" style="color: white; font-size: 16px; margin: 0 1% 0 25%" />
          视频</span>
        <span class="oilStation_left_oilWell_dec">正常：<span style="color: #2cab6f">{{ this.stationVideo }}</span>
          处</span>
        <span class="oilStation_left_oilWell_dec">异常：<span style="color: #ec8e25">0</span> 处</span>
        <span class="oilStation_left_oilWell_dec">损坏：<span style="color: #e62c2c">0</span> 处</span>
      </div>
    </div>
    <div class="oilStation_container">
      <div v-for="(item, index) in this.wellSiteData" :key="index" class="oilStation_container_details">
        <div class="oilStation_container_details_top">
          <div class="oilStation_container_details_top_title">
            {{ item.wellSitName }}井场
          </div>
        </div>
        <div class="oilStation_container_details_middle">
          <el-tooltip class="item" effect="light">
            <img src="../../assets/images/station.png" class="oilStation_container_details_middle_img" />
            <div slot="content">
              <table class="proTeam_table">
                <tr>
                  <td rowspan="3">油井</td>
                  <td colspan="3">
                    总:
                    <span style="color: green">{{ item.wellCount }}</span>口 开:
                    <span style="color: green">{{ item.wellOpenCount }}</span>口 异常:
                    <span style="color: red">{{ item.abnormalCount }}</span>口
                  </td>
                </tr>
                <tr>
                  <td colspan="3">
                    产液:
                    <span style="color: green">{{ item.drLiquidProd }}</span>m<sup>3</sup> 产油:
                    <span style="color: green">{{ item.drOilProd }}</span>m<sup>3</sup>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div v-if="item.drYesterdayLiquidProd > 0">
                      产液较昨日
                      <span style="color: green" class="el-icon-top">{{
                        item.drYesterdayLiquidProd
                      }}</span>m<sup>3</sup>
                    </div>
                    <div v-if="item.drYesterdayLiquidProd < 0">
                      产液较昨日<span style="color: red"
                        class="el-icon-bottom">{{ item.drYesterdayLiquidProd }}</span>m<sup>3</sup>
                    </div>
                    <div v-if="item.drYesterdayOilProd > 0">
                      产油较昨日
                      <span style="color: green" class="el-icon-top">{{
                        item.drYesterdayOilProd
                      }}</span>m<sup>3</sup>
                    </div>
                    <div v-if="item.drYesterdayOilProd < 0">
                      产油较昨日
                      <span style="color: red" class="el-icon-bottom">{{
                        item.drYesterdayOilProd
                      }}</span>m<sup>3</sup>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td rowspan="3">水井</td>
                  <td colspan="3">
                    总: <span style="color: green">{{ item.waterCount==='null'?0:item.waterCount }}</span>口 开:
                    <span style="color: green">{{item.waterOpenCount==='null'?0:item.waterOpenCount}}</span>口 异常:
                    <span style="color: red">{{ item.abnormalWaterCount==='null'?0:item.abnormalWaterCount }}</span>口
                  </td>
                </tr>
                <tr>
                  <td colspan="3">
                    配注:
                    <span style="color: green">{{
                     item.drInjectionAllocation
                    }}</span>m<sup>3</sup> 注水:
                    <span
                      style="color: green">{{ item.drWaterInjection==='null'?0:item.drWaterInjection }}</span>m<sup>3</sup>
                  </td>
                </tr>
                <tr>
                  <td colspan="3">较昨日**m<sup>3</sup></td>
                </tr>
                <tr>
                  <td>视频</td>
                  <td colspan="3">
                    正常:
                    <span style="color: green">{{
                      item.videoStationCount
                    }}</span>处 损坏: <span style="color: #f90">0</span>处 预警:
                    <span style="color: red">0</span>处
                  </td>
                </tr>
              </table>
            </div>
          </el-tooltip>
          <i class="iconfont icon-icon-- oilStation_container_details_middle_icon"
            @click="gotoWellsite(item.wellSitId, item.wellSitName)" />
        </div>
        <div class="oilStation_container_details_bottom">
          <el-row>
            <el-col :span="12">
              <span class="oilStation_container_details_bottom_dec">产液：<span style="color: #2cab6f">{{
                  item.drLiquidProd
                }}</span>
                m<sup>3</sup></span>
            </el-col>
            <el-col :span="12">
              <span class="oilStation_container_details_bottom_dec">注水：<span style="color: #2cab6f">{{
                  item.drWaterInjection
                }}</span>
                m<sup>3</sup></span>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <span class="oilStation_container_details_bottom_dec">异常：<span style="color: #e62c2c">{{
                  item.abnormalCount + item.abnormalWaterCount
                }}</span>
                处</span>
            </el-col>
            <el-col :span="12">
              <span class="oilStation_container_details_bottom_dec">预警：<span style="color: #ec8e25">{{
                  item.abnormalCount + item.abnormalWaterCount
                }}</span>
                处</span>
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
      return {
        // 油井
<<<<<<< HEAD
        oilStationData: {
          wellStationCount:0,
          wellStationOpenCount:0,
          abnormalCount:0,
          drLiquidProd:0,
          drOilProd:0
        },
        // 水井
        waterStationData: {
=======
       oilStationData: {},
      // 水井
      waterStationData: {
>>>>>>> 49d72693589f546cdd5d422ceebbb970f42a7ced
          waterStationCount: 0,
          waterStationOpenCount: 0,
          abnormalWaterCount: 0,
          drInjectionAllocation: 0,
          drWaterInjection: 0,
          waterCount: 0,
          waterOpenCount: 0,
          abnormalWaterCount: 0,
          drWaterInjection: 0
        },
      // 视频
      stationVideo: "",
      // 产液变化量
      LiqStationIncrease: "",
      // 产油变化量
      oilStationIncrease: "",
      // 井场汇总
      wellSiteData: [],
      };
    },
    created() {
      this.stationInit();
    },
    methods: {
      // 站组汇总信息
      stationInit() {
        var yesterday = new Date((new Date).getTime() - 24 * 60 * 60 * 1000);
        var year = yesterday.getFullYear();
        var month = yesterday.getMonth() + 1 > 9 ? yesterday.getMonth() + 1 : "0" + (yesterday.getMonth() + 1);
        var day = yesterday.getDate() > 9 ? yesterday.getDate() : "0" + yesterday.getDate();
        yesterday = year + "-" + month + "-" + day;
        this.getRequest(
          "/stations/station/listSitPage?oilStationId=" +
          this.$route.query.id +
          "&sTime=" + yesterday
        ).then((resp) => {
          if (resp) {
            this.oilStationData = resp.data.stationOilWellInfo;
            if (!resp.data.stationWaterWellInfo === 'null') {
              this.waterStationData = resp.data.stationWaterWellInfo;
            }
            this.stationVideo = resp.data.voidCount;
            this.stationData = resp.data.stationWellInfoList;
            this.LiqStationIncrease = (
              resp.data.stationOilWellInfo.drLiquidProd -
              resp.data.stationOilWellInfo.drYesterdayLiquidProd
            ).toFixed(3);
            this.oilStationIncrease = (
              resp.data.stationOilWellInfo.drOilProd -
              resp.data.stationOilWellInfo.drYesterdayOilProd
            ).toFixed(3);
            this.wellSiteData = resp.data.stationWellInfoList;
          }
        });
      },
      // 点击跳转到井场
      gotoWellsite(val1, val2) {
        this.$router.push({
          path: "/unattended/wellsite",
          query: {
            id: val1,
            name: val2,
          },
        });
      },
      dataNull() {
        this.$message('接口异常，请联系技术人员');
      },
    }
  };
</script>

<style lang="less" scoped>
  @import "../../assets/css/unattended/oilStation.css";
</style>
<style>
  /* 定义滚动条样式 */
  .oilStation ::-webkit-scrollbar {
    width: 2px;
    height: 7px;
    background-color: #223c66;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  .oilStation ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(83, 82, 82, 0.5);
    border-radius: 10px;
    /* background-color: rgba(240, 240, 240, 0.5); */
  }

  /*定义滑块 内阴影+圆角*/
  .oilStation ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    background-color: rgba(240, 240, 240, 0.5);
  }
</style>