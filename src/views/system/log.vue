<template>
  <div class="role">
    <!-- 条件查询 -->
    <el-form class="role_form" :model="logForm" :rules="rules" :inline="true">
      <el-form-item>
        <el-input v-model="logForm.moduleName" placeholder="模块名称" size="medium" />
      </el-form-item>
      <el-form-item>
        <el-date-picker placeholder="开始时间" v-model="logForm.startTime" size="medium" />
      </el-form-item>
      <el-form-item>
        <el-date-picker placeholder="结束时间" v-model="logForm.endTime" size="medium" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" size="small" @click="searchLog()">查询</el-button>
      <el-button type="primary" icon="el-icon-folder-checked" size="small" @click="exportLog()">导出</el-button>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="logData"
      @selection-change="handleSelectionChange"
      height="84%"
      border
      style="width:100%;"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="operationId" label="日志编号" width="120" />
      <el-table-column prop="moduleName" label="模块名称" width="160" />
      <el-table-column prop="operationType" label="操作类型" width="140" />
      <el-table-column prop="operatorName" label="操作人员" width="140" />
      <el-table-column prop="departmentName" label="部门名称" width="160" />
      <el-table-column prop="requestIp" label="主机" width="140" />
      <el-table-column prop="status" label="操作状态" width="130" />
      <el-table-column prop="operationTime" label="操作时间" width="140" />
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dleteLog(scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
      logForm: {
        moduleName: "",
        startTime: "",
        endTime: ""
      },
      // 表格数据
      logData: [],
      // 选中数据
      selectData: [],
      rules: {
        moduleName: [
          { required: true, message: "模块不能为空", trigger: "blur" }
        ]
      },
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true
    };
  },
  created() {
    this.logInit();
  },
  methods: {
    // 根据输入信息查询
    searchLog() {
      this.postRequest(
        "/operationLog/findListsByPage?page=" +
          this.currentPage +
          "&size=" +
          this.pageSize,
        this.logForm
      ).then(resp => {
        if (resp) {
          this.logData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      })
    },
    // 表格数据初始化
    logInit() {
      this.getRequest(
        "/operationLog/findListByPage?page=" +
          this.currentPage +
          "&size=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.logData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 删除
    dleteLog(val) {
      this.$confirm("确定删除该条数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.getRequest(
            "/operationLog/deleteById?ids=" + val.operationId
          ).then(resp => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.logInit();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
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
    },
    // 表格数据选中
    handleSelectionChange(val) {
      this.selectData = val;
    },
    // 导出
    exportLog() {
      console.log(1);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/system/role.css";
</style>
