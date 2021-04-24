<template>
  <div class="role">
    <!-- 条件查询 -->
    <el-form class="role_form" :model="flowEveryForm" :inline="true">
      <el-form-item label="采油站">
        <el-select
          v-model="flowEveryForm.oilStationId"
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
          v-model="flowEveryForm.wellId"
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
          v-model="flowEveryForm.flowEveryDate"
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
          @click="searchFlowEvery()"
          >查询</el-button
        >
        <el-button type="primary" size="small" @click="waterInjectionAllocation()"
          >水井智能调配</el-button
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
      <el-table-column prop="injectionAllocation" label="配注量(m³)" width="100" />
      <el-table-column prop="injectionTime" label="注水时间(h)" width="100"/>
      <el-table-column prop="waterInjection" label="当前注水量(m³)" width="125" />
      <el-table-column prop="startTotalFlow" label="起始累计流量(m³)" width="140" />
      <el-table-column
        prop="separatorPressure"
        label="分水器压力(Mpa)"
        width="140"
      />
      <el-table-column
        prop="wellheadPressure"
        label="井口压力(Mpa)"
        width="140"
      />
      <el-table-column prop="readbackFlow" label="流量回读(m³/d)" width="140" />
      <el-table-column
        prop="instantaneousFlow"
        label="瞬时流量(m³/h)"
        width="140"
      />
      <el-table-column prop="totalFlow" label="当前累计流量(m³)" width="140" />
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
     <!-- 异常参数设置 -->
    <common-water-injection-allocation
      :waterInjectionAllocationVisible="waterInjectionAllocationVisible"
      :waterInjectionAllocationData="waterInjectionAllocationData"
      @waterInjectionAllocationRowClose="waterInjectionAllocationClose"
    />
  </div>
</template>
<script>
import CommonWaterInjectionAllocation from "../../../components/diagnosis/abnormal/waterabnormalcollect/CommonWaterInjectionAllocation"
export default {
   components: {
    CommonWaterInjectionAllocation,
  },
  data() {
    return {
      // 查询
      flowEveryForm: {
        oilStationId: "",
        wellId: "",
        flowEveryDate: "",
      },
      // 表格数据
      flowEveryData: [],
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
       // 异常筛选参数设置编辑
      waterInjectionAllocationVisible: false,
      waterInjectionAllocationData: {},
    };
  },
  created() {
    this.orgNameInit();
    this.wellOptionsInit();
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
          this.pageSize +
          "&wellId=" +
          this.flowEveryForm.wellId
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
      this.flowEveryInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.flowEveryInit();
    },
    // 异常参数筛选设置编辑
    waterInjectionAllocation() {
      // this.waterInjectionAllocationData = val;
      this.waterInjectionAllocationVisible = true;
      console.log("success");
    },
    // 关闭异常参数筛选编辑框
    waterInjectionAllocationClose() {
      this.waterInjectionAllocationVisible = false;
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/system/role.css";
</style>
