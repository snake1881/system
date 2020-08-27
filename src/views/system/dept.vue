<template>
  <div class="container">
    <el-button
      type="text"
      class="el-icon-plus"
      style="margin-left:10px"
      @click="addAllDept()"
    >
      新增
    </el-button>
    <el-table
      :data="deptData"
      row-key="departmentId"
      border
      default-expand-all
      :tree-props="{
        children: 'children',
        hasChildren: 'hasChildren'
      }"
      height="550px"
      style="width:100%"
    >
      <el-table-column prop="departmentName" label="部门名称" width="260" />
      <el-table-column prop="sequence" label="排序" width="260" />
      <el-table-column prop="departmentType" label="部门类型" width="230">
        <template slot-scope="scope">
          <p v-if="scope.row.departmentType == '0'">内部单位</p>
          <p v-if="scope.row.departmentType == '1'">管理机构</p>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="280" />
      <el-table-column label="操作" width="260">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addDept(scope.row)">
            新增
          </el-button>
          <el-button type="text" size="small" @click="editDept(scope.row)">
            编辑
          </el-button>
          <el-button type="text" size="small" @click="dleteDept(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增所有部门 -->
    <common-add-all-dep
      :addAllDepVisible="addAllDepVisible"
      @depRowClose="addAllDepClose"
    />
    <!-- 新增部门 -->
    <common-add-dep
      :addDepVisible="addDepVisible"
      :addData="addDepData"
      @depRowClose="addDepClose"
    />
    <!-- 编辑菜单 -->
    <!-- <common-edit-dep
      :editMenuVisible="editMenuVisible"
      :editData="editMenuData"
      @menuRowClose="editMenuClose"
    /> -->
  </div>
</template>
<script>
import CommonAddDep from "../../components/Dep/CommonAddDep";
import CommonAddAllDep from "../../components/Dep/CommonAddAllDep";
// import CommonEditDep from "../../components/Dep/CommonEditDep";
export default {
  components: {
    CommonAddDep,
    CommonAddAllDep
    // CommonEditDep
  },
  data() {
    return {
      deptData: [],
      // 新增所有部门
      addAllDepVisible: false,
      // 新增部门
      addDepVisible: false,
      addDepData: {}
    };
  },
  created() {
    this.deptInit();
  },
  methods: {
    // 表格数据初始化
    deptInit() {
      this.getRequest("/system/department/getDepartmentTree").then(resp => {
        if (resp) {
          this.deptData = resp.data;
        }
      });
    },
    // 新增所有部门
    addAllDept() {
      this.addAllDepVisible = true;
    },
    // 关闭新增所有对话框
    addAllDepClose() {
      this.addAllDepVisible = false;
    },
    // 新增单个部门
    addDept(val) {
      this.addDepVisible = true;
      this.addDepData = val;
    },
    // 关闭新增单个部门对话框
    addDepClose() {
      this.addDepVisible = false;
    },
    // 编辑
    editDept() {
      console.log(1);
    },
    // 删除
    dleteDept() {
      console.log(1);
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
