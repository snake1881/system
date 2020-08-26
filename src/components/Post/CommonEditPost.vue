<template>
  <el-dialog
    title="职位编辑"
    :visible.sync="editPostVisible"
    width="60%"
    :before-close="editPostClose"
  >
    <div class="dialogDiv">
      <el-form :model="editData" label-width="80px">
        <el-form-item label="岗位编号">
          <el-input v-model="editData.positionId" />
        </el-form-item>
        <el-form-item label="岗位编码">
          <el-input v-model="editData.positionCode" />
        </el-form-item>
        <el-form-item label="岗位名称">
          <el-input v-model="editData.positionName" />
        </el-form-item>
        <el-form-item label="显示顺序">
          <el-input v-model="editData.sequence" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveEditPost(), editPostClose()">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editPostVisible: {
      type: Boolean
    },
    editData: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    // 对话框父子组件传值
    editPostClose() {
      this.$emit("postRowClose");
    },
    // 保存修改后的信息
    saveEditPost() {
      this.postRequest("/position/UpdateById", this.editData).then(resp => {
        if (resp) {
          this.$message({
            message: "信息更改成功!",
            type: "success"
          });
        } else {
          this.$message.error("信息更改失败，请重新提交!");
        }
      });
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
