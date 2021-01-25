<template>
  <div class="abnormalGtmj">
    <!-- 条件查询 -->
    <el-form class="abnormalGtmj_form" v-model="termData" :inline="true">
      <!-- 下拉框查询 -->
      <el-form-item label="采油站">
        <el-select
          v-model="termData.orgName"
          clearable
          filterable
          placeholder="全区"
          size="medium"
        >
          <el-option
            v-for="item in orgNameData"
            size="medium"
            :key="item.oilStationID"
            :label="item.oilStationName"
            :value="item.oilStationName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="termData.checkDate"
          size="medium"
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
          @click="searchPost()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      class="abnormalGtmj_table"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="gtmjData"
      height="93%"
      border
      lazy
      @expand-change="rowCollectInit"
      :expand-row-keys="expands"
      :row-key="getRowKeys"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      style="width: 100%"
    >
      <template slot="empty"
        ><br />
        今日无功图面积异常数据<br />
      </template>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div
            class="work_area_item_detail"
            :key="scope.row.checkDate"
            v-loading="loadCollectLoad"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
          >
            <div
              style="padding: 0px; line-height: 0px"
              v-for="(item, index) in loadCollect"
              :key="index"
            >
              <span
                style="width: 100px; text-align: center; display: inline-block"
                >{{ item.wellCommonName }}</span
              >
              <span
                style="
                  width: 180px;
                  text-align: center;
                  display: inline-block;
                  margin-left: 10px;
                "
                >{{ item.checkDate }}</span
              >
              <span
                style="
                  width: 300px;
                  text-align: center;
                  display: inline-block;
                  margin-left: 10px;
                "
                >{{ item.abnormalProblem }}</span
              >
              <el-button
                type="text"
                @click="previewGtmj(item)"
                style="margin-left: 10px"
                >查看功图</el-button
              >
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="index" align="center" label="序号" width="80" />
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
        width="200"
      />
      <el-table-column
        prop="abnormalProblem"
        align="center"
        label="诊断结果"
        width="340"
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
    <div class="abnormalGtmj_page">
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
    CommonPreviewGtmj,
  },
  data() {
    return {
      termData: {
        checkDate: "",
        orgName: "",
      },
      wellCommonName: "",
      testData: [],
      filterData: [],
      filterDataCopy: [],
      rowData: [[]],
      // 当前展开行数据
      loadCollect: [],
      // 展开行加载动画
      loadCollectLoad: true,
      // 设置row-key只展示一行
      expands: [],
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
      previewGtmjData: {},
    };
  },
  created() {
    this.postInit();
    this.selectInit();
  },
  methods: {
    // 根据输入信息查询
    searchPost() {
      if (this.termData.checkDate == null) {
        this.termData.checkDate = "";
      }
      this.getRequest(
        "/oilWell/abnormalGtmj/abnormalGtmjPage?checkDate=" +
          this.termData.checkDate +
          "&current=" +
          this.currentPage +
          "&orgName=" +
          this.termData.orgName +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
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
        "/oilWell/abnormalGtmj/abnormalGtmjPage?checkDate=" +
          this.termData.checkDate +
          "&current=" +
          this.currentPage +
          "&orgName=" +
          this.termData.orgName +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
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
    //采油站下拉框数据初始化
    selectInit() {
      this.getRequest("/basOilStationInfor/oilStationOptions").then((resp) => {
        this.loading = false;
        if (resp) {
          this.orgNameData = resp.data;
        }
      });
    },
    // 只展开一行放入当前行id
    getRowKeys(row) {
      return row.primaryId;
    },
    // 控制展开与关闭行
    rowCollectInit(row, expandedRows) {
      //只展开一行
      if (expandedRows.length) {
        //说明展开了
        this.expands = [];
        if (row) {
          //只展开当前行wellCommonName
          this.expands.push(row.primaryId);
          this.loadCollect = [];
          this.loadCollectLoad = true;
          this.getRequest(
            "/oilWell/abnormalGtmj/abnormalGtAreas?checkDate=" +
              row.checkDate +
              "&wellName=" +
              row.wellCommonName
          ).then((resp) => {
            this.loadCollectLoad = false;
            if (resp) {
              this.loadCollect = resp.data;
            }
          });
        }
      } else {
        //说明收起了
        this.expands = [];
      }
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
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/oilWell/workAreaAbnormal.css";
</style>
