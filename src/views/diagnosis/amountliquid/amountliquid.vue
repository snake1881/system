<template>
  <div class="dymAbnormal">
    <el-form class="dymAbnormal_form" :model="termForm" :inline="true">
      <el-form-item label="采油站">
        <el-select
          v-model="termForm.oilStationId"
          clearable
          filterable
          placeholder="全区"
          size="medium"
          @change="queryWellNameByOrgName"
        >
          <el-option
            v-for="item in orgNameData"
            :key="item.oilStationId"
            :label="item.oilStationName"
            :value="item.oilStationId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="单井">
        <el-select
          v-model="termForm.wellId"
          clearable
          filterable
          placeholder="全站"
          size="medium"
        >
          <el-option
            v-for="item in wellOptions"
            :key="item.wellId"
            :label="item.wellName"
            :value="item.wellId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          type="datetime"
          filterable
          clearable
          placeholder="开始时间"
          v-model="termForm.beginTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          size="medium"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          type="datetime"
          filterable
          clearable
          placeholder="结束时间"
          v-model="termForm.endTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          size="medium"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="abnormalDymSearch()"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-download"
          size="small"
          @click="exportData()"
          >导出</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      class="dymAbnormal_table"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="dymData"
      @selection-change="handleSelectionChange"
      height="85%"
      border
      style="width: 100%"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        align="center"
        label="序号"
        width="60"
        type="index"
        :index="
          (index) => {
            return index + 1 + (this.currentPage - 1) * this.pageSize;
          }
        "
      />
      <el-table-column
        prop="wellName"
        align="center"
        label="井号"
        width="100"
      />
      <el-table-column
        prop="acquisitionTime"
        align="center"
        label="量液时间"
        width="180"
      />
      <el-table-column
        prop="stroke"
        align="center"
        label="冲程(M)"
        width="80"
      />
      <el-table-column
        prop="frequency"
        align="center"
        label="冲次"
        width="80"
      />
      <el-table-column
        prop="timeDiffer"
        align="center"
        label="量液累计时间(H)"
        width="140"
      />
      <el-table-column
        prop="maxLoad"
        align="center"
        label="最大载荷"
        width="90"
      />
      <el-table-column
        prop="minLoad"
        align="center"
        label="最小载荷"
        width="90"
      />
      <el-table-column
        prop="maxDisplacement"
        align="center"
        label="最大位移"
        width="80"
      />
      <el-table-column
        prop="minDisplacement"
        align="center"
        label="最小位移"
        width="80"
      />
      <el-table-column
        prop="hourProd"
        align="center"
        label="产液量"
        width="90"
      />
      <el-table-column
        prop="dayProd"
        align="center"
        label="实际累计液量"
        min-width="80"
      />
      <el-table-column
        prop="liquidProd"
        align="center"
        label="24小时预测液量"
        min-width="120"
      />
       <el-table-column
        prop="waterContent"
        align="center"
        label="含水率(%)"
        width="90"
      />
      <el-table-column
        prop="tempreTure"
        align="center"
        label="井口温度(℃)"
        min-width="110"
      />
      <el-table-column align="center" label="操作" width="130" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="text"
            align="center"
            size="small"
            @click="preview(scope.row)"
            >查看曲线</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="dymAbnormal_page">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100, 300]"
        layout="total, prev, pager, next, jumper, sizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 查看功图 -->
    <amount-liquid-scan-line
      :previewDymVisible="previewDymVisible"
      :previewData="previewDymData"
      @previewDymRowClose="previewDymClose"
    />
  </div>
</template>
<script>
import AmountLiquidScanLine from "../../../components/diagnosis/amountliquid/AmountLiquidScanLine.vue";
export default {
  components: {
    AmountLiquidScanLine,
  },
  data() {
    return {
      termForm: {
        beginTime: "",
        endTime: "",
        oilStationId: "",
        wellId: "",
      },
      // 表格数据
      dymData: [],
      //表格展开数据
      dymSpanData: [],
      //查看曲线数据
      previewDymData: {},
      previewDymVisible: false,
      // 采油站下拉框数据
      orgNameData: [],
      //单井下拉框数据
      wellOptions: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true,
      // 表格多选数据
      selectData: [],
    };
  },
  created() {
    this.abnormalDymSearch();
    this.orgNameInit();
    this.wellOptionsInit();
  },
  methods: {
    // 表格多选
    handleSelectionChange(val) {
      this.selectData = val;
    },
    // 文件导出
    exportData() {
      const {
        export_json_to_excel,
      } = require("../../../vendor/Export2Excel.js");
      const tHeader = [
        "井号",
        "量液时间",
        "冲程(M)",
        "冲次",
        "液量累计时间(H)",
        "最大载荷",
        "最小载荷",
        "最大位移",
        "最小位移",
        "产液量",
        "日累产液",
        "24小时产液量",
        "含水率(%)",
        "含水温度(℃)",
      ];
      const filterVal = [
        "wellName",
        "acquisitionTime",
        "stroke",
        "frequency",
        "timeDiffer",
        "maxLoad",
        "minLoad",
        "maxDisplacement",
        "minDisplacement",
        "hourProd",
        "dayProd",
        "liquidProd",
        "waterContent",
        "tempreTure",
      ];
      const list = this.selectData;
      const data = this.formatJson(filterVal, list);
      export_json_to_excel(tHeader, data, "智能量液");
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    // 根据输入信息查询
    abnormalDymSearch() {
      this.getRequest(
        "/mountLiquid/amountLiquid?beginTime=" +
          this.termForm.beginTime +
          "&current=" +
          this.currentPage +
           "&endTime=" +
          this.termForm.endTime +
          "&oilStationId=" +
          this.termForm.oilStationId +
          "&pageSize=" +
          this.pageSize +
          "&wellId=" +
          this.termForm.wellId
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.dymData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 查看动液面曲线并初始化曲线数据
    preview(val) {
      this.previewDymData = val;
      this.previewDymVisible = true;
    },
    // 关闭功图
    previewDymClose() {
      this.previewDymVisible = false;
    },
    //表格数据初始化
    DymAbnormalInit() {
      this.getRequest(
        "/mountLiquid/mountLiquid?acquisitionTime=" +
          this.termForm.prodDate +
          "&current=" +
          this.currentPage +
          "&oilStationId=" +
          this.termForm.orgName +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.dymData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    //采油站下拉框初始化
    orgNameInit() {
      this.getRequest("/basOilStationInfor/selectWater").then((resp) => {
        if (resp) {
          this.orgNameData = resp.data;
        }
      });
    },
    //单井下拉框初始化
    wellOptionsInit() {
      this.getRequest("/basWellInfor/selectAmountLiquid").then((resp) => {
        if (resp) {
          this.wellOptions = resp.data;
        }
      });
    },
    //单井根据采油站变化
    queryWellNameByOrgName(val) {
      this.getRequest(
        "/basWellInfor/selectAmountLiquidById?oilStationId=" + val
      ).then((resp) => {
        if (resp) {
          this.wellOptions = resp.data;
        }
      });
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.abnormalDymSearch();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.abnormalDymSearch();
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/amountLiquid/amountLiquid.css";
</style>
