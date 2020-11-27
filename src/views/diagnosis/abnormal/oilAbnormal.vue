<template>
  <div class="oil_abnormal">
    <!-- 条件查询 -->
    <el-form class="oil_abnormal_form" :model="postForm" :inline="true">
      <el-form-item>
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="postForm.postDate"
          value-format="yyyy-MM-dd"
          style="width: 100%"
        ></el-date-picker>
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
      <el-table-column prop="oilStationName" label="采油站" min-width="15%" />
      <el-table-column prop="sumWellCount" label="总井数" min-width="10%" />
      <el-table-column prop="openWellCount" label="开井数" min-width="10%" />
      <el-table-column prop="sumLiquid" label="总产液量" min-width="13%" />
      <el-table-column
        prop="sumLiquidYesterday"
        label="总产液量(昨)"
        min-width="13%"
      />
      <el-table-column
        prop="liquidAbnormal"
        label="液量异常数"
        min-width="10%"
      />
      <el-table-column
        prop="waterAbnormal"
        label="含水异常数"
        min-width="10%"
      />
      <el-table-column
        prop="diagnosisAbnormal"
        label="工况异常数"
        min-width="10%"
      />
      <el-table-column
        prop="fluidAbnormal"
        label="动液面异常数"
        min-width="10%"
      />
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
    <div id="wellChart" :style="{ width: '98%', height: '300px' }"></div>
    <!-- <div id="waterWellChart" :style="{ width: '98%', height: '300px' }"></div> -->

    <!-- 液量含水异常查看 -->
    <common-liquid-water-collect
      :liquidAbnormalVisible="checkLiquidAbnormalVisible"
      :liquidData="checkLiquidData"
      @liquidRowlClose="checkLiquidClose"
    />
    <!-- 工况异常查看 -->
    <common-diagnosis-collect
      :diagnosisAbnormalVisible="checkDiagnosisAbnormalVisible"
      :diagndosisData="checkDiagnosisData"
      @diagnosidsRowClose="checkDiagnosisClose"
    />
    <!-- 动液面异常查看 -->
    <common-fluid-collect
      :fluidAbnormalVisible="checkFluidAbnormalVisible"
      :fluidData="checkFluidData"
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
      },
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
      //工况异常查看
      checkDiagnosisAbnormalVisible: false,
      checkDiagnosisData: {},
      //动液面异常查看
      checkFluidAbnormalVisible: false,
      checkFluidData: {},
    };
  },
  mounted() {
    //表格初始化
    this.postInit();
  },
  created() {},
  methods: {
    // 画图
    drawLine(val) {
      // 基于准备好的dom，初始化echarts实例
      let dom = document.getElementById("wellChart");
      // let dom2 = document.getElementById("waterWellChart");
      let myChart = echarts.init(dom);
      // let myChart2 = echarts.init(dom2);
      // 绘制图表
      myChart.setOption({
        title: {
          x: "center",
          text: "采油井异常信息汇总",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "{c}",
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
            show: false, //隐藏y坐标轴刻度
          },
        },
        series: [
          {
            name: "总井数",
            type: "bar",
            barWidth: 6, //柱体宽带
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          {
            name: "开井数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          {
            name: "总产液量",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          {
            name: "总产液量(昨)",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          {
            name: "液量异常数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          {
            name: "含水异常数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          {
            name: "工况异常数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
                barBorderRadius: [10, 10, 0, 0],
              },
            },
          },
          {
            name: "动液面异常数",
            type: "bar",
            barWidth: 6, //柱体宽度
            itemStyle: {
              normal: {
                //柱体圆角
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
      this.getRequest(
        "/diagnosis/abnormal/queryOilProductionAbnormal?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize +
          "&createTime=" +
          this.postForm.postDate
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.oilAbnormalData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          console.log(this.oilAbnormalData);
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
      console.log(this.coordinates);
      return this.coordinates;
    },
    AbnormalCollect(row, column) {
      console.log(row);
      console.log(column);
      if (column.property == "liquidAbnormal" || column.property == "waterAbnormal"){
        this.liquidAbnormal(row);
      }else if(column.property == "diagnosisAbnormal"){
        this.diagndosisAbnormal(row);
      }else if(column.property == "fluidAbnormal"){
        this.fluidAbnormal(row);
      }    
    },
    //液量异常详情
    liquidAbnormal(val){
      this.checkLiquidAbnormalVisible = true;
      this.checkLiquidData = val;
    },
    // 液量关闭查看详情对话框
    checkLiquidClose() {
      this.checkLiquidAbnormalVisible = false;
    },
    //工况异常详情
    diagndosisAbnormal(val) {
      this.checkDiagnosisAbnormalVisible = true;
      this.checkDiagnosisData = val;
    },
    //工况关闭查看详情对话框
    checkDiagnosisClose() {
      this.checkDiagnosisAbnormalVisible = false;
    },
    //动液面异常详情f
    fluidAbnormal(val) {
      this.checkFluidAbnormalVisible = true;
      this.checkFluidData = val;
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
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/abnormal/oilAbnormal.css";
</style>
