<template>
  <div class="role">
    <!-- 条件查询 -->
    <el-form class="role_form" :model="flowEveryForm" :inline="true">
      <el-form-item label="日期">
        <el-date-picker
          size="medium"
          v-model="flowEveryForm.flowEveryDate"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="searchFlowEvery()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="flowEveryData"
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
      <el-table-column prop="oilStationName" label="采油站" width="120" />
      <el-table-column prop="injectionAllocation" label="配注量" width="100" />
      <el-table-column prop="injectionTime" label="注水时间" width="80" />
      <el-table-column prop="waterInjection" label="当前注水量" width="100" />
      <el-table-column prop="startTotalFlow" label="起始累计流量" width="140" />
      <el-table-column
        prop="separatorPressure"
        label="分水器压力(MPA)"
        width="140"
      />
      <el-table-column
        prop="wellheadPressure"
        label="井口压力(MPA)"
        width="140"
      />
      <el-table-column prop="readbackFlow" label="流量回读(M3/D)" width="140" />
      <el-table-column
        prop="instantaneousFlow"
        label="瞬时流量(M3/S)"
        width="140"
      />
      <el-table-column prop="totalFlow" label="当前累计流量(M3)" width="140" />
      <el-table-column
        prop="acquisitionTime"
        label="采集时间"
        width="100"
        show-overflow-tooltip
      />
      <el-table-column prop="abnormalType" label="诊断结果" width="100">
        <template slot-scope="scope">
          <p v-if="scope.row.abnormalType == '0'">正常</p>
          <p v-if="scope.row.abnormalType == '1'">欠注</p>
          <p v-if="scope.row.abnormalType == '2'">超注</p>
        </template>
      </el-table-column>
      <el-table-column prop="drRemark" label="备注" width="120" fixed="right" />
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
      flowEveryForm: {
        flowEveryDate: "",
      },
      // 表格数据
      flowEveryData: [],
      // 分页
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true,
    };
  },
  created() {
    this.flowEveryInit();
  },
  methods: {
    // 根据日期查询
    searchFlowEvery() {
      this.getRequest(
        "/waterWell/flowRealAbnormal/selectFlowRealAbnormalByTime?acquisitionTime=" +
          this.flowEveryForm.flowEveryDate +
          "&current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
        if (resp) {
          this.flowEveryData = resp.data.bizWaterInjectionHours.records;
          this.total = resp.data.bizWaterInjectionHours.total;
          this.currentPage = resp.data.bizWaterInjectionHours.current;
          this.pageSize = resp.data.bizWaterInjectionHours.size;
        }
      });
    },
    // 表格数据初始化
    flowEveryInit() {
      this.getRequest(
        "/waterWell/flowRealAbnormal/selectFlowRealAbnormal?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.flowEveryData = resp.data.bizWaterInjectionHours.records;
          this.total = resp.data.bizWaterInjectionHours.total;
          this.currentPage = resp.data.bizWaterInjectionHours.current;
          this.pageSize = resp.data.bizWaterInjectionHours.size;
        }
      });
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.flowEveryInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.flowEveryInit();
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/system/role.css";
</style>
