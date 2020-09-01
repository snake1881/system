<template>
  <div class="container">
    <el-form :v-model="noticeData" label-width="72px">
      <el-form-item label="接收人" style="margin: 20px 10px">
        <el-input
          v-for="(item, index) in noticeData.receiver"
          :key="index"
          v-model="noticeData.receiver[index].userName"
          @click.native="selectReceiver()"
        />
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
    <!-- 选择通知接收人 -->
    <notice-receiver
      :noticeVisible="noticeVisible"
      @noticeClose="selectReceiverClose"
      @selectReceiver="selectReceiverData"
    />
  </div>
</template>
<script>
import noticeReceiver from "../components/noticeReceiver";
export default {
  components: {
    noticeReceiver
  },
  data() {
    return {
      noticeData: {
        title: "",
        content: "",
        receiver: [
          {
            userName: ""
          }
        ]
      },
      //选择对话框
      noticeVisible: false,
      // 选中的用户数据
      selectData: [
        {
          userName: ""
        }
      ]
    };
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
    // 接收子组件传过来的值
    selectReceiverData(val) {
      this.noticeData.receiver = val;
      this.noticeData.receiver.map(e => e.userName).join(",");

      console.log(val);
    },
    // 打开对话框
    selectReceiver() {
      this.noticeVisible = true;
    },
    // 关闭对话框
    selectReceiverClose() {
      this.noticeVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>
<style lang="less">
.el-textarea__inner {
  height: 400px;
}
.el-form-item {
  margin-bottom: 0px;
}
</style>
