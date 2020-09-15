<template>
  <div class="role">
    <!-- 条件查询 -->
    <el-form class="role_form" :model="detailFrom" :inline="true">
      <el-form-item>
        <el-input v-model="detailFrom.examineContent" placeholder="考核内容" size="medium" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="searchIndex()">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addDetail()">新增</el-button>
        <el-button type="primary" icon="el-icon-delete" size="small" @click="selectdelete()">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="detailData"
      height="84%"
      border
      style="width:100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="examineContent" label="考核内容" width="220" />
      <el-table-column prop="requirement" label="工作要求" width="220" />
      <el-table-column prop="examineStandard" label="考核标准" width="220" />
      <el-table-column prop="score" label="分值" width="120" />
      <el-table-column prop="sequence" label="排列顺序" width="120" />
      <el-table-column prop="active" label="是否有效" width="120">
        <template slot-scope="scope">
          <p v-if="scope.row.active == '0'">无效</p>
          <p v-if="scope.row.active == '1'">有效</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="210">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editDetail(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="sinDelete(scope.row)">删除</el-button>
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
    <!-- 新增 -->
    <common-add-detail :addDetailVisible="addDetailVisible" @addClose="addDetailClose" />
    <!-- 编辑 -->
    <common-edit-detail
      :editDetailVisible="editDetailVisible"
      @editClose="editDetailClose"
      :editData="editData"
    />
  </div>
</template>
<script>
import CommonAddDetail from "../../components/Detail/CommonAddDetail";
import CommonEditDetail from "../../components/Detail/CommonEditDetail";
export default {
  components: {
    CommonAddDetail,
    CommonEditDetail
  },
  data() {
    return {
      //搜索框
      detailFrom: {
        examineContent: ""
      },
      // 表格数据
      detailData: [],
      // 选中要删除的数据
      selectData: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 新增
      addDetailVisible: false,
      // 编辑
      editDetailVisible: false,
      editData: {},
      // 表格加载动画
      loading: true
    };
  },
  created() {
    this.detailInit();
  },
  methods: {
    // 根据输入信息查询
    searchIndex() {
      this.getRequest(
        "/examine/IndexDetail/selectByContent?current=" +
          this.currentPage +
          "&examineContent=" +
          this.detailFrom.examineContent +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        if (resp) {
          this.detailData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    //表格数据初始化
    detailInit() {
      this.getRequest(
        "/examine/IndexDetail/bizExamineIndexDetails?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.detailData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 新增
    addDetail() {
      this.addDetailVisible = true;
    },
    // 关闭新增对话框
    addDetailClose() {
      this.addDetailVisible = false;
    },
    // 编辑
    editDetail(val) {
      this.editDetailVisible = true;
      this.editData = val;
    },
    // 关闭编辑对话框
    editDetailClose() {
      this.editDetailVisible = false;
    },
    // 表格多选
    handleSelectionChange(val) {
      this.selectData = val;
    },
    // 批量删除,根据？删除
    selectdelete() {
      var checkArray = this.selectData;
      var idArray = [];
      checkArray.forEach(function(item) {
        idArray.push(item.indexDId);
      });
      this.$confirm("确定删除您勾选的数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequest(
            "/examine/IndexDetail/bizExamineIndexDetails",
            idArray
          ).then(resp => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.detailInit();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 单个删除
    sinDelete(val) {
      this.$confirm("确定删除该条数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequest(
            "/examine/IndexDetail/bizExamineIndexDetail/" + val.indexDId
          ).then(resp => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.detailInit();
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
      this.detailInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.detailInit();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/system/role.css";
</style>
