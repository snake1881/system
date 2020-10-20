<template>
  <el-dialog title="新增岗位" :visible.sync="addPostVisible" width="40%" :before-close="addPostClose">
    <div class="addPostDiv">
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
      </el-form>
    </div>
    <el-button type="primary" @click="saveAddPost(), addPostClose()" class="addPostButton">提交</el-button>
    <el-button type="info" @click="addPostClose()">取消</el-button>
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
        positionName: ""
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
.addPostDiv {
  height: 200px;
  overflow: auto;
}
.addPostDiv .el-input {
  width: 420px;
  height: 2px;
}
.addPostButton {
  margin: 0 0 0 180px;
}
</style>
