<template>
  <div class="dymAbnormal">
    <!-- 条件查询 -->
    <el-form
      class="dymAbnormal_form"
      :model="termForm"
      :inline="true"
      :rules="rules"
    >
      <!-- 下拉框查询 -->
      <el-form-item label="采油站">
        <el-select
          v-model="termForm.oilStationId"
          clearable
          filterable
          placeholder="全区"
          size="medium"
          @change="queryWellNameByOrgName"
        >
          <el-option
            v-for="item in orgNameData"
            :key="item.oilStationId"
            :label="item.oilStationName"
            :value="item.oilStationId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="单井">
        <el-select
          v-model="termForm.wellId"
          clearable
          filterable
          placeholder="全站"
          size="medium"
        >
          <el-option
            v-for="item in wellOptions"
            :key="item.wellId"
            :label="item.wellName"
            :value="item.wellId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="termForm.analysisDate"
          size="medium"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-switch
          v-model="termForm.isIntervalPump"
          active-text="正常"
          inactive-text="异常"
          active-value="0"
          inactive-value="1"
        >
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-switch
          v-model="termForm.upOrDown"
          active-text="下降"
          inactive-text="上升"
          active-value="down"
          inactive-value="up"
        >
        </el-switch>
      </el-form-item>
      <el-form-item>
        <div class="block" style="width: 200px; margin: 0px 5px">
          <el-slider
            v-model="termForm.minAndMax"
            range
            :step="10"
            :max="500"
            show-stops
          >
          </el-slider>
        </div>
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
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-download"
          size="small"
          @click="exportData()"
          >导出</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      class="dymAbnormal_table"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :stripe="true"
      :data="dymData"
      height="93%"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
    >
      <el-table-column type="selection" width="55" />
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
      />
      <el-table-column
        prop="wellName"
        label="井号"
        width="120"
        align="center"
      />
      <el-table-column
        prop="oilStationName"
        label="采油站"
        width="120"
        align="center"
      />
      <el-table-column
        prop="analysisDate"
        label="分析日期"
        width="180"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="fluidLevel"
        label="动液面(M)"
        width="90"
        align="center"
      />
      <el-table-column
        prop="fluidLevelStandard"
        label="标准动液面(M)"
        width="90"
        align="center"
      />
      <el-table-column
        prop="abnormalResult"
        label="异常结论"
        min-width="240"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="abnormalReason"
        label="异常原因"
        width="100"
        align="center"
      />
      <el-table-column
        prop="isIntervalPump"
        label="井状况"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.isIntervalPump == '0'">正常</p>
          <p v-if="scope.row.isIntervalPump == '1'" style="color: red">
            动液面异常
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="80"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column align="center" label="操作" min-width="120">
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
        :page-sizes="[10, 20, 50, 100, 500]"
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
        current: 1,
        pageSize: 10,
        analysisDate: "",
        oilStationId: "",
        wellId: "",
        isIntervalPump: "",
        upOrDown: "",
        minAndMax: [0, 2000],
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
      //单井下拉框
      wellOptions: [],
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
      //默认日期为前一天
      currentdate: "",
      // 表格多选
      selectData: [],
    };
  },
  created() {
    this.getdate();
    this.wellOptionsInit();
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
      }
      this.termForm.current = this.currentPage;
      this.termForm.pageSize = this.pageSize;
      this.postRequest(
        "/diagnosis/abnormal/queryFluidLevelAbnormalByStationId",
        this.termForm
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
      this.getRequest("/basOilStationInfor/selectOil").then((resp) => {
        this.loading = false;
        if (resp) {
          this.orgNameData = resp.data;
          let oilAll = {
            oilStationId: "",
            oilStationName: "全站",
          };
          this.orgNameData.push(oilAll);
        }
      });
    },
    //单井下拉框初始化
    wellOptionsInit() {
      this.getRequest("/basWellInfor/selectOil").then((resp) => {
        this.loading = false;
        if (resp) {
          this.wellOptions = resp.data;
        }
      });
    },
    //单井根据采油站变化
    queryWellNameByOrgName(val) {
      this.getRequest("/basWellInfor/listByStation?oidStationId=" + val).then(
        (resp) => {
          if (resp) {
            this.wellOptions = resp.data;
          }
        }
      );
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.DymAbnormalInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.DymAbnormalInit();
    },
    //获取当前日期
    getdate() {
      var curDate = new Date();
      var date = new Date(curDate.getTime() - 24 * 60 * 60 * 1000);
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var strDate = date.getDate();
      strDate = strDate < 10 ? "0" + strDate : strDate;
      this.termForm.analysisDate = year + "-" + month + "-" + strDate;
      return this.termForm.analysisDate;
    },
    // 表格多选
    handleSelectionChange(val) {
      this.selectData = JSON.parse(JSON.stringify(val));
      for (var i = 0; i < this.selectData.length; i++) {
        if (this.selectData[i].isIntervalPump == 0) {
          this.selectData[i].isIntervalPump = "正常";
        } else if (this.selectData[i].isIntervalPump == 1) {
          this.selectData[i].isIntervalPump = "动液面异常";
        }
      }
    },
    // 文件导出
    exportData() {
      const {
        export_json_to_excel,
      } = require("../../../vendor/Export2Excel.js");
      const tHeader = [
        "井号",
        "采油站",
        "分析日期",
        "动液面(M)",
        "标准动液面(M)",
        "异常结论",
        "异常原因",
        "井状况",
        "备注",
      ];
      const filterVal = [
        "wellName",
        "oilStationName",
        "analysisDate",
        "fluidLevel",
        "fluidLevelStandard",
        "abnormalResult",
        "abnormalReason",
        "isIntervalPump",
        "remark",
      ];
      var list = this.selectData;
      const data = this.formatJson(filterVal, list);
      export_json_to_excel(tHeader, data, "动液面异常");
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/oilWell/dymAbnormal.css";
</style>
