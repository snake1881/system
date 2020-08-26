<template>
  <el-dialog
    title="职位编辑"
    :visible.sync="addPostVisible"
    width="60%"
    :before-close="addPostClose"
  >
    <div class="dialogDiv">
      <el-form :model="postData" label-width="80px">
        <el-form-item label="岗位编号">
          <el-input v-model="postData.positionId" />
        </el-form-item>
        <el-form-item label="岗位编码">
          <el-input v-model="postData.positionCode" />
        </el-form-item>
        <el-form-item label="岗位名称">
          <el-input v-model="postData.positionName" />
        </el-form-item>
        <el-form-item label="显示顺序">
          <el-input v-model="postData.sequence" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" @click="saveAddPost(), addPostClose()">
        提交
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addPostVisible: {
      type: Boolean
    }
  },
  inject: ["reload"],
  data() {
    return {
      postData: {
        positionId: "",
        positionCode: "",
        positionName: "",
        sequence: ""
      }
    };
  },
  methods: {
    // 对话框父子组件传值
    addPostClose() {
      this.$emit("postRowClose");
    },
    // 保存修改后的信息
    saveAddPost() {
      this.postRequest("/position/save", this.postData).then(resp => {
        if (resp) {
          this.$message({
            message: "岗位新增成功!",
            type: "success"
          });
          this.reload();
        } else {
          this.$message.error("岗位新增失败，请重新提交!");
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
