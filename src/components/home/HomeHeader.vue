<template>
  <div class="header_container">
    <div class="container_left">
      <img class="container_left_img" src="../../assets/images/logo2.png" />
      <span class="container_left_text">定边采油厂一体化信息平台</span>
    </div>
    <!-- 导航栏 -->
    <div class="container_middle">
      <el-menu
        router
        mode="horizontal"
        default-active="/Index"
        class="header-el-menu"
        text-color="#fff"
        active-text-color="#fff"
        v-if="this.$store.state.routes[0]"
      >
        <el-menu-item
          :index="item.path"
          v-for="(item, index) in this.$store.state.routes[0].children"
          :key="index"
        >
          {{ item.name }}
        </el-menu-item>
        <el-menu-item>
          <el-link
            href="http://javacore.vicp.net:8891"
            target="_blank"
            style="text-decoration: none; font-size: 14px"
            >海联石化</el-link
          >
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 用户信息 -->
    <div class="container_right">
      <!-- 图片+详细 -->
      <el-dropdown trigger="click">
        <span>
          <img
            class="container_right_user"
            alt="用户"
            src="../../assets/images/header.jpg"
          />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="usercenter" @click.native="goToPersonal()"
            >个人中心</el-dropdown-item
          >
          <el-dropdown-item command="notice" @click.native="goToSendNotice()"
            >发布通知</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 消息通知 -->
      <el-badge :value="this.unRead" class="container_right_notice">
        <el-popover placement="bottom" trigger="click" @show="messageInit()">
          <el-tabs type="border-card">
            <el-tab-pane label="未读">
              <el-scrollbar class="container_right_notice_scrollbar">
                <!-- 未阅读信息展示 end -->
                <template v-for="(item, index) in lists">
                  <div
                    v-if="!item.state"
                    class="container_right_notice_content"
                    :key="index"
                  >
                    <el-button type="text" @click="goToDetail(item)">
                      {{ item.title }}
                      {{ getStandardTime(item.time) }}
                    </el-button>
                  </div>
                </template>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="已读">
              <el-scrollbar class="container_right_notice_scrollbar">
                <template v-for="(item, index) in lists">
                  <div
                    v-if="item.state"
                    class="container_right_notice_content"
                    :key="index"
                  >
                    <el-button type="text" @click="goToDetail(item)">
                      {{ item.title }}
                      {{ getStandardTime(item.time) }}</el-button
                    >
                  </div>
                </template>
              </el-scrollbar>
            </el-tab-pane>
            <el-button
              @click="gotoReceiveNotice()"
              class="container_right_notice_button"
              type="text"
              >查看全部通知</el-button
            >
          </el-tabs>
          <el-badge slot="reference" :max="99" class="container_right_badge">
            <el-button
              class="iconfont icon-xiaoxi"
              @click="cancelNoticeNum()"
            />
          </el-badge>
        </el-popover>
      </el-badge>

      <!-- 退出 -->
      <el-button
        class="iconfont icon-tuichu container_right_out"
        @click="logout()"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 通知总数
      // noticeNum: 10,
      // 通知详细
      lists: [],
      // 用户名
      username: this.$store.state.currentUser.username,
      //未接收消息
      unRead: 0,
    };
  },
  created() {
    this.messageInit();
  },
  methods: {
    // 跳转到所有通知页面
    gotoReceiveNotice() {
      this.$router.push({ path: "/receiveNotice" });
    },
    // 跳转到发布通知页面
    goToSendNotice() {
      this.$router.push({ path: "/sendNotice" });
    },
    // 跳转到个人中心页面
    goToPersonal() {
      this.$router.push({ path: "/personal" });
    },
    // 通知数量修改
    cancelNoticeNum() {
      this.noticeNum = null;
    },
    // 跳转到通知详情
    goToDetail(val) {
      //若当前页面为通知详情页面则刷新数据
      if (this.$route.path == "/detailsNotice") {
        this.$router.push({ path: "/" });
      }
      this.$router.push({
        name: "消息详情",
        params: val,
      });
      this.messageInit();
    },
    // 退出系统
    logout() {
      this.$confirm("确定退出系统", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 清空token
          window.sessionStorage.clear();
          // 清空浏览器缓存在localStorage的数据
          window.localStorage.clear();
          // 跳转到登录页
          this.$router.push("/");
          // 刷新页面
          window.location.reload();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    messageInit() {
      this.unRead = 0;
      this.getRequest(
        "/ChatRecord/chatList?receiveId=" +
          JSON.parse(window.sessionStorage.getItem("user")).userId
      ).then((resp) => {
        this.loading = false;
        if (resp) {
          this.lists = resp.data;
          this.lists.forEach((item) => {
            if (!item.state) {
              this.unRead += 1;
            }
          });
        }
      });
      // unRead = this.unRead;
      //从本地中读取历史消息并排序,展示未读信息数量
      // if (localStorage.length) {
      //   this.unRead = 0;
      //   this.lists = [];
      //   var historyMessage = {};
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
      //     historyMessage = JSON.parse(
      //       localStorage.getItem("historyMessage" + userId + array[i])
      //     );
      //     this.lists[i] = historyMessage;
      //     if (historyMessage.MsgState == "未读") {
      //       this.unRead = this.unRead + 1;
      //     }
      //     this.lists[i].key = "historyMessage" + userId + array[i];
      //   }
      //   window.sessionStorage.setItem("unRead", JSON.stringify(this.unRead));
      //   return this.lists;
      // }
    },
    //获取时间
    getStandardTime(val) {
      var date = new Date(val);
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      var currentdate =
        year +
        "-" +
        month +
        "-" +
        strDate +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      return currentdate;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/home/HomeHeader.css";
</style>

<style>
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #444b91 !important;
  border-bottom-color: #565d99 !important;
}
.el-menu-item.is-active {
  background-color: linear-gradient(#47598f, #525bae) !important;
  border-bottom-color: #565d99 !important;
}
.el-container {
  margin: 0;
  width: 100%;
  height: 100%;
}
.container_right .el-button {
  color: white;
  border: none;
  background-image: linear-gradient(#4e70ad, #3e4372);
  padding: 0 0;
  font-size: 18px;
}
.container_right .el-dropdown {
  width: 40%;
  height: 100%;
}
.container_middle .el-menu {
  border: 0;
  height: 100%;
}
.container_middle .el-menu .el-menu-item {
  height: 100%;
  line-height: 76px;
}
.container_right_notice_scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>