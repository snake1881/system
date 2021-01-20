<template>
  <el-dialog
    title="水井异常数据统计"
    height="5%"
    :visible.sync="waterAbnormalVisible"
    width="90%"
    :before-close="waterAbnormalCollectClose"
    @opened="opened"
  >
    <template>
      <div class="dialogDiv">
        <div class="waterAbnormal_top">
          <el-form style="height: 42px" :model="termForm" :inline="true">
            <el-form-item label="采油站">
              <el-select
                size="medium"
                v-model="termForm.oilStationId"
                style="width: 150px"
                filterable
                clearable
                placeholder="全区"
              >
                <el-option
                  v-for="item in orgNameData"
                  :key="item.oilStationId"
                  :label="item.oilStationName"
                  :value="item.oilStationId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker
                size="medium"
                v-model="termForm.createTime"
                style="width: 150px"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="异常条件">
              <el-select
                size="medium"
                style="width: 150px"
                filterable
                clearable
                v-model="termForm.abnormalType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-search"
                @click="waterAbnormalSearch()"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          :data="waterAbnormal.records"
          border
          height="83%"
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
            prop="waterInjectionDate"
            label="日期"
            width="120"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="drInjectionTime"
            label="生产时间"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="abnormalType"
            label="诊断结果"
            width="80"
            align="center"
            ><template slot-scope="scope">
              <p v-if="scope.row.abnormalType == '0'">正常</p>
              <p v-if="scope.row.abnormalType == '1'">欠注</p>
              <p v-if="scope.row.abnormalType == '2'">超注</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="oilStationName"
            label="采油站"
            width="120"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="drInjectionAllocation"
            label="配注量"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="drWaterInjection"
            label="注入量"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="abnormalReason"
            label="详细诊断"
            width="140"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="drWellheadPressure"
            label="油压"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="drPipePressure"
            label="管压"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="drCasingPressure"
            label="套压"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="drPumpPressure"
            label="泵压"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="drRemark"
            label="备注"
            width="100"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
        </el-table>
        <div class="liqFilterCondition_page">
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
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: {
    waterAbnormalVisible: {
      type: Boolean,
    },
    editData: {
      type: Object,
    },
  },
  data() {
    return {
      termForm: {
        oilStationId: "",
        createTime: "",
        abnormalType: "",
      },
      orgNameData: [],
      loading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      waterAbnormal: [],
      options: [
        {
          value: "0",
          label: "正常",
        },
        {
          value: "1",
          label: "欠注",
        },
        {
          value: "2",
          label: "超注",
        },
      ],
    };
  },
  methods: {
    //
    opened() {
      this.termForm.abnormalType = this.editData.abnormalType;
      this.termForm.createTime = this.editData.createTime;
      this.termForm.oilStationId = this.editData.oilStationId;
      this.waterAbnormalInit();
      this.orgNameInit();
    },
    // 对话框父子组件传值
    waterAbnormalCollectClose() {
      this.$emit("waterAbnormalCollectRowClose");
    },
    waterAbnormalInit() {
      this.getRequest(
        "/waterAbnormalCollect/waterList?abnormalType=" +
          this.editData.abnormalType +
          "&createTime=" +
          this.editData.createTime +
          "&current=" +
          this.currentPage +
          "&oilStationId=" +
          this.editData.oilStationId +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.waterAbnormal = resp.data;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    waterAbnormalSearch() {
      this.getRequest(
        "/waterAbnormalCollect/waterList?abnormalType=" +
          this.termForm.abnormalType +
          "&createTime=" +
          this.termForm.createTime +
          "&current=" +
          this.currentPage +
          "&oilStationId=" +
          this.termForm.oilStationId +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.waterAbnormal = resp.data;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    //采油站下拉框初始化
    orgNameInit() {
      this.getRequest("/waterAbnormalCollect/oilStation").then((resp) => {
        this.loading = false;
        if (resp) {
          this.orgNameData = resp.data;
        }
      });
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = parseInt(val);
      this.waterAbnormalSearch();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = parseInt(val);
      this.waterAbnormalSearch();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../../assets/css/diagnosis/abnormal/waterAbnormalCollect.css";
.dialogDiv {
  height: 480px;
  overflow: auto;
}
.dialogDiv .el-input {
  width: 420px;
  height: 2px;
}
.dialogDiv .el-select {
  width: 420px;
  height: 2px;
}
.dialogDiv .el-date-picker {
  width: 420px;
  height: 2px;
}
.saveAddDiagnosisDataButton {
  margin: 0 0 0 240px;
}
.el-dialog__header {
  background: #dadee6;
  border-bottom: 2px solid #f2f6fc;
  height: 15px;
}
</style>
