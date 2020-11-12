<template>
  <div class="abnormalLoad">
    <!-- 条件查询 -->
    <el-form class="abnormalLoad_form" v-model="termData" :inline="true">
      <!-- 下拉框查询 -->
      <el-form-item label="采油站">
        <el-select
          v-model="termData.orgName"
          clearable
          placeholder="全区"
          size="medium"
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

      <el-form-item label="日期">
        <el-date-picker
          size="medium"
          v-model="termData.checkDate"
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
          @click="searchZh()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
    <el-table
      class="abnormalLoad_table"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="ZhData"
      height="93%"
      border
      lazy
      row-key="checkDate"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
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
        width="130"
      />
      <el-table-column
        prop="checkDate"
        align="center"
        label="日期"
        width="230"
      />
      <el-table-column
        prop="orgName"
        align="center"
        label="采油站"
        width="170"
      />
      <el-table-column
        prop="abnormalProblem"
        align="center"
        label="诊断结果"
        width="500"
      />
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="previewZh(scope.row)"
            >查看功图</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="abnormalLoad_page">
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
    <common-preview-Zh
      :previewZhVisible="previewZhVisible"
      :previewData="previewZhData"
      @previewZhRowClose="previewZhClose"
    />
  </div>
</template>
<script>
import CommonPreviewZh from "../../../components/diagnosis/oilwell/abnormalZh/CommonPreviewZh";
export default {
  components: {
    CommonPreviewZh
  },
  data() {
    return {
      termData: {
        checkDate: "",
        orgName: ""
      },
      // 表格数据
      ZhData: [],
      // 采油站下拉框数据
      orgNameData: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true,
      //
      previewZhVisible: false,
      previewZhData: {}
    };
  },
  created() {
    this.ZhInit();
    this.orgNameInit();
  },
  methods: {
    // 根据输入信息查询
    searchZh() {
      // if(this.pageSize===undefined){
      //   this.pageSize=10;
      // };
      // if(this.currentPage===undefined){
      //   this.currentPage=1;
      // };
      let a = this.pageSize;
      this.getRequest(
        "/oilWell/abnormalZh/abnormalZhPage?checkDate=" +
          this.termData.checkDate +
          "&current=" +
          this.currentPage +
          "&orgName=" +
          this.termData.orgName +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        if (resp) {
          this.ZhData = resp.data.records;
          this.total = resp.data.total;
          this.filterData = resp.data.records;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.getIndex();
        }
      });
    },

    //表格数据初始化
    ZhInit() {
      this.getRequest(
        "/oilWell/abnormalZh/abnormalZhPage?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.ZhData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          if (this.ZhData != null) {
            this.getIndex();
          }
        }
      });
    },

    //采油站下拉框数据初始化
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
      this.searchZh();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchZh();
    },
    //查看功图
    previewZh(val) {
      this.previewZhData = val;
      this.previewZhVisible = true;
    },
    // 关闭功图
    previewZhClose() {
      this.previewZhVisible = false;
    },
    //设置序号
    getIndex() {
      if (this.ZhData !== null) {
        this.ZhData.forEach((item, index) => {
          item.index = index + 1 + (this.currentPage - 1) * this.pageSize;
          return item;
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/oilWell/loadAbnormal.css";
</style>
