<template>
  <div class="menu">
    <div class="menu_top">
      <el-button id="menu_top_btn" type="text" class="el-icon-plus" v-hasPermission="['sys:menu:add']" @click="addAllMenu()">新增</el-button>
    </div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="menuData"
      row-key="moduleId"
      border
      :default-expand-all="false"
      :tree-props="{
        children: 'children',
        hasChildren: 'hasChildren'
      }"
      height="92%"
      style="width:100%"
      :row-style="{height:'2px'}"
      :cell-style="{padding:'0px'}"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="moduleName" label="菜单名称" min-width="180" />
      <el-table-column prop="sequence" label="排序" min-width="60" />
      <el-table-column prop="moduleUrl" label="请求地址" min-width="350" />
      <el-table-column prop="moduleType" label="类型" min-width="80">
        <template slot-scope="scope">
          <p v-if="scope.row.moduleType == '0'">目录</p>
          <p v-if="scope.row.moduleType == '1'">菜单</p>
          <p v-if="scope.row.moduleType == '2'">按钮</p>
        </template>
      </el-table-column>
      <el-table-column prop="permissionMark" label="权限标识" min-width="180" />
      <el-table-column label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-hasPermission="['sys:menu:add']" @click="addMenu(scope.row)" class="iconfont icon-xinzeng" style="font-size:17px"/>
          <el-button type="text" size="small" v-hasPermission="['sys:menu:update']" @click="editMenu(scope.row)" class="iconfont icon-bianji" />
          <el-button type="text" size="small" v-hasPermission="['sys:menu:delete']" @click="dleteMenu(scope.row)" class="iconfont icon-shanchu"/>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增所有菜单 -->
    <common-add-all-menu :addAllMenuVisible="addAllMenuVisible" @menuRowClose="addAllMenuClose" />
    <!-- 新增菜单 -->
    <common-add-menu
      :addMenuVisible="addMenuVisible"
      :addData="addMenuData"
      @menuRowClose="addMenuClose"
    />
    <!-- 编辑菜单 -->
    <common-edit-menu
      :editMenuVisible="editMenuVisible"
      :editData="editMenuData"
      @menuRowClose="editMenuClose"
    />
  </div>
</template>
<script>
import CommonAddMenu from "../../components/system/menu/CommonAddMenu";
import CommonAddAllMenu from "../../components/system/menu/CommonAddAllMenu";
import CommonEditMenu from "../../components/system/menu/CommonEditMenu";
export default {
  components: {
    CommonAddMenu,
    CommonAddAllMenu,
    CommonEditMenu
  },
  data() {
    return {
      // 表格数据
      menuData: [],
      // 新增所有菜单
      addAllMenuVisible: false,
      // 新增菜单
      addMenuVisible: false,
      addMenuData: {},
      // 编辑
      editMenuVisible: false,
      editMenuData: {},
      // 表格加载动画
      loading: true
    };
  },
  created() {
    this.menuInit();
  },
  methods: {
    // 表格数据初始化
    menuInit() {
      this.getRequest("/system/sysModule/getSysModuleTree").then(resp => {
        this.loading = false;
        if (resp) {
          this.menuData = resp.data;
        }
      });
    },
    // 新增所有菜单
    addAllMenu() {
      this.addAllMenuVisible = true;
    },
    // 关闭新增所有对话框
    addAllMenuClose() {
      this.addAllMenuVisible = false;
    },
    // 新增菜单
    addMenu(val) {
      this.addMenuVisible = true;
      this.addMenuData = val;
    },
    // 关闭新增对话框
    addMenuClose() {
      this.addMenuVisible = false;
    },
    // 编辑
    editMenu(val) {
      this.editMenuVisible = true;
      this.editMenuData = val;
    },
    // 关闭编辑对话框
    editMenuClose() {
      this.editMenuVisible = false;
    },
    // 删除
    dleteMenu(val) {
      this.$confirm("确定删除该条数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRequest("/system/sysModule/delete/" + val.moduleId).then(
            resp => {
              if (resp) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
              this.menuInit();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/system/menu.css";
</style>
<style>
.menu .iconfont{
  font-size: 20px;
}
.menu .el-table td, .el-table th {
  text-align: left;

}
</style>