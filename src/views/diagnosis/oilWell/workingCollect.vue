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
      >
        <el-table-column type="expand" width="80">
          <template>
            <el-table :data="loadCollect" height="250px">
              <el-table-column prop="checkDate" label="日期" width="180" align="center" />
              <el-table-column prop="thirdResult" label="诊断结果" width="170" align="center" />
              <el-table-column label="操作" width="120" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="details(scope.row)">查看曲线</el-button>
                </template>
              </el-table-column>
            </el-table>
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
    <div class="work_collect_item" v-if="!isShow">
      <el-table :data="detailsCollect" style="width: 100%">
        <el-table-column label="当前数据" type="index" width="100" align="center" />
        <el-table-column label="泵径" width="100" align="center" />
        <el-table-column prop="stroke" label="冲程" width="100" align="center" />
        <el-table-column prop="frequency" label="冲刺" width="100" align="center" />
        <el-table-column prop="suspMaxLoad" label="最大载荷" width="100" align="center" />
        <el-table-column prop="suspMinLoad" label="最小载荷" width="100" align="center" />
        <el-table-column label="泵径" width="100" align="center" />
        <el-table-column label="泵深" width="100" align="center" />
        <el-table-column label="动液面" width="100" align="center" />
      </el-table>
    </div>
  </div>
</template>
<script>
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
      detailsCollect: []
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
          resp.data.records.forEach(result => {
            result.hasChildren = true;
            this.workingCollect.push(result);
          });
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 单行数据
    rowCollectInit(row) {
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
      this.detailsCollect.push(row);
      console.log(row);
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
