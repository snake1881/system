<template>
<!--  功图数据异常界面  -->
  <div class="system">
    <el-form :model="abnormalGtFrom" height="40px" :inline="true">
      <el-form-item label="采油站">
        <el-select v-model="abnormalGtFrom.orgName" clearable placeholder="全区" size="medium">
          <el-option
            v-for="item in orgNameData"
            :key="item.orgName"
            :label="item.orgName"
            :value="item.orgName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-input v-model="abnormalGtFrom.checkDate" placeholder="日期" size="small"></el-input>
      </el-form-item>
      <el-from-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="abnormalGtSearch()">查询</el-button>
      </el-from-item>
    </el-form>

    <el-divider>功图数据异常(默认为今日)</el-divider>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="abnormalGtDate"
      height="84%"
      border
      row-key="wellId"
      :tree-props="{
        children: 'children', hasChildren: 'hasChildren'
      }"
      style="width:100%"
    >
      <el-table-column prop="rn" label="序号" width="100" />
      <el-table-column prop="wellId" label="井号" width="150" />
      <el-table-column prop="checkDate" label="日期" width="200" />
      <el-table-column prop="abnormalProblem" label="诊断结果" width="320" />
      <el-table-column prop="orgName" label="采油站" width="320" />
      <el-table-column label="操作" width="140">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editliqFilterCondition(scope.row)">查看功图</el-button>
        </template>
      </el-table-column>
    </el-table>

    

  <!-- 分页  -->
    <div class="abnormalGt_page">
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
      abnormalGtFrom: {
        orgName: "",
        checkDate: ""
      },
      orgNameData:[],
      options: [],
      checkDate: "2020-08-14",
      // 表格数据
      abnormalGtDate: [],
      abnormalData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true
    };
  },
  created() {
    this.abnormalGtInit();
    this.orgNameInit();
  },
  methods: {
    abnormalGtSearch() {
      this.getRequest(
        "/oilWell/abnormalGt/abnormalGtAllPage?checkDate=" +
          this.abnormalGtFrom.checkDate +
          "&current=" +
          this.currentPage +
          "&orgName=" +
          this.abnormalGtFrom.orgName +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.abnormalGtDate = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    //加油站下拉框初始化
    orgNameInit(){
      this.getRequest("/knowledge/DiagnosticParametersGt/CdWellSource").then(
        resp => {
          this.loading = false;
          if (resp) {
            this.orgNameData = resp.data;
          }
        }
      );
    },
    abnormalGtInit() {
      this.getRequest(
        "/oilWell/abnormalGt/abnormalGtAllPage?checkDate=0000-00-00&currnet=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.abnormalGtDate = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.abnormalGtSearch();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.abnormalGtSearch();
    }
  }
};
</script>
<style lang="less" scoped>
</style>
