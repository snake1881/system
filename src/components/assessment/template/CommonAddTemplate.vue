<template>
  <el-dialog
    title="新增考核模板"
    :visible.sync="addTemVisible"
    width="40%"
    :before-close="addTemClose"
  >
    <div class="addTem">
      <el-form :model="addData" label-width="80px">
        <el-form-item label="模板名称">
          <el-input v-model="addData.templateName" />
        </el-form-item>
        <el-form-item label="制定单位">
          <el-input v-model="addData.formulationUnit" />
        </el-form-item>
      </el-form>
    </div>
    <el-button
      type="primary"
      @click="saveAddTem(addData), addTemClose()"
      class="saveTemButton"
    >
      提交
    </el-button>
    <el-button type="info" @click="addTemClose()">取消</el-button>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addTemVisible: {
      type: Boolean,
    },
  },
  inject: ["reload"],
  data() {
    return {
      // 表单数据
      addData: {
        templateName: "",
        formulationUnit: "",
      },
    };
  },
  methods: {
    // 对话框父子组件传值
    addTemClose() {
      this.$emit("addClose");
    },
    // 保存
    saveAddTem() {
      this.postRequest("/examine/templateInfor/insert", this.addData).then(
        (resp) => {
          if (resp) {
            this.$message({
              message: "考核模板新增成功!",
              type: "success",
            });
            this.reload();
          } else {
            this.$message.error("考核模板新增失败，请重新提交!");
          }
        }
      );
    },
  },
};
</script>
<style lang="less" scoped>
.addTem {
  height: 140px;
  overflow: auto;
}
.addTem .el-input {
  width: 420px;
  height: 2px;
}
.saveTemButton {
  margin: 0 0 0 180px;
}
</style>
<style>
element.style {
  margin: 0;
}
</style>
