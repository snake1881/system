<template>
  <div class="dymAbnormal">
    <!-- 条件查询 -->
    <el-form class="dymAbnormal_form" :model="termForm" :inline="true">
      <!-- 下拉框查询 -->
      <el-form-item label="采油站">
        <el-select
          v-model="termForm.orgName"
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
          v-model="termForm.prodDate"
          size="medium"
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
          icon="el-icon-search"
          size="small"
          @click="abnormalDymSearch()"
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
      height="85%"
      border
      style="width: 100%"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
    >

      <el-table-column  align="center" label="序号" width="60" type="index"
          :index="(index)=>{return (index+1) + (this.currentPage-1)*this.pageSize }" />
      <el-table-column prop="wellName" align="center" label="井号" width="100" />
      <el-table-column
        prop="acquisitionTime"
        align="center"
        label="量液时间"
        width="180"
      />
      <el-table-column
        prop="stroke"
        align="center"
        label="冲程(M)"
        width="90"
      />
      <el-table-column
        prop="frequency"
        align="center"
        label="冲次"
        width="90"
      />
      <el-table-column
        prop="timeDiffer"
        align="center"
        label="量液累计时间(H)"
        width="140"
      />
      <el-table-column
        prop="maxLoad"
        align="center"
        label="最大载荷"
        width="90"
      />
      <el-table-column
        prop="minLoad"
        align="center"
        label="最小载荷"
        width="90"
      />
      <el-table-column
        prop="maxDisplacement"
        align="center"
        label="最大位移"
        width="90"
      />
      <el-table-column
        prop="minDisplacement"
        align="center"
        label="最小位移"
        width="90"
      />
      <el-table-column prop="hourProd" align="center" label="产液量" width="90" />
       <el-table-column prop="dayProd" align="center" label="日累产液" width="90" />
      <el-table-column align="center" label="操作" width="130">
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
    <!-- 查看功图 -->
    <amount-liquid-scan-line
      :previewDymVisible="previewDymVisible"
      :previewData="previewDymData"
      @previewDymRowClose="previewDymClose"
    />
  </div>
</template>
<script>
import AmountLiquidScanLine from '../../../components/diagnosis/amountliquid/AmountLiquidScanLine.vue';
export default {
  components: {
   AmountLiquidScanLine
  },
  data() {
    return {
      termForm: {
        prodDate:"",
        orgName: "",
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
      // loadCollect: [],
      // 展开行加载动画
      // loadCollectLoad: true,
      // 设置row-key只展示一行
      // expands: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true,
    };
  },
  created() {
    this.abnormalDymSearch();
    this.orgNameInit();
  },
  methods: {
    // 根据输入信息查询
    abnormalDymSearch() {
      console.log(this.termForm.prodDate)
        this.getRequest(
          "/mountLiquid/amountLiquid?acquisitionTime="+
          this.termForm.prodDate+
          "&current="+
          this.currentPage +
          "&oilStationId="+
          this.termForm.orgName +
          "&pageSize="+
          this.pageSize 
        ).then((resp) => {
          if (resp) {
            this.dymData = resp.data.records;
            this.total = resp.data.total;
            this.currentPage = resp.data.current;
            this.pageSize = resp.data.size;
            // this.getIndex();
          }
        });
    },
    // 查看动液面曲线并初始化曲线数据
    preview(val) {
      this.previewDymData = val;
      this.previewDymVisible = true;
    },
    // 关闭功图
    previewDymClose() {
      this.previewDymVisible = false;
    },
    //表格数据初始化
    DymAbnormalInit() {
         this.getRequest(
          "/mountLiquid/mountLiquid?acquisitionTime="+this.termForm.prodDate+
          "&current="+this.currentPage +
          "&oilStationId="+this.termForm.orgName +
          "&pageSize="+  this.pageSize
        ).then((resp) => {
          if (resp) {
            this.dymData = resp.data.records;
            this.total = resp.data.total;
            this.currentPage = resp.data.current;
            this.pageSize = resp.data.size;
            // this.getIndex();
          }
        });
    },
    //采油站下拉框数据查询
    orgNameInit() {
      this.getRequest("/basOilStationInfor/oilStationOptions").then((resp) => {
        this.loading = false;
        if (resp) {
          this.orgNameData = resp.data;
        }
      });
    },
    // 只展开一行放入当前行id
    // getRowKeys(row) {
    //   return row.primaryId;
    // },
    // // 控制展开与关闭行
    // rowCollectInit(row, expandedRows) {
    //   //只展开一行
    //   if (expandedRows.length) {
    //     //说明展开了
    //     this.expands = [];
    //     if (row) {
    //       //只展开当前行wellCommonName
    //       this.expands.push(row.primaryId);
    //       this.loadCollect = [];
    //       this.loadCollectLoad = true;
    //       this.getRequest(
    //         "/oilWell/dym/dymDataDate?prodDate=" +
    //           row.prodDate +
    //           "&wellName=" +
    //           row.wellName
    //       ).then((resp) => {
    //         this.loadCollectLoad = false;
    //         if (resp) {
    //           this.loadCollect = resp.data;
    //         }
    //       });
    //     }
    //   } else {
    //     //说明收起了
    //     this.expands = [];
    //   }
    // },
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
    //设置序号
    // getIndex() {
    //   this.dymData.forEach((item, index) => {
    //     item.index = index + 1 + (this.currentPage - 1) * this.pageSize;
    //     return item;
    //   });
    // },
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/diagnosis/amountLiquid/amountLiquid.css";
</style>
