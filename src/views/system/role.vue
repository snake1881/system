<template>
  <div class="container">
    <!-- 条件查询 -->
    <el-form
      :model="roleForm"
      :inline="true"
      style="width:97%;background-color:white"
    >
      <el-form-item>
        <el-input v-model="roleForm.roleName" placeholder="角色名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="roleForm.roleKey" placeholder="权限字符" />
      </el-form-item>
      <el-form-item label="角色状态">
        <el-select v-model="roleForm.status" placeholder="请选择">
          <el-option label="正常" value="1"></el-option>
          <el-option label="停用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchRole()">
          查询
        </el-button>
        <el-button type="primary" icon="el-icon-plus" @click="addRole()">
          新增
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table :data="roleData" height="500px" border style="width:100%">
      <el-table-column prop="roleName" label="角色名称" width="220" />
      <el-table-column prop="roleKey" label="权限字符" width="200" />
      <el-table-column prop="sequence" label="显示顺序" width="200" />
      <el-table-column prop="status" label="状态" width="200">
        <template slot-scope="scope">
          <p v-if="scope.row.status == '0'">停用</p>
          <p v-if="scope.row.status == '1'">正常</p>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="240" />
      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editRole(scope.row)">
            编辑
          </el-button>
          <el-button type="text" size="small" @click="dlete(scope.row)">
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
    <common-add-role
      :addRoleVisible="addRoleVisible"
      @roleRowClose="addRoleClose"
    />
    <!-- 编辑 -->
    <common-edit-role
      :editRoleVisible="editRoleVisible"
      :editData="editRoleData"
      @roleRowClose="editRoleClose"
    />
  </div>
</template>
<script>
import CommonAddRole from "../../components/Role/CommonAddRole";
import CommonEditRole from "../../components/Role/CommonEditRole";
export default {
  components: {
    CommonAddRole,
    CommonEditRole
  },
  data() {
    return {
      //搜索框
      roleForm: {
        roleName: "",
        roleKey: "",
        status: ""
      },
      // 表格数据
      roleData: [],
      // 新增
      addRoleVisible: false,
      // 编辑
      editRoleVisible: false,
      editRoleData: {},
      // 分页
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.roleInit();
  },
  methods: {
    // 根据输入信息查询
    searchRole() {
      this.getRequest(
        "/system/sysRole/searchRole?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize +
          "&roleKey=" +
          this.roleForm.roleKey +
          "&roleName=" +
          this.roleForm.roleName +
          "&status=" +
          this.roleForm.status
      ).then(resp => {
        if (resp) {
          this.roleData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    //表格数据初始化
    roleInit() {
      this.getRequest(
        "/system/sysRole/queryRoleAll?current=" +
          this.currentPage +
          "&pageSize=" +
          this.pageSize
      ).then(resp => {
        if (resp) {
          this.roleData = resp.data.records;
          this.total = resp.data.total;
          this.currentPage = resp.data.current;
          this.pageSize = resp.data.size;
        }
      });
    },
    // 新增
    addRole() {
      this.addRoleVisible = true;
      this.roleInit();
    },
    // 关闭新增对话框
    addRoleClose() {
      this.addRoleVisible = false;
    },
    // 删除
    dlete(val) {
      this.$confirm("确定删除该条数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequest(
            "/system/sysRole/deleteByPk?roleId=" + val.roleId
          ).then(resp => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.roleInit();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑
    editRole(val) {
      this.editRoleVisible = true;
      this.editRoleData = val;
    },
    // 关闭编辑对话框
    editRoleClose() {
      this.editRoleVisible = false;
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.roleInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.roleInit();
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 98%;
  margin: 10px;
  background-color: white;
}
</style>
