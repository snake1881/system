<template>
  <div class="liquid_volume_abnormal">
    <!-- 条件查询 -->
    <el-form
      class="liquid_volume_abnormal_form"
      :model="abnormalForm"
      :inline="true"
    >
      <el-form-item label="采油站">
        <el-select
          v-model="abnormalForm.orgName"
          placeholder="全区"
          size="medium"
          @focus="selectOrgName()"
        >
          <el-option label="全区" value="全区" />
          <el-option
            v-for="item in orgNames"
            :key="item"
            :value="item"
            :label="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="abnormalForm.formDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          size="medium"
        />
      </el-form-item>
      <el-form-item label="条件">
        <el-select
          v-model="abnormalForm.liqOrWater"
          placeholder="全部"
          size="medium"
        >
          <el-option label="液量" value="liq"></el-option>
          <el-option label="含水" value="water"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="searchLiquidVolume()"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="liquidVolumeAbnormal"
      height="84%"
      border
      style="width:100%;"
    >
      <el-table-column
        label="序号"
        type="index"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="wellName"
        label="井号"
        width="100"
        align="center"
      />
      <el-table-column
        prop="prodDate"
        label="日期"
        width="160"
        align="center"
      />
      <el-table-column
        prop="prodTime"
        label="生产时间"
        width="80"
        align="center"
      />
      <el-table-column
        prop="abnormalProblem"
        label="诊断结果"
        width="200"
        align="center"
      />
      <el-table-column
        prop="orgName"
        label="采油站"
        width="140"
        align="center"
      />
      <el-table-column
        prop="liqProdDaily"
        label="产液量"
        width="100"
        align="center"
      />
      <el-table-column
        prop="waterCut"
        label="含水率"
        width="100"
        align="center"
      />
      <el-table-column
        prop="normalLiqProdDaily"
        label="正常产液量"
        width="100"
        align="center"
      />
      <el-table-column
        prop="normalWaterCut"
        label="正常含水率"
        width="100"
        align="center"
      />
      <el-table-column prop="remarks" label="备注" width="140" align="center" />
      <el-table-column label="操作" fixed="right" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="details(scope.row)"
            >查看曲线</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="dleteByPrimaryId(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="liquid_volume_abnormal_page">
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
    <el-dialog
      title="液量曲线"
      width="70%"
      :visible.sync="dialogTableVisible"
      class="liquid_volume_abnormal_dialog"
    >
      <!-- 搜索框 -->
      <el-form
        :model="dialogForm"
        :inline="true"
        class="liquid_volume_abnormal_dialog_form"
      >
        <el-form-item>
          <el-input
            v-model="dialogForm.orgName"
            size="medium"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="dialogForm.wellName"
            size="medium"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="dialogForm.startDate"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" size="medium" @click="lineChart()"
          >查询</el-button
        >
      </el-form>
      <!-- 折线图 -->
      <div
        id="line"
        ref="dom"
        class="liquid_volume_abnormal_dialog_liq"
        v-loading="dialogLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <span class="liquid_volume_abnormal_dialog_liq_text">{{
          this.dialogLiq
        }}</span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
