<template>
  <div class="header_container">
    <div class="container_left">
      <img class="container_left_img" src="../../assets/images/logo1.png" />
      <span class="container_left_text">定边采油厂智能油田平台</span>
    </div>
    <!-- 导航栏 -->
    <div class="container_middle">
      <el-menu
        router
        mode="horizontal"
        default-active="home"
        background-color="#164474"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item :index="item.path" v-for="(item, index) in this.$store.state.routes[0].children" :key="index">{{ item.name }}</el-menu-item>
      </el-menu>
    </div>
    <!-- 用户信息 -->
    <div class="container_right">
      <!-- 消息通知 -->
      <el-badge :value="noticeNum" class="container_right_badge">
        <el-button size="small" @click="gotoReceiveNotice()">
          <i class="el-icon-message-solid" />
        </el-button>
      </el-badge>
      <!-- 图片+详细 -->
      <el-dropdown trigger="click">
        <span>
          <img class="container_right_user" alt="用户" src="../../assets/images/header.jpg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="usercenter">个人中心</el-dropdown-item>
          <el-dropdown-item command="notice" @click.native="gotoSendNotice()">发布通知</el-dropdown-item>
          <el-dropdown-item command="setting">设置</el-dropdown-item>
          <el-dropdown-item command="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 用户名 -->
      <span class="container_right_username">{{username}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menus: this.$store.state.routes[0].children,
      // 消息通知
      noticeNum: 10,
      username: this.$store.state.currentUser.username
    };
  },
  methods: {}
};
</script>
<style lang='less' scoped>
  @import '../../assets/css/home/HomeHeader.css';
</style>
<style>
body,.el-container {
  margin: 0;
  width: 100%;
  height: 100%;
}
.el-header {
  height: 18%;
  width: 100%;
  padding: 0 0;
  background-color: #164474;
}
.el-main {
  height: 82%;
  width: 100%;
  background-color: #f2f6fc;
}
.container_right .el-button {
  border-color: #164474;
  background-color: #164474;
  padding: 0 0;
  font-size: 26px;
}
.container_middle .el-menu {
  border: 0;
}
</style>