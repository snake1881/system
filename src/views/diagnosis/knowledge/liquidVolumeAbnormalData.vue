<template>
  <div class="liqFilterCondition">
    <el-form :model="termForm" :inline="true">
      <el-form-item label="采油站">
        <el-select v-model="termForm.value" placeholder="请选择" size="small">
          <el-option
            v-for="item in liqFilterConditionDate"
            :size="small"
            :key="item.wellName"
            :label="item.wellName"
            :value="item.wellName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-input v-model="termForm.prodDate" placeholder="日期" size="small"></el-input>
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="liqFilterConditionSearch()"
      >查询</el-button>
      <el-button type="primary" size="small" @click="ylYccsInit()">异常参数设置</el-button>
    </el-form>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="liqFilterConditionDate"
      border
      row-key="diadiagnosticStep"
      style="width:100%"
      @current-change="handleCurrentChange"
    >
      <el-table-column label="序号" type="index" width="50" align="center">
        <template scope="scope">
          <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="wellName" label="井号" width="140"></el-table-column>
      <el-table-column prop="filter" label="条件（填写选定日期后可选择任意天）" width="300"></el-table-column>
      <el-table-column prop="appointDate" label="指定日期" width="320"></el-table-column>
      <el-table-column label="操作" width="140">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editliqFilterCondition(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="dleteliqFilterCondition(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="liqFilterCondition_page">
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
      termForm: {
        value:"",
        prodDate: ""
      },
      liqFilterConditionDate: [],
      ylYccsDate: [],
      orgName: "",
      loading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.liqFilterConditionInit();
    this.ylYccsInit();
  },
  methods: {
    liqFilterConditionInit() {
      this.getRequest(
        "/knowledge/LiqFilterCondition/LiqFilterConditionList?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.liqFilterConditionDate = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    liqFilterConditionSearch() {
      this.getRequest(
        "/knowledge/LiqFilterCondition/LiqFilterConditionListTerm?orgName="+
        this.termForm.value +
        "&prodDate=" +
        this.termForm.prodDate
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.liqFilterConditionDate = resp.data;
        }
      });
    },
    ylYccsInit() {
      this.getRequest("/knowledge/ylYcss/ylYccs").then(resp => {
        this.loading = false;
        if (resp) {
          this.ylYccsDate = resp.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
