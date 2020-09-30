<template>
  <!--功图数据异常页面-->
  <div class="abnormalGt">
    <el-form v-model="GtForm" :inline="true">
      <el-form-item label="采油站">
        <el-select
          v-model="GtForm.orgName"
          filterable
          clearable
          placeholder="全区"
        >
          <el-option
            v-for="item in orgNameData"
            :key="item.orgName"
            :label="item.orgName"
            :value="item.orgName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="GtForm.checkDate"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="abnormalGtSearch()"
        >查询</el-button
      >
    </el-form>
    <el-divider > 功图数据异常数据（默认今日） </el-divider>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="abnormalGtData"
      border
      row-key="checkDate"
      :tree-props="{
        children: 'children',
        hasChildren: 'hasChildren'
      }"
      style="width:100%"
     
    >
      <el-table-column prop="rn" label="序号" width="100" />
      <el-table-column prop="wellId" label="井号" width="150" />
      <el-table-column prop="checkDate" label="日期" width="200" />
      <el-table-column prop="abnormalProblem" label="诊断结果" width="320">
      </el-table-column>
      <el-table-column prop="orgName" label="采油站" width="320" />
      <el-table-column label="操作" width="140">
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
      :previewAbnormalGtData="previewAbnormalGtData"
      @previewAbnormalGtRowClose="previewAbnormalGtClose"
    />
  </div>
</template>
<script>
import CommonPreviewAbnormalGt from "../../..//components/diagnosis/oilwell/abnormalGt/CommonPreviewAbnormalGT";
export default {
  components: {
    CommonPreviewAbnormalGt
  },
  data() {
    return {
      GtForm: {
        orgName: "",
        checkDate: ""
      },
      //用于判断查询条件是否发生改变
      oldOrgName:"",
      OldCheckDate:"",
      //采油站名称
      orgNameData: [],
      //表格数据
      abnormalGtData: [],
      loading: true,
      //判断是翻页还是修改查询数据重新查询的状态参数
      status: 0 ,
      //分页
      currentPage: 1,
      pageSize: 20,
      total: 0,
      // 编辑
      previewAbnormalGtVisible: false,
      previewAbnormalGtData: {},
      tableDate: {},
      coordinates: [{}]
    };
  },
  created() {
    this.abnormalGtInit();
    this.orgNameInit();
  },
  methods: {
    abnormalGtInit() {
      this.getRequest(
        "/oilWell/abnormalGt/abnormalGtAllPage?checkDate=0000-00-00&current=" +
          this.currentPage +
          "&orgName=%E5%85%A8%E7%AB%99&pageSize=" +
          this.pageSize
      ).then(resp => {
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
      if(this.GtForm.orgName!==this.oldOrgName||this.GtForm.checkDate!==this.OldCheckDate){
        this.currentPage=1;
        this.pageSize=20;
      };
      this.getRequest(
        "/oilWell/abnormalGt/abnormalGtAllPage?checkDate=" +
          this.getTime(this.GtForm.checkDate) +
          "&current=" +
          this.currentPage +
          "&orgName=" +
          this.GtForm.orgName +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.abnormalGtData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
      this.oldOrgName=this.GtForm.orgName;
      this.OldCheckDate=this.GtForm.checkDate;
    },
    //加油站下拉框初始化
    orgNameInit() {
      this.getRequest("/knowledge/DiagnosticParametersGt/CdWellSource").then(
        resp => {
          this.loading = false;
          if (resp) {
            this.orgNameData = resp.data;
          }
        }
      );
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
      if (this.GtForm.orgName === null) {
        this.abnormalGtInit();
      } else {
        this.abnormalGtSearch();
      }
    },
    // 查看功图
    previewAbnormalGt(val) {
      this.previewAbnormalGtData = val;
      this.previewAbnormalGtVisible = true;
    },
    // 关闭功图
    previewAbnormalGtClose() {
      this.previewAbnormalGtVisible = false;
    },
    //时间格式化
    getTime(dt) {
      if(dt!==null){
        var year = dt.getFullYear(); //年
      var month = dt.getMonth() + 1; //月
      var date = dt.getDate(); //日
      month = month < 10 ? "0" + month : month;
      date = date < 10 ? "0" + date : date;
      var str = year + "-" + month + "-" + date;
      return str;
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>