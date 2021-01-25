<template>
  <div class="role">
    <!-- 条件查询 -->
    <el-form class="role_form" :model="flowDayForm" :inline="true">
      <el-form-item label="采油站">
        <el-select
          v-model="flowDayForm.oilStationId"
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
          v-model="flowDayForm.wellId"
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
      <el-form-item label="日期">
        <el-date-picker
          size="medium"
          v-model="flowDayForm.flowDayDate"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="searchFlowDay()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="flowDayData"
      height="91%"
      border
      style="width: 100%"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{
        background: '#eef1f6',
        color: '#606266',
        'text-align': 'center',
      }"
    >
      <el-table-column prop="wellName" label="井号" width="100" />
      <el-table-column prop="drInjectionTime" label="生产时间" width="100" />
      <el-table-column prop="abnormalType" label="诊断结果" width="100">
        <template slot-scope="scope">
          <p v-if="scope.row.abnormalType == '0'">正常</p>
          <p v-if="scope.row.abnormalType == '1'">欠注</p>
          <p v-if="scope.row.abnormalType == '2'">超注</p>
        </template>
      </el-table-column>
      <el-table-column prop="oilStationName" label="采油站" width="120" />
      <el-table-column
        prop="drInjectionAllocation"
        label="配注量"
        width="100"
      />
      <el-table-column
        prop="drWaterInjection"
        label="注水量"
        width="100"
        show-overflow-tooltip
      />
      <el-table-column prop="abnormalReason" label="详细诊断" width="120" />
      <el-table-column prop="drWellheadPressure" label="油压" width="100" />
      <el-table-column prop="drPipePressure" label="管压" width="100" />
      <el-table-column prop="drCasingPressure" label="套压" width="100" />
      <el-table-column prop="drPumpPressure" label="泵压" width="100" />
      <el-table-column
        prop="drRemark"
        label="备注"
        width="190"
        show-overflow-tooltip
      />
    </el-table>
    <!-- 分页 -->
    <div class="role_page">
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
</template>
<script>
export default {
  data() {
    return {
      // 查询
      flowDayForm: {
        oilStationId: "",
        wellId: "",
        flowDayDate: "",
      },
      // 表格数据
      flowDayData: [],
      //采油站下拉框数据
      orgNameData: [],
      //单井下拉框数据
      wellOptions: [],
      // 分页
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true,
    };
  },
  created() {
    this.orgNameInit();
    this.wellOptionsInit();
    this.flowDayInit();
  },
  methods: {
    // 根据日期查询
    searchFlowDay() {
      this.getRequest(
        "/waterWell/flowAbnormal/selectFlowAbnormalByTime?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize +
          "&waterInjectionDate=" +
          this.flowDayForm.flowDayDate +
          "&wellId=" +
          this.flowDayForm.wellId
      ).then((resp) => {
        if (resp) {
          this.flowDayData = resp.data.abnormalFlowList.records;
          this.total = resp.data.abnormalFlowList.total;
          this.currentPage = resp.data.abnormalFlowList.current;
          this.pageSize = resp.data.abnormalFlowList.size;
        }
      });
    },
    // 表格数据初始化
    flowDayInit() {
      this.getRequest(
        "/waterWell/flowAbnormal/selectFlowAbnormal?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.flowDayData = resp.data.abnormalFlowList.records;
          this.total = resp.data.abnormalFlowList.total;
          this.currentPage = resp.data.abnormalFlowList.current;
          this.pageSize = resp.data.abnormalFlowList.size;
        }
      });
    },
    //采油站下拉框初始化
    orgNameInit() {
      this.getRequest("/basOilStationInfor/selectWater").then((resp) => {
        this.loading = false;
        if (resp) {
          this.orgNameData = resp.data;
        }
      });
    },
    //单井下拉框初始化
    wellOptionsInit() {
      this.getRequest("/basWellInfor/selectWater").then((resp) => {
        this.loading = false;
        if (resp) {
          this.wellOptions = resp.data;
        }
      });
    },
    //单井根据采油站变化
    queryWellNameByOrgName(val) {
      this.getRequest("/basWellInfor/listByStation?oidStationId=" + val).then(
        (resp) => {
          if (resp) {
            this.wellOptions = resp.data;
          }
        }
      );
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.flowDayInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.flowDayInit();
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/system/role.css";
</style>
