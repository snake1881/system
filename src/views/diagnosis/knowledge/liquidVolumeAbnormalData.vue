<template>
  <!--  液量异常参数筛选界面  -->
  <div class="liqFilterCondition">
    <el-form :model="termForm" :inline="true" :label-position="right">
      <el-fomr-item>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addLiqFilterCondition()"
        >新增</el-button>
      </el-fomr-item>
      <el-form-item label="采油站">
        <el-select v-model="termForm.orgName" clearable placeholder="全区" size="small">
          <el-option
            v-for="item in orgNameData"
            :size="small"
            :key="item.orgName"
            :label="item.orgName"
            :value="item.orgName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-input v-model="termForm.prodDate" placeholder="日期：yyyy-mm-dd" size="small"></el-input>
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="liqFilterConditionSearch()"
      >查询</el-button>
      <el-button type="primary" size="small" @click="editYlYccs(ylYccsDate)">异常参数设置</el-button>
    </el-form>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="liqFilterConditionDate"
      border
      row-key="diadiagnosticStep"
      style="width:100%"
      @current-change="handleCurrentChange"
    >
      <el-table-column label="序号" type="index" width="50" align="center">
        <template scope="scope">
          <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="wellName" label="井号" width="140"></el-table-column>
      <el-table-column prop="filter" label="条件（填写选定日期后可选择任意天）" width="420px">
        <template scope="scope">
          <el-radio-group v-model="scope.row.filter">
            <el-radio label="昨日"></el-radio>
            <el-radio label="上月"></el-radio>
            <el-radio label="前三月"></el-radio>
            <el-radio label="任意天"></el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column prop="appointDate" label="指定日期" width="320"></el-table-column>
      <el-table-column label="操作" width="140">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editLiqFilterCondition(scope.row),liqFilterConditionInit">编辑</el-button>
          <el-button type="text" size="small" @click="deleteLiqFilterCondition(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="liqFilterCondition_page">
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
    <!-- 新增 -->
    <common-add-liqFilterCondition
      :addLiqFilterConditionVisible="addLiqFilterConditionVisible"
      @liqFilterConditionRowClose="addLiqFilterConditionClose"
    />
    <!-- 编辑 -->
    <common-edit-liqFilterCondition
      :editLiqFilterConditionVisible="editLiqFilterConditionVisible"
      :editData="editLiqFilterConditionData"
      @liqFilterConditionRowClose="editLiqFilterConditionClose"
    />
    <!-- 异常参数设置 -->
    <common-edit-ylYccs
      :editYlYccsVisible="editYlYccsVisible"
      :editData="editYlYccsData"
      @ylYccsRowClose="editYlYccsClose"
    />
  </div>
</template>
<script>
import CommonAddLiqFilterCondition from "../../..//components/diagnosis/konwledge/liqfiltercondition/CommonAddLiqFilterCondition";
import CommonEditLiqFilterCondition from "../../..//components/diagnosis/konwledge/liqfiltercondition/CommonEditLiqFilterCondition";
import CommonEditYlYccs from "../../..//components/diagnosis/konwledge/liqfiltercondition/CommonEditYlYccs";
export default {
  components: {
    CommonAddLiqFilterCondition,
    CommonEditLiqFilterCondition,
    CommonEditYlYccs
  },
  data() {
    return {
      //搜索框数据
      termForm: {
        orgName: "",
        prodDate: ""
      },
      //采油站名称
      orgNameData: [],
      //表格数据
      liqFilterConditionDate:[],
      //液量异常筛选参数
      ylYccsDate: {},
      orgName: "",
      loading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      // 异常筛选参数设置编辑
      editYlYccsVisible: false,
      editYlYccsData: {},
      // 编辑
      editLiqFilterConditionVisible: false,
      editLiqFilterConditionData: {},
      //新增
      addLiqFilterConditionVisible: false
    };
  },
  created() {
    this.liqFilterConditionInit();
    this.ylYccsInit();
    this.orgNameInit();
  },
  methods: {
    // 根据井名和日期
    deleteLiqFilterCondition(val) {
      this.$confirm("确定删除该条数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequest(
            "/knowledge/LiqFilterCondition/LiqFilterCondition",
            val
          ).then(resp => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.liqFilterConditionInit();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //表格数据初始化
    liqFilterConditionInit() {
      this.getRequest(
        "/knowledge/LiqFilterCondition/LiqFilterConditionList?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.liqFilterConditionDate = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    //条件查询
    liqFilterConditionSearch() {
      this.getRequest(
        "/knowledge/LiqFilterCondition/LiqFilterConditionListTerm?orgName=" +
          this.termForm.orgName +
          "&prodDate=" +
          this.termForm.prodDate
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.liqFilterConditionDate = resp.data;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    //液量异常筛选参数初始化
    ylYccsInit() {
      this.getRequest("/knowledge/ylYcss/ylYccs?wellName=default").then(
        resp => {
          this.loading = false;
          if (resp) {
            this.ylYccsDate = resp.data;
          }
        }
      );
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
      this.pageSize = val;
      this.liqFilterConditionInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.liqFilterConditionInit();
    },
    // 异常参数筛选设置编辑
    editYlYccs(val) {
      this.editYlYccsData = val;
      this.editYlYccsVisible = true;
    },
    // 关闭异常参数筛选编辑框
    editYlYccsClose() {
      this.editYlYccsVisible = false;
    },
    // 编辑
    editLiqFilterCondition(val) {
      this.editLiqFilterConditionData = val;
      this.editLiqFilterConditionVisible = true;
    },
    // 关闭编辑框
    editLiqFilterConditionClose() {
      this.editLiqFilterConditionVisible = false;
    },
    //新增
    addLiqFilterCondition() {
      this.addLiqFilterConditionVisible = true;
      this.liqFilterConditionInit();
    },
    //关闭新增框
    addLiqFilterConditionClose() {
      this.addLiqFilterConditionVisible = false;
    }
  }
};
</script>
<style lang="less" scoped>
</style>