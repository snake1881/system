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
          @click="goToDetail(item)"
          class="receiveNotice_container_button"
        />
        <el-button
          @click="goToDetail(item)"
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
          标题：{{ item.title }}
        </el-button>
        <el-button
          @click="goToDetail(item)"
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
          内容：{{ item.content }}
        </el-button>
        <span
          v-if="item.state"
          @click="goToDetail(item)"
          style="
            white-space: nowrap;
            margin-right: 30px;
            width: 10%;
            margin-bottom: 30px;
            overflow: hidden; /*超出宽度部分隐藏*/
            text-overflow: ellipsis; /*超出部分以点号代替*/
          "
          >状态：已读</span
        >
        <span
          v-if="!item.state"
          @click="goToDetail(item)"
          style="
            white-space: nowrap;
            margin-right: 30px;
            width: 10%;
            margin-bottom: 30px;
            overflow: hidden; /*超出宽度部分隐藏*/
            text-overflow: ellipsis; /*超出部分以点号代替*/
          "
          >状态：未读</span
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
      this.getRequest(
        "/ChatRecord/chatList?receiveId=" +
          JSON.parse(window.sessionStorage.getItem("user")).userId
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          console.log(resp.data);
          this.noticeData = resp.data;
          //  console.log(this.unRead);
          //  this.lists.forEach(item=>{
          //   if(!item.state){
          //     this.unRead +=1;
          //   }
          // })
        }
      });
      //从本地中读取历史消息并排序
      // if (localStorage.length) {
      //   this.noticeData = [];
      //   var userId = JSON.parse(window.sessionStorage.getItem("user")).userId;
      //   let array = [];
      //   for (var i = 0; i < localStorage.length; i++) {
      //     var keyBegin = localStorage.key(i);
      //     if (keyBegin.startsWith("historyMessage" + userId)) {
      //       array.push(keyBegin.replace("historyMessage" + userId, ""));
      //     }
      //   }
      //   array = array.sort();
      //   for (var i = 0; i < array.length; i++) {
      //     this.noticeData[i] = JSON.parse(
      //       localStorage.getItem("historyMessage" + userId + array[i])
      //     );
      //     this.noticeData[i].key = "historyMessage" + userId + array[i];
      //   }
      //   return this.noticeData;
      // }
    },
    // 详情
    goToDetail(val) {
      this.$router.push({
        name: "消息详情",
        params: {
          key: val.chatRecordId,
          msg: val.content,
          sendUser: val.sendId,
          title: val.title,
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
          this.putRequest(
            "/ChatRecord/changeActive?id=" + val.chatRecordId
          ).then((resp) => {
            if (resp) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.noticeInit();
            }
          });
          // window.localStorage.removeItem(val.key);
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