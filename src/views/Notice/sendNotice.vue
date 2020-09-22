<template>
  <div class="sendNotice">
    <div class="sendNotice_left">
      <el-form :v-model="noticeData" label-width="72px">
        <el-form-item label="接收人" style="margin: 20px 10px">
          <el-input v-model="noticeData.receiver"/>
        </el-form-item>
        <el-form-item label="标题" style="margin: 20px 10px">
          <el-input v-model="noticeData.title" />
        </el-form-item>
        <el-form-item label="内容" style="margin: 20px 10px">
          <el-input type="textarea" v-model="noticeData.content" />
        </el-form-item>
        <el-form-item style="margin-top: -10px">
          <el-button @click="sendNotice()">发送</el-button>
          <el-button type="info" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="sendNotice_right">
      选择通知接收人
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      noticeData: {
        title: "",
        content: "",
        receiver: ""    
      }
    }
  },
  methods: {
    // 发送通知
    sendNotice() {
      this.gosttRequest("/", this.noticeData).then(resp => {
        if (resp) {
          this.$message({
            message: "通知发送成功!",
            type: "success"
          });
        } else {
          this.$message.error("通知发送失败，请重新发送!");
        }
      });
    },
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/notice/sendNotice.css";
</style>

<style lang="less">
.el-textarea__inner {
  height: 400px;
}
.el-form-item {
  margin-bottom: 0px;
}
</style>
