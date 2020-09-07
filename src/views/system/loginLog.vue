<template>
  <div class="container">
    <!-- 条件查询 -->
    <el-form
      :model="logingLogForm"
      :rules="rules"
      :inline="true"
      style="width:97%;background-color:white"
    >
      <el-form-item>
        <el-input v-model="logingLogForm.moduleName" placeholder="模块名称" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          placeholder="开始时间"
          v-model="logingLogForm.startTime"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          placeholder="结束时间"
          v-model="logingLogForm.endTime"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="searchLog()">
        查询
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-folder-checked"
        @click="exportLogingLog()"
      >
        导出
      </el-button>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      :data="logingLogData"
      @selection-change="handleSelectionChange"
      height="500px"
      border
      style="width:100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="operationId" label="日志编号" width="90" />
      <el-table-column prop="moduleName" label="模块名称" width="140" />
      <el-table-column prop="operatorName" label="登录名称" width="120" />
      <el-table-column prop="requestIp" label="登陆地址" width="120" />
      <el-table-column prop="requestLocation" label="登陆地点" width="140" />
      <el-table-column prop="channel" label="设备" width="100" />
      <el-table-column prop="operationType" label="操作类型" width="100" />
      <el-table-column prop="operationMsg" label="操作信息" width="100" />
      <el-table-column prop="operationTime" label="登陆时间" width="240" />
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dleteLoginLog(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="width:98%;background-color:white">
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
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      rules: {
        moduleName: [
          { required: true, message: "模块名称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.loginLogInit();
  },
  methods: {
    // 根据输入信息查询
    searchLog() {
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
      // this.getRequest(
      //   "/loginLog/findLoginById?id=" + this.logingLogForm.id
      // ).then(resp => {
      //   if (resp) {
      //     let loginData = new Array();
      //     loginData.push(resp.data);
      //     this.logingLogData = loginData;
      //   }
      // });
    },
    //表格数据初始化
    loginLogInit() {
      this.getRequest(
        "/loginLog/findListLoginByPage?page=" +
          this.currentPage +
          "&size=" +
          this.pageSize
      ).then(resp => {
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
    // 删除选中数据
    dleteLoginLog(val) {
      this.$confirm("确定删除该条数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.getRequest(
            "/loginLog/deleteLoginById?ids=" + val.operationId
          ).then(resp => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.loginLogInit();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 表格数据多选
    handleSelectionChange(val) {
      this.selectData = val;
    },
    // 导出
    exportLogingLog() {
      console.log(1);
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 98%;
  margin: 10px;
  background-color: white;
}
</style>
