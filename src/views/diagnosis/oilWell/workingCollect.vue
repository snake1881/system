<template>
  <div class="work_collect">
    <div v-if="isShow" class="work_collect_item">
      <!-- 条件查询 -->
      <el-form class="work_collect_form" :model="abnormalForm" :inline="true">
        <el-form-item>
          <el-select
            v-model="abnormalForm.orgName"
            placeholder="采油站"
            clearable
            filterable
            size="medium"
          >
            <el-option
              v-for="item in orgNames"
              :key="item.oilStationId"
              :label="item.oilStationName"
              :value="item.oilStationId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="abnormalForm.formDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            size="medium"
          />
        </el-form-item>
        <!-- <el-form-item label="报警级别">
          <el-select
            v-model="abnormalForm.liqOrWater"
            placeholder="全部"
            size="medium"
          >
            <el-option label="一级" value="1"></el-option>
            <el-option label="二级" value="2"></el-option>
            <el-option label="三级" value="3"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="small"
            @click="searchWorkingCollect()"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 表格数据 -->
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="workingCollect"
        height="84%"
        border
        style="width: 100%"
        @expand-change="rowCollectInit"
        :expand-row-keys="expands"
        :row-key="getRowKeys"
        :row-style="{ height: '2px' }"
        :cell-style="{ padding: '0px' }"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div
              class="work_collect_item_detail"
              :key="scope.row.inddsId"
              v-loading="loadCollectLoad"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
            >
              <div v-for="(item, index) in loadCollect" :key="index">
                <span style=" width:200px;text-align:center; display: inline-block; " >{{ item.acquisitionTime }}</span>
                <span style=" width:200px;text-align:center; display: inline-block; margin-left: 20px">{{
                  item.diagnosisResult
                }}</span>
                <el-button
                  type="text"
                  @click="details(item)"
                  style="margin-left: 20px"
                  >详情</el-button
                >
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
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
          prop="acquisitionTime"
          label="量液时间"
          width="160"
          align="center"
        />
        <el-table-column
          prop="oilStationName"
          label="采油站"
          width="160"
          align="center"
        />
        <el-table-column
          prop="stroke"
          label="冲程"
          width="100"
          align="center"
        />
        <el-table-column
          prop="frequency"
          label="冲刺"
          width="100"
          align="center"
        />
        <el-table-column
          prop="maxLoad"
          label="最大载荷"
          width="100"
          align="center"
        />
        <el-table-column
          prop="minLoad"
          label="最小载荷"
          width="100"
          align="center"
        />
        <el-table-column
          prop="thirdResult"
          label="诊断结果"
          width="150"
          align="center"
        />
        <el-table-column
          prop="normalWaterCut"
          label="人工确认"
          width="140"
          align="center"
        />
      </el-table>
      <!-- 分页 -->
      <div class="work_collect_page">
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
    <!-- 详情 -->
    <div class="work_collect_item" v-if="!isShow">
      <div class="work_collect_item_detail_btn">
        <el-button icon="el-icon-arrow-left" type="text" @click="back()"
          >返回</el-button
        >
        <el-button type="primary" size="small" style="margin-left: 25%"
          >液量曲线</el-button
        >
        <el-button type="primary" size="small">载荷曲线</el-button>
        <!-- <el-button
          type="primary"
          size="small"
          @click="dialogTableVisible = true"
          >功图叠加</el-button
        > -->
        <el-button type="primary" size="small">功图平铺</el-button>
        <el-button type="primary" size="small">重新诊断</el-button>
      </div>
      <table cellspacing="0" class="work_collect_item_detail_table">
        <tr>
          <th>当前数据</th>
          <th>冲程</th>
          <th>冲刺</th>
          <th>最大载荷</th>
          <th>最小载荷</th>
          <th>泵径</th>
          <th>泵深</th>
          <th>量液</th>
        </tr>
        <tr>
          <td>{{ this.detailsCollect.wellName }}</td>
          <td>{{ this.detailsCollect.stroke }}</td>
          <td>{{ this.detailsCollect.frequency }}</td>
          <td>{{ this.detailsCollect.maxLoad }}</td>
          <td>{{ this.detailsCollect.minLoad }}</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
      </table>

      <div class="work_collect_item_gt">
        <div class="work_collect_item_gt_g" id="gt1" ref="dom1" />
        <div class="work_collect_item_gt_g" id="gt2" ref="dom2" />
        <div class="work_collect_item_gt_g" id="gt3" ref="dom3" />
      </div>
      <table
        cellspacing="0"
        class="work_collect_item_detail_table"
        style="margin-top: -1%"
      >
        <tr>
          <th>诊断结论(系统)</th>
          <th>{{ this.detailsCollect.thirdResult }}</th>
          <th>AI诊断结论(参考)</th>
          <th>{{ this.detailsCollect.aiResult }}</th>
        </tr>
        <tr>
          <td>措施处置</td>
          <td>暂无</td>
          <td>作业设计模板</td>
          <td></td>
        </tr>
      </table>

      <div class="work_collect_item_measure">
        <div class="work_collect_item_measure_left">历史措施</div>
        <el-table
          :header-cell-style="{ background: '#E4E7ED', color: '#606266' }"
          :data="measure"
          height="100%"
          border
          style="width: 85%"
        >
          <el-table-column
            label="序号"
            type="index"
            width="180"
            align="center"
          />
          <el-table-column
            prop="prodDate"
            label="日期"
            width="360"
            align="center"
          />
          <el-table-column
            prop="measure"
            label="措施"
            width="558"
            align="center"
          />
        </el-table>
      </div>
    </div>
    <el-dialog
      title="功图叠加"
      :visible.sync="dialogTableVisible"
      width="70%"
      class="work_collect_item_appent_gt_dialog"
    >
      <!-- 搜索框 -->
      <el-form
        :model="dialogForm"
        :inline="true"
        class="work_collect_item_appent_gt_dialog_form"
      >
        <el-form-item v-if="detailsCollect">
          <el-input
            :placeholder="detailsCollect.orgName"
            size="medium"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item v-if="detailsCollect">
          <el-input
            :placeholder="detailsCollect.wellCommonName"
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
        <el-button type="primary" size="medium" @click="appendGt()"
          >查询</el-button
        >
      </el-form>
      <!-- 功图叠加 -->
      <!-- <div
        id="gt4"
        ref="dom4"
        class="work_collect_item_appent_gt_dialog_gt"
        v-loading="dialogLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <span class="work_collect_item_appent_gt_dialog_gt_text">{{
          this.dialogGt
        }}</span>
      </div> -->
    </el-dialog>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
