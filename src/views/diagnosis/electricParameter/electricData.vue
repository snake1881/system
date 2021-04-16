<template>
  <!-- 电流统计 -->
  <div class="contrastChart">
    <el-form
      class="contrastChart_form"
      :inline="true"
      :model="electricDataForm"
    >
      <el-form-item>
        <el-select
          placeholder="采油站"
          v-model="electricDataForm.oilStationId"
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
          v-model="electricDataForm.testTime"
          value-format="yyyy-MM-dd"
          size="medium"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="searchElectricData()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :data="electricDataTable"
      height="85%"
      border
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :header-cell-style="{
        background: '#eef1f6',
        color: '#606266',
        'text-align': 'center',
      }"
      :cell-style="{ 'text-align': 'center', padding: 6 + 'px' }"
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column label="站名" prop="oilStationName" />
      <el-table-column label="油井" prop="wellName" />
      <el-table-column label="时间" prop="testTime" width="180" />
      <el-table-column label="油压" prop="oilPressure" />
      <el-table-column label="电压" prop="electricVoltage" width="100" />
      <el-table-column label="上行最大" prop="maxElectric" />
      <el-table-column label="下行最大" prop="minElectric" />
      <el-table-column
        label="平衡度"
        prop="tphaseEqualizationRatio"
        width="100"
      />
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="detailsElectricData(scope.row)"
            >单井详情</el-button
          >
          <el-button type="text" size="small" @click="checkElectricData()"
            >查看曲线</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 单井详情 -->
    <el-dialog
      title="单井详细信息"
      center
      width="60%"
      :visible="detailsElectricDataVisible"
      :before-close="detailsElectricDataClose"
    >
      <el-table :data="detailsElectricDataTable" border>
        <el-table-column label="时间" prop="testTime" />
        <el-table-column label="电压" prop="electricVoltage" />
        <el-table-column label="A项电流" prop="aphaseCurrent" />
        <el-table-column label="B项电流" prop="bphaseCurrent" />
        <el-table-column label="瞬时负荷" prop="cphaseCurrent" />
        <el-table-column label="冲次" prop="frequency" />
        <el-table-column label="产液量/24H" prop="liquidProd" width="100" />
        <el-table-column label="油井压力" prop="oilPressure" />
        <el-table-column label="三相均衡率" prop="tphaseEqualizationRatio" />
      </el-table>
    </el-dialog>
    <!-- 查看曲线 -->
    <el-dialog
      title="查看曲线"
      center
      width="50%"
      :visible="checkElectricDataVisible"
      :before-close="checkElectricDataClose"
    >
      电压数据曲线、 A相电流数据曲线、 B相电流数据曲线、 C相电流数据曲线、
      瞬时负荷数据曲线、 冲次曲线、 油井压力曲线、 产液量曲线、 三相均衡率曲线
      <span slot="footer" class="dialog-footer">
        <el-button>确定</el-button>
        <el-button @click="checkElectricDataClose">取 消</el-button>
      </span>
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
      electricDataForm: {
        oilStationId: "",
        testTime: "",
      },
      // 表格信息
      electricDataTable: [],
      // 加载动画
      loading: true,
      // 分页
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 所有采油站
      oilStationOptions: [],
      // 单井详情
      detailsElectricDataVisible: false,
      detailsElectricDataTable: [],
      // 查看曲线
      checkElectricDataVisible: false,
    };
  },
  created() {
    this.electricDataInit();
    this.queryOrgName();
  },
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
    searchElectricData() {
      this.getRequest(
        "/statistics/electric/selectElectricStatistics?currentPage=" +
          this.currentPage +
          "&oilStationId=" +
          this.electricDataForm.oilStationId +
          "&pageSize=" +
          this.pageSize +
          "&sTime=" +
          this.electricDataForm.testTime
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.electricDataTable = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 页面初始化
    electricDataInit() {
      var time = this.getTime();
      this.getRequest(
        "/statistics/electric/selectElectricStatistics?currentPage=" +
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
          this.electricDataTable = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 单井详情
    detailsElectricData(val) {
      this.getRequest(
        "/statistics/electric/selectElectricStatistic?sTime=" +
          val.testTime +
          "&wellId=" +
          val.wellId
      ).then((resp) => {
        if (resp) {
          this.detailsElectricDataTable = resp.data;
        }
      });
      this.detailsElectricDataVisible = true;
    },
    detailsElectricDataClose() {
      this.detailsElectricDataVisible = false;
    },
    // 查看曲线
    checkElectricData() {
      this.checkElectricDataVisible = true;
    },
    checkElectricDataClose() {
      this.checkElectricDataVisible = false;
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.electricDataInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchElectricData();
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/electricParameter/contrastChart.css";
</style>