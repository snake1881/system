<template>
  <div class="survey">
    <div class="survey_header">
      <el-button
        @click="gotoIndex()"
        class="survey_header_button"
        type="text"
        icon="el-icon-right"
        >进入系统</el-button
      >
    </div>
    <div class="survey_content">
      <div class="survey_content_left">
        <el-card>
          <div slot="header">
            <span class="card_header">油水井诊断</span>
          </div>
          <img src="../assets/images/survey_one.png" class="card_left_image" />
        </el-card>
        <el-card>
          <div slot="header">
            <span class="card_header">无人值守</span>
          </div>
          <img src="../assets/images/survey_two.png" class="card_left_image" />
        </el-card>
        <el-card>
          <div slot="header">
            <span class="card_header">井下作业</span>
          </div>
          <img
            src="../assets/images/survey_three.png"
            class="card_left_image"
          />
        </el-card>
      </div>
      <div class="survey_content_middle">
        <div class="survey_content_middle_map">
          <div class="survey_content_middle_map_title">
            东仁沟采油队四春圈-东关区域图
          </div>
          <el-amap
            vid="amapPro"
            :amap-manager="amapManager"
            :mapStyle="mapStyle"
            :zoom="zoom"
            :center="center"
            :plugin="plugin"
            class="survey_content_middle_map_chart"
          >
            <el-amap-marker
              v-for="(marker, index) in markers1"
              :key="index"
              :position="marker.tudList"
            />
            <el-amap-text
              v-for="text in markers1"
              :text="text.wellName"
              :offset="text.offset"
              :key="text.wellName"
              :position="text.tudList"
            />
          </el-amap>
        </div>
        <div class="survey_content_middle_body">
          <el-card>
            <div slot="header">
              <span class="card_header">注水井监测</span>
            </div>
            <img src="../assets/images/survey_four.png" class="card_image" />
          </el-card>
          <el-card>
            <div slot="header">
              <span class="card_header">油井监测</span>
            </div>
            <img src="../assets/images/survey_five.png" class="card_image" />
          </el-card>
          <el-card>
            <div slot="header">
              <span class="card_header">视频监控</span>
            </div>
            <img src="../assets/images/survey_six.png" class="card_image" />
          </el-card>
        </div>
      </div>
      <div class="survey_content_left">
        <el-card>
          <div slot="header">
            <span class="card_header">绩效考核</span>
          </div>
          <img src="../assets/images/survey_nine.png" class="card_left_image" />
        </el-card>
        <el-card>
          <div slot="header">
            <span class="card_header">系统管理</span>
          </div>
          <img
            src="../assets/images/survey_eight.png"
            class="card_left_image"
          />
        </el-card>
        <el-card>
          <div slot="header">
            <span class="card_header">油水井概况</span>
          </div>
          <img
            src="../assets/images/survey_seven.png"
            class="card_left_image"
          />
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import { AMapManager } from "vue-amap";
let amapManager = new AMapManager(); // 新建生成地图画布
export default {
  data() {
    return {
      amapManager,
      plugin: [
        "ToolBar",
        {
          pName: "MapType",
          defaultType: 1,
        },
      ],
      zoom: 13, // 设置初始化级别
      mapStyle: "amap://styles/57994c871bb604a4c79184f5f65d8782",
      center: [107.789816, 37.513493],
      markers1: [],
    };
  },
  created() {
    this.mapInit();
  },
  methods: {
    mapInit() {
      let array = [];
      this.getRequest("/basWellInfor/selectWellInfo").then((resp) => {
        if (resp.code === 200) {
          // 去掉经纬度为空的数据
          resp.data = resp.data.filter((item) => item.tudList[0] != null);
          resp.data.map((item) => {
            array.push(
              Object.assign(item, { visible: true, offset: [50, -40] })
            );
          });
          this.markers1 = array;
        }
      });
    },
    gotoIndex() {
      this.$router.replace("/Home");
    },
  },
};
</script>
<style lang="less" scoped>
@import "../assets/css/home/survey.css";
</style>
<style>
.survey_content .el-card {
  border: 2px solid #1a699f;
  background-color: transparent;
  box-shadow: 0 0 15px #437799 inset;
}
.survey_content .el-card__header {
  border-bottom: 2px solid #1a699f !important;
  padding: 10px 25px;
}
.survey_content_left .el-card {
  height: 31%;
  width: 100%;
  margin: 1% 0 3% 0;
}
.survey_content_middle_body .el-card {
  height: 100%;
  width: 31%;
  margin: 0 1%;
}
</style>
