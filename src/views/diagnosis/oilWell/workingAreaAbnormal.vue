<template>
  <div class="role">
    <!-- 条件查询 -->
    <el-form class="role_form" :model="orgnameAndTimeForm" :inline="true">
      <!-- 下拉框查询 -->
      <el-form-item label="采油站">
        <el-select
          v-model="orgnameAndTimeForm.wellId"
          clearable
          placeholder="全区"
          size="small"
        >
          <el-option
            v-for="(item, index) in this.orgnameData"
            :key="index"
            :label="item.orgName"
            :value="item.wellId"
            :disabled="item.orgName.disabled"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="日期" size="medium">
        <el-date-picker
          v-model="orgnameAndTimeForm.checkTime"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd "
        >
        </el-date-picker>
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="searchPost()"
        >查询</el-button
      >
    </el-form>
    <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="gtmjData"
      height="84%"
      border
      style="width:100%;"
    >
      <el-table-column prop="" align="center" label="序号" width="50">
        <template scope="scope">
          <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="wellId" align="center" label="井号" width="150" />
      <el-table-column
        prop="checkDate"
        align="center"
        label="日期"
        width="280"
      />
      <el-table-column
        prop="orgName"
        align="center"
        label="采油站"
        width="220"
      />
      <el-table-column
        prop="abnormalProblem"
        align="center"
        label="诊断结果"
        width="320"
      />
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editPost(scope.row)"
            >查看曲线</el-button
          >
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
    <common-add-post
      :addPostVisible="addPostVisible"
      @postRowClose="addPostClose"
    />
    <!-- 编辑 -->
    <common-edit-post
      :editPostVisible="editPostVisible"
      :editData="editPostData"
      @postRowClose="editPostClose"
    />
  </div>
</template>
<script>
//import CommonAddPost from "../../../components/system/post/CommonAddPost";
//import CommonEditPost from "../../../components/system/post/CommonEditPost";
import CommonEditPost from "../../../components/diagnosis/oilwell/gtmjyc/GtmjycScanLine";
export default {
  components: {
    //CommonAddPost,
    CommonEditPost
  },
  data() {
    return {
      orgnameAndTimeForm: {
        checkTime: "",
        wellId: ""
      },
      // 表格数据
      gtmjData: [],
      // 采油站下拉框数据
      orgnameData: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 编辑
      editPostVisible: false,
      editPostData: {},
      // 新增
      addPostVisible: false,
      // 表格加载动画
      loading: true
    };
  },
  created() {
    this.postInit();
    this.selectInit();
  },
  methods: {
    // 根据输入信息查询
    searchPost() {
      this.postRequest(
        "/abnormalGtmjEntity/findListsByPage?page=" +
          this.currentPage +
          "&size=" +
          this.pageSize,
        this.orgnameAndTimeForm
      ).then(resp => {
        if (resp) {
          this.gtmjData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 根据id删除
    dletePost(val) {
      this.$confirm("确定删除该条数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.getRequest("/position/deleteById?ids=" + val.positionId).then(
            resp => {
              if (resp) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
              this.postInit();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //表格数据初始化
    postInit() {
      this.getRequest(
        "/abnormalGtmjEntity/findListByPage?page=" +
          this.currentPage +
          "&size=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.gtmjData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    //采油站下拉框数据初始化
    selectInit() {
      this.getRequest(
        "/abnormalGtmjEntity/findListByPage?page=" +
          this.currentPage +
          "&size=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.orgnameData = resp.data.records;
          // 下拉框去重
          var hash = {};
          this.orgnameData = this.orgnameData.reduce(function(item, next) {
            hash[next.orgName]
              ? ""
              : (hash[next.orgName] = true && item.push(next));
            return item;
          }, []);

          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.postInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.postInit();
    },
    // 编辑
    editPost(val) {
      this.editPostData = val;
      this.editPostVisible = true;
    },
    // 关闭编辑框
    editPostClose() {
      this.editPostVisible = false;
    },
    // 新增
    addPost() {
      this.addPostVisible = true;
      this.postInit();
    },
    // 关闭新增框
    addPostClose() {
      this.addPostVisible = false;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/system/role.css";
</style>
