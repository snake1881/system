<template>
  <el-dialog
    title="职位编辑"
    :visible.sync="editDicVisible"
    width="60%"
    :before-close="editDicClose"
  >
    <div class="dialogDiv">
      <el-form :model="editData" label-width="80px">
        <el-form-item label="编码名称">
          <el-input v-model="editData.codeTypeName" />
        </el-form-item>
        <el-form-item label="编码类型">
          <el-input v-model="editData.codeType" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="editData.createTime" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveEditDic(), editDicClose()">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editDicVisible: {
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
    editDicClose() {
      this.$emit("editClose");
    },
    // 保存修改后的信息
    saveEditDic() {
      this.postRequest("/", this.editData).then(resp => {
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
