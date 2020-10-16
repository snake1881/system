<template>
  <div class="role">
    <div class="topPosition" align="center">
      <!-- 条件查询 -->
      <el-form class="role_form" :model="termForm" :inline="true">
        <!-- 下拉框查询 -->
        <el-form-item label="采油站">
          <el-select
            v-model="termForm.orgName"
            clearable
            placeholder="全区"
            size="small"
          >
            <el-option
              v-for="item in orgNameData"
              :key="item.orgName"
              :label="item.orgName"
              :value="item.orgName"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期" size="medium">
          <el-date-picker
            v-model="termForm.prodDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd "
          >
          </el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="abnormalDymSearch()"
          >查询</el-button
        >
      </el-form>
    </div>
    <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="dymData"
      height="500px"
      border
      row-key="index"
      style="width:100%;"
    >
      <el-table-column type="expand" width="60" look="index">
        <template slot-scope="scope">
          <div align="center" v-html="scope.row.dymDataList"></div>
        </template>
      </el-table-column>
      <el-table-column prop="index" align="center" label="序号" width="60" />
      <el-table-column prop="wellId" align="center" label="井号" width="120" />
      <el-table-column
        prop="prodDate"
        align="center"
        label="日期"
        width="250"
      />
      <el-table-column
        prop="abnormalProblem"
        align="center"
        label="诊断结果"
        width="290"
      />
      <el-table-column
        prop="orgName"
        align="center"
        label="采油站"
        width="140"
      />
      <el-table-column prop="dym" align="center" label="动液面" width="120" />
      <el-table-column
        prop="normalDym"
        align="center"
        label="前七日均值"
        width="120"
      />
      <el-table-column align="center" label="操作" width="140">
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
    <div class="dym_page" align="center">
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
    <!-- 查看功图 -->
    <common-preview-Dym
      :previewDymVisible="previewDymVisible"
      :previewData="previewDymData"
      @previewDymRowClose="previewDymClose"
    />
  </div>
</template>
<script>
import CommonPreviewDym from "../../../components/diagnosis/oilwell/dymyc/DymycScanLine";
export default {
  components: {
    CommonPreviewDym
  },
  data() {
    return {
      termForm: {
        prodDate: "",
        orgName: ""
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
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true
    };
  },
  created() {
    this.abnormalDymSearch();
    this.orgNameInit();
  },
  methods: {
    // 根据输入信息查询
    abnormalDymSearch() {
      if (this.termForm.orgName === null && this.termForm.prodDate === null) {
        this.DymAbnormalInit();
      } else if (
        this.termForm.orgName === null &&
        this.termForm.prodDate !== null
      ) {
        this.getRequest(
          "/oilWell/dym/abnormalDym?current=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize +
            "&prodDate=" +
            this.termForm.prodDate
        ).then(resp => {
          if (resp) {
            this.dymData = resp.data.records;
            this.total = resp.data.total;
            this.currentPage = resp.data.current;
            this.pageSize = resp.data.size;
          }
        });
      } else if (
        this.termForm.orgName !== null &&
        this.termForm.prodDate === null
      ) {
        this.getRequest(
          "/oilWell/dym/abnormalDym?current=" +
            this.currentPage +
            "&orgName=" +
            this.termForm.orgName +
            "&pageSize=" +
            this.pageSize
        ).then(resp => {
          if (resp) {
            this.dymData = resp.data.records;
            this.total = resp.data.total;
            this.currentPage = resp.data.current;
            this.pageSize = resp.data.size;
          }
        });
      } else {
        this.getRequest(
          "/oilWell/dym/abnormalDym?current=" +
            this.currentPage +
            "&orgName=" +
            this.termForm.orgName +
            "&pageSize=" +
            this.pageSize +
            "&prodDate=" +
            this.termForm.prodDate
        ).then(resp => {
          if (resp) {
            this.dymData = resp.data.records;
            this.total = resp.data.total;
            this.currentPage = resp.data.current;
            this.pageSize = resp.data.size;
            this.getIndex();
          }
        });
      }
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
        "/oilWell/dym/abnormalDym?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.dymData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.getIndex();
        }
      });
    },
    //采油站下拉框数据查询
    orgNameInit() {
      this.getRequest("/knowledge/DiagnosticParametersGt/CdWellSource").then(
        resp => {
          this.loading = false;
          if (resp) {
            this.orgNameData = resp.data;
          }
        }
      );
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
    //设置序号
    getIndex() {
      this.dymData.forEach((item, index) => {
        item.index = index + 1 + (this.currentPage - 1) * this.pageSize;
        return item;
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
