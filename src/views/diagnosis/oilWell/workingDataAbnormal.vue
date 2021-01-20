<template>
  <!--功图数据异常页面-->
  <div class="abnormalGt">
    <el-form class="abnormalGt_form" v-model="GtForm" :inline="true">
      <el-form-item label="采油站">
        <el-select
          size="medium"
          v-model="GtForm.orgName"
          filterable
          clearable
          placeholder="全区"
        >
          <el-option
            v-for="item in orgNameData"
            :key="item.oilStationId"
            :label="item.oilStationName"
            :value="item.oilStationName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          size="medium"
          v-model="GtForm.checkDate"
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
          size="small"
          icon="el-icon-search"
          @click="abnormalGtSearch()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>

    <el-table
      class="abnormalGt_table"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="abnormalGtData"
      height="86%"
      border
      @expand-change="rowCollectInit"
      :expand-row-keys="expands"
      :row-key="getRowKeys"
      style="width: 100%"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
    >
      <template slot="empty"
        ><br />
        今日无功图数据异常数据<br />
      </template>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div
            class="work_data_item_detail"
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
                style="width: 150px; text-align: center; display: inline-block"
                >{{ item.checkDate }}</span
              >
              <span
                style="width: 220px; text-align: center; display: inline-block"
                >{{ item.abnormalProblem }}</span
              >
              <el-button
                type="text"
                @click="previewAbnormalGt(item)"
                style="width: 100px; text-align: center; display: inline-block"
                >查看功图</el-button
              >
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="rn" label="序号" align="center" width="100" />
      <el-table-column prop="wellId" label="井号" align="center" width="160" />
      <el-table-column
        prop="checkDate"
        label="日期"
        align="center"
        width="240"
      />
      <el-table-column
        prop="abnormalProblem"
        label="诊断结果"
        align="center"
        width="320"
      >
      </el-table-column>
      <el-table-column
        prop="orgName"
        label="采油站"
        align="center"
        width="300"
      />
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="previewAbnormalGt(scope.row)"
            >查看功图</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="abnormalGt_page">
      <!-- 分页 -->
      <el-pagination
        class="pagination"
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
    <common-preview-abnormalGt
      :previewAbnormalGtVisible="previewAbnormalGtVisible"
      :previewData="previewAbnormalGtData"
      @previewAbnormalGtRowClose="previewAbnormalGtClose"
    />
  </div>
</template>
<script>
import CommonPreviewAbnormalGt from "../../..//components/diagnosis/oilwell/abnormalGt/CommonPreviewAbnormalGT";
export default {
  components: {
    CommonPreviewAbnormalGt,
  },
  data() {
    return {
      GtForm: {
        orgName: "",
        checkDate: "",
      },
      //用于判断查询条件是否发生改变
      oldOrgName: "",
      OldCheckDate: "",
      //采油站名称
      orgNameData: [],
      //表格数据
      abnormalGtData: [],
      // 当前展开行数据
      loadCollect: [],
      // 展开行加载动画
      loadCollectLoad: true,
      // 设置row-key只展示一行
      expands: [],
      loading: true,
      //分页
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 查看功图
      previewAbnormalGtVisible: false,
      previewAbnormalGtData: {},
      tableData: {},
      coordinates: [{}],
    };
  },
  created() {
    this.abnormalGtInit();
    this.orgNameInit();
  },
  methods: {
    abnormalGtInit() {
      this.getRequest(
        "/oilWell/abnormalGt/abnormalGtAllPage?checkDate=" +
          this.GtForm.checkDate +
          "&current=" +
          this.currentPage +
          "&orgName=" +
          this.GtForm.orgName +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.abnormalGtData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    //条件查询
    abnormalGtSearch() {
      if (
        this.GtForm.orgName !== this.oldOrgName ||
        this.GtForm.checkDate !== this.OldCheckDate
      ) {
        this.currentPage = 1;
        this.pageSize = 10;
      }
      this.getRequest(
        "/oilWell/abnormalGt/abnormalGtAllPage?checkDate=" +
          this.GtForm.checkDate +
          "&current=" +
          this.currentPage +
          "&orgName=" +
          this.GtForm.orgName +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.abnormalGtData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
      this.oldOrgName = this.GtForm.orgName;
      this.OldCheckDate = this.GtForm.checkDate;
    },
    //采油站下拉框初始化
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
            "/oilWell/abnormalGt/abnormalGtList?checkDate=" +
              row.checkDate +
              "&wellId=" +
              row.wellId
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
      this.pageSize = parseInt(val);
      if (this.GtForm.checkDate === null) {
        this.abnormalGtInit();
      } else {
        this.abnormalGtSearch();
      }
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = parseInt(val);
      if (this.GtForm.checkDate === null) {
        this.abnormalGtInit();
      } else {
        this.abnormalGtSearch();
      }
    },
    // 查看功图并初始化功图数据
    previewAbnormalGt(val) {
      this.previewAbnormalGtData = val;
      this.previewAbnormalGtVisible = true;
    },
    //初始化功图数据
    gtDataInit(val) {
      this.getRequest(
        "/oilWell/abnormalGt/GetGt?checkDate=" +
          this.val.checkDate +
          "&wellId=" +
          this.val.wellId
      ).then((resp) => {
        // this.loading = false;
        if (resp) {
          this.tableData = resp.data;
        }
      });
    },
    // 关闭功图
    previewAbnormalGtClose() {
      this.previewAbnormalGtVisible = false;
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/oilWell/workDataAbnormal.css";
</style>