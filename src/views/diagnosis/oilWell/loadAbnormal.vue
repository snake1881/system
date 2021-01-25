<template>
  <div class="abnormalLoad">
    <!-- 条件查询 -->
    <el-form class="abnormalLoad_form" v-model="termData" :inline="true">
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
            :key="item.oilStationId"
            :label="item.oilStationName"
            :value="item.oilStationName"
          />
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
        />
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
      @expand-change="rowCollectInit"
      :expand-row-keys="expands"
      :row-key="getRowKeys"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :tree-props="{
        children: 'children',
        hasChildren: 'hasChildren',
      }"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div
            class="load_abnormal_item_detail"
            :key="scope.row.checkDate"
            v-loading="loadCollectLoad"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
          >
            <div
              class="load_abnormal_item_detail_table"
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
                  margin-left: 5px;
                "
                >{{ item.checkDate }}</span
              >
              <span
                style="
                  width: 500px;
                  text-align: center;
                  display: inline-block;
                  margin-left: 5px;
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
      <el-table-column align="center" label="操作" width="140">
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
    CommonPreviewZh,
  },
  data() {
    return {
      termData: {
        checkDate: "",
        orgName: "",
      },
      // 表格数据
      ZhData: [],
      // 采油站下拉框数据
      orgNameData: [],
      // 当前展开行数据
      loadCollect: [],
      // 展开行加载动画
      loadCollectLoad: true,
      // 设置row-key只展示一行
      expands: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true,
      //
      previewZhVisible: false,
      previewZhData: {},
    };
  },
  created() {
    this.ZhInit();
    this.orgNameInit();
  },
  methods: {
    // 根据输入信息查询
    searchZh() {
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
      ).then((resp) => {
        if (resp) {
          this.ZhData = resp.data.records;
          this.total = resp.data.total;
          this.filterData = resp.data.records;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
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
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.ZhData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    //采油站下拉框数据初始化
    orgNameInit() {
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
            "/oilWell/abnormalZh/selectByDate?date=" +
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
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/oilWell/loadAbnormal.css";
</style>
