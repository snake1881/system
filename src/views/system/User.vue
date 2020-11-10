<template>
  <div class="user">
    <div class="user_left">
      <el-tree
        ref="tree"
        empty-text="暂无数据"
        accordion
        :data="deparmentData"
        :props="defaultProps"
        node-key="deparmentData.departmentId"
        @node-click="getCheckedKeys"
      />
    </div>
    <div class="user_right">
      <!--顶部搜索框-->
      <el-form :inline="true" :model="searchForm" :rules="rules" class="user_right_form">
        <el-form-item>
          <el-input v-model="searchForm.loginName" placeholder="登录名称" size="medium" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="getUserByName()">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addUser()">新增</el-button>
          <el-button type="primary" icon="el-icon-delete" size="small" @click="dleteUser()">批量删除</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格数据 -->
      <el-table
        class="user_right_table"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="tableData"
        height="85%"
        border
        :row-style="{height:'2px'}"
        :cell-style="{padding:'0px'}"
        :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="loginName" label="登录名称" width="125" />
        <el-table-column prop="userName" label="用户名称" width="120" />
        <el-table-column
          prop="departmentName"
          label="部门名称"
          width="160"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="email" label="邮箱" width="130" />
        <el-table-column prop="phone" label="手机" width="130" />
        <el-table-column prop="status" label="状态" width="80" />
        <el-table-column prop="sex" label="性别" width="80" />
        <el-table-column prop="createTime" label="创建时间" width="170" />
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editUser(scope.row)" class="iconfont icon-bianji"/>
            <el-button type="text" size="small" @click="sinDelete(scope.row)" class="iconfont icon-shanchu"/>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="user_right_page">
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
    <!-- 编辑用户信息 -->
    <common-edit-user
      :editUserVisible="editUserVisible"
      :editData="editUserData"
      @orderRowClose="editUserClose"
    />
    <!-- 新增用户信息 -->
    <common-add-user :addUserVisible="addUserVisible" @addClose="addUserClose" />
  </div>
</template>
<script>
import CommonEditUser from "../../components/system/user/CommonEditUser";
import CommonAddUser from "../../components/system/user/CommonAddUser";
export default {
  components: {
    CommonEditUser,
    CommonAddUser
  },
  inject: ["reload"],
  data() {
    return {
      //左侧组织机构数据
      deparmentData: [],
      defaultProps: {
        children: "children",
        label: "departmentName"
      },
      // 选中要删除的数据
      selectData: [],
      // 表格数据
      tableData: [],
      searchForm: {
        loginName: ""
      },
      // 规则
      rules: {
        loginName: [
          { required: true, message: "登录名称不能为空", trigger: "blur" }
        ]
      },
      // 编辑信息
      editUserVisible: false,
      editUserData: {},
      // 新增用户信息
      addUserVisible: false,
      // 分页
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 表格加载动画
      loading: true
    };
  },
  created() {
    this.treeInIt();
    this.userInIt();
  },
  methods: {
    // 部门菜单树
    treeInIt() {
      this.getRequest("/system/department/getDepartmentTree").then(resp => {
        if (resp) {
          this.deparmentData = resp.data;
        }
      });
    },
    // 表格数据初始化
    userInIt() {
      this.getRequest(
        "/system/sysUser/users/page?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        this.loading = false;
        if (resp) {
          this.tableData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 点击树节点显示相应数据
    getCheckedKeys(val) {
      this.getRequest(
        "/system/sysUser/users/" +
          val.departmentId +
          "?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        if (resp) {
          this.tableData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 根据登录名称查询用户
    getUserByName() {
      this.getRequest(
        "/system/sysUser/user?current=" +
          this.currentPage +
          "&loginName=" +
          this.searchForm.loginName +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        if (resp) {
          this.tableData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 表格多选
    handleSelectionChange(val) {
      this.selectData = val;
    },
    // 批量删除用户
    dleteUser() {
      var checkArray = this.selectData;
      var idArray = [];
      checkArray.forEach(function(item) {
        idArray.push(item.userId);
      });
      console.log(idArray);
      this.$confirm("确定删除您勾选的数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequest("/system/sysUser/users", idArray).then(resp => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.userInIt();
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
          this.deleteRequest("/system/sysUser/user/" + val.userId).then(
            resp => {
              if (resp) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
              this.userInIt();
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
    // 编辑用户信息
    editUser(val) {
      this.editUserVisible = true;
      this.editUserData = val;
    },
    // 关闭编辑对话框
    editUserClose() {
      this.editUserVisible = false;
    },
    // 新增用户
    addUser() {
      this.addUserVisible = true;
    },
    // 关闭新增对话框
    addUserClose() {
      this.addUserVisible = false;
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.userInIt();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.userInIt();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/system/user.css";
</style>
<style>
.el-table td,.el-table th {
  text-align: center;
  padding: 8px 0;
}
</style>
