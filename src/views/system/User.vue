<template>
  <div class="container">
    <div class="left">
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
    <div class="right">
      <!--顶部搜索框-->
      <el-form
        :inline="true"
        :model="searchForm"
        :rules="rules"
        style="width:97%;background-color:white"
      >
        <el-form-item>
          <el-input v-model="searchForm.name" placeholder="登录名称" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="getUserByName()"
          >
            查询
          </el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addUser()">
            新增
          </el-button>
          <el-button type="primary" icon="el-icon-delete" @click="dleteUser()">
            删除
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 表格数据 -->
      <el-table
        :data="tableData"
        height="500px"
        border
        style="width:98%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          prop="userId"
          label="用户ID"
          width="120"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="loginName" label="登录名称" width="120" />
        <el-table-column prop="userName" label="用户名称" width="120" />
        <el-table-column
          prop="departmentName"
          label="部门名称"
          width="140"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="email" label="邮箱" width="140" />
        <el-table-column prop="phone" label="手机" width="120" />
        <el-table-column prop="active" label="状态" width="80" />
        <el-table-column prop="sex" label="性别" width="80" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="120" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editUser(scope.row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="width:98%;background-color:white;">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 编辑用户信息 -->
    <common-edit-user
      :editUserVisible="editUserVisible"
      :editData="editUserData"
      @orderRowClose="editUserClose"
    />
    <!-- 新增用户信息 -->
    <common-add-user
      :addUserVisible="addUserVisible"
      @addClose="addUserClose"
    />
  </div>
</template>
<script>
import CommonEditUser from "../../components/User/CommonEditUser";
import CommonAddUser from "../../components/User/CommonAddUser";
export default {
  components: {
    CommonEditUser,
    CommonAddUser
  },
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
        name: ""
      },
      // 规则
      rules: {
        name: [{ required: true, message: "用户名称不能为空", trigger: "blur" }]
      },
      // 编辑信息
      editUserVisible: false,
      editUserData: {},
      // 新增用户信息
      addUserVisible: false,
      // 分页
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.treeInIt();
    this.userInIt();
  },
  methods: {
    // 部门菜单树
    treeInIt() {
      this.getRequest("/department/getDepartmentTree").then(resp => {
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
        if (resp) {
          this.tableData = resp.data.records;
          this.total = resp.data.total;
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
          this.total = resp.data.total;
          this.tableData = resp.data.records;
        }
      });
    },
    // 根据登录名称查询用户
    getUserByName() {
      this.getRequest(
        "/system/sysUser/user?loginName=" + this.searchForm.name
      ).then(resp => {
        if (resp) {
          // this.tableData = resp.data;
        }
      });
    },
    // 表格多选
    handleSelectionChange(val) {
      this.selectData = val;
    },
    // 删除用户
    dleteUser() {
      var val = this.selectData;
      if (val) {
        this.putRequest("/", val.userId).then(resp => {
          if (resp) {
            this.treeInIt();
          }
        });
      }
      this.$refs.multipleTable.clearSelection();
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
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}
.left {
  width: 15%;
  height: 100%;
  margin-right: 10px;
  background-color: white;
}
.right {
  width: 85%;
  height: 600px;
  margin-top: 10px;
}
</style>
<style lang="less">
form {
  padding-top: 5px;
  padding-left: 10px;
}
</style>
