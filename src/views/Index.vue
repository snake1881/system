<template>
  <el-container>
    <el-header>
      <div class="header_container">
        <img class="header_img" src="../assets/images/logo1.png" />
        <span class="header_text">用户管理系统</span>
        <div>
          <el-menu mode="horizontal">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-menu-item index="2">工作台</el-menu-item>
            <el-menu-item index="3">消息中心</el-menu-item>
            <el-menu-item index="4">订单管理</el-menu-item>
          </el-menu>
        </div>
      </div>
    </el-header>
    <el-main>Main</el-main>
  </el-container>
</template>
<script>
export default {
  data() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.header_container {
  display: flex;
  flex-direction: row;
  .header_text {
    margin-top: 15px;
    color: #f2f6fc;
    font-size: 24px;
  }
  .header_img {
    width: 100px;
    height: 50px;
    margin-top: 5px;
    margin-right: 6px;
  }
}
</style>
<style scoped>
.el-header {
  background-color: #164474;
}
.el-main {
  background-color: #f2f6fc;
}
</style>
