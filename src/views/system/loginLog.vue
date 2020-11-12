<template>
  <div class="role">
    <!-- 条件查询 -->
    <el-form class="role_form" :model="logingLogForm" :rules="rules" :inline="true">
      <el-form-item>
        <el-input v-model="logingLogForm.moduleName" clearable placeholder="模块名称" size="small" />
      </el-form-item>
      <el-form-item label="日期" size="small">
          <el-date-picker
            v-model="chooseDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="searchLog()">查询</el-button>
        </el-form-item>
      <el-form-item>
      <el-button
          type="primary"
          icon="el-icon-download"
          size="small"
          @click="fileOpen()"
          >导出</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="logingLogData"
      @selection-change="handleSelectionChange"
      height="86%"
      border
      style="width:100%"
      :row-style="{height:'2px'}"
      :cell-style="{padding:'0px'}"
      :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="operationId" label="日志编号" width="90" />
      <el-table-column prop="moduleName" label="模块名称" width="150" />
      <el-table-column prop="operatorName" label="登录名称" width="150" />
      <el-table-column prop="requestIp" label="登陆地址" width="150" />
      <el-table-column prop="requestLocation" label="登陆地点" width="150" />
      <el-table-column prop="channel" label="设备" width="150" />
      <el-table-column prop="operationType" label="操作类型" width="100" />
      <el-table-column prop="operationMsg" label="操作信息" width="100" />
      <el-table-column prop="operationTime" label="登陆时间" width="240" />
      
    </el-table>
    <!-- 分页 -->
    <div class="role_page">
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
<script>
export default {
  data() {
    return {
      //搜索框
      logingLogForm: {
        moduleName: "",
        startTime: "",
        endTime: ""
      },
      // 表格数据
      logingLogData: [],
      // 多选数据
      selectData: [],
      chooseDate:"",
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      rules: {
        moduleName: [
          { required: true, message: "模块名称不能为空", trigger: "blur" }
        ]
      },
      // 表格加载动画
      loading: true
    };
  },
  created() {
    this.loginLogInit();
  },
  methods: {
    // 根据输入信息查询
    searchLog() {
      this.logingLogForm.startTime=this.chooseDate[0];
      this.logingLogForm.endTime=this.chooseDate[1];
      console.log(this.logForm);
      this.postRequest(
        "/loginLog/findListsLoginByPage?page=" +
          this.currentPage +
          "&size=" +
          this.pageSize,
        this.logingLogForm
      ).then(resp => {
        if (resp) {
          this.logingLogData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    //表格数据初始化
    loginLogInit() {
      this.getRequest(
        "/loginLog/findListLoginByPage?page=" +
          this.currentPage +
          "&size=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.logingLogData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.loginLogInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loginLogInit();
    },
    // // 删除选中数据
    // dleteLoginLog(val) {
    //   this.$confirm("确定删除该条数据", "警告", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.getRequest(
    //         "/loginLog/deleteLoginById?ids=" + val.operationId
    //       ).then(resp => {
    //         if (resp) {
    //           this.$message({
    //             type: "success",
    //             message: "删除成功!"
    //           });
    //         }
    //         this.loginLogInit();
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },
    // 表格数据多选
    handleSelectionChange(val) {
      this.selectData = val;
    },
    fileOpen() {
      window.open("http://localhost:8692/demo/loginLog/excelexport");
    },
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/system/role.css";
</style>
<style>
.role .iconfont{
  font-size: 20px;
}
</style>
