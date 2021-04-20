<template>
  <div class="contrastChart">
    <el-form
      class="contrastChart_form"
      :inline="true"
      :model="contrastChartForm"
    >
      <el-form-item>
        <el-select
          placeholder="采油站"
          v-model="contrastChartForm.oilStationId"
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
        <el-date-picker
          type="date"
          placeholder="时间"
          v-model="contrastChartForm.testTime"
          value-format="yyyy-MM-dd"
          size="medium"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="searchContrastChart()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :data="contrastChartTable"
      height="85%"
      border
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center', padding: 6 + 'px' }"
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column label="井号" prop="wellName" width="100" />
      <el-table-column label="测试时间" prop="testTime" width="180" />
      <el-table-column label="冲程" prop="stroke" />
      <el-table-column label="冲次" prop="frequency" width="100" />
      <el-table-column label="示功图">
        <el-table-column label="最大负荷" prop="maxLoad" />
        <el-table-column label="最小负荷" prop="minLoad" width="100" />
        <el-table-column label="产液量" prop="liquidProd" width="110" />
        <el-table-column label="图形" width="200">
          <template slot-scope="scope">
            <div :id="scope.row.elepaId" style="width: 200px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column
          label="工况诊断结果"
          width="120"
          prop="diagnosisResult"
        />
      </el-table-column>
      <el-table-column label="电流图">
        <el-table-column label="上行最大" prop="maxElectric" />
        <el-table-column label="下行最大" prop="minElectric" />
        <el-table-column
          label="平衡度"
          prop="tphaseEqualizationRatio"
          width="100"
        />
        <el-table-column label="图形" width="200">
          <template slot-scope="scope">
            <div
              :id="scope.row.elepaId + '1'"
              style="width: 200px; height: 100px"
            />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="控制" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="showContrastChart(scope.row)"
            >显示</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 放大显示 -->
    <el-dialog
      title="请选择放大显示的图形"
      center
      width="30%"
      :visible="contrastChartVisible"
      :before-close="contrastChartClose"
    >
      <el-row>
        <el-col :span="9">
          <el-button>示功图</el-button>
        </el-col>
        <el-col :span="9">
          <el-button>电流图</el-button>
        </el-col>
        <el-col :span="6">
          <el-button @click="contrastChartClose">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="total"
      :page-sizes="[10, 20, 30, 40, 50]"
      layout="total, prev, pager, next, jumper, sizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
