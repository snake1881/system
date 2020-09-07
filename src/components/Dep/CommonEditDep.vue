<template>
  <el-dialog
    title="编辑部门"
    :visible.sync="editDepVisible"
    width="60%"
    :before-close="editdepClose"
  >
    <div class="dialogDiv">
      <el-form :model="editData" label-width="80px">
        <el-form-item label="部门名称">
          <el-input v-model="editData.departmentName" />
        </el-form-item>
        <el-form-item label="排列顺序">
          <el-input v-model="editData.sequence" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="editData.phone" />
        </el-form-item>
        <el-form-item label="部门类型">
          <el-select v-model="editData.departmentType">
            <el-option label="内部单位" value="0" />
            <el-option label="管理机构" value="1" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveEditDep(), editdepClose()">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editDepVisible: {
      type: Boolean
    },
    editData: {
      type: Object
    }
  },
  inject: ["reload"],
  data() {
    return {};
  },
  methods: {
    // 对话框父子组件传值
    editdepClose() {
      this.$emit("depRowClose");
    },
    // 部门
    saveEditDep() {
      this.putRequest("/system/department/updateSelective", this.editData).then(
        resp => {
          if (resp) {
            this.$message({
              message: "部门编辑成功!",
              type: "success"
            });
            this.reload();
          } else {
            this.$message.error("部门编辑失败，请重新提交!");
          }
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.dialogDiv {
  height: 400px;
  overflow: auto;
}
</style>
<style lang="less" scoped>
.el-input {
  width: 700px;
}
</style>
