<template>
  <div class="container">
    <el-button
      type="text"
      class="el-icon-plus"
      style="margin-left:10px"
      @click="addAllMenu()"
    >
      新增
    </el-button>
    <el-table
      :data="menuData"
      row-key="moduleId"
      border
      default-expand-all
      :tree-props="{
        children: 'children',
        hasChildren: 'hasChildren'
      }"
      height="550px"
      style="width:100%"
    >
      <el-table-column prop="moduleName" label="菜单名称" width="210" />
      <el-table-column prop="sequence" label="排序" width="210" />
      <el-table-column prop="moduleUrl" label="请求地址" width="230" />
      <el-table-column prop="moduleType" label="类型" width="230">
        <template slot-scope="scope">
          <p v-if="scope.row.moduleType == '0'">目录</p>
          <p v-if="scope.row.moduleType == '1'">菜单</p>
          <p v-if="scope.row.moduleType == '2'">按钮</p>
        </template>
      </el-table-column>
      <el-table-column prop="permissionMark" label="权限标识" width="200" />
      <el-table-column label="操作" width="210">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addMenu(scope.row)">
            新增
          </el-button>
          <el-button type="text" size="small" @click="editMenu(scope.row)">
            编辑
          </el-button>
          <el-button type="text" size="small" @click="dleteMenu(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增所有菜单 -->
    <common-add-all-menu
      :addAllMenuVisible="addAllMenuVisible"
      @menuRowClose="addAllMenuClose"
    />
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
import CommonAddMenu from "../../components/Menu/CommonAddMenu";
import CommonAddAllMenu from "../../components/Menu/CommonAddAllMenu";
import CommonEditMenu from "../../components/Menu/CommonEditMenu";
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
      editMenuData: {}
    };
  },
  created() {
    this.menuInit();
  },
  methods: {
    // 表格数据初始化
    menuInit() {
      this.getRequest("/system/sysModule/getSysModuleTree").then(resp => {
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
.container {
  width: 98%;
  margin: 10px;
  background-color: white;
}
</style>
