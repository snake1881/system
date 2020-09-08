<template>
  <el-dialog
    title="新增考核模板"
    :visible.sync="addTemVisible"
    width="60%"
    :before-close="addTemClose"
  >
    <div class="dialogDiv">
      <el-form :model="addData" label-width="80px">
        <el-form-item label="模板名称">
          <el-input v-model="addData.templateName" />
        </el-form-item>
        <el-form-item label="制定单位">
          <el-input v-model="addData.formulationUnit" />
        </el-form-item>
        <el-form-item label="是否有效">
          <el-select v-model="addData.active" placeholder="请选择">
            <el-option label="有效" value="1" />
            <el-option label="无效" value="0" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveAddTem(addData), addTemClose()">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addTemVisible: {
      type: Boolean
    }
  },
  inject: ["reload"],
  data() {
    return {
      // 表单数据
      addData: {
        templateName: "",
        formulationUnit: "",
        active: ""
      }
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
        resp => {
          if (resp) {
            this.$message({
              message: "考核模板新增成功!",
              type: "success"
            });
            this.reload();
          } else {
            this.$message.error("考核模板新增失败，请重新提交!");
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
<style lang="less">
element.style {
  margin: 0;
}
</style>
