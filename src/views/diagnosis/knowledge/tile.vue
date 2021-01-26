<template>
  <div class="tile">
    <!-- 条件查询 -->
    <el-form class="tile_form" :model="logForm" :inline="true">
      <el-form-item>
        <el-select
          filterable
          clearable
          @change="queryWellNameByOrgName"
          v-model="logForm.oilStation"
          placeholder="采油站"
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
          filterable
          clearable
          v-model="logForm.wellId"
          placeholder="井号"
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
          filterable
          clearable
          placeholder="开始时间"
          v-model="logForm.startTime"
          value-format="yyyy-MM-dd"
          size="medium"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          type="date"
          filterable
          clearable
          placeholder="结束时间"
          v-model="logForm.endTime"
          value-format="yyyy-MM-dd"
          size="medium"
        />
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="searchTile()"
        >查询</el-button
      >
    </el-form>

    <div class="tile_echarts">
      <div
        v-for="item in tableData"
        :key="item.inddsId"
        :style="{ width: '25%', height: '40%' }"
      >
        <div
          class="tile_echarts_child"
          :key="item.inddsId"
          :id="item.inddsId"
        />
      </div>
    </div>

    <!-- 分页 -->
    <div class="tile_page">
      <el-pagination
        :current-page.sync="logForm.currentPage"
        :page-size="logForm.pageSize"
        :total="logForm.total"
        :page-sizes="[8, 16, 32, 48, 60]"
        layout="total, prev, pager, next, jumper, sizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 新增 -->
  </div>
</template>
<script>
import CommonAddTile from "../../../components/diagnosis/knowledge/CommonAddTile";
let echarts = require("echarts/lib/echarts");
export default {
  components: {
    CommonAddTile,
  },
  data() {
    return {
      //搜索框
      logForm: {
        currentPage: 1,
        pageSize: 8,
        total: 0,
        oilStation: "",
        wellId: "",
        startTime: "",
        endTime: "",
      },
      addTileVisible: false,
      wellNameoptions: [],
      oilStationOptions: [],
      addTileData: {},
      tableData: [],
      coordinates: [[]],
    };
  },
  mounted() {},
  created() {
    this.getdate();
    this.searchTile();
    //输入框初始化默认时间
    this.queryOrgName();
  },
  methods: {
    //根据输入信息查询
    searchTile() {
      this.getRequest(
        "/diagnosis/knowledge/gttile/selectByTerm?current=" +
          this.logForm.currentPage +
          "&endTime=" +
          this.logForm.endTime +
          "&pageSize=" +
          this.logForm.pageSize +
          "&startTime=" +
          this.logForm.startTime +
          "&wellId=" +
          this.logForm.wellId
      ).then((resp) => {
        if (resp) {
          this.tableData = resp.data.records;
          this.logForm.total = resp.data.total;
          this.logForm.currentPage = resp.data.current;
          this.logForm.pageSize = resp.data.size;
          this.tableData.forEach((element) => {
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
    //获取采油站信息
    queryOrgName() {
      this.getRequest("/basOilStationInfor/oilStationOptions").then((resp) => {
        if (resp) {
          this.oilStationOptions = resp.data;
        }
      });
    },
    //获取采油站井名称
    queryWellNameByOrgName(val) {
      this.getRequest("/basWellInfor/listByStation?oidStationId=" + val).then(
        (resp) => {
          if (resp) {
            this.wellNameoptions = resp.data;
          }
        }
      );
    },
    //获取当前日期
    getdate() {
      var curDate = new Date();
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var strDate = date.getDate();
      strDate = strDate < 10 ? "0" + strDate : strDate;
      this.logForm.endTime= year + "-" + month + "-" + strDate;
      var date1 = new Date();
      date1.setTime(date.getTime() - 1 * 24 * 60 * 60 * 1000);
      var year1 = date1.getFullYear();
      var month1 = date1.getMonth() + 1;
      month1 = month1 < 10 ? "0" + month1 : month1;
      var day1 = date1.getDate();
      day1 = day1 < 10 ? "0" + day1 : day1;
      this.logForm.startTime = year1 + "-" + month1 + "-" + day1;
     
    },
    //设置初始化时间
    getNowTime() {},
    //实例化图表
    drawLine(val) {
      let dom = document.getElementById(val.inddsId);
      let myChart = echarts.init(dom);
      myChart.setOption({
        title: {
          x: "center",
          text: "井号：" + val.wellName + "  时间：" + val.acquisitionTime,
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
              "<p>载荷：" +
              params[0].value[1] +
              "KN</p>" +
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
          name: "载荷(KN)",
          nameLocation: "middle",
          type: "value",
          axisLine: { onZero: false },
          nameTextStyle: {
            padding: [0, 0, 6, 0],
            fontSize: 10,
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
      var displacementArray = val.displacementSet.split(";");
      var disploadArray = val.loadSet.split(";");
      for (var i = 0; i < displacementArray.length; i++) {
        this.coordinates[i] = [];
        this.coordinates[i][0] = parseFloat(displacementArray[i]);
        this.coordinates[i][1] = parseFloat(disploadArray[i]);
      }
      return this.coordinates;
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.logForm.pageSize = val;
      this.searchTile();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.logForm.currentPage = val;
      this.searchTile();
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/knowledge/tile.css";
</style>
