<template>
  <el-dialog
    title="编辑考核模板"
    :visible.sync="editTemVisible"
    width="60%"
    :before-close="editTemClose"
  >
    <div class="dialogDiv">
      <el-form :model="editData" label-width="80px">
        <el-form-item label="模板名称">
          <el-input v-model="editData.templateName" />
        </el-form-item>
        <el-form-item label="制定单位">
          <el-input v-model="editData.formulationUnit" />
        </el-form-item>
        <el-form-item label="是否有效">
          <el-select v-model="editData.active" placeholder="请选择">
            <el-option label="有效" value="1" />
            <el-option label="无效" value="0" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveEditTem(editData), editTemClose()">
        提交
      </el-button>
    </span>
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
