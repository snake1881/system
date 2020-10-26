<template>
  <div class="abnormalGtmj">
    <div align="center">
      <!-- 条件查询 -->
      <el-form class="role_form" v-model="termData" :inline="true">
        <!-- 下拉框查询 -->
        <el-form-item label="采油站">
          <el-select
            v-model="termData.orgName"
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
            v-model="termData.checkDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="searchPost()"
          >查询</el-button
        >
      </el-form>
    </div>
    <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="gtmjData"
      height="500px"
      border
      lazy
      row-key="checkDate"
      :tree-props="{
        children: 'children',
        hasChildren: 'hasChildren'
      }"
      style="width:100%;"
    >
      <el-table-column prop="index" align="center" label="序号" width="80">
      </el-table-column>
      <el-table-column
        prop="wellCommonName"
        align="center"
        label="井号"
        width="180"
      />
      <el-table-column
        prop="checkDate"
        align="center"
        label="日期"
        width="280"
      />
      <el-table-column
        prop="orgName"
        align="center"
        label="采油站"
        width="220"
      />
      <el-table-column
        prop="abnormalProblem"
        align="center"
        label="诊断结果"
        width="360"
      />
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="previewGtmj(scope.row)"
            >查看功图</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="workingArea_page" align="center">
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
    <common-preview-Gtmj
      :previewGtmjVisible="previewGtmjVisible"
      :previewData="previewGtmjData"
      @previewGtmjRowClose="previewGtmjClose"
    />
  </div>
</template>
<script>
import CommonPreviewGtmj from "../../../components/diagnosis/oilwell/gtmjyc/GtmjycScanLine";
export default {
  components: {
    CommonPreviewGtmj
  },
  data() {
    return {
      termData: {
        checkDate: "",
        orgName: ""
      },
      wellCommonName: "",
      testData: [],
      filterData: [],
      filterDataCopy: [],
      rowData: [[]],
      // 表格数据
      gtmjData: [],
      // 采油站下拉框数据
      orgNameData: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true,
      //
      previewGtmjVisible: false,
      previewGtmjData: {}
    };
  },
  created() {
    this.postInit();
    this.selectInit();
  },
  methods: {
    // 根据输入信息查询
    searchPost() {
      this.getRequest(
        "/oilWell/abnormalGtmj/abnormalGtmjPage?checkDate=" +
          this.termData.checkDate +
          "&current=" +
          this.currentPage +
          "&orgName=" +
          this.termData.orgName +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        if (resp) {
          this.gtmjData = resp.data.records;
          this.total = resp.data.total;
          this.filterData = resp.data.records;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.getIndex();
        }
      });
    },

    //表格数据初始化
    postInit() {
      this.getRequest(
        "/oilWell/abnormalGtmj/abnormalGtmjPage?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.gtmjData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.getIndex();
        }
      });
    },
    //采油站下拉框数据初始化
    selectInit() {
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
      this.searchPost();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchPost();
    },
    previewGtmj(val) {
      this.previewGtmjData = val;
      this.previewGtmjVisible = true;
    },
    // 关闭功图
    previewGtmjClose() {
      this.previewGtmjVisible = false;
    },
    //设置序号
    getIndex() {
      this.gtmjData.forEach((item, index) => {
        item.index = index + 1 + (this.currentPage - 1) * this.pageSize;
        return item;
      });
    }
  },
  
};
</script>
<style lang="less" scoped>
// .workingArea_page {
//    position:absolute; bottom:0;
// }
</style>
