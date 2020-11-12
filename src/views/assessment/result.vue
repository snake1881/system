<template>
<<<<<<< HEAD
<div class="role">
  <!-- 考核结果 -->
  <div class="role_1" v-if="pageFlag">
    <!-- 条件查询 -->
    <el-form class="role_form" :model="resultFrom" :inline="true">
      <el-form-item>
        <el-input v-model="resultFrom.takeObject" placeholder="参考单位/人员" size="medium" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="searchResult()">查询</el-button>
        <el-button type="primary" icon="el-icon-delete" size="small" @click="selectdelete()">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :data="resultData" border style="width:100%;height:85%" :row-style="{height:'2px'}" :cell-style="{padding:'0px'}" :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="90" />
      <el-table-column prop="takeObject" label="参考单位/人员" width="300" />
      <el-table-column prop="totalScore" label="总得分" width="180" />
      <el-table-column prop="examineDate" label="考核时间" width="300" />
      <el-table-column prop="remark" label="备注" width="300" />
      <el-table-column label="操作" width="165">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editResult(scope.row)" class="iconfont icon-bianji" />
          <el-button type="text" size="small" @click="sinDelete(scope.row)" class="iconfont icon-shanchu" />
          <el-button type="text" size="small" v-if="scope.row.totalScore !== 0&&scope.row.totalScore !==null" :disabled="true" class="el-icon-circle-check" />
          <el-button type="text" size="small" @click="score(scope.row)" v-if="scope.row.totalScore == 0 ||scope.row.totalScore ==null" class="el-icon-circle-check" />
          <el-button type="text" size="small" @click="detailResult(scope.row)" class="iconfont icon-xiangqing" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="role_page">
      <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="total" :page-sizes="[10, 20, 30, 40, 50]" layout="total, prev, pager, next, jumper, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
=======
  <div class="role">
    <!-- 考核结果 -->
    <div class="role_1" v-if="pageFlag">
      <!-- 条件查询 -->
      <el-form class="role_form" :model="resultFrom" :inline="true">
        <el-form-item>
          <el-input v-model="resultFrom.takeObject" placeholder="参考单位/人员" size="medium" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="searchResult()">查询</el-button>
          <el-button type="primary" icon="el-icon-delete" size="small" @click="selectdelete()">批量删除</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格数据 -->
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="resultData"
        height="84%"
        border
        style="width:100%"
        :row-style="{height:'2px'}"
        :cell-style="{padding:'0px'}"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="90" />
        <el-table-column prop="index" align="center" label="序号" width="80"/>
        <el-table-column prop="takeObject" label="参考单位/人员" width="300" />
        <el-table-column prop="totalScore" label="总得分" width="120" />
        <el-table-column prop="examineDate" label="考核时间" width="240" />
        <el-table-column prop="remark" label="备注" width="240" />
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editResult(scope.row)" class="iconfont icon-bianji"/>
            <el-button type="text" size="small" @click="sinDelete(scope.row)" class="iconfont icon-shanchu"/>
            <el-button
              type="text"
              size="small"
              v-if="scope.row.totalScore !== 0&&scope.row.totalScore !==null"
              :disabled="true"
            >
              考核打分
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="score(scope.row)"
              v-if="scope.row.totalScore == 0 ||scope.row.totalScore ==null"
            >
              考核打分
            </el-button>
            <el-button type="text" size="small" @click="detailResult(scope.row)" class="iconfont icon-xiangqing"/>
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
      <!-- 编辑 -->
      <common-edit-result
        :editResultVisible="editResultVisible"
        @editClose="editResultClose"
        :editData="editData"
      />
      <!-- 考核打分 -->
      <common-score-result
        :scoreResultVisible="scoreResultVisible"
        @scoreClose="scoreResultClose"
        :scoreData="scoreData"
      />
