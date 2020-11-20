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
            this.stationData.wellCount
          }}</span>
          口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >开井：<span style="color: green">{{
            this.stationData.wellOpenCount
          }}</span>
          口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >异常：<span style="color: red">0</span> 口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >产液：<span style="color: green">{{
            this.stationData.stationWellInfoList1[0].drLiquidProd
          }}</span>
          m<sup>3</sup></span
        >
        <span class="proTeam_left_oilWell_dec"
          >产油：<span style="color: green">{{
            this.stationData.stationWellInfoList1[0].drOilProd
          }}</span>
          m<sup>3</sup></span
        >
        <span class="proTeam_left_oilWell_dec"
          >产液较昨日
          <span style="color: green" class="el-icon-top">{{
            this.LiquidProdIncrease
          }}</span>
          m<sup>3</sup></span
        >
        <span class="proTeam_left_oilWell_dec"
          >产油较昨日
          <span style="color: green" class="el-icon-top">{{
            this.oilIncrease
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
            this.stationData.waterCount
          }}</span>
          口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >开井：<span style="color: green">{{
            this.stationData.waterOpenCount
          }}</span>
          口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >异常：<span style="color: red">0</span> 口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >配注：<span style="color: green">{{
            this.stationData.stationWaterWellInfoList1[0].drInjectionAllocation
          }}</span>
          m<sup>3</sup></span
        >
        <span class="proTeam_left_oilWell_dec"
          >注水：<span style="color: green">{{
            this.stationData.stationWaterWellInfoList1[0].drWaterInjection
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
        v-for="(item, index) in this.allStation"
        :key="index"
        class="oilStation_container_details"
      >
        <div class="proTeam_container_details_top">
          <span class="proTeam_container_details_top_span">{{
            item.wellSitName
          }}</span>
          <img
            src="../../assets/images/station.png"
            class="proTeam_container_details_top_img"
            @click="gotoWellsite(item.wellSitName)"
          />
        </div>
        <div class="proTeam_container_details_container">
          <el-row>
            <el-col :span="12">
              <span class="proTeam_container_details_container_dec"
                >开井：<span style="color: green">{{ item.wellCount }}</span> 口
              </span>
            </el-col>
            <el-col :span="12">
              <span class="proTeam_container_details_container_dec"
                >停井：<span style="color: red">0</span> 口
              </span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span class="proTeam_container_details_container_dec"
                >产油：<span style="color: green">{{ item.drOilProd }}</span
                >m<sup>3</sup></span
              >
            </el-col>
            <el-col :span="12">
              <span class="proTeam_container_details_container_dec"
                >产液：<span style="color: green">{{ item.drLiquidProd }}</span>
                m<sup>3</sup></span
              >
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span class="proTeam_container_details_container_dec"
                >异常：<span style="color: red">0</span> 口
              </span>
            </el-col>
            <el-col :span="12">
              <span class="proTeam_container_details_container_dec"
                >预警：<span style="color: orange">0</span> 处
              </span>
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
      // 站组汇总数据
      stationData: [],
      // 产液变化量
      LiquidProdIncrease: "",
      // 产油变化量
      oilIncrease: "",
      // 视频
      stationVideo: "",
      // 井场汇总
      allStation: [],
    };
  },
  created() {
    this.stationInit();
    this.stationVideoInit();
  },
  methods: {
    // 站组汇总信息
    stationInit() {
      this.getRequest(
        "/stations/station/listSitPage?oilStationName=" +
          this.$route.query.name +
          "&sTime=2020-11-19"
      ).then((resp) => {
        if (resp) {
          this.stationData = resp.data;
          this.allStation = resp.data.stationWellInfoList;
          this.LiquidProdIncrease = (
            resp.data.stationWellInfoList1[0].drLiquidProd -
            resp.data.stationWellInfoList1[0].drYesterdayLiquidProd
          ).toFixed(3);
          this.oilIncrease = (
            resp.data.stationWellInfoList1[0].drOilProd -
            resp.data.stationWellInfoList1[0].drYesterdayOilProd
          ).toFixed(3);
        }
      });
    },
    // 视频
    stationVideoInit() {
      this.getRequest(
        "/unattended/monitoring/getStationVideoCount?stationId=202010270004"
      ).then((resp) => {
        if (resp) {
          this.stationVideo = resp.data;
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
