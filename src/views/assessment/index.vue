<template>
  <div class="container">
    <!-- 条件查询 -->
    <el-form
      :model="indexFrom"
      :inline="true"
      style="width:97%;background-color:white"
    >
      <el-form-item>
        <el-input v-model="indexFrom.indexName" placeholder="指标名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchIndex()">
          查询
        </el-button>
        <el-button type="primary" icon="el-icon-plus" @click="addIndex()">
          新增
        </el-button>
        <el-button type="primary" icon="el-icon-delete" @click="selectdelete()">
          批量删除
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      :data="indexData"
      height="500px"
      border
      style="width:100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="90" />
      <el-table-column prop="indexName" label="指标名称" width="210" />
      <el-table-column prop="scoreWeight" label="分值" width="160" />
      <el-table-column prop="sequence" label="排列顺序" width="160" />
      <el-table-column prop="active" label="是否有效" width="210">
        <template slot-scope="scope">
          <p v-if="scope.row.active == '0'">无效</p>
          <p v-if="scope.row.active == '1'">有效</p>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="260" />
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editIndex(scope.row)">
            编辑
          </el-button>
          <el-button type="text" size="small" @click="sinDelete(scope.row)">
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
    <!-- 新增 -->
    <common-add-index
      :addIndexVisible="addIndexVisible"
      @addClose="addIndexClose"
    />
    <!-- 编辑 -->
    <common-edit-index
      :editIndexVisible="editIndexVisible"
      @editClose="editIndexClose"
      :editData="editData"
    />
  </div>
</template>
<script>
import CommonAddIndex from "../../components/Index/CommonAddIndex";
import CommonEditIndex from "../../components/Index/CommonEditIndex";
export default {
  components: {
    CommonAddIndex,
    CommonEditIndex
  },
  data() {
    return {
      //搜索框
      indexFrom: {
        indexName: ""
      },
      // 表格数据
      indexData: [],
      // 选中要删除的数据
      selectData: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 新增
      addIndexVisible: false,
      // 编辑
      editIndexVisible: false,
      editData: {}
    };
  },
  created() {
    this.indexInit();
  },
  methods: {
    // 根据输入信息查询
    searchIndex() {
      this.postRequest(
        "/examine/IndexInfo/findListsByPage?page=" +
          this.currentPage +
          "&size=" +
          this.pageSize +
          "&indexName=" +
          this.indexFrom.indexName
      ).then(resp => {
        if (resp) {
          this.indexData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    //表格数据初始化
    indexInit() {
      this.getRequest(
        "/examine/IndexInfo/findListByPage?page=" +
          this.currentPage +
          "&size=" +
          this.pageSize
      ).then(resp => {
        if (resp) {
          this.indexData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 新增
    addIndex() {
      this.addIndexVisible = true;
    },
    // 关闭新增对话框
    addIndexClose() {
      this.addIndexVisible = false;
    },
    // 编辑
    editIndex(val) {
      this.editIndexVisible = true;
      this.editData = val;
    },
    // 关闭编辑对话框
    editIndexClose() {
      this.editIndexVisible = false;
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
        idArray.push(item.codeTypeId);
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
              this.dicInit();
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
            "/examine/IndexInfo/deleteById?ids=" + val.indexId
          ).then(resp => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.indexInit();
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
      this.indexInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.indexInit();
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