>>>>>>> 50a9e3f1b5b121ead718ec3c4d421a1aa2f96f2a
    </div>
    <!-- 编辑 -->
    <common-edit-result :editResultVisible="editResultVisible" @editClose="editResultClose" :editData="editData" />
    <!-- 考核打分 -->
    <common-score-result :scoreResultVisible="scoreResultVisible" @scoreClose="scoreResultClose" :scoreData="scoreData" />
  </div>
  <!-- 查看详情页面 -->
  <div class="detail" v-else-if="!pageFlag">
    <!--返回考核结果页面-->
    <el-link @click="backResult()" v-if="pageFlag === false" :underline="false" type="primary" icon="el-icon-arrow-left">
      返回
    </el-link>
    <!-- 详情信息 -->
    <div class="detail-content">
      <el-divider content-position="center">
        <span style="color: #50a6fe;">考核结果信息</span>
      </el-divider>
      <br />
      <div class="detail-content-template">
        <div class="detail-content-template-name">
          <div style="width: 20%">参考单位/人员</div>
          <div style="width: 20%">总得分</div>
          <div style="width: 20%">考核计划</div>
          <div style="width: 20%">考核模板</div>
          <div style="width: 20%">考核时间</div>
        </div>
        <div class="detail-content-template-content">
          <div style="width: 20%">{{ this.detailData.takeObject }}</div>
          <div style="width: 20%">{{ this.detailData.totalScore }}</div>
          <div style="width: 20%">{{ this.detailData.planName }}</div>
          <div style="width: 20%">{{ this.detailData.templateName }}</div>
          <div style="width: 20%">{{ this.detailData.examineDate }}</div>
        </div>
      </div>

      <br />
      <br />
      <el-divider content-position="center">
        <span style="color: #50a6fe;">考核指标及明细</span>
      </el-divider>
      <br />
      <el-table 
      :data="this.detailData.bizExamineIndexDetailVoList" 
      border 
      style="width: 100%;height:90%" 
       row-key="indexDId" 
       :tree-props="{
        children: 'children',
      }"
     
      >
        <el-table-column prop="indexName" label="指标名称" width="360" />
        <el-table-column prop="examineContent" label="考核内容" width="360" />
        <el-table-column prop="requirement" label="工作要求" width="360" />
        <el-table-column prop="score" label="分值" width="130" />
        <el-table-column prop="singleScore" label="得分" width="125" />
      </el-table>
    </div>
  </div>
</div>
</template>

<script>
import CommonEditResult from "../../components/assessment/result/CommonEditResult";
import CommonScoreResult from "../../components/assessment/result/CommonScoreResult";
export default {
  components: {
    CommonEditResult,
    CommonScoreResult
  },
  data() {
    return {
      //搜索框
      resultFrom: {
        takeObject: ""
      },
      // 表格数据
      resultData: [],
      // 选中要删除的数据
      selectData: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 新增
      // addResultVisible: false,
      // 编辑
      editResultVisible: false,
      editData: {},
      // 考核打分
      scoreResultVisible: false,
      scoreData: [],
      // 显示标志
      pageFlag: true,
      detailData: {},
      // 表格加载动画
      loading: true
    };
  },
  created() {
    this.resultInit();
  },
  methods: {
    // 根据输入信息查询
    searchResult() {
      this.getRequest(
        "/examine/resultInfor/bizExamineResultInforTakeObject?current=" +
        this.currentPage +
        "&pageSize=" +
        this.pageSize +
        "&takeObject=" +
        this.resultFrom.takeObject
      ).then(resp => {
        if (resp) {
          this.resultData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.getIndex();
        }
      });
    },
    //表格数据初始化
    resultInit() {
      this.getRequest(
        "/examine/resultInfor/bizExamineResultInforByPage?current=" +
        this.currentPage +
        "&pageSize=" +
        this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.resultData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.getIndex();
        }
      });
    },
    // 编辑
    editResult(val) {
      this.editResultVisible = true;
      this.editData = val;
    },
    // 关闭编辑对话框
    editResultClose() {
      this.editResultVisible = false;
    },
    // 表格多选
    handleSelectionChange(val) {
      this.selectData = val;
    },
    // 批量删除
    selectdelete() {
      var checkArray = this.selectData;
      var idArray = [];
      checkArray.forEach(function (item) {
        idArray.push(item.examineRId);
      });
      console.log(idArray);
      this.$confirm("确定删除您勾选的数据", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.deleteRequest(
            "/examine/resultInfor/bizExamineResultInfors",
            idArray
          ).then(resp => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.resultInit();
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
            "/examine/resultInfor/bizExamineResultInfor/" + val.examineRId
          ).then(resp => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.resultInit();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 考核打分
    score(val) {
      this.scoreResultVisible = true;
      this.getRequest(
        "/examine/resultDetail/selectByRId?examineResultId=" + val.examineRId
      ).then(resp => {
        if (resp) {
          this.scoreData = resp.data;
          console.log(this.scoreData);
        }
      });
    },
    // 关闭打分对话框
    scoreResultClose() {
      this.scoreResultVisible = false;
    },
    // 查看详情
    detailResult(val) {
      this.pageFlag = false;
      this.detailData = val;
    },
    // 返回考核计划
    backResult() {
      this.pageFlag = true;
      this.resultInit();
    },
    // 查看详情表格合并列
    // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    //     if (columnIndex === 0) {
    //       if (rowIndex % 2 === 0) {
    //         return {
    //           rowspan: 2,
    //           colspan: 1
    //         };
    //       } else {
    //         return {
    //           rowspan: 0,
    //           colspan: 0
    //         };
    //       }
    //     }
    // },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.resultInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.resultInit();
    },
    //获取序号
    getIndex() {
      this.resultData.forEach((item, index) => {
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