export default {
  data() {
    return {
      // 液量异常数据
      liquidVolumeAbnormal: [],
      // 表单数据
      abnormalForm: {
        // 采油站
        orgName: null,
        // 日期选择
        formDate: "",
        // 条件
        liqOrWater: null
      },
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true,
      // 液量曲线加载动画
      dialogLoading: false,
      // 液量曲线对话框标记
      dialogTableVisible: false,
      // 液量曲线对话框默认内容
      dialogLiq: "暂无数据",
      // 液量曲线对话框搜索框
      dialogForm: {
        // 采油站
        orgName: "",
        // 井号
        wellName: "",
        // 日期段
        startDate: ""
      },
      orgNames: []
    };
  },
  created() {
    this.liquidVolumeInit();
  },
  methods: {
    // 数据初始化
    liquidVolumeInit() {
      this.loading = true;
      let url =
        "/oilWell/liquidVolumeAbnormal/page?current=" +
        this.currentPage +
        "&pageSize=" +
        this.pageSize;
      if (
        this.abnormalForm.formDate !== "" &&
        this.abnormalForm.formDate !== null
      ) {
        url += "&date=" + this.abnormalForm.formDate;
      }
      this.getRequest(url).then(resp => {
        this.loading = false;
        if (resp) {
          this.liquidVolumeAbnormal = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 按条件查询
    searchLiquidVolume() {
      if (this.abnormalForm.orgName === "全区") {
        this.liquidVolumeInit();
      } else {
        this.loading = true;
        let url =
          "/oilWell/liquidVolumeAbnormal/liquidVolumeAbnormal?current=" +
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
        if (this.abnormalForm.liqOrWater !== null) {
          url += "&liqOrWater=" + this.abnormalForm.liqOrWater;
        }
        this.getRequest(url).then(resp => {
          this.loading = false;
          if (resp) {
            this.liquidVolumeAbnormal = resp.data.records;
            this.total = resp.data.total;
            this.currentPage = resp.data.current;
            this.pageSize = resp.data.size;
          }
        });
      }
    },
    // 查看曲线
    details(val) {
      this.dialogTableVisible = true;
      this.dialogForm.orgName = val.orgName;
      this.dialogForm.wellName = val.wellName;
    },
    // 画图(液量曲线)
    lineChart() {
      if (
        this.dialogForm.startDate !== null &&
        this.dialogForm.startDate !== ""
      ) {
        this.dialogLoading = true;
        this.getRequest(
          "/oilWell/liquidVolumeAbnormal/liquidVolumeAbnormal/" +
            this.dialogForm.wellName +
            "?startDate=" +
            this.dialogForm.startDate[0] +
            "&endDate=" +
            this.dialogForm.startDate[1]
        ).then(resp => {
          this.dialogLoading = false;
          if (resp) {
            this.dialogLiq = "";
            let myChart = echarts.init(
              document.getElementById(this.$refs.dom.id)
            );
            myChart.setOption(
              {
                title: {
                  subtext: this.dialogForm.wellName,
                  x: "center",
                  top: "4%"
                },
                legend: {
                  data: ["日产液量", "日产油量", "含水率"]
                },
                grid: {
                  bottom: 80
                },
                tooltip: {
                  trigger: "axis",
                  axisPointer: {
                    type: "cross",
                    animation: false,
                    label: {
                      backgroundColor: "#505765"
                    }
                  }
                },
                xAxis: [
                  {
                    type: "category",
                    boundaryGap: false,
                    data: resp.data.date[0]
                  }
                ],
                yAxis: [
                  {
                    name: "产量(方)",
                    type: "value",
                    max: 10
                  },
                  {
                    name: "含水率(%)",
                    max: 100,
                    type: "value"
                  }
                ],
                series: [
                  {
                    name: "日产液量",
                    type: "line",
                    yAxisIndex: 0,
                    data: resp.data.prodDaily[0]
                  },
                  {
                    name: "日产油量",
                    type: "line",
                    yAxisIndex: 0,
                    data: resp.data.oilDaily[0]
                  },
                  {
                    name: "含水率",
                    type: "line",
                    yAxisIndex: 1,
                    data: resp.data.waterDaily[0]
                  }
                ]
              },
              true
            );
          }
        });
      } else {
        this.$message({
          message: "请先输入开始-结束日期再查询",
          type: "warning"
        });
      }
    },
    // 根据primaryId删除异常数据
    dleteByPrimaryId(val) {
      let primaryId = val.primaryId;
      this.deleteRequest(
        "/oilWell/liquidVolumeAbnormal/liquidVolumeAbnormal/" + primaryId
      ).then(resp => {
        if (resp) {
          this.liquidVolumeInit();
        }
      });
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
      this.liquidVolumeInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.liquidVolumeInit();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/oilWell/liquidVolumeAbnormal.css";
</style>
