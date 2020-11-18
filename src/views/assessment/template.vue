<template>
  <!-- 考核模板页面 -->
  <div class="role">
    <div class="role_1" v-if="pageFlag">
      <!-- 条件查询 -->
      <el-form class="role_form" :model="templateFrom" :inline="true">
        <el-form-item>
          <el-input v-model="templateFrom.templateName" placeholder="模板名称" size="medium" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="searchTemplate()">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addTem()">新增</el-button>
          <el-button type="primary" icon="el-icon-delete" size="small" @click="selectdelete()">批量删除</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格数据 -->
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="templateData"
        border
        style="width:100%;height:86%"
        :row-style="{height:'2px'}"
        :cell-style="{padding:'0px'}"
        :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="90" />
        <el-table-column prop="templateName" align="center" label="模板名称" width="380" />
        <el-table-column prop="formulationUnit" align="center" label="制定单位" width="360" />
        <el-table-column prop="formulationDate" align="center" label="制定时间" width="380" />
        <el-table-column align="center" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editTem(scope.row)" class="iconfont icon-bianji"/>
            <el-button type="text" size="small" @click="sinDelete(scope.row)"  class="iconfont icon-shanchu"/>
            <el-button type="text" size="small" @click="detailTem(scope.row)" class="iconfont icon-xiangqing" />
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
      <common-add-template :addTemVisible="addTemVisible" @addClose="addTemClose" />
      <!-- 编辑 -->
      <common-edit-template
        :editTemVisible="editTemVisible"
        @editClose="editTemClose"
        :editData="editData"
      />
    </div>
    <!-- 查看详情页面 -->
    <div class="detail" v-else-if="!pageFlag">
      <!--返回考核模板页面-->
      <el-link
        @click="backTemplate()"
        v-if="pageFlag === false"
        :underline="false"
        type="primary"
        icon="el-icon-arrow-left"
      >返回</el-link>
      <!-- 详情信息 -->
      <div class="detail-content">
        <el-divider content-position="center">
          <span style="color: #50a6fe;">考核模板信息</span>
        </el-divider>
        <br />
        <div class="detail-content-template">
          <div class="detail-content-template-name">
            <div style="width: 33%">模板名称</div>
            <div style="width: 33%">制定单位</div>
            <div style="width: 33%">制定时间</div>
          </div>
          <div class="detail-content-template-content">
            <div style="width: 33%">{{ this.detailData.templateName }}</div>
            <div style="width: 33%">{{ this.detailData.formulationUnit }}</div>
            <div style="width: 33%">{{ this.detailData.formulationDate }}</div>
          </div>
        </div>

        <br />
        <br />
        <el-divider content-position="center">
          <span style="color: #50a6fe;">考核指标</span>
        </el-divider>
        <br />
        <el-table
          :data="this.detailData.bizExamineIndexInfors"
          border
          style="width: 100%"
          height="90%"
          :header-cell-style="{'text-align':'center'}"
        >
          <el-table-column prop="indexName" align="center" label="指标名称" width="470" />
          <el-table-column prop="scoreWeight" align="center" label="分值" width="405" />
          <el-table-column prop="remark" align="center" label="备注" width="460" />
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import CommonAddTemplate from "../../components/assessment/template/CommonAddTemplate";
import CommonEditTemplate from "../../components/assessment/template/CommonEditTemplate";
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
      editData: {},
      // 显示标志
      pageFlag: true,
      detailData: {},
      // 表格加载动画
      loading: true
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
          this.getIndex();
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
        this.loading = false;
        if (resp) {
          this.templateData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.getIndex();
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
        idArray.push(item.examineTId);
      });
      this.$confirm("确定删除您勾选的数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequest("/examine/templateInfor/deleteBatch", idArray).then(
            resp => {
              if (resp) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
              this.templateInit();
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
            "/examine/templateInfor/deleteByPrimaryKey?templateId=" +
              val.examineTId
          ).then(resp => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.templateInit();
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
    detailTem(val) {
      this.pageFlag = false;
      this.detailData = val;
      console.log(val);
    },
    // 返回考核模板页面
    backTemplate() {
      this.pageFlag = true;
      this.templateInit();
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
    },
    //获取序号
    getIndex() {
      this.templateData.forEach((item, index) => {
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
