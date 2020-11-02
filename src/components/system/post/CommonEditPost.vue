<template>
  <el-dialog title="岗位编辑" :visible.sync="editPostVisible" width="40%" :before-close="editPostClose">
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
        <el-form-item label="排列顺序">
          <el-input v-model="editData.sequence" />
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary" @click="saveEditPost(), editPostClose()" class="editPostButton">提交</el-button>
    <el-button type="info" @click="editPostClose()">取消</el-button>
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
      this.putRequest("/position/updateById", this.editData).then(resp => {
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
.editPostDiv {
  height: 220px;
  overflow: auto;
}
.editPostDiv .el-input {
  width: 420px;
  height: 2px;
}
.editPostButton {
  margin: 0 0 0 180px;
}
</style>