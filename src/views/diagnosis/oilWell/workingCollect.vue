<template>
  <div class="work_collect">
    <div v-if="isShow" class="work_collect_item">
      <!-- 条件查询 -->
      <el-form class="work_collect_form" :model="abnormalForm" :inline="true">
        <el-form-item label="采油站">
          <el-select
            v-model="abnormalForm.orgName"
            placeholder="全区"
            size="medium"
            @focus="selectOrgName()"
          >
            <el-option v-for="item in orgNames" :key="item" :value="item" :label="item" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="abnormalForm.formDate"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
            size="medium"
          />
        </el-form-item>
        <el-form-item label="报警级别">
          <el-select v-model="abnormalForm.liqOrWater" placeholder="全部" size="medium">
            <el-option label="一级" value="1"></el-option>
            <el-option label="二级" value="2"></el-option>
            <el-option label="三级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="small"
            @click="searchWorkingCollect()"
          >查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格数据 -->
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="workingCollect"
        height="84%"
        border
        style="width:100%;"
        @expand-change="rowCollectInit"
        :expand-row-keys="expands"
        :row-key="getRowKeys"
      >
        <el-table-column type="expand">
          <template>
            <div v-for="(item,index) in loadCollect" :key="index">
              <span>{{ item.checkDate }}</span>
              <span>{{ item.thirdResult }}</span>
              <span @click="details(item)">details</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" width="100" align="center" />
        <el-table-column prop="wellCommonName" label="井号" width="120" align="center" />
        <el-table-column prop="checkDate" label="日期" width="180" align="center" />
        <el-table-column prop="orgName" label="采油站" width="160" align="center" />
        <el-table-column prop="stroke" label="冲程" width="100" align="center" />
        <el-table-column prop="frequency" label="冲刺" width="100" align="center" />
        <el-table-column prop="suspMaxLoad" label="最大载荷" width="100" align="center" />
        <el-table-column prop="suspMinLoad" label="最小载荷" width="100" align="center" />
        <el-table-column prop="thirdResult" label="诊断结果" width="170" align="center" />
        <el-table-column prop="normalWaterCut" label="人工确认" width="160" align="center" />
      </el-table>
      <!-- 分页 -->
      <div class="work_collect_page">
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
    </div>
    <!-- 详情 -->
    <div class="work_collect_item" v-if="!isShow">
      <div>
        <span>当前数据</span>
        <span>冲程:{{ this.detailsCollect.stroke }}</span>
        <span>冲刺:{{ this.detailsCollect.frequency }}</span>
        <span>最大载荷:{{ this.detailsCollect.suspMaxLoad }}</span>
        <span>最小载荷:{{ this.detailsCollect.suspMinLoad }}</span>
        <span>泵径:0</span>
        <span>泵深:0</span>
        <span>动液面:0</span>
      </div>
      <div id="gt"></div>
      <div>
        <span>诊断结论(系统)</span>
        <span>{{ this.detailsCollect.thirdResult }}</span>
        <span>AI诊断结论(参考)</span>
        <span>{{ this.detailsCollect.aiResult }}</span>
      </div>
      <div>
        <span>措施处置</span>
        <span>暂无</span>
        <span>作业设计模板</span>
      </div>
    </div>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
