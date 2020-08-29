<template>
  <el-dialog
    title="选择通知接收人"
    :visible.sync="noticeVisible"
    width="60%"
    :before-close="selectReceiverClose"
  >
    <div class="dialogDiv">
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
        <!-- 表格数据 -->
        <el-table
          :data="tableData"
          height="350px"
          border
          style="width:98%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="userName" label="用户名称" width="140" />
          <el-table-column prop="departmentName" label="部门名称" width="160" />
          <el-table-column prop="email" label="邮箱" width="160" />
          <el-table-column prop="phone" label="手机" width="160" />
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
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    noticeVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      //左侧组织机构数据
      deparmentData: [],
      defaultProps: {
        children: "children",
        label: "departmentName"
      },
      //表格选中数据
      selectedData: [],
      // 表格数据
      tableData: [],
      // 分页
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.treeInit();
    this.userInit();
  },
  methods: {
    // 对话框父子组件传值
    selectReceiverClose() {
      this.$emit("noticeClose");
    },
    // 表格数据初始化
    userInit() {
      this.getRequest(
        "/system/sysUser/users/page?current=" +
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
    // 部门菜单树
    treeInit() {
      this.getRequest("/system/department/getDepartmentTree").then(resp => {
        if (resp) {
          this.deparmentData = resp.data;
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
    // 表格多选
    handleSelectionChange(val) {
      this.selectedData = val;
      console.log(this.selectedData);
    },
    // 分页，页码大小改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.userInit();
    },
    // 分页，当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.userInit();
    }
  }
};
</script>

<style lang="less" scoped>
.dialogDiv {
  height: 400px;
  overflow: auto;
  display: flex;
  flex-direction: row;
}
.left {
  width: 20%;
  height: 300;
  overflow: auto;
  margin-right: 10px;
  background-color: white;
}
.right {
  width: 80%;
  height: 400px;
}
</style>
<style lang="less" scoped>
.el-input {
  width: 700px;
}
</style>
