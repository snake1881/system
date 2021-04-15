<template>
  <div class="currentTile">
    <el-form class="currentTile_form" :model="currentTileForm" :inline="true">
      <el-form-item>
        <el-select
          placeholder="采油站"
          v-model="currentTileForm.oilStation"
          size="medium"
        >
          <el-option
            v-for="item in oilStationOptions"
            :key="item.oilStationId"
            :label="item.oilStationName"
            :value="item.oilStationId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          placeholder="井号"
          v-model="currentTileForm.wellId"
          size="medium"
        >
          <el-option
            v-for="item in wellNameoptions"
            :key="item.wellId"
            :label="item.wellName"
            :value="item.wellId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          type="date"
          placeholder="开始时间"
          v-model="currentTileForm.startTime"
          value-format="yyyy-MM-dd"
          size="medium"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          type="date"
          placeholder="结束时间"
          v-model="currentTileForm.endTime"
          value-format="yyyy-MM-dd"
          size="medium"
        />
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="searchCurrentTile()"
        >查询</el-button
      >
    </el-form>
    <!-- 电流平铺图 -->
    <div class="currentTile_charts">
      <div
        class="currentTile_charts_content"
        v-for="(item, index) in currentTileTable"
        :key="index"
      >
        <div class="currentTile_charts_content_left">电流平铺图形</div>
        <div class="currentTile_charts_content_right">
          <span class="currentTile_charts_content_right_span"
            >隶属单位：{{ item.oilStationName }}</span
          >
          <span class="currentTile_charts_content_right_span"
            >井号：{{ item.wellName }}</span
          >

          <span class="currentTile_charts_content_right_span"
            >冲程： {{ item.stroke }}</span
          >
          <span class="currentTile_charts_content_right_span"
            >冲次：{{ item.frequency }}</span
          >
          <span class="currentTile_charts_content_right_span"
            >测试日期： {{ item.testTime }}</span
          >
          <span class="currentTile_charts_content_right_span"
            >上行最大：{{ item.maxElectric }}</span
          >
          <span class="currentTile_charts_content_right_span"
            >下行最大：{{ item.minElectric }}</span
          >
          <span class="currentTile_charts_content_right_span"
            >平衡度：{{ item.tPhaseEqualizationRatio }}</span
          >
          <div>
            <el-button
              type="primary"
              size="mini"
              plain
              @click="showCurrentTile()"
              >放大显示</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="currentTile_page">底部分页</div>
    <!-- 放大显示 -->
    <el-dialog
      title="电流图形"
      width="45%"
      center
      :visible="showCurrentTileVisible"
      :before-close="showCurrentTileClose"
    >
      <el-row>
        <el-button type="info" plain size="small" style="float: right"
          >电流图叠加</el-button
        >
      </el-row>
      <div class="currentTileDidlog">
        <div class="currentTile_charts_content_left">电流平铺图形</div>
        <div class="currentTile_charts_content_right">
          <span class="currentTile_charts_content_right_span"
            >隶属单位：1766站</span
          >
          <span class="currentTile_charts_content_right_span"
            >井号：定1764-1</span
          >
          <span class="currentTile_charts_content_right_span">冲程：4m </span>
          <span class="currentTile_charts_content_right_span"
            >冲次：3.77/min</span
          >
          <span class="currentTile_charts_content_right_span"
            >测试日期：2021/4/14
          </span>
          <span class="currentTile_charts_content_right_span"
            >上行最大：26.6A</span
          >
          <span class="currentTile_charts_content_right_span"
            >下行最大：36.2A</span
          >
          <span class="currentTile_charts_content_right_span"
            >平衡度：136.29%</span
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentTileForm: {
        oilStation: "",
        wellId: "",
        startTime: "",
        endTime: "",
      },
      currentTileTable: [
        {
          wellId: "1",
          oilStationName: "1766站",
          wellName: "定1764-1",
          //   井号
          testTime: "2021/4/14",
          stroke: "4m",
          frequency: "3.77/min",
          maxElectric: "26.6A",
          minElectric: "36.2A",
          tPhaseEqualizationRatio: "136.29",
        },
        {
          wellId: "1",
          oilStationName: "1766站",
          wellName: "定1764-1",
          //   井号
          testTime: "2021-4-14",
          stroke: "4m",
          frequency: "3.77/min",
          maxElectric: "26.6A",
          minElectric: "36.2A",
          tPhaseEqualizationRatio: "136.29",
        },
        {
          wellId: "1",
          oilStationName: "1766站",
          wellName: "定1764-1",
          //   井号
          testTime: "2021-4-14",
          stroke: "4m",
          frequency: "3.77/min",
          maxElectric: "26.6A",
          minElectric: "36.2A",
          tPhaseEqualizationRatio: "136.29",
        },
        {
          wellId: "1",
          oilStationName: "1766站",
          wellName: "定1764-1",
          //   井号
          testTime: "2021-4-14",
          stroke: "4m",
          frequency: "3.77/min",
          maxElectric: "26.6A",
          minElectric: "36.2A",
          tPhaseEqualizationRatio: "136.29",
        },
        {
          wellId: "1",
          oilStationName: "1766站",
          wellName: "定1764-1",
          //   井号
          testTime: "2021-4-14",
          stroke: "4m",
          frequency: "3.77/min",
          maxElectric: "26.6A",
          minElectric: "36.2A",
          tPhaseEqualizationRatio: "136.29",
        },
        {
          wellId: "1",
          oilStationName: "1766站",
          wellName: "定1764-1",
          //   井号
          testTime: "2021-4-14",
          stroke: "4m",
          frequency: "3.77/min",
          maxElectric: "26.6A",
          minElectric: "36.2A",
          tPhaseEqualizationRatio: "136.29",
        },
        {
          wellId: "1",
          oilStationName: "1766站",
          wellName: "定1764-1",
          //   井号
          testTime: "2021-4-14",
          stroke: "4m",
          frequency: "3.77/min",
          maxElectric: "26.6A",
          minElectric: "36.2A",
          tPhaseEqualizationRatio: "136.29",
        },
        {
          wellId: "1",
          oilStationName: "1766站",
          wellName: "定1764-1",
          //   井号
          testTime: "2021-4-14",
          stroke: "4m",
          frequency: "3.77/min",
          maxElectric: "26.6A",
          minElectric: "36.2A",
          tPhaseEqualizationRatio: "136.29",
        },
      ],
      // 所有采油站
      oilStationOptions: [],
      // 所有井号
      wellNameoptions: [],
      //   放大显示
      showCurrentTileVisible: false,
    };
  },
  created() {
    this.queryOrgName();
    this.wellInforInit();
  },
  methods: {
    //搜索
    searchCurrentTile() {},
    //获取所有采油站信息
    queryOrgName() {
      this.getRequest("/basOilStationInfor/oilStationOptions").then((resp) => {
        if (resp) {
          this.oilStationOptions = resp.data;
          let oilAll = {
            oilStationId: "",
            oilStationName: "全站",
          };
          this.oilStationOptions.push(oilAll);
        }
      });
    },
    // 获取所有井号信息
    wellInforInit() {
      this.getRequest("/basWellInfor/selectOptionsAll").then((resp) => {
        if (resp) {
          this.wellNameoptions = resp.data;
        }
      });
    },
    // 放大显示图形
    showCurrentTile() {
      this.showCurrentTileVisible = true;
    },
    showCurrentTileClose() {
      this.showCurrentTileVisible = false;
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/knowledge/currentTile.css";
</style>
<style>
.el-dialog__header,
.el-dialog__body {
  border-bottom: 1px solid #e6e7e9;
}
.el-dialog__title {
  font-size: 16px;
  color: #3c4a54;
}
</style>