export default {
  data() {
    return {
      // 工况汇总数据
      workingCollect: [],
      // 当前行数据
      loadCollect: [],
      // 表单数据
      abnormalForm: {
        // 采油站
        orgName: null,
        // 日期选择
        formDate: "",
        // 报警级别
        alarmLevel: null
      },
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true,
      // 采油站数据
      orgNames: [],
      // 默认展示内容
      isShow: true,
      // 工况详情数据
      detailsCollect: null,
      // 设置row-key只展示一行
      expands: [],
      // 只展开一行放入当前行id
      getRowKeys(row) {
        return row.wellCommonName;
      }
    };
  },
  created() {
    this.workingCollectInit();
  },
  methods: {
    // 数据初始化
    workingCollectInit() {
      this.loading = true;
      this.getRequest(
        "/oilWell/workCollect/page?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.workingCollect = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 单行数据
    rowCollectInit(row, expandedRows) {
      //只展开一行
      if (expandedRows.length) {
        //说明展开了
        this.expands = [];
        if (row) {
          this.expands.push(row.wellCommonName); //只展开当前行wellCommonName
        }
      } else {
        //说明收起了
        this.expands = [];
      }
      this.getRequest(
        "/oilWell/workCollect/dgnsResult/" +
          row.wellCommonName +
          "?date=" +
          row.checkDate
      ).then(resp => {
        if (resp) {
          this.loadCollect = resp.data;
        }
      });
    },
    // 表单条件查询
    searchWorkingCollect() {
      this.loading = true;
      let url =
        "/oilWell/workCollect/dgnsResult?current=" +
        this.currentPage +
        "&pageSize=" +
        this.pageSize;
      if (this.abnormalForm.orgName !== null) {
        url += "&orgName=" + this.abnormalForm.orgName;
      }
      if (
        this.abnormalForm.formDate !== null &&
        this.abnormalForm.formDate !== ""
      ) {
        url += "&date=" + this.abnormalForm.formDate;
      }
      if (this.abnormalForm.alarmLevel !== null) {
        url += "&alarmLevel=" + this.abnormalForm.alarmLevel;
      }
      this.getRequest(url).then(resp => {
        this.loading = false;
        if (resp) {
          this.workingCollect = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 跳转至详情页面
    details(row) {
      this.isShow = false;
      this.detailsCollect = row;
      this.showGT();
    },
    showGT() {
      let myChart = echarts.init(document.getElementById("gt"));
      var data = [
        [4.0, 52.53],
        [4.0, 52.28],
        [4.0, 51.98],
        [3.99, 50.42],
        [3.96, 49.04],
        [3.95, 47.66],
        [3.92, 47.17],
        [3.89, 46.73],
        [3.85, 46.73],
        [3.8, 45.36],
        [3.77, 45.75],
        [3.72, 45.9],
        [3.68, 46.34],
        [3.61, 46.25],
        [3.56, 46.39],
        [3.49, 46.29],
        [3.43, 46.29],
        [3.34, 45.95],
        [3.28, 45.61],
        [3.19, 45.61],
        [3.12, 46.05],
        [3.03, 45.75],
        [2.95, 45.75],
        [2.82, 46.14],
        [2.75, 46.39],
        [2.63, 46.34],
        [2.54, 46.39],
        [2.44, 46.39],
        [2.34, 46.29],
        [2.24, 46.29],
        [2.16, 46.14],
        [1.97, 46.1],
        [1.91, 45.99],
        [1.77, 35.34],
        [1.65, 28.18],
        [1.62, 24.15],
        [1.47, 24.89],
        [1.4, 24.35],
        [1.38, 24.45],
        [1.23, 24.65],
        [1.24, 31.37],
        [1.14, 34.61],
        [1.02, 33.58],
        [0.98, 33.67],
        [0.87, 33.58],
        [0.8, 33.43],
        [0.76, 29.85],
        [0.62, 26.47],
        [0.6, 27.24],
        [0.5, 27.59],
        [0.45, 27.94],
        [0.4, 28.87],
        [0.33, 30.34],
        [0.28, 33.23],
        [0.24, 33.38],
        [0.18, 33.38],
        [0.15, 33.08],
        [0.1, 32.69],
        [0.09, 32.84],
        [0.07, 31.42],
        [0.04, 30.24],
        [0.03, 30.93],
        [0.02, 31.47],
        [0.01, 32.01],
        [0.0, 32.35],
        [0.0, 32.69],
        [0.0, 33.97],
        [0.02, 35.84],
        [0.03, 36.72],
        [0.04, 37.12],
        [0.07, 37.45],
        [0.1, 37.85],
        [0.13, 38.44],
        [0.16, 40.79],
        [0.19, 43.59],
        [0.23, 45.11],
        [0.27, 45.8],
        [0.31, 46.98],
        [0.36, 48.69],
        [0.41, 50.62],
        [0.47, 53.7],
        [0.52, 55.43],
        [0.58, 55.67],
        [0.65, 55.18],
        [0.72, 54.79],
        [0.79, 54.35],
        [0.87, 53.7],
        [0.94, 52.48],
        [1.01, 52.03],
        [1.08, 52.18],
        [1.16, 52.53],
        [1.23, 52.68],
        [1.3, 53.06],
        [1.39, 53.51],
        [1.47, 53.61],
        [1.56, 53.61],
        [1.66, 53.46],
        [1.74, 53.06],
        [1.84, 52.73],
        [1.92, 52.53],
        [2.01, 52.58],
        [2.09, 52.48],
        [2.18, 52.43],
        [2.25, 52.68],
        [2.35, 52.97],
        [2.44, 53.02],
        [2.51, 53.06],
        [2.6, 53.12],
        [2.68, 53.12],
        [2.76, 53.21],
        [2.85, 52.87],
        [2.93, 52.68],
        [3.0, 52.48],
        [3.09, 52.43],
        [3.16, 52.48],
        [3.23, 52.38],
        [3.29, 52.48],
        [3.36, 52.87],
        [3.42, 53.02],
        [3.48, 52.97],
        [3.54, 52.97],
        [3.59, 52.87],
        [3.65, 52.82],
        [3.7, 52.62],
        [3.74, 52.23],
        [3.78, 52.09],
        [3.82, 52.23],
        [3.85, 52.28],
        [3.89, 52.38],
        [3.91, 52.48],
        [3.93, 52.68],
        [3.95, 52.82],
        [3.97, 52.68],
        [3.98, 52.53],
        [3.99, 52.58]
      ];
      myChart.setOption({
        title: {
          text: "Try Dragging these Points"
        },
        xAxis: {
          min: 0,
          max: 4,
          type: "value",
          axisLine: { onZero: false }
        },
        yAxis: {
          min: 0,
          max: 60,
          type: "value",
          axisLine: { onZero: false }
        },
        series: [
          {
            type: "line",
            smooth: true,
            symbol: "none",
            data: data
          }
        ]
      });
    },
    // 查询所有采油站信息
    selectOrgName() {
      this.getRequest("/oilWell/liquidVolumeAbnormal/orgNames").then(resp => {
        if (resp) {
          this.orgNames = resp.data;
        }
      });
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.workingCollectInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.workingCollectInit();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/oilWell/workingCollect.css";
</style>
