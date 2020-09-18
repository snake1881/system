<template>
  <div class="liquid_volume_abnormal">
    <!-- 条件查询 -->
    <el-form class="liquid_volume_abnormal_form" :model="abnormalForm" :inline="true">
      <el-form-item label="采油站">
        <el-select v-model="abnormalForm.orgName" placeholder="全区">
          <el-option label="徐梁采油站" value="徐梁采油站"></el-option>
          <el-option label="郑寨子采油站" value="郑寨子采油站"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker :v-model="abnormalForm.formDate" type="date" placeholder="选择日期" size="medium" />
      </el-form-item>
      <el-form-item label="条件">
        <el-select v-model="abnormalForm.liqOrWater" placeholder="全部">
          <el-option label="液量" value="shanghai"></el-option>
          <el-option label="含水" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" size="small" @click="searchLiquidVolume()">查询</el-button>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="liquidVolumeAbnormal"
      @selection-change="handleSelectionChange"
      height="84%"
      border
      style="width:100%;"
    >
      <el-table-column prop="wellName" label="井号" width="120" />
      <el-table-column prop="prodDate" label="日期" width="160" />
      <el-table-column prop="prodTime" label="生产时间" width="140" />
      <el-table-column prop="abnormalProblem" label="诊断结果" width="140" />
      <el-table-column prop="orgName" label="采油站" width="160" />
      <el-table-column prop="liqProdDaily" label="产液量" width="140" />
      <el-table-column prop="waterCut" label="含水率" width="130" />
      <el-table-column prop="normalLiqProdDaily" label="正常产液量" width="140" />
      <el-table-column prop="normalWaterCut" label="正常含水率" width="140" />
      <el-table-column prop="remarks" label="备注" width="140" />
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dleteLog(scope.row)">查看曲线</el-button>
          <el-button type="text" size="small" @click="dleteLog(scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
      // 液量异常数据
      liquidVolumeAbnormal: [],
      // 表单数据
      abnormalForm: {
        // 采油站
        orgName: null,
        // 日期选择
        formDate: null,
        // 条件
        liqOrWater: null
      },
      orgName: null,
      date: null,
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true
    };
  },
  created() {
    this.liquidVolumeInit();
  },
  methods: {
    // 数据初始化
    liquidVolumeInit() {
      this.getRequest(
        "/oilWell/liquidVolumeAbnormal/page?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize +
          "&orgName=" +
          this.orgName +
          "&date=" +
          this.date
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.liquidVolumeAbnormal = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 按条件查询
    searchLiquidVolume() {
      this.getRequest(
        "/oilWell/liquidVolumeAbnormal/page?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize,
        this.abnormalForm
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.liquidVolumeAbnormal = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/oilWell/liquidVolumeAbnormal.css";
</style>
