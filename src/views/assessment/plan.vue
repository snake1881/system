<template>
  <div class="role">
    <!-- 考核计划 -->
    <div class="role_1" v-if="pageFlag">
      <!-- 条件查询 -->
      <el-form class="role_form" :model="planFrom" :inline="true">
        <el-form-item>
          <el-input v-model="planFrom.planName" placeholder="计划名称" size="medium" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="searchPlan()">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addPlan()">新增</el-button>
          <el-button type="primary" icon="el-icon-delete" size="small" @click="selectdelete()">批量删除</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格数据 -->
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="planData"
        border
        style="width:100%"
        height="85%"
        :row-style="{height:'2px'}"
        :cell-style="{padding:'0px'}"
        :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="90" />
        <el-table-column prop="planName" align="center" label="计划名称" width="300" />
        <el-table-column prop="startDate" align="center" label="开始时间" width="270" />
        <el-table-column prop="endDate" align="center" label="结束时间" width="270" />
        <el-table-column prop="remark" align="center" label="备注" width="285" />
        <el-table-column label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editPlan(scope.row)" class="iconfont icon-bianji" />
            <el-button type="text" size="small" @click="sinDelete(scope.row)" class="iconfont icon-shanchu" />
            <el-button type="text" size="small" @click="detailPlan(scope.row)" class="iconfont icon-xiangqing" />
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
      <common-add-plan :addPlanVisible="addPlanVisible" @addClose="addPlanClose" />
      <!-- 编辑 -->
      <common-edit-plan
        :editPlanVisible="editPlanVisible"
        @editClose="editPlanClose"
        :editData="editData"
      />
    </div>
    <!-- 查看详情页面 -->
    <div class="detail" v-else-if="!pageFlag">
      <!--返回考核模板页面-->
      <el-link
        @click="backPlan()"
        v-if="pageFlag === false"
        :underline="false"
        type="primary"
        icon="el-icon-arrow-left"
      >返回</el-link>
      <!-- 详情信息 -->
      <div class="detail-content">
        <el-divider content-position="center">
          <span style="color: #50a6fe;">考核计划信息</span>
        </el-divider>
        <br />
        <div class="detail-content-template">
          <div class="detail-content-template-name">
            <div style="width: 33%">计划名称</div>
            <div style="width: 33%">开始时间</div>
            <div style="width: 33%">结束时间</div>
          </div>
          <div class="detail-content-template-content">
            <div style="width: 33%">{{ this.detailData.planName }}</div>
            <div style="width: 33%">{{ this.detailData.startDate }}</div>
            <div style="width: 33%">{{ this.detailData.endDate }}</div>
          </div>
        </div>

        <br />
        <br />
        <el-divider content-position="center">
          <span style="color: #50a6fe;">参考单位</span>
        </el-divider>
        <br />
        <el-table 
          :data="this.detailData.resultInforList" 
          border 
          style="width:100%" 
          height="90%"
          :header-cell-style="{'text-align':'center'}"
        >
          <el-table-column prop="takeObject" align="center" label="参考单位" width="450" />
          <el-table-column prop="totalScore" align="center" label="总得分" width="425" />
          <el-table-column prop="remark" align="center" label="备注" width="460" />
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import CommonAddPlan from "../../components/assessment/plan/CommonAddPlan";
import CommonEditPlan from "../../components/assessment/plan/CommonEditPlan";
export default {
  components: {
    CommonAddPlan,
    CommonEditPlan
  },
  data() {
    return {
      //搜索框
      planFrom: {
        planName: ""
      },
      // 表格数据
      planData: [],
      // 选中要删除的数据
      selectData: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 新增
      addPlanVisible: false,
      // 编辑
      editPlanVisible: false,
      editData: {},
      // 显示标志
      pageFlag: true,
      detailData: {},
      // 表格加载动画
      loading: true
    };
  },
  created() {
    this.planInit();
  },
  methods: {
    // 根据输入信息查询
    searchPlan() {
      this.getRequest(
        "/examine/planInfor/searchByPlanName?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize +
          "&planName=" +
          this.planFrom.planName
      ).then(resp => {
        if (resp) {
          this.planData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.getIndex();
        }
      });
    },
    //表格数据初始化
    planInit() {
      this.getRequest(
        "/examine/planInfor/queryByPageAll?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.planData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.getIndex();
        }
      });
    },
    // 新增
    addPlan() {
      this.addPlanVisible = true;
    },
    // 关闭新增对话框
    addPlanClose() {
      this.addPlanVisible = false;
    },
    // 编辑
    editPlan(val) {
      this.editPlanVisible = true;
      this.editData = val;
      console.log(val);
    },
    // 关闭编辑对话框
    editPlanClose() {
      this.editPlanVisible = false;
    },
    // 表格多选
    handleSelectionChange(val) {
      this.selectData = val;
    },
    // 批量删除
    selectdelete() {
      var checkArray = this.selectData;
      var idArray = [];
      checkArray.forEach(function(item) {
        idArray.push(item.examinePId);
      });
      this.$confirm("确定删除您勾选的数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequest("/examine/planInfor/deleteBatch", idArray).then(
            resp => {
              if (resp) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
              this.planInit();
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
    // 单个删除
    sinDelete(val) {
      this.$confirm("确定删除该条数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequest(
            "/examine/planInfor/deleteByPrimaryKey?examinePlanId=" +
              val.examinePId
          ).then(resp => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.planInit();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 查看详情
    detailPlan(val) {
      this.pageFlag = false;
      this.detailData = val;
    },
    // 返回考核计划
    backPlan() {
      this.pageFlag = true;
      this.planInit();
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.planInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.planInit();
    },
    //获取序号
    getIndex() {
      this.planData.forEach((item, index) => {
        item.index = index + 1 + (this.currentPage - 1) * this.pageSize;
        return item;
      });
    },
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/system/role.css";
</style>
