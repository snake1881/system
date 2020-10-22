<template>
  <div class="header_container">
    <div class="container_left">
      <img class="container_left_img" src="../../assets/images/logo1.png" />
      <span class="container_left_text">定边采油厂智能油田一体化平台</span>
    </div>
    <!-- 导航栏 -->
    <div class="container_middle">
      <el-menu
        router
        mode="horizontal"
        default-active="/Index"
        background-color="#20374e"
        text-color="#fff"
        active-text-color="#ffd04b"
        v-if="this.$store.state.routes[0]"
      >
        <el-menu-item
          :index="item.path"
          v-for="(item, index) in this.$store.state.routes[0].children"
          :key="index"
        >
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 用户信息 -->
    <div class="container_right">
      <!-- 图片+详细 -->
      <el-dropdown trigger="click">
        <span>
          <img class="container_right_user" alt="用户" src="../../assets/images/header.jpg"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="usercenter" @click.native="goToPersonal()">个人中心</el-dropdown-item>
          <el-dropdown-item command="notice" @click.native="goToSendNotice()">发布通知</el-dropdown-item>
          <!-- <el-dropdown-item command="setting">设置</el-dropdown-item>
          <el-dropdown-item command="logout">注销</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 用户名 -->
      <span class="container_right_username">{{ username }}</span>
       <!-- 消息通知 -->
      <el-popover placement="bottom" class="container_right_notice" trigger="click">
        <el-tabs type="border-card">
          <el-tab-pane label="未读" >
            <el-scrollbar class="container_right_notice_scrollbar">
              <!-- 未阅读信息展示 end -->
              <template v-for="(item, index) in lists">
                <div v-if="item.msgState == '未通知'" class="container_right_notice_content" :key="index">
                  <el-button type="text" @click="goToDetail()">
                    {{ item.msgContent }}
                    {{ item.msgTime }}
                  </el-button>
                </div>
              </template>
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label="已读">
            <el-scrollbar class="container_right_notice_scrollbar">
              <template v-for="(item, index) in lists">
                <div v-if="item.msgState == '已阅读'" class="container_right_notice_content" :key="index">
                  <el-button type="text">{{item.msgContent}} {{item.msgTime}}</el-button>
                </div>
              </template>
            </el-scrollbar>
          </el-tab-pane>
          <el-button @click="gotoReceiveNotice()" class="container_right_notice_button" type="text">查看全部通知</el-button>
        </el-tabs>
        <el-badge slot="reference"  :max="99" class="container_right_badge"> 
          <el-button class="iconfont icon-xiaoxi" @click="cancelNoticeNum()"/>
        </el-badge>
      </el-popover>
      <!-- 退出 -->
      <el-button class="iconfont icon-tuichu container_right_out" @click="logout()"/>
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
      lists:[
        {
          msgState:"未通知",
          msgContent:"开发科李科长已通过你的合同审批",
          msgTime:"2020/5/21"
        },
        {
          msgState:"未通知",
          msgContent:"开发科李科长已通过你的合同审批",
          msgTime:"2020/6/11"
        },
        {
          msgState:"未通知",
          msgContent:"开发科李科长已通过你的合同审批",
          msgTime:"2020/6/1"
        },
        {
          msgState:"未通知",
          msgContent:"开发科李科长已通过你的合同审批",
          msgTime:"2020/7/12"
        },
        {
          msgState:"未通知",
          msgContent:"开发科李科长已通过你的合同审批",
          msgTime:"2020/6/1"
        },
        {
          msgState:"未通知",
          msgContent:"开发科李科长已通过你的合同审批",
          msgTime:"2020/7/12"
        }
      ],
      // 用户名
      username: this.$store.state.currentUser.username
    };
  },
  methods: {
    // 跳转到所有通知页面
    gotoReceiveNotice(){
      this.$router.push({ path:'/receiveNotice' })
    },
    // 跳转到发布通知页面
    goToSendNotice(){
       this.$router.push({ path:'/sendNotice' })
    },
    // 跳转到个人中心页面
    goToPersonal(){
      this.$router.push({ path:'/personal' })
    },
    // 通知数量修改
    cancelNoticeNum(){
      this.noticeNum = null;
    },
    // 跳转到通知详情
    goToDetail(){
      this.$router.push(
        { 
          name: '消息详情',
          params: { 
            msg: this.lists[0].msgContent,
            sendUser: this.$store.state.currentUser.username ,
            title: this.lists[0].msgState
          } 
        }
      );
    },
    // 退出系统
    logout () {
       this.$confirm("确定退出系统", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
        // 清空token
        window.sessionStorage.clear();
        this.$router.push('/');
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/home/HomeHeader.css";
</style>

<style>
.el-container {
  margin: 0;
  width: 100%;
  height: 100%;
}
.container_right .el-button {
  border-color: #20374e;
  background-color:#20374e;
  padding: 0 0;
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
.container_right .el-button {
  font-size: 20px;
}
</style>
