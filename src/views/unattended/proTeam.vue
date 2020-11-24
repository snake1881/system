<template>
  <div class="proTeam">
    <div class="proTeam_left">
      <div class="proTeam_left_title">东仁沟采油队生产监控</div>
      <div class="proTeam_left_oilWell">
        <span class="proTeam_left_oilWell_title">
          <i
            class="iconfont icon-ziyuan48ldpi"
            style="color: rgb(32, 55, 78); font-size: 18px; margin: 0 2%"
          />
          油井</span
        >
        <span class="proTeam_left_oilWell_dec"
          >总井：<span style="color: green"> {{ this.oilData.wellCount }}</span>
          口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >开井：<span style="color: green">
            {{ this.oilData.wellOpenCount }}</span
          >
          口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >异常：<span style="color: red">0</span> 口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >产液：<span style="color: green">{{
            this.oilData.drLiquidProd
          }}</span>
          m<sup>3</sup></span
        >
        <span class="proTeam_left_oilWell_dec"
          >产油：<span style="color: green">{{ this.oilData.drOilProd }}</span>
          m<sup>3</sup></span
        >
        <span class="proTeam_left_oilWell_dec"
          >产液较昨日<span style="color: green" class="el-icon-top">{{
            this.oilData.compareYesterdayLiquidProd
          }}</span>
          m<sup>3</sup></span
        >
        <span class="proTeam_left_oilWell_dec"
          >产油较昨日<span style="color: green" class="el-icon-top">{{
            this.oilData.compareYesterdayOilProd
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
            this.waterData.waterCount
          }}</span>
          口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >开井：<span style="color: green">{{
            this.waterData.waterCount
          }}</span>
          口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >异常：<span style="color: red">0</span> 口</span
        >
        <span class="proTeam_left_oilWell_dec"
          >配注：<span style="color: green">{{
            this.waterData.drInjectionAllocation
          }}</span>
          m<sup>3</sup></span
        >
        <span class="proTeam_left_oilWell_dec"
          >注水：<span style="color: green">{{
            this.waterData.drWaterInjection
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
          >正常：<span style="color: green">{{ this.videoData }}</span> 处</span
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
        v-for="(item, index) in this.stationData"
        :key="index"
        class="proTeam_container_details"
      >
        <div class="proTeam_container_details_left">
          <span class="proTeam_container_details_left_span">{{
            item.oilStationName
          }}</span>
          <i
            class="iconfont icon-yujing_gaoliang proTeam_container_details_left_icon"
          />
          <el-tooltip class="item" effect="light">
            <img
              src="../../assets/images/teamStation.png"
              class="proTeam_container_details_left_img"
            />
            <div slot="content">
              <table style="width: 100%; height: 100%">
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
                  <td colspan="3">较昨日**m<sup>3</sup></td>
                </tr>
                <tr>
                  <td rowspan="3">水井</td>
                  <td colspan="3">
                    总: <span style="color: green">{{ item.waterCount }}</span
                    >口 开:
                    <span style="color: green">{{ item.waterCount }}</span
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
                    正常<span style="color: green">{{ item.videoCount }}</span
                    >处 损坏<span style="color: #f90">0</span>处 预警<span
                      style="color: red"
                      >0</span
                    >处
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
            >注水：<span style="color: green">0</span> m<sup>3</sup></span
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
          @click="gotoStation(item.oilStationName)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableFlag: false,
      positionStyle: {
        top: "20%",
        left: "20%",
      },
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
        "/teams/team/listTeamSource?productionTeamName=%E4%B8%9C%E4%BB%81%E6%B2%9F%E9%87%87%E6%B2%B9%E9%98%9F&sTime=2020-11-19"
      ).then((resp) => {
        if (resp) {
          this.oilData = resp.data.teamOilCollectVo;
          this.waterData = resp.data.teamWaterCollectVo;
          // this.LiquidProdIncrease = (
          //   resp.data.teamOilCollectVo.drLiquidProd -
          //   resp.data.teamOilCollectVo.drYesterdayLiquidProd
          // ).toFixed(3);
          // this.oilIncrease = (
          //   resp.data.teamOilCollectVo.drOilProd -
          //   resp.data.teamOilCollectVo.drYesterdayOilProd
          // ).toFixed(3);
          this.stationData = resp.data.oilWaterVideoCollectVos;
          this.videoData = resp.data.teamVideoCollectVo.videoCount;
        }
      });
    },
    // 点击跳转到采油站
    gotoStation(val) {
      this.$router.push({
        path: "/unattended/oilStation",
        query: {
          name: val,
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
.proTeam_top tr,
td {
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
