<template>
  <div class="proTeam">
    <div class="proTeam_left">
      <div class="proTeam_left_title">{{ this.$route.query.name }}生产监控</div>
      <div class="proTeam_left_oilWell">
        <span class="proTeam_left_oilWell_title">
          <i
            class="iconfont icon-ziyuan48ldpi"
            style="color: rgb(32, 55, 78); font-size: 18px; margin: 0 2%"
          />
          油井</span
        >
        <span class="proTeam_left_oilWell_dec"
          >总井：<span style="color: green">{{
            this.oilStationData.wellStationCount
          }}</span>
          口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >开井：<span style="color: green">{{
            this.oilStationData.wellStationOpenCount
          }}</span>
          口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >异常：<span style="color: red">0</span> 口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >产液：<span style="color: green">{{
            this.oilStationData.drLiquidProd
          }}</span>
          m<sup>3</sup></span
        >
        <span class="proTeam_left_oilWell_dec"
          >产油：<span style="color: green">{{
            this.oilStationData.drOilProd
          }}</span>
          m<sup>3</sup></span
        >
        <span
          class="proTeam_left_oilWell_dec"
          v-if="this.LiqStationIncrease > 0"
          >产液较昨日<span style="color: green" class="el-icon-top">{{
            this.LiqStationIncrease
          }}</span>
          m<sup>3</sup></span
        >
        <span
          class="proTeam_left_oilWell_dec"
          v-if="this.LiqStationIncrease < 0"
          >产液较昨日<span style="color: red" class="el-icon-bottom">{{
            this.LiqStationIncrease
          }}</span>
          m<sup>3</sup></span
        >
        <span
          class="proTeam_left_oilWell_dec"
          v-if="this.oilStationIncrease > 0"
          >产油较昨日<span style="color: green" class="el-icon-top">{{
            this.oilStationIncrease
          }}</span>
          m<sup>3</sup></span
        >
        <span
          class="proTeam_left_oilWell_dec"
          v-if="this.oilStationIncrease < 0"
          >产油较昨日<span style="color: red" class="el-icon-bottom">{{
            this.oilStationIncrease
          }}</span>
          m<sup>3</sup></span
        >
      </div>
      <div class="proTeam_left_waterWell">
        <span class="proTeam_left_oilWell_title">
          <i
            class="iconfont icon-ziyuan50ldpi"
            style="color: rgb(32, 55, 78); font-size: 18px; margin: 0 2%"
          />
          水井
        </span>
        <span class="proTeam_left_oilWell_dec"
          >总井：<span style="color: green">{{
            this.waterStationData.waterStationCount
          }}</span>
          口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >开井：<span style="color: green">{{
            this.waterStationData.waterStationOpenCount
          }}</span>
          口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >异常：<span style="color: red">0</span> 口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >配注：<span style="color: green">{{
            this.waterStationData.drInjectionAllocation
          }}</span>
          m<sup>3</sup></span
        >
        <span class="proTeam_left_oilWell_dec"
          >注水：<span style="color: green">{{
            this.waterStationData.drWaterInjection
          }}</span>
          m<sup>3</sup></span
        >
      </div>
      <div class="proTeam_left_video">
        <span class="proTeam_left_oilWell_title">
          <i
            class="iconfont icon-shipin"
            style="color: rgb(32, 55, 78); font-size: 21px; margin: 0 2%"
          />
          视频</span
        >
        <span class="proTeam_left_oilWell_dec"
          >正常：<span style="color: green">{{ this.stationVideo }}</span>
          处</span
        >
        <span class="proTeam_left_oilWell_dec"
          >异常：<span style="color: orange">0</span> 处</span
        >
        <span class="proTeam_left_oilWell_dec"
          >损坏：<span style="color: red">0</span> 处</span
        >
      </div>
    </div>
    <div class="proTeam_container">
      <div
        v-for="(item, index) in this.wellSiteData"
        :key="index"
        class="proTeam_container_details"
      >
        <div class="proTeam_container_details_left">
          <span class="proTeam_container_details_left_span"
            >{{ item.wellSitName }}井场</span
          >
          <i
            class="iconfont icon-yujing_gaoliang proTeam_container_details_left_icon"
          />
          <el-tooltip class="item" effect="light">
            <img
              src="../../assets/images/station.png"
              class="proTeam_container_details_left_img"
            />
            <div slot="content">
              <table class="proTeam_table">
                <tr>
                  <td rowspan="3">油井</td>
                  <td colspan="3">
                    总:
                    <span style="color: green">{{ item.wellCount }}</span
                    >口 开:
                    <span style="color: green">{{ item.wellOpenCount }}</span
                    >口 异常: <span style="color: red">0</span>口
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
                    总: <span style="color: green">{{ item.waterCount }}</span
                    >口 开:
                    <span style="color: green">{{ item.waterOpenCount }}</span
                    >口 异常: <span style="color: red">0</span>口
                  </td>
                </tr>
                <tr>
                  <td colspan="3">
                    配注:
                    <span style="color: green">{{
                      item.drInjectionAllocation
                    }}</span
                    >m<sup>3</sup> 注水:
                    <span style="color: green">{{ item.drWaterInjection }}</span
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
        <div class="proTeam_container_details_right">
          <span class="proTeam_container_details_right_dec"
            >产液：<span style="color: green">{{ item.drLiquidProd }}</span>
            m<sup>3</sup></span
          >
          <span class="proTeam_container_details_right_dec"
            >注水：<span style="color: green">{{ item.drWaterInjection }}</span>
            m<sup>3</sup></span
          >
          <span class="proTeam_container_details_right_dec"
            >异常：<span style="color: red">0</span> 处</span
          >
          <span class="proTeam_container_details_right_dec"
            >预警：<span style="color: orange">0</span> 处</span
          >
        </div>
        <i
          class="iconfont icon-icon-- proTeam_container_details_icon"
          @click="gotoWellsite(item.wellSitName)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 油井
      oilStationData: {},
      // 水井
      waterStationData: {},
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
      this.getRequest(
        "/stations/station/listSitPage?oilStationId=" +
          this.$route.query.id +
          "&sTime=2020-11-18"
      ).then((resp) => {
        if (resp) {
          this.oilStationData = resp.data.stationOilWellInfo;
          this.waterStationData = resp.data.stationWaterWellInfo;
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
    // 点击跳转到采油站
    gotoWellsite(val) {
      this.$router.push({
        path: "/unattended/wellsite",
        query: {
          name: val,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/unattended/oilStation.css";
</style>