export default {
  data() {
    return {
      // 工况汇总数据
      workingCollect: [],
      // 当前展开行数据
      loadCollect: [],
      // 历史措施
      measure: [],
      // 表单数据
      abnormalForm: {
        // 采油站
        orgName: null,
        // 日期选择
        formDate: "",
        // 报警级别
        alarmLevel: null,
      },
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true,
      // 展开行加载动画
      loadCollectLoad: true,
      // 采油站数据
      orgNames: [],
      // 默认展示内容
      isShow: true,
      // 工况详情数据
      detailsCollect: null,
      // 设置row-key只展示一行
      expands: [],
      // 功图叠加对话框标记
      dialogTableVisible: false,
      // 功图叠加加载动画
      // dialogLoading: false,
      // 功图叠加默认显示内容
      // dialogGt: "暂无数据",
      // 功图叠加对话框搜索框
      dialogForm: {
        // 日期段
        startDate: "",
      },
    };
  },
  created() {
    this.workingCollectInit();
    this.selectOrgName();
  },
  methods: {
    // 数据初始化
    workingCollectInit() {
      // this.loading = true;
      if (this.abnormalForm.orgName == null) {
        this.abnormalForm.orgName = "";
      }
      this.getRequest(
        "/mountLiquid/mountLiquid?acquisitionTime=" +
          this.abnormalForm.formDate +
          "&current=" +
          this.currentPage +
          "&oilStationId=" +
          this.abnormalForm.orgName +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
        if (resp) {
          this.workingCollect = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.loading = false;
          // this.getIndex();
        }
      });
      // let url =
      //   "/oilWell/workCollect/page?current=" +
      //   this.currentPage +
      //   "&pageSize=" +
      //   this.pageSize;
      // if (
      //   this.abnormalForm.formDate !== "" &&
      //   this.abnormalForm.formDate !== null
      // ) {
      //   url += "&date=" + this.abnormalForm.formDate;
      // }
      // this.getRequest(url).then((resp) => {
      //   this.loading = false;
      //   if (resp) {
      //     this.workingCollect = resp.data.records;
      //     this.total = resp.data.total;
      //     this.currentPage = resp.data.current;
      //     this.pageSize = resp.data.size;
      //   }
      // });
    },
    // 只展开一行放入当前行id
    getRowKeys(row) {
      return row.inddsId;
    },
    // 控制展开与关闭行
    rowCollectInit(row, expandedRows) {
      //只展开一行
      if (expandedRows.length) {
        //说明展开了
        this.expands = [];
        if (row) {
          //只展开当前行wellCommonName
          this.expands.push(row.inddsId);
          this.loadCollect = [];
          this.loadCollectLoad = true;
          this.getRequest(
            "/mountLiquid/liquidList?endTime=" +
              row.acquisitionTime +
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
    // 表单条件查询
    searchWorkingCollect() {
      if (this.abnormalForm.orgName == null) {
        this.abnormalForm.orgName = "";
      }
      this.getRequest(
        "/mountLiquid/mountLiquid?acquisitionTime=" +
          this.abnormalForm.formDate +
          "&current=" +
          this.currentPage +
          "&oilStationId=" +
          this.abnormalForm.orgName +
          "&pageSize=" +
          this.pageSize
      ).then((resp) => {
        if (resp) {
          this.workingCollect = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          // this.getIndex();
        }
      });
      // if (this.abnormalForm.orgName === "全区") {
      //   this.workingCollectInit();
      // } else {
      //   this.loading = true;
      //   let url =
      //     "/oilWell/workCollect/dgnsResult?current=" +
      //     this.currentPage +
      //     "&pageSize=" +
      //     this.pageSize;
      //   if (this.abnormalForm.orgName !== null) {
      //     url += "&orgName=" + this.abnormalForm.orgName;
      //   }
      //   if (
      //     this.abnormalForm.formDate !== null &&
      //     this.abnormalForm.formDate !== ""
      //   ) {
      //     url += "&date=" + this.abnormalForm.formDate;
      //   }
      //   if (this.abnormalForm.alarmLevel !== null) {
      //     url += "&alarmLevel=" + this.abnormalForm.alarmLevel;
      //   }
      //   this.getRequest(url).then((resp) => {
      //     this.loading = false;
      //     if (resp) {
      //       this.workingCollect = resp.data.records;
      //       this.total = resp.data.total;
      //       this.currentPage = resp.data.current;
      //       this.pageSize = resp.data.size;
      //     }
      //   });
      // }
    },
    // 跳转至详情页面
    details(row) {
      this.isShow = false;
      this.detailsCollect = row;
      this.measureInit(row.wellCommonName);
      // setTimeout(() => {
      //   this.showGT();
      // }, 10);
    },
    // 查询该井的历史措施
    measureInit(wellCommonName) {
      this.getRequest("/oilWell/workCollect/measure/" + wellCommonName).then(
        (resp) => {
          if (resp) {
            this.measure = resp.data;
          }
        }
      );
    },
    // 画图
    // showGT() {
    //   // 获取三个功图的坐标数据
    //   this.getRequest(
    //     "/oilWell/workCollect/gt?dynaId=" +
    //       this.detailsCollect.dynaId +
    //       "&standardGtId=" +
    //       this.detailsCollect.standardGtId +
    //       "&featureGtId=" +
    //       this.detailsCollect.featureGtId
    //   ).then((resp) => {
    //     if (resp) {
    //       for (var i = 0; i < 3; i++) {
    //         let gt, name, dom;
    //         if (i === 0) {
    //           dom = document.getElementById(this.$refs.dom1.id);
    //           name = "当前功图";
    //           gt = resp.data.current;
    //         } else if (i === 1) {
    //           dom = document.getElementById(this.$refs.dom2.id);
    //           name = "标准功图";
    //           gt = resp.data.standard;
    //         } else if (i === 2) {
    //           dom = document.getElementById(this.$refs.dom3.id);
    //           name = "特征功图";
    //           gt = resp.data.feature;
    //         }
    //         let myChart = echarts.init(dom);
    //         myChart.setOption({
    //           title: {
    //             subtext: name,
    //             x: "center",
    //             top: "4%",
    //           },
    //           tooltip: {
    //             trigger: "axis",
    //           },
    //           xAxis: {
    //             min: 0,
    //             max: 4,
    //             type: "value",
    //             axisLine: { onZero: false },
    //             name: "位移(m)",
    //             nameTextStyle: {
    //               padding: [58, 0, 0, -190],
    //             },
    //           },
    //           yAxis: {
    //             min: 0,
    //             max: 80,
    //             type: "value",
    //             axisLine: { onZero: false },
    //             name: "载荷(kN)",
    //           },
    //           series: [
    //             {
    //               type: "line",
    //               name: "载荷",
    //               smooth: true,
    //               symbol: "none",
    //               data: gt,
    //             },
    //           ],
    //         });
    //       }
    //     }
    //   });
    // },
    // 功图叠加
    // appendGt() {
    //   if (
    //     this.dialogForm.startDate !== null &&
    //     this.dialogForm.startDate !== ""
    //   ) {
    //     this.dialogLoading = true;
    //     this.getRequest(
    //       "/oilWell/workCollect/gt/" +
    //         this.detailsCollect.wellCommonName +
    //         "?startDate=" +
    //         this.dialogForm.startDate[0] +
    //         "&endDate=" +
    //         this.dialogForm.startDate[1]
    //     ).then((resp) => {
    //       this.dialogLoading = false;
    //       if (resp) {
    //         this.dialogGt = "";
    //         let legendData = [];
    //         let seriesData = [];
    //         for (var i = 0; i < resp.data.length; i++) {
    //           legendData.push(resp.data[i].date);
    //           seriesData.push({
    //             type: "line",
    //             name: resp.data[i].date,
    //             smooth: true,
    //             symbol: "none",
    //             data: resp.data[i].gt,
    //           });
    //         }
    //         let myChart = echarts.init(
    //           document.getElementById(this.$refs.dom4.id)
    //         );
    //         myChart.setOption(
    //           {
    //             title: {
    //               subtext: "功图叠加",
    //               x: "center",
    //             },
    //             legend: {
    //               data: legendData,
    //               orient: "vertical",
    //               x: "right",
    //               width: 150,
    //               orient: "textVerticalAlign",
    //             },
    //             grid: {
    //               left: "3%",
    //               right: 180,
    //             },
    //             xAxis: {
    //               min: 0,
    //               max: 4,
    //               type: "value",
    //               axisLine: { onZero: false },
    //               name: "位移(m)",
    //               nameTextStyle: {
    //                 padding: [70, 0, 0, -450],
    //               },
    //             },
    //             yAxis: {
    //               min: 0,
    //               max: 80,
    //               type: "value",
    //               axisLine: { onZero: false },
    //               name: "载荷(kN)",
    //             },
    //             series: seriesData,
    //           },
    //           true
    //         );
    //       }
    //     });
    //   } else {
    //     this.$message({
    //       message: "请先输入开始-结束日期再查询",
    //       type: "warning",
    //     });
    //   }
    // },
    // 返回工况汇总
    back() {
      this.isShow = true;
    },
    // 查询所有采油站信息
    selectOrgName() {
      this.getRequest("/basOilStationInfor/oilStationOptions").then((resp) => {
        if (resp) {
          this.orgNames = resp.data;
        }
      });
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.workingCollectInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.workingCollectInit();
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/oilWell/workingCollect.css";
</style>
