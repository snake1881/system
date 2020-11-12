<template>
  <div class="role">
    <!-- 条件查询 -->
    <el-form class="role_form" :model="detailFrom" :inline="true">
      <el-form-item>
        <el-input
          v-model="detailFrom.examineContent"
          placeholder="考核内容"
          size="medium"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="searchIndex()"
          >查询</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addDetail()"
          >新增</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-delete"
          size="small"
          @click="selectdelete()"
          >批量删除</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="detailData"
      border
<<<<<<< HEAD
      style="width:100%;height:86%"
      :row-style="{height:'2px'}"
      :cell-style="{padding:'0px'}"
      :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="90" />
      <el-table-column prop="examineContent" label="考核内容" width="300" />
      <el-table-column prop="requirement" label="工作要求" width="280" />
      <el-table-column prop="examineStandard" label="考核标准" width="280" />
      <el-table-column prop="score" label="分值" width="140" />
      <el-table-column prop="sequence" label="排列顺序" width="120" />
      <el-table-column label="操作" width="125">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editDetail(scope.row)" class="iconfont icon-bianji" />
          <el-button type="text" size="small" @click="sinDelete(scope.row)" class="iconfont icon-shanchu" />
=======
      style="width:100%"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="60" />
      <el-table-column prop="index" align="center" label="序号" width="80" />
      <el-table-column prop="examineContent" label="考核内容" width="240" />
      <el-table-column prop="requirement" label="工作要求" width="240" />
      <el-table-column prop="examineStandard" label="考核标准" width="300" />
      <el-table-column prop="score" label="分值" width="120" />
      <el-table-column prop="sequence" label="排列顺序" width="120" />
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            class="iconfont icon-bianji"
            @click="editDetail(scope.row)"
          />
          <el-button
            type="text"
            size="small"
            class="iconfont icon-shanchu"
            @click="sinDelete(scope.row)"
          />
>>>>>>> 50a9e3f1b5b121ead718ec3c4d421a1aa2f96f2a
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
    <common-add-detail
      :addDetailVisible="addDetailVisible"
      @addClose="addDetailClose"
    />
    <!-- 编辑 -->
    <common-edit-detail
      :editDetailVisible="editDetailVisible"
      @editClose="editDetailClose"
      :editData="editData"
    />
  </div>
</template>
<script>
import CommonAddDetail from "../../components/assessment/detail/CommonAddDetail";
import CommonEditDetail from "../../components/assessment/detail/CommonEditDetail";
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
          this.getIndex();
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
          this.getIndex();
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
    },
    //获取序号
    getIndex() {
      this.detailData.forEach((item, index) => {
        item.index = index + 1 + (this.currentPage - 1) * this.pageSize;
        return item;
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/system/role.css";
</style>
