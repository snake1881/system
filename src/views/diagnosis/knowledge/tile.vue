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
          v-if="item.show"
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
    this.wellInforInit();
    //输入框初始化默认时间
    this.queryOrgName();
  },
  methods: {
    //
    isShowChange(val) {
      if (val) {
        val = false;
      } else {
        val = true;
      }
    },
    //根据输入信息查询
    searchTile() {
      this.tableData = [];
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
            // element.push({'show':true});
            element.show = true;
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
          let oilAll = {
            oilStationId: "",
            oilStationName: "全站",
          };
          this.oilStationOptions.push(oilAll);
        }
      });
    },
    //通过采油站获取单井下拉框数据
    queryWellNameByOrgName(val) {
      if (val === "") {
        this.wellInforInit();
      } else {
        this.getRequest("/basWellInfor/selectAllById?oilStationId=" + val).then(
          (resp) => {
            if (resp) {
              this.wellNameoptions = resp.data;
            }
          }
        );
      }
    },
    //单井下拉框初始化
    wellInforInit() {
      this.getRequest("/basWellInfor/selectOptionsAll").then((resp) => {
        if (resp) {
          this.wellNameoptions = resp.data;
        }
      });
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
      this.logForm.endTime = year + "-" + month + "-" + strDate;
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
      let _self = this;
      let dom = document.getElementById(val.inddsId);
      let myChart = echarts.init(dom);
      myChart.setOption({
        title: {
          x: "left",
          text: "井号:" + val.wellName + " 时间:" + val.acquisitionTime,
          top: "7%",
          textStyle: {
            fontSize: 13,
            fontStyle: "normal",
            fontWeight: "bolder",
          },
        },
        toolbox: {
          show: true,
          itemSize: 10,
          itemGap: 0,
          top: "6%",
          right: "0%",
          feature: {
            // dataZoom: {
            //     yAxisIndex: 'none'
            // },
            dataView: { readOnly: false },
            // magicType: { type: ["line", "bar"] },
            // restore: {},
            saveAsImage: {},
            myShowChange: {
              show: true,
              title: "隐藏",
              icon:
                "path://M832.1776 191.8224c9.3728 9.3728 9.3728 24.568 0 33.9408l-45.4144 45.4192C907.8096 351.9792 960 471.1344 960 512c0 64-128 320-448 320-93.088 0-169.9296-21.664-232.0976-53.9632l-54.1392 54.1408c-9.3728 9.3728-24.568 9.3728-33.9408 0-9.3728-9.3728-9.3728-24.568 0-33.9408l45.4144-45.4192C116.1904 672.0208 64 552.8656 64 512c0-64 128-320 448-320 93.088 0 169.9296 21.664 232.0976 53.9632l54.1392-54.1408c9.3728-9.3728 24.568-9.3728 33.9408 0z m-80.1024 114.0432l-111.24 111.2416C660.4224 443.656 672 476.4768 672 512c0 88.3648-71.6352 160-160 160-35.5248 0-68.3456-11.5776-94.8944-31.1648l-101.392 101.392a410.816 410.816 0 0 0 10.5664 4.816C381.1104 771.0896 442.9392 784 512 784s130.8896-12.9088 185.72-36.9584c47.664-20.904 89.2784-49.9216 124.3392-84.9824 29.6944-29.696 53.6464-62.7712 70.2704-95.04 6.96-13.5104 12.2944-26.2768 15.7536-37.2864 1.488-4.7312 2.5664-8.952 3.232-12.48 0.488-2.592 0.6848-4.44 0.6848-5.2528s-0.1968-2.6608-0.6864-5.2528c-0.664-3.528-1.744-7.7488-3.2304-12.48-3.4592-11.0096-8.7952-23.776-15.7536-37.2848-16.624-32.2704-40.576-65.3472-70.272-95.04-21.0096-21.0128-44.3744-39.8528-69.984-56.0768zM512 240c-69.0608 0-130.8896 12.9088-185.72 36.9584-47.664 20.904-89.2784 49.9216-124.3392 84.9824-29.6944 29.696-53.6464 62.7712-70.2704 95.04-6.96 13.5104-12.2944 26.2768-15.7536 37.2864-1.488 4.7312-2.5664 8.952-3.232 12.48-0.488 2.592-0.6848 4.44-0.6848 5.2528s0.1968 2.6608 0.6864 5.2528c0.664 3.528 1.744 7.7488 3.2304 12.48 3.4592 11.0096 8.7952 23.776 15.7536 37.2848 16.624 32.2704 40.576 65.3472 70.272 95.04 21.0096 21.0128 44.3744 39.8528 69.984 56.0768l111.2368-111.2416C363.5776 580.344 352 547.5232 352 512c0-88.3648 71.6352-160 160-160 35.5248 0 68.3456 11.5776 94.8944 31.1648l101.392-101.392a410.816 410.816 0 0 0-10.5664-4.816C642.8896 252.9104 581.0608 240 512 240z m94.336 211.6048l-154.7312 154.7328C469.0304 617.5168 489.7584 624 512 624c61.856 0 112-50.144 112-112 0-22.2416-6.4832-42.9696-17.664-60.3952zM512 400c-61.856 0-112 50.144-112 112 0 22.2416 6.4832 42.9696 17.664 60.3952l154.7312-154.7328C554.9696 406.4832 534.2416 400 512 400z",
              onclick: function () {
                console.log("隐藏方法");
                _self.tableData.forEach((element) => {
                  if (element.inddsId === val.inddsId) {
                    _self.tableData.splice(element.index, 1);
                  }
                });
                _self.$forceUpdate();
              },
            },
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
