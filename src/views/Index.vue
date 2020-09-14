<template>
  <div class="main">
    <div class="main_between">
      <el-card class="main_between_1" shadow="hover">
        <div class="main_between_1_item">
          <p style="text-align: center;font-size: 18px">基本信息</p>
        </div>
      </el-card>
      <el-card class="main_between_2" shadow="hover">
        <div class="main_between_2_item">
          <i class="el-icon-pie-chart" />
          <span> 数据统计 </span>
        </div>
      </el-card>
    </div>
    <div class="main_middle">
      <el-card class="main_middle_1" shadow="hover">
        <div class="main_middle_1_item">
          <i class="el-icon-map-location" />
          <span> GIS地图 </span>
        </div>
      </el-card>
      <el-card class="main_middle_2" shadow="hover">
        <div class="main_middle_2_item">
          <i class="el-icon-truck" />
          <span> 车辆投入 </span>
        </div>
      </el-card>
    </div>
    <div class="main_between">
      <el-card class="main_between_1" shadow="hover">
        <div class="main_between_1_item">
          <i class="el-icon-chat-line-square" />
          <span> 通知公告 </span>
        </div>
      </el-card>
      <el-card class="main_between_2" shadow="hover">
        <div class="main_between_2_item">
          <i class="el-icon-document" />
          <span> 生产进度 </span>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.main_between {
  width: 25%;
  height: 100%;
}
.main_middle {
  width: 50%;
  height: 100%;
}
.main_between_1,.main_between_2 {
  width: 96%;
  height: 46%;
  margin: 2% 2%;
}
.main_middle_1,.main_middle_2 {
  width: 96%;
  margin: 1% 2%;
}
.main_middle_1 {
  height: 56%;
}
.main_middle_2 {
  height: 36%;
}
</style>
