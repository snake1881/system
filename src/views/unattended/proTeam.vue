<template>
  <div class="proTeam">
    <div class="proTeam_left">
      <div class="proTeam_left_oilWell">
        <span class="proTeam_left_oilWell_title">
          <i
            class="iconfont icon-ziyuan48ldpi"
            style="color: white; font-size: 16px; margin: 0 1% 0 25%"
          />
          油井
        </span>
        <span class="proTeam_left_oilWell_dec"
          >总井：<span style="color: #2cab6f">
            {{ this.oilData.wellTeamCount }}</span
          >
          口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >开井：<span style="color: #2cab6f">
            {{ this.oilData.wellTeamOpenCount }}</span
          >
          口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >异常：<span style="color: #e62c2c">{{
            this.oilData.abnormalCount
          }}</span>
          口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >产液：<span style="color: #2cab6f">{{
            this.oilData.drLiquidProd
          }}</span>
          m<sup>3</sup></span
        >
        <span class="proTeam_left_oilWell_dec"
          >产油：<span style="color: #2cab6f">{{
            this.oilData.drOilProd
          }}</span>
          m<sup>3</sup></span
        >
        <span
          class="proTeam_left_oilWell_dec"
          v-if="this.LiquidProdIncrease > 0"
          >产液较昨日<span style="color: #2cab6f" class="el-icon-top">{{
            this.LiquidProdIncrease
          }}</span>
          m<sup>3</sup></span
        >
        <span
          class="proTeam_left_oilWell_dec"
          v-if="this.LiquidProdIncrease < 0"
          >产液较昨日<span style="color: #e62c2c" class="el-icon-bottom">{{
            this.LiquidProdIncrease
          }}</span>
          m<sup>3</sup></span
        >
        <span class="proTeam_left_oilWell_dec" v-if="this.oilIncrease > 0"
          >产油较昨日<span style="color: #2cab6f" class="el-icon-top">{{
            this.oilIncrease
          }}</span>
          m<sup>3</sup></span
        >
        <span class="proTeam_left_oilWell_dec" v-if="this.oilIncrease < 0"
          >产油较昨日<span style="color: #e62c2c" class="el-icon-bottom">{{
            this.oilIncrease
          }}</span>
          m<sup>3</sup></span
        >
      </div>
      <div class="proTeam_left_waterWell">
        <span class="proTeam_left_oilWell_title">
          <i
            class="iconfont icon-ziyuan50ldpi"
            style="color: white; font-size: 16px; margin: 0 1% 0 25%"
          />
          水井
        </span>
        <span class="proTeam_left_oilWell_dec"
          >总井：<span style="color: #2cab6f">{{
            this.waterData.waterTeamCount
          }}</span>
          口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >开井：<span style="color: #2cab6f">{{
            this.waterData.waterTeamOpenCount
          }}</span>
          口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >异常：<span style="color: #e62c2c">{{
            this.waterData.abnormalCount
          }}</span>
          口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >配注：<span style="color: #2cab6f">{{
            this.waterData.drInjectionAllocation
          }}</span>
          m<sup>3</sup></span
        >
        <span class="proTeam_left_oilWell_dec"
          >注水：<span style="color: #2cab6f">{{
            this.waterData.drWaterInjection
          }}</span>
          m<sup>3</sup></span
        >
      </div>
      <div class="proTeam_left_video">
        <span class="proTeam_left_oilWell_title">
          <i
            class="iconfont icon-shipin"
            style="color: white; font-size: 18px; margin: 0 1% 0 25%"
          />
          视频</span
        >
        <span class="proTeam_left_oilWell_dec"
          >正常：<span style="color: #2cab6f">{{ this.videoData }}</span>
          处</span
        >
        <span class="proTeam_left_oilWell_dec"
          >异常：<span style="color: #ec8e25">0</span> 处</span
        >
        <span class="proTeam_left_oilWell_dec"
          >损坏：<span style="color: #e62c2c">0</span> 处</span
        >
      </div>
    </div>
    <div class="proTeam_container">
      <div class="proTeam_container_top">
        <div class="proTeam_container_top_title">东仁沟采油队生产监控</div>
      </div>
      <div class="proTeam_container_station">
        <div
          v-for="(item, index) in this.stationData"
          :key="index"
          class="proTeam_container_station_details"
        >
          <div class="proTeam_container_station_details_top">
            <div class="proTeam_container_station_details_top_title">
              {{ item.oilStationName }}
            </div>
          </div>
          <div class="proTeam_container_station_details_container">
            <div class="proTeam_container_station_details_container_left">
              <i
                class="iconfont icon-yujing_gaoliang proTeam_container_station_details_container_left_icon"
              />
              <el-tooltip class="item" effect="light">
                <img
                  src="../../assets/images/teamStation.png"
                  class="proTeam_container_station_details_container_left_img"
                />
                <div slot="content">
                  <table class="proTeam_table">
                    <tr>
                      <td rowspan="3">油井</td>
                      <td colspan="3">
                        总:
                        <span style="color: green">{{ item.wellCount }}</span
                        >口 开:
                        <span style="color: green">{{
                          item.wellOpenCount
                        }}</span
                        >口 异常:
                        <span style="color: red">{{ item.abnormalCount }}</span
                        >口
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3">
                        产液:
                        <span style="color: green">{{ item.drLiquidProd }}</span
                        >m<sup>3</sup> 产油:
                        <span style="color: green">{{ item.drOilProd }}</span
                        >m<sup>3</sup>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <div v-if="item.drYesterdayLiquidProd > 0">
                          产液较昨日
                          <span style="color: green" class="el-icon-top">{{
                            item.drYesterdayLiquidProd
                          }}</span
                          >m<sup>3</sup>
                        </div>
                        <div v-if="item.drYesterdayLiquidProd < 0">
                          产液较昨日<span
                            style="color: red"
                            class="el-icon-bottom"
                            >{{ item.drYesterdayLiquidProd }}</span
                          >m<sup>3</sup>
                        </div>
                        <div v-if="item.drYesterdayOilProd > 0">
                          产油较昨日
                          <span style="color: green" class="el-icon-top">{{
                            item.drYesterdayOilProd
                          }}</span
                          >m<sup>3</sup>
                        </div>
                        <div v-if="item.drYesterdayOilProd < 0">
                          产油较昨日
                          <span style="color: red" class="el-icon-bottom">{{
                            item.drYesterdayOilProd
                          }}</span
                          >m<sup>3</sup>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td rowspan="3">水井</td>
                      <td colspan="3">
                        总:
                        <span style="color: green">{{ item.waterCount }}</span
                        >口 开:
                        <span style="color: green">{{
                          item.waterOpenCount
                        }}</span
                        >口 异常:
                        <span style="color: red">{{
                          item.abnormalWaterCount
                        }}</span
                        >口
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3">
                        配注:
                        <span style="color: green">{{
                          item.drInjectionAllocation
                        }}</span
                        >m<sup>3</sup> 注水:
                        <span style="color: green">{{
                          item.drWaterInjection
                        }}</span
                        >m<sup>3</sup>
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
                        }}</span
                        >处 损坏: <span style="color: #f90">0</span>处 预警:
                        <span style="color: red">0</span>处
                      </td>
                    </tr>
                  </table>
                </div>
              </el-tooltip>
            </div>
            <div class="proTeam_container_station_details_container_right">
              <div
                class="proTeam_container_station_details_container_right_dec"
              >
                <span
                  class="proTeam_container_station_details_container_right_dec_span"
                  >产液：<span style="color: #2cab6f">{{
                    item.drLiquidProd
                  }}</span>
                  m<sup>3</sup></span
                >
                <span
                  class="proTeam_container_station_details_container_right_dec_span"
                  >注水：<span style="color: #2cab6f">{{
                    item.drWaterInjection
                  }}</span>
                  m<sup>3</sup></span
                >
                <span
                  class="proTeam_container_station_details_container_right_dec_span"
                  >异常：<span style="color: #e62c2c"
                    >{{ item.abnormalCount }}+{{
                      item.abnormalWaterCount
                    }}</span
                  >
                  处</span
                >
                <span
                  class="proTeam_container_station_details_container_right_dec_span"
                  >预警：<span style="color: #ec8e25"
                    >{{ item.abnormalCount }}+{{
                      item.abnormalWaterCount
                    }}</span
                  >
                  处</span
                >
              </div>
              <i
                class="iconfont icon-icon-- proTeam_container_station_details_container_right_icon"
                @click="gotoStation(item.oilStationId, item.oilStationName)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableFlag: false,
      // 油井汇总
      oilData: {},
      // 水井汇总
      waterData: {},
      // 产油变化量
      oilIncrease: "",
      // 产液变化量
      LiquidProdIncrease: "",
      // 视频汇总
      videoData: "",
      // 采油站
      stationData: [],
    };
  },
  created() {
    this.teamInit();
  },
  methods: {
    // 油井汇总
    teamInit() {
      this.getRequest(
        "/teams/team/listTeamCount?productionTeamId=1&sTime=2020-12-02"
      ).then((resp) => {
        if (resp) {
          this.oilData = resp.data.teamInfo;
          this.waterData = resp.data.teamWater;
          this.LiquidProdIncrease = (
            resp.data.teamInfo.drLiquidProd -
            resp.data.teamInfo.drYesterdayLiquidProd
          ).toFixed(3);
          this.oilIncrease = (
            resp.data.teamInfo.drOilProd - resp.data.teamInfo.drYesterdayOilProd
          ).toFixed(3);
          this.stationData = resp.data.teamInfoList;
          this.videoData = resp.data.videoTeamCount;
        }
      });
    },
    // 点击跳转到采油站
    gotoStation(val1, val2) {
      this.$router.push({
        path: "/unattended/oilStation",
        query: {
          id: val1,
          name: val2,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/unattended/proTeam.css";
</style>
<style>
.proTeam_table td {
  border: 1px solid #8dbeb0;
  border-style: dashed;
  white-space: nowrap;
}
.el-tooltip__popper {
  width: 15% !important;
  border: none;
}
.el-tooltip__popper.is-light {
  background-color: #ebeef5;
  border: none;
}
</style>
