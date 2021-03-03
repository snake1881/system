<template>
  <div class="role">
    <!-- 条件查询 -->
    <el-form class="role_form" :model="roleForm" :inline="true">
      <el-form-item>
        <el-input
          v-model="roleForm.roleName"
          placeholder="角色名称"
          size="medium"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="roleForm.roleKey"
          placeholder="权限字符"
          size="medium"
        />
      </el-form-item>
      <el-form-item label="角色状态">
        <el-select v-model="roleForm.status" size="medium">
          <el-option label="正常" value="1" />
          <el-option label="停用" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="searchRole()"
          >查询</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addRole()"
          >新增</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-delete"
          size="small"
          @click="deleteRole()"
          >批量删除</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="roleData"
      height="86%"
      border
      style="width: 100%"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '0px' }"
      :header-cell-style="{
        background: '#eef1f6',
        color: '#606266',
        'text-align': 'center',
      }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" min-width="75" />
      <el-table-column prop="roleName" label="角色名称" min-width="245" />
      <el-table-column prop="roleKey" label="权限字符" min-width="240" />
      <el-table-column prop="sequence" label="显示顺序" min-width="120" />
      <el-table-column prop="status" label="状态" min-width="120">
        <template slot-scope="scope">
          <p v-if="scope.row.status == '0'">停用</p>
          <p v-if="scope.row.status == '1'">正常</p>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="220" />
      <el-table-column label="操作" min-width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="editRole(scope.row)"
            class="iconfont icon-bianji"
          />
          <el-button
            type="text"
            size="small"
            @click="dlete(scope.row)"
            class="iconfont icon-shanchu"
          />
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
    <common-add-role
      :addRoleVisible="addRoleVisible"
      :addTreeData="treeData"
      @roleRowClose="addRoleClose"
    />
    <!-- 编辑 -->
    <common-edit-role
      :editRoleVisible="editRoleVisible"
      :editData="editRoleData"
      :editTreeData="treeData"
      @roleRowClose="editRoleClose"
    />
  </div>
</template>
<script>
import CommonAddRole from "../../components/system/role/CommonAddRole";
import CommonEditRole from "../../components/system/role/CommonEditRole";
export default {
  components: {
    CommonAddRole,
    CommonEditRole,
  },
  data() {
    return {
      //搜索框
      roleForm: {
        roleName: "",
        roleKey: "",
        status: "",
      },
      // 选中要删除的数据
      selectData: [],
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
      total: 0,
      // 表格加载动画
      loading: true,
      //权限数据树
      treeData: []
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
      ).then((resp) => {
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
      ).then((resp) => {
        this.loading = false;
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
      this.treeInIt();
    },
    // 关闭新增对话框
    addRoleClose() {
      this.addRoleVisible = false;
    },
    // 单个删除
    dlete(val) {
      this.$confirm("确定删除该条数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRequest(
            "/system/sysRole/deleteByPk?roleId=" + val.roleId
          ).then((resp) => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
            this.roleInit();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 表格多选
    handleSelectionChange(val) {
      this.selectData = val;
    },
    // 批量删除角色
    deleteRole() {
      var checkArray = this.selectData;
      var idArray = [];
      checkArray.forEach(function (item) {
        idArray.push(item.roleId);
      });
      this.$confirm("确定删除您勾选的数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRequest("/system/sysRole/deleteBatch", idArray).then(
            (resp) => {
              if (resp) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              }
              this.roleInit();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑
    editRole(val) {
      this.editRoleVisible = true;
      this.editRoleData = val;
      this.treeInIt();
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
    },
    // 菜单树
    treeInIt() {
      this.treeData = [];
      this.getRequest("/system/sysModule/getSysModuleTree").then((resp) => {
        if (resp) {
          this.treeData = resp.data;
          console.log(this.treeData);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/css/system/role.css";
</style>
<style>
.role .iconfont {
  font-size: 20px;
}
</style>
