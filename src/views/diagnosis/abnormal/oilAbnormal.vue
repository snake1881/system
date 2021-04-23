<template>
  <div class="oil_abnormal">
    <!-- 条件查询 -->
    <el-form class="oil_abnormal_form" :model="postForm" :inline="true">
      <el-form-item label="采油站">
        <el-select
          v-model="postForm.oilStationId"
          clearable
          filterable
          placeholder="全区"
          size="medium"
        >
          <el-option
            v-for="item in orgNameData"
            :key="item.oilStationId"
            :label="item.oilStationName"
            :value="item.oilStationId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="postForm.postDate"
          value-format="yyyy-MM-dd"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="searchPost()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="oilAbnormalData"
      height="46%"
      border
      style="width: 100%"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      @cell-click="AbnormalCollect"
    >
      <el-table-column
        prop="oilStationName"
        label="采油站"
        min-width="15%"
        align="center"
      />
      <el-table-column
        prop="sumWellCount"
        label="总井数"
        min-width="10%"
        align="center"
      />
      <el-table-column
        prop="openWellCount"
        label="开井数"
        min-width="10%"
        align="center"
      />
      <el-table-column
        prop="sumLiquid"
        label="产液量"
        min-width="13%"
        align="center"
      />
      <el-table-column
        prop="sumLiquidYesterday"
        label="产液量(昨)"
        min-width="13%"
        align="center"
      />
      <el-table-column
        prop="liquidAbnormal"
        label="液量异常数"
        min-width="10%"
        align="center"
      >
        <template slot-scope="scope">
          <a v-if="scope.row.liquidAbnormal == 0">{{
            scope.row.liquidAbnormal
          }}</a>
          <a
            v-if="scope.row.liquidAbnormal != 0"
            style="color: #409eff; cursor: pointer"
            >{{ scope.row.liquidAbnormal }}</a
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="waterAbnormal"
        label="含水异常数"
        min-width="10%"
        align="center"
      >
        <template slot-scope="scope">
          <a v-if="scope.row.waterAbnormal == 0">{{
            scope.row.waterAbnormal
          }}</a>
          <a
            v-if="scope.row.waterAbnormal != 0"
            style="color: #409eff; cursor: pointer"
            >{{ scope.row.waterAbnormal }}</a
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="diagnosisAbnormal"
        label="工况异常数"
        min-width="10%"
        align="center"
      >
        <template slot-scope="scope">
          <a v-if="scope.row.diagnosisAbnormal == 0">{{
            scope.row.diagnosisAbnormal
          }}</a>
          <a
            v-if="scope.row.diagnosisAbnormal != 0"
            style="color: #409eff; cursor: pointer"
            >{{ scope.row.diagnosisAbnormal }}</a
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="fluidAbnormal"
        label="动液面异常数"
        min-width="10%"
        align="center"
      >
        <template slot-scope="scope">
          <a v-if="scope.row.fluidAbnormal == 0">{{
            scope.row.fluidAbnormal
          }}</a>
          <a
            v-if="scope.row.fluidAbnormal != 0"
            style="color: #409eff; cursor: pointer"
            >{{ scope.row.fluidAbnormal }}</a
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="oil_abnormal_page">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="total"
        :page-sizes="[9, 20, 30, 40, 50]"
        layout="total, prev, pager, next, jumper, sizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div id="wellChart" :style="{ width: '98%', height: '300px' }" />
    <!-- 液量含水异常查看 -->
    <common-liquid-water-collect
      :liquidAbnormalVisible="checkLiquidAbnormalVisible"
      :liquidData="checkLiquidData"
      :abnormalType="abnormalType"
      :nowTime="nowDateTime"
      @liquidRowlClose="checkLiquidClose"
    />
    <!-- 工况异常查看 -->
    <common-diagnosis-collect
      :diagnosisAbnormalVisible="checkDiagnosisAbnormalVisible"
      :diagndosisData="checkDiagnosisData"
      :nowTime="nowDateTime"
      @diagnosidsRowClose="checkDiagnosisClose"
    />
    <!-- 动液面异常查看 -->
    <common-fluid-collect
      :fluidAbnormalVisible="checkFluidAbnormalVisible"
      :fluidData="checkFluidData"
      :nowTime="nowDateTime"
      @fluidRowClose="checkFluidClose"
    />
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
import CommonLiquidWaterCollect from "../../../components/diagnosis/abnormal/oilabnormalcollect/CommonLiquidWaterCollect";
import CommonFluidCollect from "../../../components/diagnosis/abnormal/oilabnormalcollect/CommonFluidCollect";
import CommonDiagnosisCollect from "../../../components/diagnosis/abnormal/oilabnormalcollect/CommonDiagnosisCollect";
export default {
  components: {
    CommonLiquidWaterCollect,
    CommonFluidCollect,
    CommonDiagnosisCollect,
  },
  data() {
    return {
      //搜索框
      postForm: {
        positionName: "",
        postDate: "",
        oilStationId: "",
      },
      // 采油站下拉框数据
      orgNameData: [],
      oilAbnormalData: [],
      // 表格数据
      wellChartData: [[]],
      // 分页
      currentPage: 1,
      pageSize: 9,
      total: 0,
      // 表格加载动画
      loading: true,
      //液量含水异常查看
      checkLiquidAbnormalVisible: false,
      checkLiquidData: {},
      abnormalType: "",
      //工况异常查看
      checkDiagnosisAbnormalVisible: false,
      checkDiagnosisData: {},
      //动液面异常查看
      checkFluidAbnormalVisible: false,
      checkFluidData: {},
      nowDateTime: "",
    };
  },
  mounted() {
    //表格初始化
    this.postInit();
  },
  created() {
    //采油站下拉框数据初始化
    this.orgNameInit();
  },
  methods: {
    // 画图
    drawLine(val) {
      let dom = document.getElementById("wellChart");
      let myChart = echarts.init(dom);
      myChart.setOption({
        title: {
          x: "center",
          text: "采油井异常信息汇总",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params) {
            // console.log(params[0]);
            return (
              "<div><p>采油站：" +
              params[0].value[0] +
              "</p>" +
              "<p>总井数：" +
              params[0].value[1] +
              "口</p>" +
              "<p>开井数：" +
              params[0].value[2] +
              "口</p>" +
              "<p>总配注量：" +
              params[0].value[3] +
              "m<sup>3</sup></p>" +
              "<p>总产液量(昨):" +
              params[0].value[4] +
              "m<sup>3</sup></p>" +
              "<p>液量异常数：" +
              params[0].value[5] +
              "口</p>" +
              "<p>含水异常数：" +
              params[0].value[6] +
              "口</p>" +
              "<p>工况异常数：" +
              params[0].value[7] +
              "口</p>" +
              "<p>动液面异常数：" +
              params[0].value[8] +
              "口</p>" +
              "</div>"
            );
          },
          // formatter: "{c}",
        },
        legend: {
          top: "10%",
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "15%",
          top: "20%",
          containLabel: true,
        },
        dataset: {
          source: val,
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false, //隐藏x坐标轴刻度
          },
          //x轴字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#42436A",
              fontSize: "12",
            },
            rotate: "30", //字体倾斜角度
          },
          //x轴颜色
          axisLine: {
            lineStyle: {
              color: "#e4e4e4",
            },
          },
        },
        yAxis: {
          type: "value",
          minInterval: 0, //只显示整数
          axisLine: {
            show: false, //隐藏y坐标轴
          },
          //y轴字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#9495ab",
              fontSize: "12",
            },
          },
          //网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: "#e4e4e4",
              width: 1,
              type: "solid",
            },
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: "总井数",
            type: "bar",
            barWidth: 14,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          {
            name: "开井数",
            type: "bar",
            barWidth: 14,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          {
            name: "总产液量",
            type: "bar",
            barWidth: 14,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          {
            name: "总产液量(昨)",
            type: "bar",
            barWidth: 14,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          {
            name: "液量异常数",
            type: "bar",
            barWidth: 14,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          {
            name: "含水异常数",
            type: "bar",
            barWidth: 14,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          {
            name: "工况异常数",
            type: "bar",
            barWidth: 14,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          {
            name: "动液面异常数",
            type: "bar",
            barWidth: 14,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
        ],
      });
    },
    // 根据输入信息查询
    searchPost() {
      this.postInit();
    },
    //表格数据初始化
    postInit() {
      //如果日期值为空
      if (this.postForm.postDate === "") {
        //默认传递当前日期
        this.postForm.postDate = this.getdate();
      }
      this.getRequest(
        "/diagnosis/abnormal/queryOilProductionAbnormal?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize +
          "&createTime=" +
          this.postForm.postDate +
          "&oilStationId=" +
          this.postForm.oilStationId
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.oilAbnormalData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          //处理数据为坐标
          this.coordinate(resp.data.records);
          //延迟到DOM更新之后再执行绘制图形
          this.$nextTick(function () {
            //实例化echarts
            this.drawLine(this.coordinates);
          });
        }
      });
    },
    //将坐标数据串处理为坐标点
    coordinate(val) {
      //每次处理之前保证坐标数组集合为空
      this.coordinates = [[]];
      for (var i = 0; i < val.length; i++) {
        var array = [];
        array[0] = val[i].oilStationName;
        array[1] = val[i].sumWellCount;
        array[2] = val[i].openWellCount;
        array[3] = val[i].sumLiquid;
        array[4] = val[i].sumLiquidYesterday;
        array[5] = val[i].liquidAbnormal;
        array[6] = val[i].waterAbnormal;
        array[7] = val[i].diagnosisAbnormal;
        array[8] = val[i].fluidAbnormal;
        this.coordinates[i] = array;
      }
      return this.coordinates;
    },
    AbnormalCollect(row, column) {
      if (column.property == "liquidAbnormal") {
        this.abnormalType = "0";
        this.liquidAbnormal(row);
      } else if (column.property == "waterAbnormal") {
        this.abnormalType = "1";
        this.liquidAbnormal(row);
      } else if (column.property == "diagnosisAbnormal") {
        this.diagndosisAbnormal(row);
      } else if (column.property == "fluidAbnormal") {
        this.fluidAbnormal(row);
      }
    },
    //液量异常详情
    liquidAbnormal(val) {
      this.checkLiquidAbnormalVisible = true;
      this.checkLiquidData = val;
      this.nowDateTime = this.postForm.postDate;
    },
    // 液量关闭查看详情对话框
    checkLiquidClose() {
      this.checkLiquidAbnormalVisible = false;
    },
    //工况异常详情
    diagndosisAbnormal(val) {
      this.checkDiagnosisAbnormalVisible = true;
      this.checkDiagnosisData = val;
      this.nowDateTime = this.postForm.postDate;
    },
    //工况关闭查看详情对话框
    checkDiagnosisClose() {
      this.checkDiagnosisAbnormalVisible = false;
    },
    //动液面异常详情
    fluidAbnormal(val) {
      this.checkFluidAbnormalVisible = true;
      this.checkFluidData = val;
      this.nowDateTime = this.postForm.postDate;
    },
    //动液面关闭查看详情对话框
    checkFluidClose() {
      this.checkFluidAbnormalVisible = false;
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.postInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.postInit();
    },
    //获取当前日期
    getdate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();

      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + "-" + month + "-" + strDate;
      return currentdate;
    },
    //采油站下拉框数据初始化
    orgNameInit() {
      this.getRequest("/basOilStationInfor/oilStationOptions").then((resp) => {
        this.loading = false;
        if (resp) {
          this.orgNameData = resp.data;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/abnormal/oilAbnormal.css";
</style>
