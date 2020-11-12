<template>
  <el-dialog
    title="编辑考核模板"
    :visible.sync="editTemVisible"
    width="40%"
    :before-close="editTemClose"
  >
    <div class="editTem">
      <el-form :model="editData" label-width="80px">
        <el-form-item label="模板名称">
          <el-input v-model="editData.templateName" />
        </el-form-item>
        <el-form-item label="制定单位">
          <el-input v-model="editData.formulationUnit" />
        </el-form-item>
      </el-form>
    </div>
      <el-button type="primary" @click="saveEditTem(editData), editTemClose()" class="editTemButton"> 提交</el-button>
      <el-button type="primary" @click="editTemClose()"> 取消</el-button>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editTemVisible: {
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
    editTemClose() {
      this.$emit("editClose");
    },
    // 保存
    saveEditTem() {
      this.putRequest("/examine/templateInfor/update", this.editData).then(
        resp => {
          if (resp) {
            this.$message({
              message: "考核模板修改成功!",
              type: "success"
            });
          } else {
            this.$message.error("考核模板修改失败，请重新提交!");
          }
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.editTem {
  height: 140px;
  overflow: auto;
}
.editTem .el-input {
  width: 420px;
  height: 2px;
}
.editTemButton {
  margin: 0 0 0 180px;
}
</style>
<style lang="less">
element.style {
  margin: 0;
}
</style>