export default {
  data() {
    return {
      // 搜索
      contrastChartForm: {
        oilStationId: "",
        testTime: "",
      },
      // 表格加载动画
      loading: true,
      contrastChartTable: [],
      // 表格内图形纵坐标
      gtData: [[]],
      dcData: [[]],
      // 所有采油站
      oilStationOptions: [],
      // 放大显示
      contrastChartVisible: false,
      // 分页
      currentPage: 1,
      pageSize: 10,
      total: 0,
      index: 1,
    };
  },
  created() {
    this.queryOrgName();
    this.contrastChartInit();
  },
  // watch: {
  //   contrastChartTable() {
  //     this.$nextTick(() => {
  //       console.log(this.contrastChartTable);
  //     });
  //   },
  // },
  // mounted() {
  //   setTimeout(() => {
  //     this.contrastChartTable.forEach((item) => {
  //       this.coordinate(item);
  //       //将处理后的坐标添加到对象中
  //       this.$set(item, "coordinates", this.coordinates);
  //       // 画功图图形
  //       let dom = document.getElementById(item + "gt");
  //       let myChart = echarts.init(dom);
  //       myChart.setOption({
  //         tooltip: {
  //           trigger: "axis",
  //           axisPointer: {
  //             type: "line",
  //           },
  //           formatter: function (params) {
  //             return (
  //               "<div><p>位移：" +
  //               params[0].value[0] +
  //               "M</p>" +
  //               "<p>载荷：" +
  //               params[0].value[1] +
  //               "KN</p>" +
  //               "</div>"
  //             );
  //           },
  //         },
  //         grid: {
  //           width: "120px",
  //           height: "60px",
  //           top: "25%",
  //           left: "30px",
  //         },
  //         xAxis: {
  //           min: 0,
  //           max: 4,
  //           type: "value",
  //         },
  //         yAxis: {
  //           name: "载荷(KN)",
  //           type: "value",
  //           max: 80,
  //           min: 0,
  //           splitNumber: 3,
  //           nameTextStyle: {
  //             fontSize: 10,
  //           },
  //         },
  //         series: [
  //           {
  //             symbol: "none",
  //             data: item.data.coordinates,
  //             type: "line",
  //             smooth: true,
  //             lineStyle: {
  //               width: 1.5,
  //             },
  //           },
  //         ],
  //       });
  //     });
  //   });
  // },
  methods: {
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
    // 查询
    searchContrastChart() {
      this.getRequest(
        "/contrast/electric/selectElectricContrast?currentPage=" +
          this.currentPage +
          "&oilStationId=" +
          this.contrastChartForm.oilStationId +
          "&pageSize=" +
          this.pageSize +
          "&sTime=" +
          this.contrastChartForm.testTime
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.contrastChartTable = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.contrastChartTable.forEach((element) => {
            //延迟到DOM更新之后再执行绘制图形
            this.$nextTick(function () {
              //处理数据为坐标
              this.coordinate(element);
              //将处理后的坐标添加到对象中
              this.$set(element, "gtData", this.gtData);
              this.$set(element, "dcData", this.dcData);
              //实例化功图/电参echarts
              this.drawLine(element);
            });
          });
        }
      });
    },
    // 页面初始化
    contrastChartInit() {
      var time = this.getTime();
      this.getRequest(
        "/contrast/electric/selectElectricContrast?currentPage=" +
          this.currentPage +
          "&oilStationId=" +
          "" +
          "&pageSize=" +
          this.pageSize +
          "&sTime=" +
          time
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.contrastChartTable = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.contrastChartTable.forEach((element) => {
            //延迟到DOM更新之后再执行绘制图形
            this.$nextTick(function () {
              //处理数据为坐标
              this.coordinate(element);
              //将处理后的坐标添加到对象中
              this.$set(element, "gtData", this.gtData);
              this.$set(element, "dcData", this.dcData);
              //实例化功图/电参echarts
              this.drawLine(element);
            });
          });
        }
      });
    },
    // 表单画图
    drawLine(val) {
      // 画功图图形/电参图形
      let domGt = document.getElementById(val.elepaId);
      let domDc = document.getElementById(val.elepaId + '1');
      let myChartGt = echarts.init(domGt);
      let myChartDc = echarts.init(domDc);
      myChartGt.setOption({
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
          width: "65%",
          height: "42%",
          top: "26%",
          left: "12%",
        },
        xAxis: {
          name: "位移(M)",
          min: 0,
          max: 4,
          type: "value",
          nameLocation: "middle",
          nameTextStyle: {
            padding: [8, 0, 0, 0],
            fontSize: 10,
          },
        },
        yAxis: {
          name: "载荷(KN)",
          type: "value",
          max: 80,
          min: 0,
          splitNumber: 3,
          nameTextStyle: {
            padding: [0, 0, -10, 0],
            fontSize: 10,
          },
        },
        series: [
          {
            symbol: "none",
            data: val.gtData,
            type: "line",
            smooth: true,
            lineStyle: {
              width: 1.5,
            },
          },
        ],
      });
      myChartDc.setOption({
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
          width: "65%",
          height: "42%",
          top: "26%",
          left: "12%",
        },
        xAxis: {
          name: "位移(M)",
          min: 0,
          max: 4,
          type: "value",
          nameLocation: "middle",
          nameTextStyle: {
            padding: [8, 0, 0, 0],
            fontSize: 10,
          },
        },
        yAxis: {
          name: "载荷(KN)",
          type: "value",
          max: 80,
          min: 0,
          splitNumber: 3,
          nameTextStyle: {
            padding: [0, 0, -10, 0],
            fontSize: 10,
          },
        },
        series: [
          {
            symbol: "none",
            data: val.dcData,
            type: "line",
            smooth: true,
            lineStyle: {
              width: 1.5,
            },
          },
        ],
      });
    },
    // 获取表格当前行数据
    currentLineData(val) {
      this.$nextTick(function () {
        //处理数据为坐标
        this.coordinate(val);
        //将处理后的坐标添加到对象中
        this.$set(val, "gtData", this.gtData);
        this.$set(val, "dcData", this.dcData);
        this.gtLine(val);
      });
    },
    //实例化图形
    gtLine(val) {
      // 功图图形
      let dom = document.getElementById("gt");
      let myChart = echarts.init(dom);
      myChart.setOption({
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
          width: "120px",
          height: "60px",
          top: "25%",
          left: "30px",
        },
        xAxis: {
          min: 0,
          max: 4,
          type: "value",
        },
        yAxis: {
          name: "载荷(KN)",
          type: "value",
          max: 80,
          min: 0,
          splitNumber: 3,
          nameTextStyle: {
            fontSize: 10,
          },
        },
        series: [
          {
            symbol: "none",
            data: val.gtData,
            type: "line",
            smooth: true,
            lineStyle: {
              width: 1.5,
            },
          },
        ],
      });
      //  电参图形
      let dom2 = document.getElementById("dc");
      let myChart2 = echarts.init(dom2);
      myChart2.setOption({
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
          width: "120px",
          height: "60px",
          top: "25%",
          left: "30px",
        },
        xAxis: {
          min: 0,
          max: 4,
          type: "value",
        },
        yAxis: {
          name: "载荷(KN)",
          type: "value",
          max: 80,
          min: 0,
          splitNumber: 3,
          nameTextStyle: {
            fontSize: 10,
          },
        },
        series: [
          {
            symbol: "none",
            data: val.dcData,
            type: "line",
            smooth: true,
            lineStyle: {
              width: 1.5,
            },
          },
        ],
      });
    },
    //处理功图及电参坐标
    coordinate(val) {
      this.gtData = [[]];
      this.dcData = [[]];
      // 功图坐标
      var displacementArray = val.displacementSet.split(";");
      var disploadArray = val.loadSet.split(";");
      for (var i = 0; i < displacementArray.length; i++) {
        this.gtData[i] = [];
        this.gtData[i][0] = parseFloat(displacementArray[i]);
        this.gtData[i][1] = parseFloat(disploadArray[i]);
      }
      //   电参坐标
      var electricitySet = val.electricitySet.split(";");
      var displacementSetElect = val.displacementSetElect.split(";");
      for (var j = 0; j < displacementSetElect.length; j++) {
        this.dcData[j] = [];
        this.dcData[j][0] = parseFloat(displacementSetElect[j]);
        this.dcData[j][1] = parseFloat(electricitySet[j]);
      }
      return this.gtData, this.dcData;
    },
    // 放大显示
    showContrastChart(val) {
      console.log(val);
      this.contrastChartVisible = true;
    },
    contrastChartClose() {
      this.contrastChartVisible = false;
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.contrastChartInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.contrastChartInit();
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/electricParameter/contrastChart.css";
</style>