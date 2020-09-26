<template>
  <div class="work_collect">
    <div v-if="isShow" class="work_collect_item">
      <!-- 条件查询 -->
      <el-form class="work_collect_form" :model="abnormalForm" :inline="true">
        <el-form-item label="采油站">
          <el-select
            v-model="abnormalForm.orgName"
            placeholder="全区"
            size="medium"
            @focus="selectOrgName()"
          >
            <el-option v-for="item in orgNames" :key="item" :value="item" :label="item" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="abnormalForm.formDate"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
            size="medium"
          />
        </el-form-item>
        <el-form-item label="报警级别">
          <el-select v-model="abnormalForm.liqOrWater" placeholder="全部" size="medium">
            <el-option label="一级" value="1"></el-option>
            <el-option label="二级" value="2"></el-option>
            <el-option label="三级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="small"
            @click="searchWorkingCollect()"
          >查询</el-button>
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
        style="width:100%;"
        @expand-change="rowCollectInit"
        :expand-row-keys="expands"
        :row-key="getRowKeys"
      >
        <el-table-column type="expand">
          <template>
            <div class="work_collect_item_detail">
              <div v-for="(item,index) in loadCollect" :key="index">
                <span>{{ item.checkDate }}</span>
                <span style="margin-left:20px">{{ item.thirdResult }}</span>
                <el-button type="text" @click="details(item)" style="margin-left:20px">详情</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" width="80" align="center" />
        <el-table-column prop="wellCommonName" label="井号" width="120" align="center" />
        <el-table-column prop="checkDate" label="日期" width="180" align="center" />
        <el-table-column prop="orgName" label="采油站" width="160" align="center" />
        <el-table-column prop="stroke" label="冲程" width="100" align="center" />
        <el-table-column prop="frequency" label="冲刺" width="100" align="center" />
        <el-table-column prop="suspMaxLoad" label="最大载荷" width="100" align="center" />
        <el-table-column prop="suspMinLoad" label="最小载荷" width="100" align="center" />
        <el-table-column prop="thirdResult" label="诊断结果" width="150" align="center" />
        <el-table-column prop="normalWaterCut" label="人工确认" width="140" align="center" />
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
        <el-button icon="el-icon-arrow-left" type="text" @click="back()">返回</el-button>
        <el-button type="primary" size="small" style="margin-left:25%">液量曲线</el-button>
        <el-button type="primary" size="small">载荷曲线</el-button>
        <el-button type="primary" size="small" @click="dialogTableVisible = true">功图叠加</el-button>
        <el-button type="primary" size="small">功图平铺</el-button>
        <el-button type="primary" size="small">重新诊断</el-button>
      </div>
      <table cellspacing="0" class="work_collect_item_detail_table">
        <tr>
          <th></th>
          <th>冲程</th>
          <th>冲刺</th>
          <th>最大载荷</th>
          <th>最小载荷</th>
          <th>泵径</th>
          <th>泵深</th>
          <th>动液面</th>
        </tr>
        <tr>
          <td>当前数据</td>
          <td>{{ this.detailsCollect.stroke }}</td>
          <td>{{ this.detailsCollect.frequency }}</td>
          <td>{{ this.detailsCollect.suspMaxLoad }}</td>
          <td>{{ this.detailsCollect.suspMinLoad }}</td>
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
      <table cellspacing="0" class="work_collect_item_detail_table">
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
          :header-cell-style="{background:'#E4E7ED',color:'#606266'}"
          :data="measure"
          height="100%"
          border
          style="width:85%;"
        >
          <el-table-column label="序号" type="index" width="180" align="center" />
          <el-table-column prop="prodDate" label="日期" width="360" align="center" />
          <el-table-column prop="measure" label="措施" width="558" align="center" />
        </el-table>
      </div>
    </div>
    <el-dialog
      title="详细信息"
      :visible.sync="dialogTableVisible"
      class="work_collect_item_appent_gt_dialog"
    >
      <!-- 搜索框 -->
      <el-form :model="dialogForm" :inline="true" class="work_collect_item_appent_gt_dialog_form">
        <el-form-item>
          <el-input v-model="dialogForm.orgName" :disabled="true" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="dialogForm.wellCommonName" :disabled="true" />
        </el-form-item>
        <el-form-item label="开始">
          <el-date-picker
            v-model="dialogForm.startDate"
            type="date"
            value-format="yyyy-MM-dd"
            size="medium"
          />
        </el-form-item>
        <el-form-item label="结束">
          <el-date-picker
            v-model="dialogForm.endDate"
            type="date"
            value-format="yyyy-MM-dd"
            size="medium"
          />
        </el-form-item>
        <el-button type="primary" round @click="appendGt()">查询</el-button>
      </el-form>
      <!-- 功图叠加 -->
      <div style="height: 300px" id="gt4" ref="dom4" />
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
        alarmLevel: null
      },
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true,
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
      // 功图叠加对话框搜索框
      dialogForm: {
        // 采油站
        orgName: "",
        // 井号
        wellCommonName: "",
        // 开始日期
        startDate: "",
        // 结束日期
        endDate: ""
      }
    };
  },
  created() {
    this.workingCollectInit();
  },
  methods: {
    // 数据初始化
    workingCollectInit() {
      this.loading = true;
      this.getRequest(
        "/oilWell/workCollect/page?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.workingCollect = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 只展开一行放入当前行id
    getRowKeys(row) {
      return row.wellCommonName;
    },
    // 单行数据
    rowCollectInit(row, expandedRows) {
      //只展开一行
      if (expandedRows.length) {
        //说明展开了
        this.expands = [];
        if (row) {
          //只展开当前行wellCommonName
          this.expands.push(row.wellCommonName);
          this.getRequest(
            "/oilWell/workCollect/dgnsResult/" +
              row.wellCommonName +
              "?date=" +
              row.checkDate
          ).then(resp => {
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
      this.loading = true;
      let url =
        "/oilWell/workCollect/dgnsResult?current=" +
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
      if (this.abnormalForm.alarmLevel !== null) {
        url += "&alarmLevel=" + this.abnormalForm.alarmLevel;
      }
      this.getRequest(url).then(resp => {
        this.loading = false;
        if (resp) {
          this.workingCollect = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 跳转至详情页面
    details(row) {
      this.isShow = false;
      this.detailsCollect = row;
      this.measureInit(row.wellCommonName);
      setTimeout(() => {
        this.showGT();
      }, 10);
    },
    // 查询该井的历史措施
    measureInit(wellCommonName) {
      this.getRequest("/oilWell/workCollect/measure/" + wellCommonName).then(
        resp => {
          if (resp) {
            this.measure = resp.data;
          }
        }
      );
    },
    // 画图
    showGT() {
      // 获取三个功图的坐标数据
      this.getRequest(
        "/oilWell/workCollect/gt?dynaId=" +
          this.detailsCollect.dynaId +
          "&standardGtId=" +
          this.detailsCollect.standardGtId +
          "&featureGtId=" +
          this.detailsCollect.featureGtId
      ).then(resp => {
        if (resp) {
          for (var i = 0; i < 3; i++) {
            let gt, name, dom;
            if (i === 0) {
              dom = document.getElementById(this.$refs.dom1.id);
              name = "当前功图";
              gt = resp.data.current;
            } else if (i === 1) {
              dom = document.getElementById(this.$refs.dom2.id);
              name = "标准功图";
              gt = resp.data.standard;
            } else if (i === 2) {
              dom = document.getElementById(this.$refs.dom3.id);
              name = "特征功图";
              gt = resp.data.feature;
            }
            let myChart = echarts.init(dom);
            myChart.setOption({
              title: {
                subtext: name,
                x: "center"
              },
              xAxis: {
                min: 0,
                max: 4,
                type: "value",
                axisLine: { onZero: false },
                name: "位移(m)"
              },
              yAxis: {
                min: 0,
                max: 70,
                type: "value",
                axisLine: { onZero: false },
                name: "载荷(kN)"
              },
              series: [
                {
                  type: "line",
                  smooth: true,
                  symbol: "none",
                  data: gt
                }
              ]
            });
          }
        }
      });
    },
    // 功图叠加
    appendGt() {
      this.getRequest(
        "/oilWell/workCollect/gt/定1987-3" +
          // wellCommonName +
          "?startDate=" +
          this.dialogForm.startDate +
          "&endDate=" +
          this.dialogForm.endDate
      ).then(resp => {
        if (resp) {
          let legendData = [];
          let seriesData = [];
          for (var i = 0; i < resp.data.length; i++) {
            legendData.push(resp.data[i].date);
            seriesData.push({
              type: "line",
              name: resp.data[i].date,
              smooth: true,
              symbol: "none",
              data: resp.data[i].gt
            });
          }
          let myChart = echarts.init(
            document.getElementById(this.$refs.dom4.id)
          );
          myChart.setOption({
            title: {
              subtext: "功图叠加",
              x: "center"
            },
            legend: {
              data: legendData,
              right: "3%",
              orient: "textVerticalAlign"
            },
            xAxis: {
              min: 0,
              max: 4,
              type: "value",
              axisLine: { onZero: false },
              name: "位移(m)"
            },
            yAxis: {
              min: 0,
              max: 70,
              type: "value",
              axisLine: { onZero: false },
              name: "载荷(kN)"
            },
            series: seriesData
          });
        }
      });
    },
    // 返回工况汇总
    back() {
      this.isShow = true;
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
      this.workingCollectInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.workingCollectInit();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/oilWell/workingCollect.css";
</style>
