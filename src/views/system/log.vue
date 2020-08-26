<template>
  <div class="container">
    <!-- 条件查询 -->
    <el-form
      :model="logForm"
      :rules="rules"
      :inline="true"
      style="width:97%;background-color:white"
    >
      <el-form-item>
        <el-input v-model="logForm.moduleName" placeholder="模块名称" />
      </el-form-item>
      <el-form-item>
        <el-date-picker placeholder="开始时间" v-model="logForm.startTime" />
      </el-form-item>
      <el-form-item>
        <el-date-picker placeholder="结束时间" v-model="logForm.endTime" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="searchLog()">
        查询
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-folder-checked"
        @click="exportLog()"
      >
        导出
      </el-button>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      :data="
        logData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      :current-page.sync="currentPage"
      @selection-change="handleSelectionChange"
      height="500px"
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
          <el-button type="text" size="small" @click="dleteLog(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="width:98%;background-color:white;">
      <common-page
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import CommonPage from "../../components/CommonPage";
export default {
  components: {
    CommonPage
  },
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
      total: 0
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
      });
      // this.getRequest("/operationLog/findById?id=" + this.logForm.id).then(
      //   resp => {
      //     if (resp) {
      //       let searchLogData = new Array();
      //       searchLogData.push(resp.data);
      //       this.logData = searchLogData;
      //     }
      //   }
      // );
    },
    // 表格数据初始化
    logInit() {
      this.getRequest(
        "/operationLog/findListByPage?page=" +
          this.currentPage +
          "&size=" +
          this.pageSize
      ).then(resp => {
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
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
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
.container {
  width: 98%;
  margin: 10px;
  background-color: white;
}
</style>
