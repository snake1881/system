<template>
  <div class="role">
    <!-- 考核指标页面 -->
    <div class="role_1" v-if="pageFlag">
      <!-- 条件查询 -->
      <el-form class="role_form" :model="indexFrom" :inline="true">
        <el-form-item>
          <el-input
            v-model="indexFrom.indexName"
            placeholder="指标名称"
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
            @click="addIndex()"
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
        :data="indexData"
        border
        style="width:100%;height:86%"
        :row-style="{height:'2px'}"
        :cell-style="{padding:'0px'}"
        :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="90" />
        <el-table-column prop="indexName" label="指标名称" width="240" />
        <el-table-column prop="scoreWeight" label="权重" width="150" />
        <el-table-column prop="sequence" label="排列顺序" width="155" />
        <el-table-column prop="examineTName" label="考核模板" width="300" />
        <el-table-column prop="remark" label="备注" width="280" />
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editIndex(scope.row)" class="iconfont icon-bianji" />
            <el-button type="text" size="small" @click="sinDelete(scope.row)"  class="iconfont icon-shanchu" />
            <el-button type="text" size="small" @click="detailIndex(scope.row)" class="iconfont icon-xiangqing" />
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
    <!-- 查看详情页面 -->
    <div class="detail" v-else-if="!pageFlag">
      <!--返回考核指标页面-->
      <el-link
        @click="backIndex()"
        v-if="pageFlag === false"
        :underline="false"
        type="primary"
        icon="el-icon-arrow-left"
        >返回</el-link
      >
      <!-- 详情信息 -->
      <div class="detail-content">
        <el-divider content-position="center">
          <span style="color: #50a6fe;">考核指标信息</span>
        </el-divider>
        <br />
        <div class="detail-content-template">
          <div class="detail-content-template-name">
            <div style="width: 25%">指标名称</div>
            <div style="width: 25%">考核模板</div>
            <div style="width: 25%">分值</div>
            <div style="width: 25%">考核模板</div>
          </div>
          <div class="detail-content-template-content">
            <div style="width: 25%">{{ this.detailData.indexName }}</div>
            <div style="width: 25%">{{ this.detailData.indexName }}</div>
            <div style="width: 25%">{{ this.detailData.scoreWeight }}</div>
            <div style="width: 25%">{{ this.detailData.examineTName }}</div>
          </div>
        </div>

        <br />
        <br />
        <el-divider content-position="center">
          <span style="color: #50a6fe;">考核指标详情</span>
        </el-divider>
        <br />
        <el-table 
        :data="this.detailData.indexDetails" 
        border 
        style="width: 100%;height:90%" 
        >
          <el-table-column prop="examineContent" label="考核内容" width="515" />
          <el-table-column prop="requirement" label="考核标准" width="510" />
          <el-table-column prop="score" label="分值" width="310" />
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import CommonAddIndex from "../../components/assessment/index/CommonAddIndex";
import CommonEditIndex from "../../components/assessment/index/CommonEditIndex";
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
      editData: {},
      // 页面标志
      pageFlag: true,
      // 查看详情
      detailData: {},
      // 表格加载动画
      loading: true
    };
  },
  created() {
    this.indexInit();
  },
  methods: {
    // 根据输入信息查询
    searchIndex() {
      this.postRequest(
        "/examine/IndexInfo/findListsByPageAndCon?current=" +
          this.currentPage +
          "&indexName=" +
          this.indexFrom.indexName +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        if (resp) {
          this.indexData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.getIndex();
        }
      });
    },
    //表格数据初始化
    indexInit() {
      this.postRequest(
        "/examine/IndexInfo/findListsByPage?page=" +
          this.currentPage +
          "&size=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.indexData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
          this.getIndex();
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
      console.log(val);
    },
    // 关闭编辑对话框
    editIndexClose() {
      this.editIndexVisible = false;
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
        idArray.push(item.indexId);
      });
      this.$confirm("确定删除您勾选的数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequest("/examine/IndexInfo/deleteBatch", idArray).then(
            resp => {
              if (resp) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
              this.indexInit();
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
            "/examine/IndexInfo/deleteByPrimaryKey?indexId=" + val.indexId
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
    // 查看详情
    detailIndex(val) {
      this.pageFlag = false;
      this.detailData = val;
    },
    // 返回考核指标页面
    backIndex() {
      this.pageFlag = true;
      this.indexInit();
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
    },
    //获取序号
    getIndex() {
      this.indexData.forEach((item, index) => {
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
