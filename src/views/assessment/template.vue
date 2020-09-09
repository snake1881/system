<template>
  <div class="container">
    <!-- 条件查询 -->
    <el-form
      :model="templateFrom"
      :inline="true"
      style="width:97%;background-color:white"
    >
      <el-form-item>
        <el-input v-model="templateFrom.templateName" placeholder="模板名称" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="searchTemplate()"
        >
          查询
        </el-button>
        <el-button type="primary" icon="el-icon-plus" @click="addTem()">
          新增
        </el-button>
        <el-button type="primary" icon="el-icon-delete" @click="selectdelete()">
          批量删除
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      :data="templateData"
      height="500px"
      border
      style="width:100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="90" />
      <el-table-column prop="templateName" label="模板名称" width="280" />
      <el-table-column prop="formulationUnit" label="制定单位" width="260" />
      <el-table-column prop="formulationDate" label="制定时间" width="260" />
      <el-table-column prop="active" label="是否有效" width="200">
        <template slot-scope="scope">
          <p v-if="scope.row.active == '0'">无效</p>
          <p v-if="scope.row.active == '1'">有效</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editTem(scope.row)">
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
    <common-add-template
      :addTemVisible="addTemVisible"
      @addClose="addTemClose"
    />
    <!-- 编辑 -->
    <common-edit-template
      :editTemVisible="editTemVisible"
      @editClose="editTemClose"
      :editData="editData"
    />
  </div>
</template>
<script>
import CommonAddTemplate from "../../components/Template/CommonAddTemplate";
import CommonEditTemplate from "../../components/Template/CommonEditTemplate";
export default {
  components: {
    CommonAddTemplate,
    CommonEditTemplate
  },
  data() {
    return {
      //搜索框
      templateFrom: {
        templateName: ""
      },
      // 表格数据
      templateData: [],
      // 选中要删除的数据
      selectData: [],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 新增
      addTemVisible: false,
      // 编辑
      editTemVisible: false,
      editData: {}
    };
  },
  created() {
    this.templateInit();
  },
  methods: {
    // 根据输入信息查询
    searchTemplate() {
      this.getRequest(
        "/examine/templateInfor/searchByTemplateName?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize +
          "&templateName=" +
          this.templateFrom.templateName
      ).then(resp => {
        if (resp) {
          this.templateData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    //表格数据初始化
    templateInit() {
      this.getRequest(
        "/examine/templateInfor/queryTemplateAll?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        if (resp) {
          this.templateData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 新增
    addTem() {
      this.addTemVisible = true;
    },
    // 关闭新增对话框
    addTemClose() {
      this.addTemVisible = false;
    },
    // 编辑
    editTem(val) {
      this.editTemVisible = true;
      this.editData = val;
    },
    // 关闭编辑对话框
    editTemClose() {
      this.editTemVisible = false;
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
    // 单个删除，根据？删除
    sinDelete(val) {
      this.$confirm("确定删除该条数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequest(
            "/system/codeType/codeType/" + val.codeTypeId
          ).then(resp => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.dicInit();
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
      this.templateInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.templateInit();
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
