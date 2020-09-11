<template>
  <div style="height:100%">
    <el-container style="height:100%">
      <!-- 侧边栏 -->
      <el-aside width="210px"><common-aside /></el-aside>
      <el-container>
        <!-- 顶部栏 -->
        <el-header style="text-align: right; font-size: 12px">
          <div class="l-header">
            <!-- 面包屑、按钮 -->
            <div class="l-content">
              <el-button type="info" icon="el-icon-menu" size="mini" />
              <breadcrumb />
            </div>
            <!-- 用户信息 -->
            <div class="r-content">
              <!-- 消息通知 -->   
              <el-badge
                :value="noticeNum"
                style="margin-top:25px;margin-right:20px"
              >
                <el-button
                  icon="el-icon-bell"
                  circle
                  @click="gotoReceiveNotice()"
                />
              </el-badge>
              <!-- 图片+详细 -->
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <img
                    class="user"
                    alt="用户"
                    src="../../assets/images/header.jpg"
                  />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="usercenter">
                    个人中心
                  </el-dropdown-item>
                  <el-dropdown-item
                    command="notice"
                    @click.native="gotoSendNotice()"
                  >
                    发布通知
                  </el-dropdown-item>
                  <el-dropdown-item command="setting">设置</el-dropdown-item>
                  <el-dropdown-item command="logout">注销</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <!-- 用户名 -->
              <span
                style="text-align: center;line-height: 80px;font-size: 16px"
              >
                niewei
              </span>
            </div>
          </div>
          <!-- 标签 -->
          <div class="tag">
            <common-tags />
          </div>
        </el-header>
        <!-- 主体内容 -->
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import CommonAside from "../../components/CommonAside";
import Breadcrumb from "../../components/Breadcrumb";
import CommonTags from "../../components/CommonTags";

export default {
  components: {
    CommonAside,
    Breadcrumb,
    CommonTags
  },
  data() {
    return {
      // 消息通知
      noticeNum: 10
    };
  },
  created() {
    this.noticeInit();
  },
  methods: {
    // 消息通知
    noticeInit() {
      this.getRequest("/").then(resp => {
        if (resp) {
          // this.noticeNum = resp.data;
        }
      });
    },
    // 跳转到接收通知页面
    gotoReceiveNotice() {
      this.$router.replace("/receiveNotice");
    },
    //跳转到发布通知页面
    gotoSendNotice() {
      this.$router.replace("/sendNotice");
    }
  }
};
</script>
<style lang="less" scoped>
.el-header {
  height: 110px !important;
  padding: 0px 0px;
}
.l-header {
  background-color: #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0px 20px;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  display: flex;
  flex-direction: row;
  .user {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 25px;
    margin-top: 15px;
  }
}
.tag {
  width: 100%;
  height: 50px;
  background-color: #ebeff5;
}
.main {
  background-color: #f2f6fc;
}
</style>
<style lang="less">
body {
  margin: 0;
  height: 100%;
}
.el-main {
  padding: 0;
  border-top: 2px solid;
}
</style>
