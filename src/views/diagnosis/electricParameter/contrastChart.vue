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
          v-model="contrastChartForm.oilStation"
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
      <el-form-item> </el-form-item>
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
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center', padding: 6 + 'px' }"
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column label="井号" prop="wellName" width="100" />
      <el-table-column label="测试时间" prop="testTime" width="120" />
      <el-table-column label="冲程" prop="stroke" />
      <el-table-column label="冲次" prop="frequency" width="100" />
      <el-table-column label="示功图">
        <el-table-column label="最大负荷" prop="maxLoad" />
        <el-table-column label="最小负荷" prop="minLoad" width="100" />
        <el-table-column label="产液量" prop="liquidProd" />
        <el-table-column label="图形" width="200" prop="a" />
        <el-table-column label="工况诊断结果" width="110" />
      </el-table-column>
      <el-table-column label="电流图">
        <el-table-column label="上行最大" prop="maxElectric" />
        <el-table-column label="下行最大" prop="minElectric" />
        <el-table-column
          label="平衡度"
          prop="tPhaseEqualizationRatio"
          width="100"
        />
        <el-table-column label="图形" width="200" prop="b" />
      </el-table-column>
      <el-table-column label="控制" fixed="right">
        <template>
          <el-button type="text" size="small" @click="showContrastChart()"
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
export default {
  data() {
    return {
      // 搜索
      contrastChartForm: {
        oilStation: "",
      },
      // 表格加载动画
      loading: true,
      contrastChartTable: [
        {
          wellName: "定1764-1",
          testTime: "2121-04-14",
          stroke: "4m",
          frequency: "3.77/min",
          minLoad: "24.3KN",
          maxLoad: "50.6kn",
          liquidProd: "3.4T",
          a: "示功图图形",
          maxElectric: "26.6A",
          minElectric: "36.2A",
          tPhaseEqualizationRatio: "136.29%",
          b: "电流图图形",
        },
        {
          wellName: "定1764-1",
          testTime: "2121-04-14",
          stroke: "4m",
          frequency: "3.77/min",
          minLoad: "24.3KN",
          maxLoad: "50.6kn",
          liquidProd: "3.4T",
          a: "示功图图形",

          maxElectric: "26.6A",
          minElectric: "36.2A",
          tPhaseEqualizationRatio: "136.29%",
          b: "电流图图形",
        },
        {
          wellName: "定1764-1",
          testTime: "2121-04-14",
          stroke: "4m",
          frequency: "3.77/min",
          minLoad: "24.3KN",
          maxLoad: "50.6kn",
          liquidProd: "3.4T",
          a: "示功图图形",
          maxElectric: "26.6A",
          minElectric: "36.2A",
          tPhaseEqualizationRatio: "136.29%",
          b: "电流图图形",
        },
        {
          wellName: "定1764-1",
          testTime: "2121-04-14",
          stroke: "4m",
          frequency: "3.77/min",
          minLoad: "24.3KN",
          maxLoad: "50.6kn",
          liquidProd: "3.4T",
          a: "示功图图形",
          maxElectric: "26.6A",
          minElectric: "36.2A",
          tPhaseEqualizationRatio: "136.29%",
          b: "电流图图形",
        },
      ],
      // 所有采油站
      oilStationOptions: [],
      // 放大显示
      contrastChartVisible: false,
      // 分页
      // 分页
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  created() {
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
    searchContrastChart() {},
    contrastChartInit() {
      this.getRequest(
        "/?current=" + this.currentPage + "&pageSize=" + this.pageSize
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.contrastChartTable = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 放大显示
    showContrastChart() {
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