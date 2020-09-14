<template>
  <div class="container">
    <!-- 条件查询 -->
    <el-form
      :model="resultFrom"
      :inline="true"
      style="width:97%;background-color:white"
    >
      <el-form-item>
        <el-input v-model="resultFrom.takeObject" placeholder="参考单位/人员" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchResult()">
          查询
        </el-button>
        <el-button type="primary" icon="el-icon-plus" @click="addResult()">
          新增
        </el-button>
        <el-button type="primary" icon="el-icon-delete" @click="selectdelete()">
          批量删除
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      :data="resultData"
      height="500px"
      border
      style="width:100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="90" />
      <el-table-column prop="takeObject" label="参考单位/人员" width="210" />
      <el-table-column prop="totalScore" label="总得分" width="160" />
      <el-table-column prop="active" label="是否有效" width="210">
        <template slot-scope="scope">
          <p v-if="scope.row.active == '0'">无效</p>
          <p v-if="scope.row.active == '1'">有效</p>
        </template>
      </el-table-column>
      <el-table-column prop="examineDate" label="考核时间" width="160" />
      <el-table-column prop="remark" label="备注" width="240" />
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editResult(scope.row)">
            编辑
          </el-button>
          <el-button type="text" size="small" @click="sinDelete(scope.row)">
            删除
          </el-button>
          <el-button type="text" size="small" @click="score(scope.row)">
            考核打分
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
    <!-- 新增 -->
    <common-add-result
      :addResultVisible="addResultVisible"
      @addClose="addResultClose"
    />
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
  </div>
</template>
<script>
import CommonAddResult from "../../components/Result/CommonAddResult";
import CommonEditResult from "../../components/Result/CommonEditResult";
import CommonScoreResult from "../../components/Result/CommonScoreResult";
export default {
  components: {
    CommonAddResult,
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
      addResultVisible: false,
      // 编辑
      editResultVisible: false,
      editData: {},
      // 考核打分
      scoreResultVisible: false,
      scoreData: []
    };
  },
  created() {
    this.resultInit();
  },
  methods: {
    // 根据输入信息查询
    searchResult() {
      this.postRequest(
        "/examine/IndexInfo/findListsByPage?page=" +
          this.currentPage +
          "&size=" +
          this.pageSize +
          "&indexName=" +
          this.resultFrom.takeObject
      ).then(resp => {
        if (resp) {
          this.resultData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
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
        if (resp) {
          this.resultData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 新增
    addResult() {
      this.addResultVisible = true;
    },
    // 关闭新增对话框
    addResultClose() {
      this.addResultVisible = false;
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
    // 批量删除,根据？删除
    selectdelete() {
      var checkArray = this.selectData;
      var idArray = [];
      checkArray.forEach(function(item) {
        idArray.push(item.examineRId);
      });
      this.$confirm("确定删除您勾选的数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequest("/system/codeType/codeTypes", idArray).then(
            resp => {
              if (resp) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
              this.resultInit();
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
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.resultInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.resultInit();
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 98%;
  margin: 5px;
  background-color: white;
}
</style>
