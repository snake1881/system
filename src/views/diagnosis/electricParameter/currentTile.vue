<template>
  <div class="currentTile">
    <el-form class="currentTile_form" :model="currentTileForm" :inline="true">
      <el-form-item>
        <el-select
          placeholder="采油站"
          filterable
          clearable
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
          filterable
          clearable
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
        v-for="item in currentTileTable"
        :key="item.elepaId"
      >
        <div
          class="currentTile_charts_content_left"
          :key="item.elepaId"
          :id="item.elepaId"
        ></div>
        <div class="currentTile_charts_content_right">
          <span class="currentTile_charts_content_right_span"
            >隶属单位：{{ item.oilStationName }}</span
          >
          <span class="currentTile_charts_content_right_span"
            >井号：{{ item.wellName }}</span
          >

          <span class="currentTile_charts_content_right_span"
            >冲程： {{ item.stroke }}m</span
          >
          <span class="currentTile_charts_content_right_span"
            >冲次：{{ item.frequency }}/min</span
          >
          <span class="currentTile_charts_content_right_span"
            >测试日期： {{ item.testTime }}</span
          >
          <span class="currentTile_charts_content_right_span"
            >上行最大：{{ item.maxElectric }} A</span
          >
          <span class="currentTile_charts_content_right_span"
            >下行最大：{{ item.minElectric }} A</span
          >
          <span class="currentTile_charts_content_right_span"
            >平衡度：{{ item.tphaseEqualizationRatio }}%</span
          >
          <div>
            <el-button
              type="primary"
              size="mini"
              plain
              @click="showCurrentTile(item)"
              >放大显示</el-button
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="currentTile_page">
      <el-pagination
        :current-page.sync="currentTileForm.currentPage"
        :page-size="currentTileForm.pageSize"
        :total="total"
        :page-sizes="[8, 16, 32, 48, 60]"
        layout="total, prev, pager, next, jumper, sizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 查看功图 -->
    <cunnrent-tile-enlarge
      :currentTileVisible="showCurrentTileVisible"
      :currentElectricryData="currentElectricryData"
      @showCurrentTileClose="showCurrentTileClose"
    />
  </div>
</template>

<script>
import cunnrentTileEnlarge from "../../../components/diagnosis/electricParameter/cunnrentTileEnlarge";
let echarts = require("echarts/lib/echarts");
export default {
  components: {
    cunnrentTileEnlarge,
  },
  data() {
    return {
      currentTileForm: {
        oilStation: "",
        wellId: "",
        startTime: "",
        endTime: "",
        currentPage: 1,
        pageSize: 8,
      },
      //电流图总数目
      total: 0,
      currentTileTable: [],
      // 所有采油站
      oilStationOptions: [],
      // 所有井号
      wellNameoptions: [],
      //   放大显示
      showCurrentTileVisible: false,
      //绘图数据处理
      coordinates: [[]],
      //放大显示数据
      currentElectricryData: {},
    };
  },
  created() {
    this.queryOrgName();
    this.wellInforInit();
    this.searchCurrentTile();
  },
  methods: {
    // previewGtmj(val) {
    //   this.currentElectricryData = val;
    //   this.showCurrentTileVisible = true;
    // },
    // // 关闭功图
    // previewGtmjClose() {
    //   this.showCurrentTileVisible = false;
    // },
    //搜索
    searchCurrentTile() {
      this.getRequest(
        "/tile/electric/selectElectTile?beginTime=" +
          this.currentTileForm.startTime +
          "&currentPage=" +
          this.currentTileForm.currentPage +
          "&endTime=" +
          this.currentTileForm.endTime +
          "&oilStationId=" +
          this.currentTileForm.oilStation +
          "&pageSize=" +
          this.currentTileForm.pageSize +
          "&wellId=" +
          this.currentTileForm.wellId
      ).then((resp) => {
        if (resp) {
          this.currentTileTable = resp.data.records;
          this.total = resp.data.total;
          this.currentTileTable.forEach((element) => {
            //延迟到DOM更新之后再执行绘制图形
            this.$nextTick(function () {
              //处理数据为坐标
              this.coordinate(element);
              //将处理后的坐标添加到对象中
              this.$set(element, "coordinates", this.coordinates);
              //实例化echarts
              this.drawLine(element);
            });
          });
        }
      });
    },
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
    //实例化图表
    drawLine(val) {
      // let _self = this;
      let dom = document.getElementById(val.elepaId);
      let myChart = echarts.init(dom);
      myChart.setOption({
        title: {
          x: "center",
          text: "电流(A)/位移(M)",
          top: "7%",
          textStyle: {
            fontSize: 13,
            fontStyle: "normal",
            fontWeight: "bolder",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
          formatter: function (params) {
            return (
              "<div><p>位移：" +
              params[0].value[0] +
              "M</p>" +
              "<p>电流：" +
              params[0].value[1] +
              "</p>" +
              "</div>"
            );
          },
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "15%",
          top: "20%",
          containLabel: true,
        },
        xAxis: {
          name: "位移(M)",
          nameLocation: "middle",
          min: 0,
          max: 4,
          type: "value",
          axisLine: { onZero: false },
          nameTextStyle: {
            padding: [10, 250, 0, 0],
            fontSize: 10,
          },
        },
        yAxis: {
          nameLocation: "middle",
          type: "value",
          min: function (value) {
            return Math.round(value.min - 2);
          },
          max: function (value) {
            return Math.round(value.max + 2);
          },
          axisLine: { onZero: false },
          nameTextStyle: {
            padding: [0, 0, 3, 0],
            fontSize: 8,
          },
        },
        series: [
          {
            symbol: "none",
            data: val.coordinates,
            type: "line",
            smooth: true,
            lineStyle: {
              width: 1.5,
            },
          },
        ],
      });
    },
    //将坐标数据串处理为坐标点
    coordinate(val) {
      //每次处理之前保证坐标数组集合为空
      this.coordinates = [[]];
      var displacementSetElectArray = val.displacementSetElect.split(";");
      var electricitySetArray = val.electricitySet.split(";");
      for (var i = 0; i < displacementSetElectArray.length; i++) {
        this.coordinates[i] = [];
        this.coordinates[i][0] = parseFloat(displacementSetElectArray[i]);
        this.coordinates[i][1] = parseFloat(electricitySetArray[i]);
      }
      return this.coordinates;
    },

    // 放大显示图形
    showCurrentTile(val) {
      // console.log(val);
      this.currentElectricryData = val;
      // this.currentDrawLine();
      this.showCurrentTileVisible = true;
    },
    showCurrentTileClose() {
      this.showCurrentTileVisible = false;
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.currentTileForm.pageSize = val;
      this.searchCurrentTile();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentTileForm.currentPage = val;
      this.searchCurrentTile();
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