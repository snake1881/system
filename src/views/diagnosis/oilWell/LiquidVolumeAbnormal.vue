<template>
  <div class="liquid_volume_abnormal">
    <!-- 条件查询 -->
    <el-form class="liquid_volume_abnormal_form" :model="abnormalForm" :inline="true">
      <el-form-item label="采油站">
        <el-select v-model="abnormalForm.orgName" placeholder="全区" size="medium">
          <el-option label="徐梁采油站" value="徐梁采油站"></el-option>
          <el-option label="郑寨子采油站" value="郑寨子采油站"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          :v-model="abnormalForm.formDate"
          type="datetime"
          placeholder="选择日期"
          size="medium"
        />
      </el-form-item>
      <el-form-item label="条件">
        <el-select v-model="abnormalForm.liqOrWater" placeholder="全部" size="medium">
          <el-option label="液量" value="shanghai"></el-option>
          <el-option label="含水" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="searchLiquidVolume()"
        >查询</el-button>
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
      <el-table-column prop="wellName" label="井号" width="100" />
      <el-table-column prop="prodDate" label="日期" width="160" />
      <el-table-column prop="prodTime" label="生产时间" width="80" />
      <el-table-column prop="abnormalProblem" label="诊断结果" width="180" />
      <el-table-column prop="orgName" label="采油站" width="140" />
      <el-table-column prop="liqProdDaily" label="产液量" width="100" />
      <el-table-column prop="waterCut" label="含水率" width="100" />
      <el-table-column prop="normalLiqProdDaily" label="正常产液量" width="100" />
      <el-table-column prop="normalWaterCut" label="正常含水率" width="100" />
      <el-table-column prop="remarks" label="备注" width="140" />
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="details(scope.row)">查看曲线</el-button>
          <el-button type="text" size="small" @click="dleteByPrimaryId(scope.row)">删除</el-button>
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
    <el-dialog title="详细信息" :visible.sync="dialogTableVisible" @open="open()">
       <div style="height: 300px" id="line" />
    </el-dialog>
  </div>
</template>
<script>
let echarts = require('echarts/lib/echarts');
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
      // 查看曲线对话框标记
      dialogTableVisible: false
    };
  },
  created() {
    this.liquidVolumeInit();
  },
  methods: {
    // 数据初始化
    liquidVolumeInit() {
      this.getRequest(
        "/oilWell/liquidVolumeAbnormal/page?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
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
    // 查看曲线
    details(val) {
      console.log(val);
      this.dialogTableVisible = true;
    },
    open(){
      const t = this;
      setTimeout(() => {
        //  执行echarts画图方法
        t.drawLine();
      }, 0);
    },
    // 画图
    drawLine(){
       let dom = document.getElementById('line');
      let myChart = echarts.init(dom);
      myChart.setOption({
        legend: {
            data: ['日产液量', '日产油量', '日含水量']
        },
        grid: {
            bottom: '10%',
        },
        xAxis: {
            type: 'time',
            axisLabel:{
              show:true,
            }
        },
        yAxis: [{
            type: 'value',
            position:'left'
          },{
            type: 'value',
            position:'right'
          }
        ],
        series: [{
          data: [['2017/2/18', 2], ['2017/5/10',0],['2018/1/10',20],['2020/3/10', 13]],
          type: 'line',
          yAxisIndex: 0,  // 通过这个判断左右
          smooth: true
        }, {
          data: [['2016/12/18', 20], ['2017/12/18', 90]],
          type: 'line',
          yAxisIndex: 1, //右
          smooth: true
        }]
    });
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
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.logInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.logInit();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/oilWell/liquidVolumeAbnormal.css";
</style>
