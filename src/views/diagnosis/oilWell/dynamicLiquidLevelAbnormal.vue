<template>
  <div class="dymAbnormal">
    <!-- 条件查询 -->
    <el-form class="dymAbnormal_form" :model="termForm" :inline="true">
      <!-- 下拉框查询 -->
      <el-form-item label="采油站">
        <el-select
          v-model="termForm.oilStationId"
          clearable
          filterable
          placeholder="全区"
          size="medium"
        >
          <el-option
            v-for="item in orgNameData"
            :key="item.oilStationId"
            :label="item.oilStationName"
            :value="item.oilStationId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="termForm.analysisDate"
          size="medium"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd "
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="DymAbnormalInit()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      class="dymAbnormal_table"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="dymData"
      height="93%"
      border
      style="width: 100%"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
    >
      <el-table-column
        label="序号"
        width="60"
        align="center"
        type="index"
        :index="
          (index) => {
            return index + 1 + (this.currentPage - 1) * this.pageSize;
          }
        "
      >
      </el-table-column>
      <el-table-column
        prop="wellName"
        label="井号"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="oilStationName"
        label="采油站"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="analysisDate"
        label="分析日期"
        width="180"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="fluidLevel"
        label="动液面(M)"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="fluidLevelStandard"
        label="标准动液面(M)"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="abnormalResult"
        label="异常结论"
        width="280"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="abnormalReason"
        label="异常原因"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="100"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
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
    <div class="dymAbnormal_page">
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
    <!-- 查看曲线 -->
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
    CommonPreviewDym,
  },
  data() {
    return {
      termForm: {
        analysisDate: "",
        oilStationId: "",
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
    };
  },
  created() {
    this.DymAbnormalInit();
    this.orgNameInit();
  },
  methods: {
    // 查看动液面曲线并初始化曲线数据
    preview(val) {
      this.previewDymData = val;
      this.previewDymVisible = true;
    },
    // 关闭曲线
    previewDymClose() {
      this.previewDymVisible = false;
    },
    //表格数据初始化
    DymAbnormalInit() {
      //如果日期值为空
      if (this.termForm.analysisDate === "") {
        //默认传递当前日期
        this.termForm.analysisDate = this.getdate();
        console.log(this.termForm.analysisDate);
      }
      this.getRequest(
        "/diagnosis/abnormal/queryFluidLevelAbnormalByStationId?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize +
          "&analysisDate=" +
          this.termForm.analysisDate +
          "&oilStationId=" +
          this.termForm.oilStationId
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.dymData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
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
    //获取当前日期
    getdate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();

      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + "-" + month + "-" + strDate;
      return currentdate;
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/oilWell/dymAbnormal.css";
</style>
