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
          <!-- <i class="el-icon-map-location" />
          <span> GIS地图 </span> -->
          <!-- 
          amap-manager： 地图管理对象
          vid：地图容器节点的ID
          zooms： 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
          center： 地图中心点坐标值
          plugin：地图使用的插件
          events： 事件
           -->
        <el-amap 
          ref="map" vid="amapDemo" 
          :amap-manager="amapManager"  
        />
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
import { AMapManager } from "vue-amap";
let amapManager = new AMapManager()
export default {
  data() {
    return {
      amapManager,
    }
  },
  created(){
    console.log(this.amapManager);
  }
};
</script>

<style lang="less" scoped>
  @import '../assets/css/home/index.css';
</style>
