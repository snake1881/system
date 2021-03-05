<template>
  <div class="receiveNotice">
    <div class="receiveNotice_span">
      <span style="display: block; text-align: center">通知中心</span>
    </div>
    <el-card class="receiver_card">
      <div
        v-for="(item, index) in this.noticeData"
        :key="index"
        class="receiveNotice_container"
      >
        <el-button
          type="warning"
          icon="el-icon-place"
          circle
          @click="gotoDetailsNotice(item)"
          class="receiveNotice_container_button"
        />
        <el-button
         @click="gotoDetailsNotice(item)"
         type="text"
          style="
            white-space: nowrap;
            margin-right: 30px;
            margin-bottom: 30px;
            width: 10%;
            display: inline-block;
            overflow: hidden; /*超出宽度部分隐藏*/
            text-overflow: ellipsis; /*超出部分以点号代替*/
          "
         >
          标题：{{ item.Title }}
        </el-button>
        <el-button
         @click="gotoDetailsNotice(item)"
         type="text"
          style="
            white-space: nowrap;
            margin-right: 30px;
            margin-bottom: 30px;
            width: 60%;
            display: inline-block;
            overflow: hidden; /*超出宽度部分隐藏*/
            text-overflow: ellipsis; /*超出部分以点号代替*/
          "
         >
          内容：{{ item.Message }}
        </el-button>
        <span
          @click="gotoDetailsNotice(item)"
          style="
            white-space: nowrap;
            margin-right: 30px;
            width: 10%;
            margin-bottom: 30px;
            overflow: hidden; /*超出宽度部分隐藏*/
            text-overflow: ellipsis; /*超出部分以点号代替*/
          "
          >状态：{{ item.MsgState }}</span
        >
        <el-button
          style="margin-bottom: 30px"
          @click="deleteNotice(item)"
          type="danger"
          size="medium"
          class="iconfont icon-shanchu"
          
        ></el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      noticeData: [],
    };
  },
  created() {
    this.noticeInit();
  },
  methods: {
    // 初始化所有通知
    noticeInit() {
      //从本地中读取历史消息并排序
      if (localStorage.length) {
        this.noticeData = [];
        var userId = JSON.parse(window.sessionStorage.getItem("user")).userId;
        let array = [];
        for (var i = 0; i < localStorage.length; i++) {
          var keyBegin = localStorage.key(i);
          if (keyBegin.startsWith("historyMessage" + userId)) {
            array.push(keyBegin.replace("historyMessage" + userId, ""));
          }
        }
        array = array.sort();
        for (var i = 0; i < array.length; i++) {
          this.noticeData[i] = JSON.parse(
            localStorage.getItem("historyMessage" + userId + array[i])
          );
          this.noticeData[i].key = "historyMessage" + userId + array[i];
        }
        return this.noticeData;
      }
    },
    // 详情
    gotoDetailsNotice(val) {
      this.$router.push({
        name: "消息详情",
        params: {
          key: val.key,
          msg: val.Message,
          sendUser: val.Sender,
          title: val.Title,
        },
      });
    },
    //删除信息
    deleteNotice(val) {
      console.log(val);
      this.$confirm("删除该条通知, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.localStorage.removeItem(val.key);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      // window.localStorage.removeItem(val.key);
      this.noticeInit();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/notice/receiveNotice.css";
</style>
<style scoped>
.el-button--text {
  color: black;
}
</style>