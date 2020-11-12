<template>
  <div class="role">
    <!-- 表格数据 -->
    <div class="role_1" v-if="pageFlag">
      <!-- 条件查询 -->
      <el-form class="role_form" :model="dicFrom" :inline="true">
        <el-form-item>
          <el-input v-model="dicFrom.codeTName" placeholder="编码名称" size="medium" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="dicFrom.codeType" placeholder="编码类型" size="medium" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="searchDictionary()">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addDic()">新增</el-button>
          <el-button type="primary" icon="el-icon-delete" size="small" @click="selectdelete()">批量删除</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格数据 -->
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="dicData"
        height="86%"
        border
        style="width:100%"
        :row-style="{height:'2px'}"
        :cell-style="{padding:'0px'}"
        :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="125" />
        <el-table-column prop="codeTName" label="编码名称" width="360" />
        <el-table-column prop="codeType" label="编码类型" width="360" />
        <el-table-column prop="createTime" label="创建时间" width="370" />
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editDic(scope.row)" class="iconfont icon-bianji" />
            <el-button type="text" size="small" @click="sinDelete(scope.row)" class="iconfont icon-shanchu" />
            <el-button type="text" size="small" @click="detailsDic(scope.row)" class="iconfont icon-xiangqing" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增 -->
      <common-add-dic :addDicVisible="addDicVisible" @addClose="addDicClose" />
      <!-- 编辑 -->
      <common-edit-dic
        :editDicVisible="editDicVisible"
        @editClose="editDicClose"
        :editData="editData"
      />
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
    </div>
    <!-- 查看详情页面 -->
    <div class="detail" v-else-if="!pageFlag">
      <!--返回应用字典页面-->
      <el-link
        @click="backDic()"
        v-if="pageFlag === false"
        :underline="false"
        type="primary"
        icon="el-icon-arrow-left"
      >
        返回
      </el-link>
      <!-- 详情信息 -->
      <div class="detail-content">
        <el-divider content-position="center">
          <span style="color: #50a6fe;">
            应用字典
          </span>
        </el-divider>
        <br />
        <div class="detail-content-template">
          <div class="detail-content-template-name">
            <div style="width: 33%">编码名称</div>
            <div style="width: 33%">编码类型</div>
            <div style="width: 33%">创建时间</div>
          </div>
          <div class="detail-content-template-content">
            <div style="width: 33%">
              {{ this.detailData.codeTName }}
            </div>
            <div style="width: 33%">
              {{ this.detailData.codeType }}
            </div>
            <div style="width: 33%">
              {{ this.detailData.createTime }}
            </div>
          </div>
        </div>

        <br /><br /><el-divider content-position="center">
          <span style="color: #50a6fe;">
            应用字典详情
          </span>
        </el-divider>
        <br />
        <el-table
          :data="this.detailData.sysTCodeInforList"
          border
          style="width: 100%"
          height="320px"
        >
          <el-table-column prop="codeName" label="名称" width="440" />
          <el-table-column prop="codeValue" label="值" width="340" />
          <el-table-column prop="description" label="描述" width="550" />
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import CommonAddDic from "../../components/system/dic/CommonAddDic";
import CommonEditDic from "../../components/system/dic/CommonEditDic";
export default {
  components: {
    CommonAddDic,
    CommonEditDic
  },
  data() {
    return {
      //搜索框
      dicFrom: {
        codeTName: "",
        codeType: ""
      },
      // 表格数据
      dicData: [],
      // 选中要删除的数据
      selectData: [],
      // 新增
      addDicVisible: false,
      // 编辑
      editDicVisible: false,
      editData: {},
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 显示标志
      pageFlag: true,
      detailData: {},
      // 表格加载动画
      loading: true
    };
  },
  created() {
    this.dicInit();
  },
  methods: {
    // 根据输入信息查询
    searchDictionary() {
      this.getRequest(
        "/system/codeType/codeTypes1?codeTName=" +
          this.dicFrom.codeTName +
          "&codeType=" +
          this.dicFrom.codeType +
          "&current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        if (resp) {
          this.dicData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    //表格数据初始化
    dicInit() {
      this.getRequest(
        "/system/codeType/codeTypeByPage?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.dicData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 新增字典
    addDic() {
      this.addDicVisible = true;
    },
    // 关闭新增对话框
    addDicClose() {
      this.addDicVisible = false;
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
    // 编辑字典
    editDic(val) {
      console.log(val);
      this.editData = val;
      this.editDicVisible = true;
    },
    // 关闭编辑对话框
    editDicClose() {
      this.editDicVisible = false;
    },
    // 查看详情
    detailsDic(val) {
      this.pageFlag = false;
      this.detailData = val;
    },
    // 返回应用字典
    backDic() {
      this.pageFlag = true;
      this.dicInit();
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.dicInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.dicInit();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/system/role.css";
</style>
<style>
.role .iconfont{
  font-size: 20px;
}
</style>

